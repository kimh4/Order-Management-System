## README

Group 78, 
Hyun Kim & Linshengyi Sun

### Project Title
Blizzard Order Management System

## Project Description
Front end code is written in React.js.<br>
Back end code is written in Node.js.

Note: React Bootstrap and Material UI have been used for front end styling. Some additional styling has been done using CSS in javascript files.

### Project Pages

#### Orders
This is Home page. 

CREATE/READ/UPDATE/DELETE works.

Description:

CREATE: The user can add a new order by clicking "Add New Order" button. This will create a new row on the table with the Customer as Guest (null) and the datatime as the current UTC time.

READ: The existing/newly added data will appear on the Orders table.

UPDATE: customer_id can be updated on the Order Detail page. Customer can be nullable when the user select "Guest".

DELETE: An order can be deleted when the user clicks "Delete Entire Order" button on the Order Detail page.


Related files - home.js, helloworld.js, hometable.js

#### Order Details
This page is accessible when clicking the rows on the Orders table.

CREATE/READ/UPDATE/DELETE works.

Description:

CREATE: The user can add a new row into the order_games table with the Order Details form.<br>
*Note: Game Id(Game) can only be added once per order_id. If the user try to add a game that's already been added, the quantity will be added to the existing game.

READ: The existing/newly added data will appear on the Order Detail table.

UPDATE: The user can update a game's quantity by cliclking the "Edit quantity" button in the drop down menu on the table.

DELETE: The user can delete a game by clicking the "Delete" button in the drop down menu on the table.


Related files - orderdetail.js, orderdetailform.js, orderdetailtable.js

#### Customers
This page is accessible when clicking the "Customers" on the top menu.

CREATE/READ works. Plus, SEARCH works.

Description:

CREATE: The user can add a new customer with the Customers form.<br>
READ: The existing/newly added data will appear on the Customers table.<br>
SEARCH: The user can search using strings. The search result will appear on the table, and then the user can reset the table by clicking the "reset" button.


Related files - customer.js, customerform.js, customertable.js, searchform.js

#### Games
This page is accessible when clicking the "Games" on the top menu.

CREATE/READ works. Plus, SEARCH works.

Description:

CREATE: The user can add a new game with the Games form.<br>
READ: The existing/newly added data will appear on the Games table.<br>
SEARCH: The user can search using strings. The search result will appear on the table, and then the user can reset the table by clicking the "reset" button.

Related files - game.js, gameform.js, gametable.js, searchform.js

#### Backend Code

All backend code can be found in index.js file.

Related files - index.js, dbcon.js