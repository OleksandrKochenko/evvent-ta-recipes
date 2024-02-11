# Recipes API

REST API for Recipes application, that provides CRUD operations for recipes and user authorization

## Table of Contents

- [Introduction](#introduction)
- [Description](#description)
- [Get Started](#get-started)
- [Technologies](#technologies)
- [Dependencies](#other-dependencies)
- [Comments](#comments)
- [Links](#links)

## Introduction

This project aims to create a simple and functional REST API server (Back End) for Recipes application. <br/>

It includes:

- user authorisation section, that allows to register, login and logout user
- recipes section, that allows to create, fetch, update or delete recipes <br/>

Full functionality is provided in [API documentation](https://api-recipes-sigma.vercel.app/)

## Description

With this REST API you can make GET, POST, PUT and DELETE requests with following functionality:

- register a new User
- login / logout User
- get data of current User
- get a list of Categories, by which Recipes are divided
- get a list of Ingredients according to query parameter (by name)
- get a list of Recipes from DB according to query parameters (page, by category, by title, by ingredient)
- get or delete Recipe by id
- create a new Recipe by an authorized user (available to add image of the Recipe)
- get a list of Recipes of an authorized user (my Recipes)
- get a list of favorite Recipes of an authorized user
- add / remove Recipe to the list of favorite Recipes of an authorized user

All POST, PUT and DELETE requests pass through different validations.
Detailed description of API documentation you can find on https://api-recipes-sigma.vercel.app/

## Get started

### Using web-service:

1. Go to the deployed server on https://api-recipes-sigma.vercel.app/
2. Ready to test. You can test the API using Postman or directly from the Swagger Docs page.
3. Use https://api-recipes-sigma.vercel.app/ as Base URL for creating your frontend application

### Using GitHub repository to run locally in development mode

1. Go to https://github.com/OleksandrKochenko/evvent-ta-recipes/
2. Clone repository
3. Set dependencies `npm install`
4. Add environment variables to the **.env file** according to the template in **.env.example**
5. Run app on dev mode `npm run dev`<br/> Your server runs on http://localhost:4000 (Available to update)

Use [Links](#links) to test the app on web-service with Swagger API documentation.

## Technologies

For this project were used:

- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript
- Vercel - for deployment

## Other dependencies

- multer - for file upload
- cloudinary - cloud image storage
- jsonwebtoken - JWT implementation
- bcryptjs - password hashing
- joi - request body validation
- cors - available cross-domain requests
- dotenv - available environment variables
- morgan - format logging
- swagger-ui-express - for API documentation with live test

## Comments

- You can use Postman to test API requests or do dhis directly from Swagger Docs page (Try it out)
- You can choose servers to test:
  - http://localhost:4000 (if you run it locally)
  - https://api-recipes-sigma.vercel.app/ (using web service)

## Links

- https://api-recipes-sigma.vercel.app/ - link for API Docs with live test
- https://github.com/OleksandrKochenko/evvent-ta-recipes/ - Git Hub repository of app
- https://www.linkedin.com/in/oleksandr-kochenko/ - profile on LinkedIn
- https://oleksandrkochenko.github.io/CV-Kochenko/CV - CV

![ua](https://github.com/OleksandrKochenko/dZENcode-test-assignment/assets/121250212/c9fd2a05-66ed-47d6-8c69-5efe10f09dcf) Stand with Ukraine!

[Copyright (c) 2024 Oleksandr Kochenko](./LICENSE)
