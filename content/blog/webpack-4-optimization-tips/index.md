---
title: Webpack 4 Optimization Tips
date: '2019-06-10T12:00:00.00Z'
description: 'Saving up few precious seconds of your development time as well as for your users in production can be a tricky business.'
---

![Banner](./banner.jpeg)

Saving up few precious seconds of your development time as well as for your users in production can be a tricky business. There are different scenarios you should consider before jumping into your first move but with right tools and tricks in your sleeves to start with, optimizing your application can leave you with a pleasant impression and a fun journey.

## Tracking Tools

You need tools to help you with tracking the current status and performance of your application and to help you decide what are the necessary optimizations you need to consider.

[**Webpack Bundle Analyzer**](https://www.npmjs.com/package/webpack-bundle-analyzer)

Webpack Bundle Analyzer will create an interactive tree map visualization of the contents of all our bundles.

This tool will help you identify what bundles make up the most of your application. It will also help you check what module got there by mistake and what are the modules that are being used redundantly.

[**Google Lighthouse**](https://developers.google.com/web/tools/lighthouse)

Google Lighthouse is an open-source, automated tool for improving the quality of the web pages.

This tool will help you audit the performance, accessibility, search engine optimizations, progressive web app support and other best practices.

Lighthouse will not require the application to be deployed first before it can be audited because it works perfectly offline during development.

You can either use Lighthouse via Chrome DevTools in Audit tab or install the [Lighthouse ](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)chrome extension.

[**Speed Measure Plugin**](https://www.npmjs.com/package/speed-measure-webpack-plugin)

Speed Measure Plugin is a Webpack extension that will help you measure the speed of individual loaders and plugins in your Webpack configuration during build time.

[**Chunk Naming**](https://webpack.js.org/guides/code-splitting/)

Naming your chunks can help you identify which chunk has more size than what it is supposedly be. This will help you decide whether you need to lazy load components that greatly contributes to the size issue.

## Improve Build Time

Build time, especially during development mode, takes up a lot of time for developers and can be frustrating at times if not most of the time. With these tools, you can save up precious seconds of your time.

**Worker Pool**

`thread-loader` is a loader that runs other following loaders in a worker pool. These workers(threads) are useful for performing CPU-intensive Javascript operations. With `thread-loader` you can specify the number of workers, the number of jobs each workers will have in parallel. Use thread-loader on top of other loaders and avoid using this loader on top of sass-loader because it can cause complication process to freeze.

**Persistent Cache**

`cache-loader` allows to cache the results of the following loaders on disk.

`thread-loader` combine with `cache-loader` really worked out great and because these loaders requires extensive CPU usage, only use them on expensive loaders.

## Production Optimizations

With the advent of Webpack 4, is it now easy to optimize your app for production. Webpack introduced the `mode` option which accepts either 'development' or 'production'. In 'production' mode, you will have:

- minified bundles
- tree-shaking (if you import/export modules in ES6 manner)
- lighter weight source maps

Check out default options on each mode [here](https://webpack.js.org/configuration/mode/).

**Split Chunks**

You might have a scenario where you have two big UI frameworks like MaterialUI 1 and MaterialUI 2 in your codebase and you don't have time yet to migrate to version 2.

You can configure your Webpack to have a separate chunk for MaterialUI modules from the rest of your node modules like this:

```js
...
splitChunks: {
    chunks: 'initial',
    cacheGroups: {
      material: {
        test: /[\\/]node_modules[\\/](@material-ui|material-ui)[\\/]/,
        name: 'vendor.material',
        enforce: true,
        priority: 90
      },
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        enforce: true
      }
  }
}
```

This configuration will then generate two vendor chunks namely: vendor.material.js and vendor.js.

You can further improve the configuration by separating the asynchronous code into a separate chunk. This will prevent code duplication between your vendor bundle and asynchronously generated bundles when you are leveraging React's router based dynamic import feature.

```js
...
splitChunks: {
  chunks: 'initial',
  cacheGroups: {
    material: {
      test: /[\\/]node_modules[\\/](@material-ui|material-ui)[\\/]/,
      name: 'vendor.material',
      enforce: true,
      priority: 90
    },
    vendor: {
      name: 'vendor',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      enforce: true
    },
    commonsAsync: {
      name: 'commons.async',
      minChunks: 2,
      chunks: 'async',
      priority: 0,
      reuseExistingChunk: true,
      minSize: 10000
    }
  }
}
```

**Minifying CSS**

Webpack deprecated ExtractTextWebpackPlugin in favor or MiniCSSExtractPlugin. This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.

Some of the features are:

- Async loading
- No duplicate compilation
- Easier to use
- Specific to CSS

With that, every time we navigate between pages in our application, the css and js file is also asynchronously loaded for that page. The problem is that this plugin does not come with a pre-built minification of those css files. In order for us to minify those files we need a separate plugin called [OptimizeCSSAssetsPlugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) which is straightforward to use.

**Trim down Moment.js**

Moment.js is a good date manipulation library which are being used by most of the application nowadays. Each locale in moment.js are being imported by default that is why this library can be cumbersome to use. We can trim down those locales and use only what we need.

```js
new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr|de/);
```

** Import Lodash Properly **

Utility libraries like Lodash and Underscore.js are useful but they too can be a suspect of your huge vendor bundle size. Make sure you are only using either of them and import them properly. Follow this [article](https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark) if you want to properly import Lodash modules.

**Compression**

Compression is a way of serving assets with `Content-Encoding` on the response header. There are many options for us to compress our assets. The popular one is Gzip compression but [Brotli](https://en.wikipedia.org/wiki/Brotli) compression algorithm offers compression superior to gzip. Brotli compression can shave off up to 25% more bytes than Gzip. You can either use [compression-webpack-plugin](https://webpack.js.org/plugins/compression-webpack-plugin) or [brotli-webpack-plugin](https://github.com/mynameiswhm/brotli-webpack-plugin) which is heavily copy-pasted webpack compression plugin with a little juice.

---

In conclusion, when it comes to optimization, always measure first and then optimize. Optimization is an open-ended game. You could spend a month on an optimization problem and gain a few milliseconds of your app performance. You might also compromise other aspects of your app so you must be able to justify the costs of doing so.
