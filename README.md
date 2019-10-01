# Events_REST-API
To use this API follow the following steps:
1. Clone repository
2. Run ``` npm install ``` in the cloned directory.
3. Run the server by using ``` npm start ```
4. The server is runnning on http://localhost:3000/

Now you need to install POSTMAN for testing the API ie. for making GET, POST, PATCH, DELETE requests to different API urls.

API urls:
-> For USERS
1. POST ```/user/signup``` will create user. Json data for credentials : ``` { "email" : String , "password" : String } ```
2. POST ```/user/login``` will create user. Json data for credentials : ``` { "email" : String , "password" : String } ```
this will fetch you a token which is to be used as a header for authorization of protected paths.
for authorization add following key value pairs in the header before execting the protected routes:
key = Content-Type & value = application/json ; key = Authorization value & value = 'Bearer' followed by token obtained (eg. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI1ZDhmNTYzZGRkOWJiMDQ1MDlmMmExMjQiLCJpYXQiOjE1Njk2ODI1MDQsImV4cCI6MTU2OTY4NjEwNH0.OmGwoD9sX5mUKWvp9EOVZmH_SLnz6gp77w58M9ZSA1U )

-> For EVENTS
1. GET ```/events``` will fetch all the events in the database and related info
2. POST ```/events``` will create an event. Data has to be sent in json format in the form : ``` { "name" : String , "price" : Number } ```
3. GET ```/events/:id``` will fetch events with input :id in the url.
4. PATCH ```/events/:id``` used to update an event details. Json data for updation to be provided in format : ```[{"propName" : "name" , "value" : "new_name"} , {"propName" : "price", "value" : "new price"}]``` if only one property needs to be updated, mention only one.
5. DELETE ```/events/:id``` used to delete event with given id.

Similarly for all ORDERS.


