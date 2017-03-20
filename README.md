# OBS Utils

[![Build Status](https://semaphoreci.com/api/v1/onboarding-systems/obs-utils/branches/master/shields_badge.svg)](https://semaphoreci.com/onboarding-systems/obs-utils)



## Installation

Installing the first time from the command-line. Note the "#v0.0.19" at the end specifies the version tag to use. If an update is desired, it must be explicitly changed as this github npm source technique doesn't support "^0.0.19" syntax.

`npm install --save git+ssh://git@github.com/onboardingsystems/obs-utils.git#v0.0.19`

On an existing application, just update the version tag in the `package.json` file and perform the `npm install` to have it updated.



## Test App

The test app is a react app located at `test_app/app.js`  Run it using:

`brunch watch --server`

which will make it accessible at http://localhost:3334



## Building a Release

* `npm test` - make sure all tests pass
* `npm run build` - will package it to the dist folder
* Everything must be committed by this point
* `npm version patch|minor|major` - to bump the (appropriate) version
* `git push origin v0.0.16` to make the tag available or origin

You can push "all" the local tags to the server using `git push origin --tags` or delete a tag using `git tag -d v0.0.10`.



# Change Log

List of breaking changes moving from one version to another.

* 0.2.15
  * adds defaultValue option to textarea, text, and checkbox components
  * adds React.PropType checking to both value and defaultValue props on input and textarea based components
* 0.3.0
  * adds RadioGroup component which is now dependent on jQuery
