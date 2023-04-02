---
title: "Learn some Rust"
description: "Slowly learning some rust"
date: "2023-03-28"
banner:
    src: "../../images/rust_programming_crab_sea.webp"
    alt: "First Markdown Post"
    caption: 'Rust Crab <u><a href="https://opensource.com/article/20/12/learn-rust">in the sea.</a></u>'
categories:
    - "Rust"
    - "Learning"
keywords:
    - "Rust"
    - "Note"
---

## Learn some rust

To install visit [here](https://www.rust-lang.org/learn/get-started).

Create a rust project by running

```
> cargo new learn_rust
```

The project structure

```
hello-rust
|- Cargo.toml
|- src
  |- main.rs
```

`Cargo.toml` == `package.json`

`cargo add ferris-says@0.2` == `npm install ferris-says@0.2`

`cargo build` == `npm i`

`cargo run` == `npm run start`

Let's skip the hello world since no one cares.

Following the rust [lang book](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html), we can build a guessing game.

```
use colored::*;
use rand::Rng;
use std::{cmp::Ordering, io};

fn main() {
    let mut s = String::new();
    let secret = rand::thread_rng().gen_range(1..100);

    loop {
        println!("Type your input");
        io::stdin().read_line(&mut s).expect("something's wrong");

        let guess: u32 = match s.trim().parse() {
            Ok(num) => num,
            Err(e) => {
                println!("{}", e);
                println!("Please type a number");
                continue;
            }
        };

        println!("your input is: {}", s);
        match guess.cmp(&secret) {
            Ordering::Less => println!("{}", "Too small, try something bigger.".red()),
            Ordering::Greater => println!("{}", "Too big, try something smaller.".red()),
            Ordering::Equal => {
                println!("{}", "You win!".green());
                break;
            }
        }
    }
}

```

There's something interesting here, `io::stdin().read_line(&mut s)` returns a type called `Result<..>`. I understand this as a sync version of
promise in JS. We can either just return the result (in this case the user input) with `expect` that acts like a `catch` or we can use `match` to
create "call back"s for `Ok` - a successful case and `Err` - a panic case.

One other thing is my code doesn't work well after the first input - whatever input comes after the first one will become invalid.

By taking a closer look, mine seems to put the buffer string outside of the loop and all the input will be appended to the string with a new line character.
So adding `s.clear()` in the first line of the loop fixed my code.
