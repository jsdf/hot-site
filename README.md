# hot-site
a convention-over-configuration webpack dev server with hot module replacement,
to make spinning up new projects faster and less boilerplatey

## usage

```
npm install --save hot-site
```

`webpack.config.js`:
```js
var makeHotSiteConfig = require('hot-site/makeConfig');

module.exports = makeHotSiteConfig({
  // your webpack config here
});
```

`package.json`:
```json
{
  // ...
  "scripts": {
    "start": "hot-site"
  }
} 
```

```
npm start
open http://localhost:8080/
```

### opinionated setup: babel, css modules, react-transform-hmr

```
npm install --save babel-core@5.x babel-loader@5.x babel-plugin-react-transform react-transform-hmr style-loader css-loader
```

`webpack.config.js`:
```js
var makeHotSiteConfig = require('hot-site/makeConfig');

module.exports = makeHotSiteConfig({
  devtool: 'cheap-eval-sourcemap',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules",
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: 'node_modules',
      }
    ],
  },
});
```

`.babelrc`:
```js
{
  "stage": 0,
  "env": {
    "development": {
      "plugins": ["react-transform"],
      "extra": {
        "react-transform": {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }]
        }
      }
    }
  }
}
```