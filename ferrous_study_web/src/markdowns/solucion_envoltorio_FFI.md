---
key: 97
name: solucion_envoltori_FFI
addData: 3/07/2025
updateData: null
keywords: 
 - solución
 - envoltorio FFI
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

```rust
mod ffi {
    use std::os::raw::{c_char, c_int};
    #[cfg(not(target_os = "macos"))]
    use std::os::raw::{c_long, c_uchar, c_ulong, c_ushort};

    // Tipo opaco. Consulta https://doc.rust-lang.org/nomicon/ffi.html.
    #[repr(C)]
    pub struct DIR {
        _data: [u8; 0],
        _marker: core::marker::PhantomData<(*mut u8, core::marker::PhantomPinned)>,
    }

    // Diseño según la página del manual de Linux para readdir(3), donde ino_t y
    // off_t se resuelven de acuerdo con las definiciones de
    // /usr/include/x86_64-linux-gnu/{sys/types.h, bits/typesizes.h}. .
    #[cfg(not(target_os = "macos"))]
    #[repr(C)]
    pub struct dirent {
        pub d_ino: c_ulong,
        pub d_off: c_long,
        pub d_reclen: c_ushort,
        pub d_type: c_uchar,
        pub d_name: [c_char; 256],
    }

    // Diseño según la página del manual de macOS de dir(5).
    #[cfg(all(target_os = "macos"))]
    #[repr(C)]
    pub struct dirent {
        pub d_fileno: u64,
        pub d_seekoff: u64,
        pub d_reclen: u16,
        pub d_namlen: u16,
        pub d_type: u8,
        pub d_name: [c_char; 1024],
    }

    extern "C" {
        pub fn opendir(s: *const c_char) -> *mut DIR;

        #[cfg(not(all(target_os = "macos", target_arch = "x86_64")))]
        pub fn readdir(s: *mut DIR) -> *const dirent;

        // Consulta https://github.com/rust-lang/libc/issues/414 y la sección sobre
 // _DARWIN_FEATURE_64_BIT_INODE en la página del manual de macOS de stat(2).
 //
 // " Las plataformas que existían antes de que estas actualizaciones estuvieran disponibles" hacen referencia
 // a macOS (en lugar de iOS, WearOS, etc.) en Intel y PowerPC.
        #[cfg(all(target_os = "macos", target_arch = "x86_64"))]
        #[link_name = "readdir$INODE64"]
        pub fn readdir(s: *mut DIR) -> *const dirent;

        pub fn closedir(s: *mut DIR) -> c_int;
    }
}

use std::ffi::{CStr, CString, OsStr, OsString};
use std::os::unix::ffi::OsStrExt;

#[derive(Debug)]
struct DirectoryIterator {
    path: CString,
    dir: *mut ffi::DIR,
}

impl DirectoryIterator {
    fn new(path: &str) -> Result<DirectoryIterator, String> {
        // Llama a opendir y devuelve un valor Ok si ha funcionado,
        // de lo contrario, devuelve Err con un mensaje.
        let path =
            CString::new(path).map_err(|err| format!("Ruta no válida: {err}"))?;
        // SEGURIDAD: path.as_ptr() no puede ser NULL.
        let dir = unsafe { ffi::opendir(path.as_ptr()) };
        if dir.is_null() {
            Err(format!("No se ha podido abrir {:?}", path))
        } else {
            Ok(DirectoryIterator { path, dir })
        }
    }
}

impl Iterator for DirectoryIterator {
    type Item = OsString;
    fn next(&mut self) -> Option<OsString> {
        // Sigue llamando a readdir hasta que se obtenga un puntero NULL.
        // SEGURIDAD: self.dir nunca es NULL.
        let dirent = unsafe { ffi::readdir(self.dir) };
        if dirent.is_null() {
            // Hemos llegado al final del directorio.
            return None;
        }
        // SEGURIDAD: dirent no es NULL y dirent.d_name es NULL
        // finalizado.
        let d_name = unsafe { CStr::from_ptr((*dirent).d_name.as_ptr()) };
        let os_str = OsStr::from_bytes(d_name.to_bytes());
        Some(os_str.to_owned())
    }
}

impl Drop for DirectoryIterator {
    fn drop(&mut self) {
        // Llama a closedir según sea necesario.
        if !self.dir.is_null() {
            // SEGURIDAD: self.dir no es NULL.
            if unsafe { ffi::closedir(self.dir) } != 0 {
                panic!("No se ha podido cerrar {:?}.", self.path);
            }
        }
    }
}

fn main() -> Result<(), String> {
    let iter = DirectoryIterator::new(".")?;
    println!("archivos: {:#?}", iter.collect::<Vec<_>>());
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::error::Error;

    #[test]
    fn test_nonexisting_directory() {
        let iter = DirectoryIterator::new("no-such-directory");
        assert!(iter.is_err());
    }

    #[test]
    fn test_empty_directory() -> Result<(), Box<dyn Error>> {
        let tmp = tempfile::TempDir::new()?;
        let iter = DirectoryIterator::new(
            tmp.path().to_str().ok_or("Hay un carácter no codificado en UTF-8 en la ruta")?,
        )?;
        let mut entries = iter.collect::<Vec<_>>();
        entries.sort();
        assert_eq!(entries, &[".", ".."]);
        Ok(())
    }

    #[test]
    fn test_nonempty_directory() -> Result<(), Box<dyn Error>> {
        let tmp = tempfile::TempDir::new()?;
        std::fs::write(tmp.path().join("foo.txt"), "The Foo Diaries\n")?;
        std::fs::write(tmp.path().join("bar.png"), "<PNG>\n")?;
        std::fs::write(tmp.path().join("crab.rs"), "//! Crab\n")?;
        let iter = DirectoryIterator::new(
            tmp.path().to_str().ok_or("Hay un carácter no codificado en UTF-8 en la ruta")?,
        )?;
        let mut entries = iter.collect::<Vec<_>>();
        entries.sort();
        assert_eq!(entries, &[".", "..", "bar.png", "crab.rs", "foo.txt"]);
        Ok(())
    }
}
```
language&>es-ES<&