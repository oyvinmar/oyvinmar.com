#Installation

1. `node install`
2. `export FOURSQUARE_TOKEN=XXX`
3. `export TWITTER_CONSUMER_KEY=XXX`
3. `export TWITTER_CONSUMER_SECRET=XXX`
3. `export TWITTER_ACCESS_TOKEN=XXX`
3. `export TWITTER_ACCESS_TOKEN_SECTRET=XXX`
3. `grunt server`

#Deploy

1. `grunt build`
2. Commit changes
3. git push heroku `git subtree split --prefix dist master`:master --force
