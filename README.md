# getting-started-lit-wc

A simple Hello World for LitElement.

## Quick start

```
npm install -g webpack-cli
git clone https://github.com/Eshwar4299/getting-started-lit-wc
cd getting-started-lit-wc
npm install
npm run dev
```

## Detailed setup info

* [Clone](#clone-this-repo)
* [Serve](#start-a-dev-server)
* [Setup](#set-up-new-app)
* [Build](#build-for-production-and-serve-locally)

### Clone this repo

```
git clone https://github.com/Eshwar4299/getting-started-lit-wc
```

### Start a dev server

```
npm install --save-dev webpack webpack-cli webpack-dev-server copy-webpack-plugin html-webpack-plugin
npm install --save-dev @webcomponents/webcomponentsjs
cd getting-started-lit-wc
npm install
npm run dev
```

### Set up new app without cloning

1. Create webpack.config.js, update below stuff:

```html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
 
module.exports = ({ mode }) => {
    return {
        mode,
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new CopyWebpackPlugin([
                {
                    context: 'node_modules/@webcomponents/webcomponentsjs',
                    from: '**/*.js',
                    to: 'webcomponents'
                }
            ])
        ],
        devtool: mode === 'development' ? 'source-map' : 'none'
    };
};
```

2. In package.json, copy the below code:

```html
  "scripts": {
    "dev": "webpack-dev-server --env.mode development",
    "dist": "webpack --env.mode production"
  }
```

3. Remember to update npm install for dependencies!

### Build for production and serve locally

Build your project and serve the build locally:

```
npm run dist // to run the build 
npm run dev // to serve your app locally
```

If you changed significant stuff (e.g. filenames, folder structure, installed other modules, etc), edit your webpack.config.json file to configure your build correctly.
