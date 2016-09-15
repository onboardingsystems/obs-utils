# OBS Utils
[![CircleCI](https://circleci.com/gh/onboardingsystems/obs-utils.svg?style=svg)](https://circleci.com/gh/onboardingsystems/obs-utils)

NPM project to make sharing common javascript files between projects easier. Also supports versioning library changes.

## Using in another project

Installing the first time from the command-line. Note the "#v0.0.19" at the end specifies the version tag to use. If an update is desired, it must be explicitly changed as this github npm source technique doesn't support "^0.0.19" syntax.

`npm install --save git+ssh://git@github.com/onboardingsystems/obs-utils.git#v0.0.19`

On an existing application, just update the version tag in the `package.json` file and perform the `npm install` to have it updated.

## Running Test App

* `brunch watch --server` - runs on http://localhost:3333/


## Building a Release

* `npm test` - make sure all tests pass
* `npm run build` - will package it to the dist folder
* Everything must be committed by this point
* `npm version patch|minor|major` - to bump the (appropriate) version

This will create a git tag of the new version that needs to be pushed.

`git push origin v0.0.16`

Alternatively, you can push "all" the local tags to the server this way...

`git push origin --tags`

You can removed undesired local tags using below. Helpful if a version tag was created that had bugs and needed to be rebuilt but wasn't deployed or pushed.

`git tag -d v0.0.10`

## Breaking Changes

List of breaking changes moving from one version to another.
