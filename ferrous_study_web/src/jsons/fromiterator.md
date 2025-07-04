---
key: 68
name: fromiterator
addData: 3/07/2025
updateData: null
keywords: 
 - iteradores
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# FromIterator
FromIterator permite construir una colección a partir de un Iterator.

```rust
fn main() {
    let primes = vec![2, 3, 5, 7];
    let prime_squares = primes.into_iter().map(|p| p * p).collect::<Vec<_>>();
    println!("prime_squares: {prime_squares:?}");
}
```

Iterator implementa

fn collect<B>(self) -> B
where
    B: FromIterator<Self::Item>,
    Self: Sized
Hay dos formas de especificar B en este método:

Con “turbofish”: some_iterator.collect::<COLLECTION_TYPE>(), tal como se muestra. La forma abreviada de _ que se utiliza aquí permite que Rust infiera el tipo de los elementos Vec.
Con inferencia de tipos: let prime_squares: Vec<_> = some_iterator.collect(). Reescribe el ejemplo para usar esta opción.
Existen implementaciones básicas de FromIterator para Vec, HashMap, etc. También existen implementaciones mas especializadas que te dejan hacer cosas padres como convertir un Iterator<Item = Result<V, E>> a un Result<Vec<V>, E>.
language&>es-ES<&