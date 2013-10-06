#Installation

1. `node install`
2. `export FOURSQUARE_TOKEN=XXX`
3. `grunt server`

#Deploy

1. `grunt build`
2. Commit changes
3. git push heroku `git subtree split --prefix dist master`:master --force
