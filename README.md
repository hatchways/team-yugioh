# Calendy - Easy appointment booking and management

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

![dashboard]("https://github.com/hatchways/team-yugioh/blob/deployment/demo/dashboard.png")

![Scheduler]("https://github.com/hatchways/team-yugioh/blob/deployment/demo/scheduler.png")

Core developers:

- [Mathew](https://github.com/mattchx)
- [Nellie](https://github.com/WhoaNellie)
- [Taras](https://github.com/kozaktar)
- [Di](https://github.com/alvyjudy)

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

# Development and deployment

To start, navigate to the root of the project and run `yarn install`. (Please
use yarn 1 instead of the newly released Yarn 2).

To spin up front end development server, run `yarn workspace client run start`.

To spin up backend server in development mode, run
`yarn workspace server run dev`.

To build, run `yarn run build`. To serve the built project, run `yarn run build`.

Many of the services require credentials which are securely stored in each
developer's computer.
