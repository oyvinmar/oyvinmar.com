# oyvinmar.com

[![Greenkeeper badge](https://badges.greenkeeper.io/oyvinmar/oyvinmar.com.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/oyvinmar/oyvinmar.com.svg?branch=master)](https://travis-ci.org/oyvinmar/oyvinmar.com)

Source code of my personal homepage

## Run local server

1. `npm install`
2. `export FOURSQUARE_TOKEN=XXX`
3. `export TWITTER_CONSUMER_KEY=XXX`
4. `export TWITTER_CONSUMER_SECRET=XXX`
5. `export TWITTER_ACCESS_TOKEN=XXX`
6. `export TWITTER_ACCESS_TOKEN_SECTRET=XXX`
7. `npm start`

## Deploy

1. `npm run build`
2. Commit changes
3. git push heroku `git subtree split --prefix dist master`:master --force
