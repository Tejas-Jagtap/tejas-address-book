
# Address Book

This project developed using NodeJs, ExpressJs.


## Running commands

1. To install dependencies, run the following command after downloading file

```bash
  npm install
```
2. Now connect your system to MongoDB Compass loacal database.
3. To run project, run following command
```bash
  npm run start
```
4. Then use Postman to send requests
  i. To Create User
  ```bash
  POST /users
```
  ii. To Login User
  ```bash
  POST /users/login
```
  iii. to Create contact in Address Book
  ```bash
  POST /contact
```
  iv. to Create users in Bulk
    (send array of users as request in postmen for bulk creation)
  ```bash
  POST /contacts
```
  v. to get given contact by id from Address Book
  ```bash
  GET /contact/<id>
```
  vi. for Phase result Matching (here "name" is used as phase)
  ```bash
  POST /contact/phase/<name>
``` 
  vii. to Get all Contacts using pagination(here you can give any value to limit and skip parameter)
  ```bash
  POST /contact?limit=<anyValue>&skip=<anyValue>
```
  viii. to Update given contact
  ```bash
  PATCH /contact/<id>
```
  ix. to Delete given contact
  ```bash
  DELETE /contact/<id>
```
  x. To get user JWT token
  ```bash
  GET /token
```
## Some Tips
* Only authenticated users are able Create, Delete and Update 
* So, first create user then login with it and then request for contacts


## Authors

- [@tejasjagtap](https://github.com/Tejas-Jagtap/tejas-address-book.git)

