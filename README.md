# Ionic 4 with wordpress news website api example

This example is the ionic 4 with angular 7 integrated with wordpress. It contains a set of different custom components and a simple http call.


## Getting Started

To begin using this template, choose one of the following options to get started:
* [Download the latest release here](https://github.com/MohammedTA/ionic-wordpress/archive/master.zip)
* Clone the repo: `git clone https://github.com/MohammedTA/ionic-wordpress.git`
* Fork the repo

## Project Structure

```
.
 ├── resources                    # Build files on the specific platforms (iOS, Android) and app icon + splash
 ├── src                          # This is where the app lives - *the main folder*
 ├── .gitignore                   # Specifies intentionally untracked files to ignore when using Git
 ├── config.xml                   # Ionic config file
 ├── .ionic.config.json           # Global configuration for your Ionic app
 ├── package.json                 # Dependencies and build scripts
 ├── readme.md                    # Project description
 ├── tsconfig.json                # TypeScript configurations
 └── tslint.json                  # TypeScript linting options
```

### src directory
```
.
   ├── ...
   ├── src                       
   │   ├── app                    # This folder contains pages, compomemnts and services
   |   |     ├── pages                  # Contains all the individual pages (home, tabs, category, list, single-item)
   |   |     ├── services               # Contains the item-api service that retrieves data from the JSON file
   │   ├── assets                 # This folder contains images and the *data.json*
   |   ├── theme                  # The global SCSS variables to use throughout the app
   |   ├── declarations.d.ts      # A config file to make TypeScript objects available in intellisense
   |   ├── index.html             # The root index app file - This launches the app
   └── ...
```


## Start the project
The project is started with the regular ionic commands.

1. Run `npm install` to install all dependencies.
2. Run `ionic serve` to start the development environment.
3. To build the project run `ionic build android` or `ionic build ios`. In order for you to build an iOS app, you need to run on MacOS.

An alternative is to emulate the app on a device or upload it to the ionic cloud. From here you can download the ionic view app and use the app on all devices.

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/MohammedTA/ionic-wordpress/issues) here on Github.

## Copyright and License

Copyright 2019 MohammedTA. Code released under the [MIT](https://github.com/MohammedTA/ionic-wordpress/blob/master/LICENSE) license.
