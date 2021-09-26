# Vending Machine 💸

## Challenge

- [ ] A coin is added when a number is written to the standard input. The acceptable coins are 0.01, 0.05, 0.10, 0.25, 0.50 and 1.00.
- [ ] To request a product the user should write COKE, CHOCOLATE or POPCORN. Each one has a price, a coke is $2.00, a chocolate is $1.50 and popcorns are $5.00.
- [ ] After buying a product the system should provide a change.
- [ ] The system should check for valid coins during the insertion.
- [ ] The system should also validate if the money inserted on the vending machine is enough to buy a product.

### Extra

- [ ] The machine should have a limited amount of products
- [ ] The machine should have a limited amount for each coin
- [ ] It should have a stateful experience, keeping the amount of products and coins inside the machine between each execution
  - [ ] In case it keeps state, it should have admin commands to restock products and remove coins 

## Input example

\>0.25 <kbd>ENTER</kbd>  
<br/>
Ok

\>1.00 <kbd>ENTER</kbd>  
<br/>
Ok

\>1.00 <kbd>ENTER</kbd>  
<br/>
Ok

\>COKE <kbd>ENTER</kbd>  
<br/>
Ok, Change is 0.25

