# Chapter 6 Examples - Web Development with Node and Express, 2nd Edition

### Setup

The example in this chapter has Node module dependencies (`express` and `express-handlebars`).  These dependencies are listed in the _package.json_ file.  However, when you first clone this repo, you won't have them installed (_package.json_ is simply a manifest).  To install them, simply run:

```
npm install
```

### Echo Headers

This example demonstrates how an Express application can read headers sent from the client (browser) and echo them back.  To run:

```
node 00-echo-headers
```

### Disable "Powered By Express" Header

This example demonstrates how to disable the `X-Powered-By` response header (generally done for security purposes).  To run:

```
node 01-disabled-x-powered-by
```

### Basic Rendering

This example demonstrates basic rendering using a templating engine (Handlebars, in this case).  To run:

```
node 02-basic-rendering
```

### Response Codes Other Than 200

This example demonstrates sending response codes other than 200.  To run:

```
node 03-different-response-codes
```

### Rendering a View with Context

This example demonstrates how request handlers can pass context to a view for dynamic content.  This example demonstrates passing context data directly, from the querystring, from cookies, and from sessions.  To run:

```
node 04-view-with-content`
```

### View Without Layout

This example demonstrates rendering a page without using a template (giving the view full control over what's sent to the client).  To run:

```
node 05-view-without-layout
```

### View With Custom Layout

This example demonstrates using a custom layout.  To run:

```
node 06-custom-layout
```

### View With Plain Text Layout

This example demonstrates a response with a plain text (not HTML) response, bypassing the view system.  To run:

```
node 07-plaintext-output
```

### Error Handler

This example demonstrates the Express error handling mechanism.  To run:

```
node 08-error-handler
```

### Custom 404 Handler

This example demonstrates how to use a custom 404 (Not Found) handler.  To run:

```
node 09-custom-404
```

### Basic Form Procerssing

This example demonstrates basic form processing.  To run:

```
node 10-basic-form-processing
```

### More Robust Form Processing

This example demonstrates more robust form processing, demonstrating how you might handle persistence (database) failure, as well as using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).  To run:

```
node 11-more-robust-form-processing
```

### HTTP GET API Example

This example demonstrates a basic HTTP GET API response.  To run:

```
node 12-api-get
```

### HTTP GET API Example - Multiple Encodings

This example demonstrates an HTTP GET API response that respects the `Accept` header to respond in JSON, XML, or plain text.  To run:

```
node 13-api-json-xml-text
```

Note that you will have to use something like [Postman](https://www.getpostman.com/) or [curl](https://curl.haxx.se/) to get responses in different encodings.  If you use a browser, you will typically get the response in XML since `application/xml` appears in the `Accept` header in most browsers.

### HTTP PUT API Example

This example adds an HTTP PUT endpoint (in addition to the GET endpoint) that allows for modification of the data.  The data is stored in memory, and will be reset when the application is re-started (i.e. there is no persistence).  To run:

```
node 14-api-put
```

Note that you will have to use something like [Postman](https://www.getpostman.com/) or [curl](https://curl.haxx.se/) to try this example.

### HTTP DELETE API Example

This example adds an HTTP DELETE endpoint (in addition to the GET endpoint) that allows for deletion of the data.  The data is stored in memory, and will be reset when the application is re-started (i.e. there is no persistence).  To run:

```
node 15-api-del
```

Note that you will have to use something like [Postman](https://www.getpostman.com/) or [curl](https://curl.haxx.se/) to try this example.
