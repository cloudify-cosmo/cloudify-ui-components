# Cloudify UI Components

[![npm](https://img.shields.io/npm/v/cloudify-ui-components.svg?style=flat)](https://circleci.com/gh/cloudify-cosmo/cloudify-ui-components)
[![CircleCI](https://img.shields.io/circleci/project/github/cloudify-cosmo/cloudify-ui-components.svg?style=svg)](https://circleci.com/gh/cloudify-cosmo/cloudify-ui-components)
[![jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand/badge/badge-storybook.svg)](https://github.com/storybooks/storybook)

This repository contains React components reusable across Cloudify UI applications.


## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Documentation](#documentation)
  * [Development](#development)
  * [Testing](#testing)
  * [Debugging](#debugging)
    + [Internal](#internal)
    + [External](#external)
  * [Deployment](#deployment)
    + [Useful links](#useful-links)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Installation

```npm
npm install cloudify-ui-components
```

## Usage

To use the package in your environment just import the component you need. For example:

```typescript jsx
import { ApproveButton } from 'cloudify-ui-components';

export function MyButton() {
    return <ApproveButton icon='play' />; 
}
```

## Documentation

Documentation of released versions can be found at `https://docs.cloudify.co/ui-components/<version>`.  

You can get the same [StoryBook](https://storybook.js.org/) documentation of the components locally by executing `npm run build-storybook`.

## Development

Development environment is set up to enforce good practices in JS development (static code analysis, style formatting, code test coverage check, visual regression testing). 

General guidelines for adding new components:
- add new code to `src/components` folder
- every exported component should be in separate folder 
- remember to export new files using `index.js`
- build: `npm run build` (production build) or `npm run storybook` (run [StoryBook](https://storybook.js.org/) with automatic rebuilding)
- test: `npm test` (static analysis, code style check, unit testing with [Jest](https://jestjs.io/en/) testing framework and coverage check) 
- use [prettier](https://prettier.io/) and [eslint](https://eslint.org/) during development
- document your code by providing general description for component at the top of the component definition and description for all component props ([StoryBook](https://storybook.js.org/) recognize [react-docgen](https://github.com/reactjs/react-docgen) format)
- write [StoryBook](https://storybook.js.org/) stories for every newly added component
- follow [Cloudify Brandbook](https://drive.google.com/file/d/1KimyHFey_AoK2nKopRoo_CK-emZs7Pr_/view) containing Cloudify Brand Guidelines

## Testing

There are few different types of tests in this package:

1. Static analysis and code style checks - `npm run lint`)
1. Unit tests - `npm run test:jest` (checks components logic)
1. Snapshot tests - `jest ./test/HtmlSnapshots.test.js` (checks components HTML structure)
1. Visual regression tests - `npm run test:loki` (run only in CircleCI and use `npm run test:loki:download` command to fetch tests outputs)

## Debugging

### Internal

You can debug components with use of [StoryBook](https://storybook.js.org/) application (`npm run storybook`) or Jest unit tests (`npm run test:jest`).

### External

If you want to develop/debug `cloudify-ui-components` from the package user side (eg. from [cloudify-stage](https://github.com/cloudify-cosmo/cloudify-stage)), then instead of using `cloudify-ui-components` package from NPM registry, you can:
 1. Use `npm link cloudify-ui-components <local-path-to-cloudify-ui-components>` command in your package user project,
 1. Build `cloudify-ui-components` project (see: [Development](#development) section), 
 1. Run package user project and see changes applied locally in `cloudify-ui-components`.   


## Deployment

Cloudify UI Components library is published in [NPM](https://www.npmjs.com) registry. See [cloudify-ui-components@npm](https://www.npmjs.com/package/cloudify-ui-components).

Cloudify UI Components uses the same mechanism as Cloudify UI Common repository for deployment. Check [Deployment section @ cloudify-ui-common](https://github.com/cloudify-cosmo/cloudify-ui-common#deployment) for details.

### Useful links

- [cloudify-ui-components @ CircleCI](https://circleci.com/gh/cloudify-cosmo/cloudify-ui-components)
- [cloudify-ui-components @ NPM](https://www.npmjs.com/package/cloudify-ui-components)
- [cloudify-ui-components releases](https://github.com/cloudify-cosmo/cloudify-ui-components/releases)
