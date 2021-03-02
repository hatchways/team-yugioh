# Calendy - Easy appointment booking and management

### Dashboard

![Screen Shot 2021-03-02 at 10 41 58](https://user-images.githubusercontent.com/55170649/109674836-3e1d4e80-7b45-11eb-9c12-ea8faff3ffaa.png)

This repository contains the source code for
[Calendy](https://calendy-team-yugioh.herokuapp.com/), the event scheduling
application created by a team of four developers following Agile
software development principles. It is a co-op project managed by [Hatchways Inc.](https://hatchways.io/co-op)

This application enables easy scheduling workflow that aims to replace the
traditional back and forth email and phone call confirming availability.
The application would generate a sharable link for you where others
can book appointments with you based on your predefined availability and
update it accordingly. It will collect the required contact information and
notify the attendee. As a host, you can easily see who have booked appointments
with you and even connect your Google Calendar for a more automated workflow.

Core developers:

- [Matthew](https://github.com/mattchx)
- [Nellie](https://github.com/WhoaNellie)
- [Taras](https://github.com/kozaktar)
- [Di](https://github.com/alvyjudy)

### Add new Event Type
![Screen Shot 2021-03-02 at 10 43 05](https://user-images.githubusercontent.com/55170649/109675315-ad933e00-7b45-11eb-9a0e-c738492fd2a4.png)

# Project architecture

The project is built on MERN stack, with integration for Google OAuth social
login, Stripe payment management, Amazon S3 storage bucket and Sendgrid
email notification.

It is split into separate frontend and backend, managed by Yarn workspace. In
development, the frontend client spins up a dev server that proxies API
request to the independently running backend server. The two are unified
upon deployment, where Heroku
node.js runtime runs the `build` script, which bundles the client javascript
into `dist` folder inside `server`, and then run `start` script to serve
the client side javascript as well as handle all API request. The above two
scripts are defined inside the top level `package.json` file.

### Onboarding
![Screen Shot 2021-03-02 at 10 41 18](https://user-images.githubusercontent.com/55170649/109675418-c996df80-7b45-11eb-9fb7-e02c1d57cf86.png)

![Screen Shot 2021-03-02 at 10 42 24](https://user-images.githubusercontent.com/55170649/109675452-d0255700-7b45-11eb-89ce-f0c70fd9802c.png)

![Screen Shot 2021-03-02 at 10 42 37](https://user-images.githubusercontent.com/55170649/109675468-d4ea0b00-7b45-11eb-8f4b-94148dabc433.png)

![Screen Shot 2021-03-02 at 10 42 46](https://user-images.githubusercontent.com/55170649/109675585-efbc7f80-7b45-11eb-8c27-7fcd91a6b0f1.png)

### Upgrade (Stripe API)

![Screen Shot 2021-03-02 at 10 44 15](https://user-images.githubusercontent.com/55170649/109675796-1b3f6a00-7b46-11eb-9d85-5eb7a3d14886.png)

![Screen Shot 2021-03-02 at 10 44 28](https://user-images.githubusercontent.com/55170649/109675887-2eead080-7b46-11eb-8019-15e4ec5c5c5e.png)

### Photo Uploader (AWS)

![Screen Shot 2021-03-02 at 10 45 30](https://user-images.githubusercontent.com/55170649/109675968-40cc7380-7b46-11eb-9762-2136be9d2cad.png)

### Mobile View

<img width="375" alt="Screen Shot 2021-03-02 at 10 46 39" src="https://user-images.githubusercontent.com/55170649/109676029-4fb32600-7b46-11eb-9de2-5b439886e6fc.png">

<img width="375" alt="Screen Shot 2021-03-02 at 10 46 46" src="https://user-images.githubusercontent.com/55170649/109676050-55a90700-7b46-11eb-91fb-1f5b68bcb747.png">


# Development and deployment

To start, navigate to the root of the project and run `yarn install`. (Please
use yarn 1 instead of the newly released Yarn 2).

To spin up front end development server, run `yarn workspace client run start`.

To spin up backend server in development mode, run
`yarn workspace server run dev`.

To build, run `yarn run build`. To serve the built project, run `yarn run build`.

Many of the services require credentials which are securely stored in each
developer's computer.
