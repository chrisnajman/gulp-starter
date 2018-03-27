# gulp-starter-project

This is the result of combining instructions from two tutorials:
1. [Using PostCSS Together with Sass](https://webdesign.tutsplus.com/tutorials/using-postcss-together-with-sass-stylus-or-less--cms-24591)
1. [CSS Tricks: Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/)

## Assumptions
* You know something about SCSS/SASS
* You know how to use the command line

*Note: all command line instructions are for Windows -- you'll have to google Mac commands if you need them.*

## Aim
The aim of **gulp-starter-project** is to start and develop small projects quickly, using a limited set of PostCSS and Gulp automation tools. 

More specifically, I want to be able to:
* compile SCSS files into CSS files,
* no longer have to add vendor prefixes to CSS properties,
* reduce media-queries code,
* minify and concatenate separate CSS and JS files,
* optimise image files,
* see changes in the browser window as I update CSS/JS/HTML files without having to refresh it,
* separate dev and build tasks

 -- all by typing two simple commands in the command line.


*Note: **gulp-starter-project** is **not intended for database-driven projects** e.g. Wordpress. If that's what you're looking for try [Gulp Boneus](https://github.com/chrisnajman/gulp-boneus) a Wordpress theme based on the 'Bones' theme and built with Gulp.*

## Use

### Setup
Before you can use **gulp-starter-project** you'll need to first install `node.js` and then `npm` (Node Package Manager). 

For help with this, [How to Install and Use Node.js and npm (Mac, Windows, Linux)](https://www.taniarascia.com/how-to-install-and-use-node-js-and-npm-mac-and-windows/) is a straightforward guide.

Once this is done, download the files to a new project folder on your machine, launch a command prompt, navigate to your new project folder then type `npm install`. This will load up Gulp, PostCSS, and their dependencies in a folder called 'node_modules'.

### `gulp watch`
Staying in the command line, type `gulp watch`. This watches the `app` folder for any changes you make to SCSS / HTML / javascript files. However, just by running the `gulp watch` command (not editing any files) it will:

* compile SCSS then create a CSS folder containing the CSS files (at app/css/),
* launch a browser on a virtual server (localhost:3000 in my case). 

Now, if you make any changes to `app` files the browser will immediately update to reflect those changes.

### `gulp build`
The `docs` folder is where the final version of the project will live. 

As you can see, there is no `docs` folder as yet.

To generate it, exit from `gulp watch` (`Control/CMD + C`), then type `gulp build`.

*Note: to view the contents of the docs folder in a browser you must navigate to the directory in the conventional way e.g. `localhost/myproject/...`*

## File Structure

`/gulpfile.js` includes packages from `node_modules` and contains tasks for processing files within `app`, and also for creating and populating the `docs` folder.

`/package.json` lists all packages.

`/package-lock.json` lists paths to packages.

`node_modules` contains all the packages.

The `/app` folder is used for development. 

Inside `/app` you will find:

* `index.html`  this contains some information about testing.
* `/scss` - test SASS files.
* `/js` - test Javascript files
* `/images`- test images.

The `/docs` folder is used for the published site. This will contain, after `gulp build` is run, a minified, cleaned-up version of `/app/...`.

*Note: You can rename these folders to anything you like, but if you do, you must replace any references to `app` or `docs` with your new names in `gulpfile.js`.*

## Finally
The `node_modules` folder takes up a lot of space on the hard drive. For this modest project it weighs in at size: 87.1mb / size on disk: 136mb.

Every new project will result in a comparable reduction of the available space on your machine.

Therefore, once your project is finished, I would recommend that you delete the `node_modules` folder. If you ever want to work on it again all you have to do is navigate to the project via the command line and type `npm install`.



