# bogota [![npm](https://img.shields.io/npm/v/bogota.svg)](https://npmjs.org/package/bogota) [![downloads](https://img.shields.io/npm/dm/bogota.svg)](https://npmjs.org/package/bogota) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![npm](https://img.shields.io/npm/l/bogota.svg)](LICENSE)
Concurrent tape/tap test-files runner with `tap-spec` output

## Global CLI Install

```
npm install -g bogota
```

### CLI Usage

```sh
$ bogota [test/**/*.js]
```
If no path(s) are specified, `bogota` will use `test*.js` `test/**/*.js` and `tests/**/*.js` as paths

## As a dev dependency

### Install
```
npm install -D bogota
```

### NPM test Usage

```json
{
  "name": "my-package",
  "scripts": {
    "test": "bogota tests/**/*.js"
  },
  "devDependencies": {
    "bogota": "^2.0.0",
    "tape": "^4.6.3"
  }
}
```

And then do `npm test`

## License

MIT. Copyright © [Diego Rodríguez Baquero](https://diegorbaquero.com)
