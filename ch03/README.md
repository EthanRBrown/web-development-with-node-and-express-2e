# Chapter 3 Examples - Web Development with Node and Express, 2nd Edition

## Meadowlark Travel Website

In these examples, we establish the basic framework for what will become the Meadowlark Travel website, served by Express and templated with Handlebars.

### Setup

All of the examples in this chapter have Node module dependencies (`express` and `express-handlebars`).  These dependencies are listed in the _package.json_ file.  However, when you first clone this repo, you won't have them installed (_package.json_ is simply a manifest).  To install them, simply run:

```
npm install
```

### Example 0

Minimal example; uses Express, but doesn't do very much.  To run:

```
node 00-meadowlark
```

Then visit _http://localhost:3000_ in your browser.

### Example 1

This example adds basic routing, for the home page and the "About" page.  To run:

```
node 01-meadowlark
```

Then try the following URLs:

* _http://localhost:3000_
* _http://localhost:3000/about_
* _http://localhost:3000/nope_

### Example 2

Example two uses Handlebars templates (_views/*.handlebars_) and a layout file (_views/layouts/main.handlebars_), as well as `express.static` to serve static files (like images) from the _public_ directory.  To run:

```
node 02-meadowlark
```

Then try the following URLs:

* _http://localhost:3000_
* _http://localhost:3000/about_
* _http://localhost:3000/nope_

### Example 3

This example (not referenced in the book, but corresponding to the section "Dynamic Content in Views") demonstrates a very simple "fortune cookie" example on the about page (see _03-meadowlark.js_ and _views/about.handlebars_).  To run:

```
node 03-meadowlark
```

Then try the following URLs:

* _http://localhost:3000_
* _http://localhost:3000/about_
* _http://localhost:3000/nope_
