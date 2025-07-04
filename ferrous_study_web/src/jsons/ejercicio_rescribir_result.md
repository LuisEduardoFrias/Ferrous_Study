---
key: 88
name: ejercicio_rescribir_result
addData: 3/07/2025
updateData: null
keywords: 
 - ejercicio
 - rescribir result
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Reescribir con Result
A continuación, se implementa un analizador muy sencillo para un lenguaje de expresiones. Sin embargo, para gestionar los errores, utiliza pánicos. Reescribe este texto para utilizar la gestión de errores idiomática y propagar los errores a un instrucción de retorno desde main. No dudes en usar thiserror y anyhow.

CONSEJO: empieza por corregir la gestión de errores en la función parse. Cuando funcione correctamente, actualiza Tokenizer para implementar Iterator<Item=Result<Token, TokenizerError>> y gestiónalo en el analizador.

```rust
use std::iter::Peekable;
use std::str::Chars;

/// Un operador aritmético.
#[derive(Debug, PartialEq, Clone, Copy)]
enum Op {
    Add,
    Sub,
}

/// Un token en el lenguaje expresión.
#[derive(Debug, PartialEq)]
enum Token {
    Number(String),
    Identifier(String),
    Operator(Op),
}

/// Una expresión en el lenguaje de la expresión.
#[derive(Debug, PartialEq)]
enum Expression {
    /// Una referencia a una variable.
    Var(String),
    /// Un número literal.
    Number(u32),
    /// Una operación binaria.
    Operation(Box<Expression>, Op, Box<Expression>),
}

fn tokenize(input: &str) -> Tokenizer {
    return Tokenizer(input.chars().peekable());
}

struct Tokenizer<'a>(Peekable<Chars<'a>>);

impl<'a> Tokenizer<'a> {
    fn collect_number(&mut self, first_char: char) -> Token {
        let mut num = String::from(first_char);
        while let Some(&c @ '0'..='9') = self.0.peek() {
            num.push(c);
            self.0.next();
        }
        Token::Number(num)
    }

    fn collect_identifier(&mut self, first_char: char) -> Token {
        let mut ident = String::from(first_char);
        while let Some(&c @ ('a'..='z' | '_' | '0'..='9')) = self.0.peek() {
            ident.push(c);
            self.0.next();
        }
        Token::Identifier(ident)
    }
}

impl<'a> Iterator for Tokenizer<'a> {
    type Item = Token;

    fn next(&mut self) -> Option<Token> {
        let c = self.0.next()?;
        match c {
            '0'..='9' => Some(self.collect_number(c)),
            'a'..='z' => Some(self.collect_identifier(c)),
            '+' => Some(Token::Operator(Op::Add)),
            '-' => Some(Token::Operator(Op::Sub)),
            _ => panic!("Carácter inesperado {c}"),
        }
    }
}

fn parse(input: &str) -> Expression {
    let mut tokens = tokenize(input);

    fn parse_expr<'a>(tokens: &mut Tokenizer<'a>) -> Expression {
        let Some(tok) = tokens.next() else {
            panic!("Fin de entrada inesperado");
        };
        let expr = match tok {
            Token::Number(num) => {
                let v = num.parse().expect("Número entero de 32 bits no válido'");
                Expression::Number(v)
            }
            Token::Identifier(ident) => Expression::Var(ident),
            Token::Operator(_) => panic!("Token inesperado: {tok:?}"),
        };
        // Analiza la operación binaria, si procede.
        match tokens.next() {
            None => expr,
            Some(Token::Operator(op)) => Expression::Operation(
                Box::new(expr),
                op,
                Box::new(parse_expr(tokens)),
            ),
            Some(tok) => panic!("Token inesperado: {tok:?}"),
        }
    }

    parse_expr(&mut tokens)
}

fn main() {
    let expr = parse("10+foo+20-30");
    println!("{expr:?}");
}
```

language&>es-ES<&