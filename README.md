# Rest API by Gerald Reyes

This is a RESTful API for Nodejs using Express and MongoDB
 

Two tables will be automatically created:

1) The user’s table (email, password, name and an array of post ids created by the user)

2) The posts table (title, imageUrl, content, and creator which refers to the user id that created the post)

The API has an auth middleware to check endpoints protected by auth.

JWT tokens are used to implement Auth.

Mongoose is used

The endpoints for the API are:

Signup

Login

Get posts (protected by auth)

Create a new post (protected by auth)

Get a specific post by Id (protected by auth)

Edit a post (protected by auth)

Delete a post (protected by auth)

## Installation

1) npm install

2) npm start 

you should see a message "DB Connected!" in the terminal

A new DB "nicaSource_GeraldReyes" will be created in the local Mongodb server localhost:27017


## Usage

This shows how to consume the endpoints, please remember to insert the token provided by the signin endpoint in the authorization header of the endpoints related to user posts

1) Signup 

curl -X POST \
  http://localhost:3000/user/signup \
  -H 'Content-Type: application/json' \
  -d '{
  "email":"gerhuete@gmail.com",
  "password":"1234567",
  "name":"gerald"
}'

2) Signin

curl -X POST \
  http://localhost:3000/user/signin \
  -H 'Content-Type: application/json' \
  -d '{
	"email":"gerhuete@gmail.com",
	"password":"1234567"
}'

3) Create a new Post

curl -X POST \
  http://localhost:3000/posts/ \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlcmh1ZXRlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDQ4MTJlZGY4M2RhMTZkYzAxMzU2YyIsImlhdCI6MTU3NDIwNzgzNywiZXhwIjoxNTc0MjExNDM3fQ.0TA-Yb7ddDSojOCNXTE9oLgw3gxcx6Fla_psmausgB0' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "My first post",
    "imageUrl": "https://homepages.cae.wisc.edu/~ece533/images/tulips.png",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}'

4) Get all posts 

curl -X GET \
  http://localhost:3000/posts \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlcmh1ZXRlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDQ4MTJlZGY4M2RhMTZkYzAxMzU2YyIsImlhdCI6MTU3NDIxNzQ1NCwiZXhwIjoxNTc0MjIxMDU0fQ.QsTZb7yAui5-NQPJjK-ucLkkF4QWUc1tJ4VyPV0RkdU' \

5) Get a specific post by Id

curl -X GET \
  http://localhost:3000/posts/5dd4824fdf83da16dc01356e \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlcmh1ZXRlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDQ4MTJlZGY4M2RhMTZkYzAxMzU2YyIsImlhdCI6MTU3NDIwNzgzNywiZXhwIjoxNTc0MjExNDM3fQ.0TA-Yb7ddDSojOCNXTE9oLgw3gxcx6Fla_psmausgB0' \

6) Edit a post

curl -X PUT \
  http://localhost:3000/posts/5dd4824fdf83da16dc01356e \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlcmh1ZXRlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDQ4MTJlZGY4M2RhMTZkYzAxMzU2YyIsImlhdCI6MTU3NDIxMzgyNCwiZXhwIjoxNTc0MjE3NDI0fQ.NWun67MTEhibHNorzAfaUwUoe9EDq7O_7hzqB57_dBg' \
  -H 'Content-Type: application/json' \
  -d '{
  "title":"my first post - updated",
  "imageUrl":"https://homepages.cae.wisc.edu/~ece533/images/peppers.png",
  "content":"This is my new updated content"
}'

7) Delete a Post

  curl -X DELETE \
  http://localhost:3000/posts/5dd4824fdf83da16dc01356e \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdlcmh1ZXRlQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVkZDQ4MTJlZGY4M2RhMTZkYzAxMzU2YyIsImlhdCI6MTU3NDIxMzgyNCwiZXhwIjoxNTc0MjE3NDI0fQ.NWun67MTEhibHNorzAfaUwUoe9EDq7O_7hzqB57_dBg' \
  -H 'Content-Type: application/json' \

