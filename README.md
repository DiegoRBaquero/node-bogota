# bogota
Run tape tests in parallel with tap-spec output

## Global CLI Install

```
npm install -g bogota
```

### CLI Usage

```sh
$ bogota tests/**/*.js
```

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
    "bogota": "^1.0.0"
  }
}
```

And then do `npm test`

## License

MIT

Copyright © [Diego Rodríguez Baquero](https://diegorbaquero.com)
