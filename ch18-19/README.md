# Chapter 18 and 19 Examples - Web Development with Node and Express, 2nd Edition

### Setup

The example in this chapter has Node module dependencies.  These dependencies are listed in the _package.json_ file.  However, when you first clone this repo, you won't have them installed (_package.json_ is simply a manifest).  To install them, simply run:

```
npm install
```

You will also need to rename `credentials.development.json.EXAMPLE` to `credentials.development.json`, and edit the values in that file to use your own API keys, etc.

### Persistence

Persistence is provided by MongoDB and Redis.  There is a `docker-compose.yml` file provided that will start both databases in Docker containers.  Make sure you have Docker [installed](https://www.docker.com/get-started).  Make sure your Docker daemon is running, then run the following in a separate window:

```
docker-compose up
```

If you prefer, you can set up MongoDB or Redis, or use an online service.  If you do so, you'll find the connection settings in `credentials.development.json.EXAMPLE`.

### Third-Party Dependencies

The examples in this folder use third-party dependencies (Google & Facebook APIs).  You will need your own API keys to run these examples, which can be set in `credentials.development.json`.

