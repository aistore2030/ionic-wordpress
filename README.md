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
   |   |   ├── pages              # Contains all the individual pages (home, tabs, category, list, single-item)
   |   |   ├── services           # Contains the item-api service that retrieves data from the JSON file
   │   ├── assets                 # This folder contains images and the *data.json*
   |   ├── theme                  # The global SCSS variables to use throughout the app
   |   ├── declarations.d.ts      # A config file to make TypeScript objects available in intellisense
   |   ├── index.html             # The root index app file - This launches the app
   └── ...
```
## Features
1. **AdMob integration**: AdMob is Google’s mobile advertising platform that can be used to generate revenue from your app. If you choose Deco News, you will be able to earn money from your app by showing banner and interstitial ads.
2. **Dark & Light Mode**: All the screens included in this app template are available in both dark and light modes. Therefore, you can choose between the classic light interface, or dark, modern one which is especially popular in sports news apps.
3. **RTL support**: Ionic has always been a great framework for creating apps that use left-to-right (LTR) languages, because it was designed this way from the beginning. On the other hand, there are some languages used by millions which are read right-to-left (RTL), such as Arabic. To go the extra mile, we added RTL support to our Deco News app template.
4. **DeepLink**: Deep linking enables app developers to link to specific products or pages within apps. Deco News comes with a preinstalled plugin, which makes it easy to respond to deeplinks through custom URL schemes and Universal/App Links on iOS and Android.
5. **OneSignal push notifications**: Simply put, a push notification is a message that pops up on a mobile device. App publishers can send them at any time, and users don’t have to be in the app to receive them. Push notifications provide various benefits for app publishers such as promoting products or offers, improving user experience, driving users to other marketing channels etc. Building your own push notification delivery service can be complex and time-consuming, but with Deco News you will be able to effortlessly send push notifications to the users of your via OneSignal push notifications service.

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
