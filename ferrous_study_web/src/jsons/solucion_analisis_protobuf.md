---
key: 140
name: solucion_analisis_protobuf
addData: 07/06/2025
updateData: null
keywords: 
 - analisis_protobuf
 - analisis_protobuf
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

```rust
/// Tipo de wire como se observa en el wire.
enum WireType {
    /// Varint WireType indica que el valor es un único VARINT.
    Varint,
    //I64,  -- no es necesario para este ejercicio
    /// El Len WireType indica que el valor es una longitud representada como
    /// VARINT seguida exactamente de ese número de bytes.
    Len,
    /// El WireType I32 indica que el valor es de 4 bytes en
    /// el orden little endian que contiene un número entero con signo de 32 bits.
    I32,
}

#[derive(Debug)]
/// Valor de un campo, escrito en función del tipo de wire.
enum FieldValue<'a> {
    Varint(u64),
    //I64(i64),  -- no es necesario para este ejercicio
    Len(&'a [u8]),
    I32(i32),
}

#[derive(Debug)]
/// Campo que contiene el número de campo y su valor.
struct Field<'a> {
    field_num: u64,
    value: FieldValue<'a>,
}

trait ProtoMessage<'a>: Default {
    fn add_field(&mut self, field: Field<'a>);
}

impl From<u64> for WireType {
    fn from(value: u64) -> Self {
        match value {
            0 => WireType::Varint,
            //1 => WireType::I64, no es necesario para este ejercicio
            2 => WireType::Len,
            5 => WireType::I32,
            _ => panic!("Tipo de wire no válido: {value}"),
        }
    }
}

impl<'a> FieldValue<'a> {
    fn as_string(&self) -> &'a str {
        let FieldValue::Len(data) = self else {
            panic!("Cadena era esperado ser un campo `Len`");
        };
        std::str::from_utf8(data).expect("Cadena no válida")
    }

    fn as_bytes(&self) -> &'a [u8] {
        let FieldValue::Len(data) = self else {
            panic!("Bytes eran esperados ser un campo `Len`");
        };
        data
    }

    fn as_u64(&self) -> u64 {
        let FieldValue::Varint(value) = self else {
            panic!("`u64` era esperado ser un campo `Varint`");
        };
        *value
    }

    #[allow(dead_code)]
    fn as_i32(&self) -> i32 {
        let FieldValue::I32(value) = self else {
            panic!("`i32` era esperado ser un campo `I32`");
        };
        *value
    }
}

/// Analiza un VARINT, que devuelve el valor analizado y los bytes restantes.
fn parse_varint(data: &[u8]) -> (u64, &[u8]) {
    for i in 0..7 {
        let Some(b) = data.get(i) else {
            panic!("No hay suficientes bytes para un varint");
        };
        if b & 0x80 == 0 {
            // Este es el último byte de VARINT, así que conviértelo en
            // u64 y haz que lo devuelva.
            let mut value = 0u64;
            for b in data[..=i].iter().rev() {
                value = (value << 7) | (b & 0x7f) as u64;
            }
            return (value, &data[i + 1..]);
        }
    }

    // Un número mayor de 7 bytes no es válido.
    panic!("Demasiados bytes para un varint");
}

/// Convierte una etiqueta en un número de campo y un WireType.
fn unpack_tag(tag: u64) -> (u64, WireType) {
    let field_num = tag >> 3;
    let wire_type = WireType::from(tag & 0x7);
    (field_num, wire_type)
}

/// Analiza un campo y haz que devuelva los bytes restantes.
fn parse_field(data: &[u8]) -> (Field, &[u8]) {
    let (tag, remainder) = parse_varint(data);
    let (field_num, wire_type) = unpack_tag(tag);
    let (fieldvalue, remainder) = match wire_type {
        WireType::Varint => {
            let (value, remainder) = parse_varint(remainder);
            (FieldValue::Varint(value), remainder)
        }
        WireType::Len => {
            let (len, remainder) = parse_varint(remainder);
            let len: usize = len.try_into().expect("len no es un `usize` valido");
            if remainder.len() < len {
                panic!("EOF inesperado");
            }
            let (value, remainder) = remainder.split_at(len);
            (FieldValue::Len(value), remainder)
        }
        WireType::I32 => {
            if remainder.len() < 4 {
                panic!("EOF inesperado");
            }
            let (value, remainder) = remainder.split_at(4);
            // Desenvuelve el error porque `value` tiene 4 bytes.
            let value = i32::from_le_bytes(value.try_into().unwrap());
            (FieldValue::I32(value), remainder)
        }
    };
    (Field { field_num, value: fieldvalue }, remainder)
}

/// Analiza un mensaje de los datos proporcionados, llamando a `T::add_field` para cada campo
/// del mensaje.
///
/// Se utilizan todos los datos introducidos.
fn parse_message<'a, T: ProtoMessage<'a>>(mut data: &'a [u8]) -> T {
    let mut result = T::default();
    while !data.is_empty() {
        let parsed = parse_field(data);
        result.add_field(parsed.0);
        data = parsed.1;
    }
    result
}

#[derive(Debug, Default)]
struct PhoneNumber<'a> {
    number: &'a str,
    type_: &'a str,
}

#[derive(Debug, Default)]
struct Person<'a> {
    name: &'a str,
    id: u64,
    phone: Vec<PhoneNumber<'a>>,
}

impl<'a> ProtoMessage<'a> for Person<'a> {
    fn add_field(&mut self, field: Field<'a>) {
        match field.field_num {
            1 => self.name = field.value.as_string(),
            2 => self.id = field.value.as_u64(),
            3 => self.phone.push(parse_message(field.value.as_bytes())),
            _ => {} // salta todos los demás pasos
        }
    }
}

impl<'a> ProtoMessage<'a> for PhoneNumber<'a> {
    fn add_field(&mut self, field: Field<'a>) {
        match field.field_num {
            1 => self.number = field.value.as_string(),
            2 => self.type_ = field.value.as_string(),
            _ => {} // salta todos los demás pasos
        }
    }
}

fn main() {
    let person: Person = parse_message(&[
        0x0a, 0x07, 0x6d, 0x61, 0x78, 0x77, 0x65, 0x6c, 0x6c, 0x10, 0x2a, 0x1a,
        0x16, 0x0a, 0x0e, 0x2b, 0x31, 0x32, 0x30, 0x32, 0x2d, 0x35, 0x35, 0x35,
        0x2d, 0x31, 0x32, 0x31, 0x32, 0x12, 0x04, 0x68, 0x6f, 0x6d, 0x65, 0x1a,
        0x18, 0x0a, 0x0e, 0x2b, 0x31, 0x38, 0x30, 0x30, 0x2d, 0x38, 0x36, 0x37,
        0x2d, 0x35, 0x33, 0x30, 0x38, 0x12, 0x06, 0x6d, 0x6f, 0x62, 0x69, 0x6c,
        0x65,
    ]);
    println!("{:#?}", person);
}
```

language&>es-ES<&