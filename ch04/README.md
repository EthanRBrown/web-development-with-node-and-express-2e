# Chapter 4 Examples - Web Development with Node and Express, 2nd Edition

## Using Node Modules

This chapter is mostly background information, so there's only one example in this chapter; taking the "fortunte cookie" functionality that was developed in Chapter 3, and placing it in a Node module.  See _lib/fortune.js_ and _meadowlark.js_.

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

Then visit _http://localhost:3000/about_ in your browser.
