# Events_REST-API
To use this API follow the following steps:
1. Clone repository
2. Run ``` npm install ``` in the cloned directory.
3. Run the server by using ``` npm start ```
4. The server is runnning on http://localhost:3000/

Now you need to install POSTMAN for testing the API ie. for making GET, POST, PATCH, DELETE requests to different API urls.

API urls:
GET ```/events``` will fetch all the events in the database and related info
POST ```/events``` will create an event. Data has to be sent in json format in the form : ``` { "name" : String , "price" : Number } ```
GET ```/events/:id``` will fetch events with input :id in the url.
