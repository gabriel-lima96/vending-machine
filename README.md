# Vending Machine 💰

## Challenge 🦾

- [X] A coin is added when a number is written to the standard input. The acceptable coins are 0.01, 0.05, 0.10, 0.25, 0.50 and 1.00.
- [X] To request a product the user should write COKE, CHOCOLATE or POPCORN. Each one has a price, a coke is $2.00, a chocolate is $1.50 and popcorns are $5.00.
- [X] After buying a product the system should provide a change.
- [X] The system should check for valid coins during the insertion.
- [X] The system should also validate if the money inserted on the vending machine is enough to buy a product.

### Extra 🦿

- [X] The machine should have a limited amount of products
- [X] The machine should store a stack for each coin type
- [ ] It should have a stateful experience, keeping the amount of products and coins inside the machine between each execution
  - [ ] In case it keeps state, it should have admin commands to restock products and remove coins 

## Input example 🤖

\>0.25 <kbd>ENTER</kbd>  
Ok

\>1.00 <kbd>ENTER</kbd>  
Ok

\>1.00 <kbd>ENTER</kbd>  
Ok

\>COKE <kbd>ENTER</kbd>  
Ok, Change is 0.25

## Requirements 🔒

You need NodeJS to run this software. If you use VSCode with Docker, there is already a .devcontainer in the project, so you can run the software through the the terminal of VSCode in Docker.

If you need to install NodeJS you can learn more from the [official website](https://nodejs.org/en/download/). You can use the installer or the binary.
If you choose the binary version, just drop it in the root of the project and run everything with `.node[.exe] <command>`, `.npm[.cmd] <command>` (may change depending on the OS).

### Installing ✨

Run the following command:

```bash
npm i
npm run build
```

### Running 🏃

Run the following command:

```bash
node cli-bin.js
```
