# Online SuperMarket
#### Angular - NodeJs - MongoDB

An online supermarket web application that was created as a self-service store selling food and groceries.  
The project was created for use with a local server.

The project is written using:

  - HTML5 + CSS3
    - HTML5 structure
    - Boostrap design
  - Client side:
    - Angular
      - [Angular Material Design](https://material.angular.io/)
  - Server side:
    - NodeJs
      - Using Express
      - RESTfull App
  - DataBase:
    - MongoDB
      - Design and creat Collections
      - Mongoose

#### Extras
- Entities in the system:
  -  Customer:
     - Full name
     - Email (username)
     - ID (also used as Primary Key)
     - Password
     - Address (city and street)
     - A customer can register, search (by product name), choose products, save a shopping cart, and place an order (as well as download and/ or print a receipt of the order).
  - Manager (there is only be one manager):
    - Full name
    - Role
    - Email (username)
    - ID (also used as Primary Key)
    - Password
    - A manager is the administrator and is responsible for all management of the system, including adding, or editing, products.
  - Categories (of products):
    - ID (also used as Primary Key)
    - Name of category
  - Product:
    - ID (used as Primary Key)
    - Product name
    - ID of category (Foreign Key)
    - Price
    - Image
  - Shopping cart:
    -  ID (used as Primary Key)
    -  ID of customer (Foreign Key)
    -  Date the shopping cart was created
  - Cart item: 
    -  ID (used as Primary Key)
    -  ID of product (Foreign Key)
    -  Quantity
    -  Price (price * quantity)
    -  ID of shopping cart (Foreign Key)
  -  Placement of an order:
     -  ID (used as Primary Key) 
     -  ID of customer (Foreign Key)
     -  ID of shopping cart 
     -  Total price
     -  City and street for delivery
     -  Date for delivery
     -  Date the order was created
     -  4 last digits of card number (payment)

- Each user (customer or manager) needs to log-in in order to view the online store.  
If they have not yet registered to the system, a registration link (that will lea to a 2-step registration form) is available.
- Once a customer is logged in, the homepage will present:
   - The amount of orders that have been made thus far.
   - The total number of products that are available in the store.
   - The following message:
      - If the user currently has an "open cart" that they never placed the order/ delivery for, a message of "currently open saved cart", the date and current total price will be presented.
      - If the user does not have an open cart, the last date they placed an order will be presented.
      - If they are a newly registered user, a welcome message will be presented.
-  The store's page (upon logging in) includes the various categories as well as the products within them. 
   -  If a customer is logged in, an option for a shopping cart is presented.
The user has the option to "minimize" the cart side-view in order to widen the products' view.
   -  If a manager is logged in, an option for editing, or adding, products is presented (upon clicking on a product, its details will be presented with editing options).
- In the event that the customer closed the browser *before* finishing the order, the cart will show *as is* the next time the user opens the web application (use of session).
- When the user is ready to place an order: 
In the event that 3 orders have already been placed for a specific date, that date would not be available for delivery. 

#### Installation:

This project requires a source code editor, I used [Visual Studio Code](https://code.visualstudio.com/), to run the following: 
- [Angular](https://angular.io/): 
> "A JavaScript-based open-source front-end web application framework...for developing single-page applications." 
- [NodeJs](https://nodejs.org/):
> "An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser."
- Before running the project, make sure to install (though a command prompt of your choice):
```sh
npm install @angular/cli -g
```
- Be sure to install the node_modules that are missing or need to be updated (both for client side as well as server side):
```sh
npm install
``` 
- In order to run the project (**using proxy**), please use the following command line to run the client end, as well as the back end, of the project:
```sh
nmp start
``` 
- In order to run both ends of the project simultaniously, I used Chrome plug-in [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

- For the database, I used [MongoDB and Compass](https://www.mongodb.com/products/compass).  
After the download, make sure to install MongoDB (though a command prompt of your choice):
```sh
npm install mongodb --save
```
Then, install [Express Application Generator](https://expressjs.com/en/starter/generator.html) (*"An application generator tool to quickly create an application skeleton"*):
```sh
npm install express-generator -g
```
Be sure to also install [Mongoose](https://mongoosejs.com/) (*"A MongoDB object modeling tool designed to work in an asynchronous environment."*):
```sh
npm install mongoose
```
You will notice in the "app.js" file, a "mongoose.connect('...')" line with the database's name.  

Now, open a folder in your C:\ drive for the database to connect to (I called mine "mongodata") and write in the following command line (according to your downloaded version of MongoDB):
```sh
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\mongodata"
```
Leave it running in the background.

In order to view an already-in-use example of the project, please upload the following to the Compass database:
  - Database name: "onlineSuperMarket"
  - Collection "accounts.json"
  - Collection "categories.json"
  - Collection "products.json"
Create:  
  - Collection "carts.json"
  - Collection "orders.json"

Be sure to view the API Documentation for the various existing log-in details and page routes. 


 
