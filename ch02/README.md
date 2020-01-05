# Chapter 2 Examples - Web Development with Node and Express, 2nd Edition

## Hello World

Demonstrates a classic, minimal Node application.  Express is nowhere to be found in these examples...this gives you a glimpse at what life would be like _without_ Express!

### Example 0

Minimal example; doesn't do very much.  To run:

```
node 00-helloworld
```

Then visit _http://localhost:3000_ in your browser.

### Example 1

This adds really basic routing.

```
node 01-helloworld
```

Then try the following URLs:

* _http://localhost:3000_
* _http://localhost:3000/about_
* _http://localhost:3000/nope_

### Example 2

This example demonstrates a web server that serves static files, in the form of HTML files (in _public_) and PNG image files (in _public/img_).

```
node 02-helloworld
```

Then try the following URLs:

* _http://localhost:3000_
* _http://localhost:3000/about_
* _http://localhost:3000/nope_

