# What does this app do?
This app was designed as a fun way to stay engaged with working out.
It allows you to create a character and track your work outs, as you
add workouts, your character stats start to scale based on the type of workout, how long you did the activity for, and the class you picked at the start.

The client is located here: [client](https://github.com/skmidk/next-level-fitness-client)
[link to erd](https://imgur.com/a/G5guADu)

Verb	       URI Pattern  
POST	     /characters/:id/work-outs  
PATCH	     /characters/:id/work-outs/:commentid  
DELETE	   /characters/:id/work-outs/:commentid  
GET	       /characters  
GET      	/characters/:id  
POST	    /characters  
PATCH	    /characters/:id  
DELETE  	/characters/:id

## Installation

1. Fork and clone this repo
1. Install dependencies with `npm install`.
1. `git add` and `git commit` your changes.
1. Run the development server with `npm run server`.

## Technologies Used:

This application uses javascript, express, and mongoose.

## Unsolved Problems

I would like to be able to add a friend feature, so you can see your friends characters. I was also thinking about adding a leveling system and xp bar based on total number of minutes the character worked out, adding a stat boost to the player. I also need better characters, it was a struggle to find characters hitting all the classes, designed by the same artist, and for free.

## Planning:

For me, the planning process was definitely a joy, as a gamer myself, it was great to make a project that really resonated with me. My first concern was planning out the character classes and baseline stats to figure out what information I would want stored for the character. After that, it was a matter of picking the general theme for the website.

With this done, I moved onto completing the api with a few extra features so I had flexibility with creativity once I got into the front end.

When approaching the front end, I decided a more "cartoony" vibe was appealing, and set about trying to find characters and a background for them, picking color schemes for the classes, then built out a basic shell to hold all the information coming too and from the api. With this basic shell, I was then able to focus on making sure data transposed properly. After assuring that, I moved on to just styling to add a little more flair to the game, as well as some user conveniences such as total workouts being seen without having to open the character as a sort of "sudo-level" feature.

## Problem Solving:

Finding new problems tends to be my favorite as they lead to new solutions, and new ways of thinking. I can definitely say that I had my fair share of problems with this app at first. Sometimes it was my axios calls being slightly off, or missing a bracket somewhere. Other times it was utilizing new things I never tried before like how this api actually calculates equations on the work out create, edit, and update that access and change the characters stats. This lead to youtube tutorials, stack overflow, google, and a decent amount of coffee. Generally I will just make a new branch and start typing even if I do not fully understand the direction I am going with the code I'm writing to check what gets output or what changes, to better help myself understand how things work and what CAN be done.
