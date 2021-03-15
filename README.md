# School-Connected API

## Front-end Application  
Repository for the front-end application can be found [here]('https://github.com/oscar-valen115/school-connected')
Production Front-end: `https://oscar-valen115.github.io/school-connected`

You'll find below the different requests you can make with the API and how to interact:

### Authentication Events

|  Verb  |         URI            | Controller#Action |   Response Code     |
|--------|------------------------|-------------------|---------------------|
| POST   | `/sign-up`             | `users#signup`    |   `201 Created`     |
| POST   | `/sign-in`             | `users#signin`    |   `200 OK`          |
| PATCH  | `/change-password`     | `users#changepw`  |   `204 No Content`  |
| DELETE | `/sign-out`            | `users#signout`   |   `204 No Content`  |


|  Verb  |        URI             |   Controller#Action    |   Response Code     |
|--------|------------------------|------------------------|---------------------|
| GET    | `/courses`             | `users#getcourses`     |    `200 OK`         |
| GET    | `/courses/:id`         | `users#getacourse`     |    `200 OK`         |
| POST   | `/courses`             | `users#createcourse`   |    `201 Created`    |
| PATCH  | `/courses/:id`         | `users#updatecourse`   |   `204 No Content`  |
| DELETE | `/courses/:id`         | `users#deleteacourse`  |   `204 No Content`  |


Postman Collections with examples [here](https://www.getpostman.com/collections/6b6290e74eb5a4997ead)



