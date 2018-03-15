# Expo push notificaton server

A simple node.js server to store user credentials in a MongoDB database and send notifications to them via a basic web interface.

It is the server-side implementation of [Expo push notifications](https://docs.expo.io/versions/latest/guides/push-notifications.html) in node.js for which Expo themselves provide an identical tool [here](https://expo.io/dashboard/notifications), without the user saving part.

It is based on the pretty extensive [hackathon-starter boilerplate](https://github.com/sahat/hackathon-starter) where some of the scaffold comes from, but most of its features have been removed for simplification purposes.

## Requirements

You'll need a running MongoDB instance for this to work. Otherwise, node won't know where to store the user data.

## Setup

This should be as easy as:

```
npm install
```

You may want to install [nodemon](https://github.com/remy/nodemon) for not having to constantly restart your server.

## Usage

`node app.js` or `nodemon app.js`

### Saving a new user

Send a POST request to `/user` with the following parameters:

- name: name of the user
- token: the exponent token that'll be used to send a push notification to a user
- email: email of the user (used as the unique identification key when triggering a push notification)

### Sending a push notification

Either go to the dashboard at `/` and click on "Send notification" or...

Send a POST request to `/api/notification/:email`, where `:email` is the email of the user you want to notify, with the following parameters:

- title
- message
