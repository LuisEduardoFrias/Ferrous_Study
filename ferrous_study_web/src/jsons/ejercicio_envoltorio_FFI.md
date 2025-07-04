---
key: 96
name: ejercicio_envoltorio_FFI
addData: 3/07/2025
updateData: null
keywords: 
 - ejercicio
 - envoltorio FFI
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Envoltorio de FFI Seguro
Rust ofrece una gran asisencia para llamar a funciones a través de una interfaz de función externa (FFI). Usaremos esto para crear un envoltorio seguro para las funciones libc que usarías desde C para leer los nombres de archivo de un directorio.

Consulta las páginas del manual:

opendir(3)
readdir(3)
closedir(3)
También te recomendamos que consultes el módulo std::ffi. Ahí encontrarás una serie de tipos de cadena que necesitas para el ejercicio:

Tipos	Codificación	Uso
str y String	UTF-8	Procesar textos en Rust
CStr y CString	Terminado en NUL	Comunicarse con funciones C
OsStr y OsString	Específico del SO	Comunicarse con el SO
Realizarás conversiones entre todos estos tipos:

De &str a CString: debes asignar espacio para un carácter final \0,
De CString a *const i8: necesitas un puntero para llamar a funciones C,
De *const i8 a &CStr: necesitas algo que pueda encontrar el carácter final \0,
&CStr to &[u8]: a slice of bytes is the universal interface for “some unknown data”,
De &[u8] a &OsStr: &OsStr es un paso hacia OsString, usa OsStrExt para crearlo.
De OsStr a OsString: debes clonar los datos en &OsStr para poder devolverlo y llamar a readdir de nuevo.
El Nomicon también tiene un capítulo muy útil sobre FFI.

Copia el fragmento de código que aparece más abajo en la página https://play.rust-lang.org/ y rellena los métodos y funciones que faltan:

```rusy
// TODO: borra esto cuando termines de implementarlo.
#![allow(unused_imports, unused_variables, dead_code)]

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
        unimplemented!()
    }
}

impl Iterator for DirectoryIterator {
    type Item = OsString;
    fn next(&mut self) -> Option<OsString> {
        // Sigue llamando a readdir hasta se obtenga un puntero NULL.
        unimplemented!()
    }
}

impl Drop for DirectoryIterator {
    fn drop(&mut self) {
        // Llama a closedir según sea necesario.
        unimplemented!()
    }
}

fn main() -> Result<(), String> {
    let iter = DirectoryIterator::new(".")?;
    println!("archivos: {:#?}", iter.collect::<Vec<_>>());
    Ok(())
}
```
language&>es-ES<&