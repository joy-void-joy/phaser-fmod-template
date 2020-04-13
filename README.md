This is a template/small demo for the use of [fmod](https://fmod.com) (interactive sound/music) in javascript (with [Phaser](https://phaser.io/phaser3))

Demonstration here: <http://whatisthis.world/fmodtest/>  
You can move with the arrows, the music changes based on what circle you're in
Music is taken from the example file of FMOD

How to use this project
===
```sh
npm install
npm start
```

This will start a webpack server with live reloading

If you want to build it for web:
```sh
npm run build
```

How to use FMOD in Javascript
===
While the process is documented on [FMOD](https://fmod.com/resources/documentation-api?version=2.1&page=platforms-html5.html), the informations are a bit hard to find.
Here is a recapitulation of the main points:

- First initialize FMOD with FMODule(FMOD)
- The FMOD object should contain a preRun function to preload all files (__This is important__. You will not be able to load any unpreloaded file otherwise)
- It should also contain a onRuntimeInitialized which allows you to interact with it. Do not access it outside of this function
- Before starting the game, load all banks. Do not forget Master.bank as it will allow you to play sound
- Then simply instance the event you need


Known issues
===

The audio is stuttering
---
The only way I have been able to reproduce it right now is through my bluetooth headphone set.
I do not know yet what is causing it, but it seems to be lagging behind and never able to catch up

The audio gets stuck when I switch tab
---
This is because the update in FMOD is in the update-phase of phaser
Since phaser freezes when you switch tabs, FMOD never gets 

Is there a plugin for this?
---
Do let me know if I should turn this into a plugin or write a similar template for wwise

