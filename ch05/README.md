# Chapter 5 Examples - Web Development with Node and Express, 2nd Edition

## QA: Unit Testing, Integration Testing, and Linting

This chapter covers unit testing, integration testing, and linting.  There is only one example that covers all of these topics, which have all been configured according to the content in Chapter 5.


### Setup

The example in this chapter has Node module dependencies (`express` and `express-handlebars`).  These dependencies are listed in the _package.json_ file.  However, when you first clone this repo, you won't have them installed (_package.json_ is simply a manifest).  To install them, simply run:

```
npm install
```

### Running

Minimal example; uses Express, but doesn't do very much.  To run:

```
node 00-meadowlark
```

Then visit _http://localhost:3000_ in your browser.

### Running Tests (Unit and Integration)

To run unit tests (see _lib/&#95;&#95;tests&#95;&#95;/handlers.test.js_) and integration tests (see _integration-tests/basic-navigation.test.js_):

```
npm test
```

To see how tests are configured, look at the `test` script in _package.json_.

### Test Coverage

To see test coverage, run:

```
npm test -- --coverage
```

### Linting

To lint the application, run:

```
npm lint
```
