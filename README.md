# Discord Bot

At the moment a very basic Discord bot written in Javascript using Node.js

## Roadmap

There isn't any roadmap yet, we don't even know what we're going to do with that thing.

 - [ ] Command x
 - [ ] Function y
 - [ ] Idea z
 - [ ] etc...

## Build

How to build the bot locally for development from the git repository.

Dependencies : 
Node.js 12.0 or newer.
Python 3

 - Clone the repository to your working directory
 `git clone https://github.com/m4dh4t/DiscordBot.git`
 - Navigate to the DiscordBot folder and install the required node modules as administrator
 `npm install discord.js enmap better-sqlite-pool better-sqlite3`
 - Fill in the following variables in the `config.init.json` file: `mainPrefix`, `token` and `ownerId`. 
 - After setting it up, rename `config.init.json` to `config.json`
 - Now, simply start the bot by running `node .` and enjoy !
