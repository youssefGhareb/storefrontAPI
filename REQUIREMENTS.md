# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## REST API Endpoints
#### Products
- Index [GET]
- Show (args: product ID in request body {JSON}) [GET]
- Create [*token required*] [POST]
    (args : [name, price]) 
    Example of request body {JSON}:
        {
            "name":"Jordan 1s",
            "price":"1000"
        }

#### Users
- Index [GET]
- Show (args: user ID in request body {JSON}) [GET]
- Create [*token required*] [POST]
    (args : [firstName, lastName, passowrd]) 
    Example of request body {JSON}:
        {
            "firstName": "John",
            "lastName": "Doe",
            "password": "123"
        }
-login [*token required*] [POST]
    (args : [firstName, passowrd]) 
    Example of request body {JSON}:
       {
            "firstname": "John",
            "password": "123"
        }

#### Orders
- Current Order by user (args: user id)[*token required*] [GET]
- Create [*token required*] [POST]
    (args : [user_id, status]) 
    Example of request body {JSON}:
        {
            "user_id": "21",
            "status": "pending"
        }
- Add product [*token required*] [POST] [localhost:3000/orders/add]
    (args : [order_id, product_id, quantity]) 
    Example of request body {JSON}:
        {
            "order_id": "2",
            "product_id": "10",
            "quantity": "4"
        }

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema

#### users

  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(50)  |           |          |
 lastname  | character varying(50)  |           |          |
 password  | character varying(100) |           |          |

#### products

 Column |          Type          | Collation | Nullable |               Default
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(150) |           |          |
 price  | real                   |           |          |

#### orders

 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer               |           |          |
 status  | character varying(10) |           |          |

[ForeignKey] : user_id references users(id)

#### purchases (junction table -> Orders || Products)

   Column    |  Type   | Collation | Nullable |                    Default
-------------+---------+-----------+----------+------------------------------------------------
 purchase_id | integer |           | not null | nextval('purchases_purchase_id_seq'::regclass)
 order_id    | integer |           |          |
 product_id  | integer |           |          |
 quantity    | integer |           |          |

[ForeignKey] : order_id references orders(id)
[ForeignKey] : product_id references products(id)



