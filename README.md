# SQL Weekend To Do App

## Description

This application allows a user to input their to-do list and manage all of the entries on a database. The user is able to add tasks, delete tasks, update task information, and mark tasks as complete. They are able to see and manage all of their tasks on the application.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Express
- body-parser
- jQuery
- pg

## Installation

1. Create sql database named weekend-to-do-app.

2. The queries in the `todo.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. The table should be set up as:
   CREATE TABLE todo (
   "id" serial PRIMARY KEY,
   "username" varchar(35) NOT NULL,
   "task" varchar(526),
   "task_completed" boolean);
4. Open up your editor of choice and run an `npm install`

## Built With

JavaScript
jQuery
SQL
Postgres
Node
Express

## License

[MIT]

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)
