---
key: 128
name: ejercicio_arbol_binario
addData: 07/06/2025
updateData: null
keywords: 
 - Ejercicio
 - Arbol binario
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Árbol binario
Un árbol binario es una estructura de datos de tipo árbol en la que cada nodo tiene dos elementos secundarios (izquierda y derecha). Crearemos un árbol en el que cada nodo almacene un valor. Para un nodo N dado, todos los nodos del subárbol izquierdo de N contienen valores más pequeños, mientras que todos los nodos del subárbol derecho de N contendrán valores de mayor tamaño.

Implementa los siguientes tipos para superar las pruebas correspondientes.

Ejercicio adicional: implementar un iterador sobre un árbol binario que devuelva los valores en orden.

```rust
/// Un nodo del árbol binario.
#[derive(Debug)]
struct Node<T: Ord> {
    value: T,
    left: Subtree<T>,
    right: Subtree<T>,
}

/// Un subárbol posiblemente vacío.
#[derive(Debug)]
struct Subtree<T: Ord>(Option<Box<Node<T>>>);

/// Contenedor que almacena un conjunto de valores mediante un árbol binario.
///
/// Si se añade el mismo valor varias veces, solo se almacena una vez.
#[derive(Debug)]
pub struct BinaryTree<T: Ord> {
    root: Subtree<T>,
}

impl<T: Ord> BinaryTree<T> {
    fn new() -> Self {
        Self { root: Subtree::new() }
    }

    fn insert(&mut self, value: T) {
        self.root.insert(value);
    }

    fn has(&self, value: &T) -> bool {
        self.root.has(value)
    }

    fn len(&self) -> usize {
        self.root.len()
    }
}

// Implementa `new`, `insert`, `len` y `has` para `Subtree`.

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn len() {
        let mut tree = BinaryTree::new();
        assert_eq!(tree.len(), 0);
        tree.insert(2);
        assert_eq!(tree.len(), 1);
        tree.insert(1);
        assert_eq!(tree.len(), 2);
        tree.insert(2); // No es un elemento único.
        assert_eq!(tree.len(), 2);
    }

    #[test]
    fn has() {
        let mut tree = BinaryTree::new();
        fn check_has(tree: &BinaryTree<i32>, exp: &[bool]) {
            let got: Vec<bool> =
                (0..exp.len()).map(|i| tree.has(&(i as i32))).collect();
            assert_eq!(&got, exp);
        }

        check_has(&tree, &[false, false, false, false, false]);
        tree.insert(0);
        check_has(&tree, &[true, false, false, false, false]);
        tree.insert(4);
        check_has(&tree, &[true, false, false, false, true]);
        tree.insert(4);
        check_has(&tree, &[true, false, false, false, true]);
        tree.insert(3);
        check_has(&tree, &[true, false, false, true, true]);
    }

    #[test]
    fn unbalanced() {
        let mut tree = BinaryTree::new();
        for i in 0..100 {
            tree.insert(i);
        }
        assert_eq!(tree.len(), 100);
        assert!(tree.has(&50));
    }
}
```

language&>es-ES<&