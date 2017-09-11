[![Build Status](https://travis-ci.org/lalalaio/interface.svg?branch=master)](https://travis-ci.org/lalalaio/interface)

# lalala.io Interface

This is the interface for lalala.io, the code that interacts with people. It currently uses [React](https://facebook.github.io/react/), [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), [PostCSS](http://postcss.org/), [ESLint](https://eslint.org/) with [Airbnb](https://github.com/airbnb/javascript) config, and [Jest](https://facebook.github.io/jest/) on [Travis](https://travis-ci.org/).

## Components and Containers

React components are split into "containers" and "components" directories. Everything in the components directory should be pure functions, with no state, only interface. Anything that needs state should be in containers, and include no interface directly, only components.
