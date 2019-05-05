const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const optimizedImages = require('next-optimized-images')

const dev = process.env.NODE_ENV !== 'production'

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

// AntD default style overrides
const lessConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
}

const optimizedImagesConfig = {
  svgo: {
    plugins: [{ minifyStyles: false }, { collapseGroups: true }, { cleanupIDs: false }],
  },
}

const webpackConfig = {
  webpack(config, options) {
    config.resolve.alias['src'] = path.join(__dirname, '/')
    return config
  },
}

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  distDir: '.next',
  target: 'serverless',
  ...optimizedImagesConfig,
  ...lessConfig,
  ...webpackConfig,
}

module.exports = withTypescript(optimizedImages(withLess(withCSS(nextConfig))))
