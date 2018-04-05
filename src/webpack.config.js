/**
 * 内置webpack4配置
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  mode: 'production',
  entry: {
    app: './app.js'
  },
  output: {
    path: path.resolve('.', 'dist'),
    filename: '[name].[hash:8].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /(node_modules)/,
      //include: path.resolve('src'),
      use: [{
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-env'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-2')],
          plugins: [
            [require.resolve('babel-plugin-transform-runtime'), {
              'helpers': false,
              'polyfill': true,
              'regenerator': true
            }]
          ]
        }
      }]
    }, {
      test: /\.txt$/,
      use: [{
        loader: require.resolve('raw-loader')
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: require.resolve('css-loader')
      }, {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: (loader) => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
              flexbox: 'no-2009',
              browsers: 'last 5 version'
            }),
            require('cssnano')()
          ]
        }
      }]
    }, {
      test: /\.less$/,
      use: [{
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: require.resolve('css-loader')
        }, {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({
                flexbox: 'no-2009',
                browsers: 'last 5 version'
              }),
              require('cssnano')()
            ]
          }
        },
        {
          loader: require.resolve('less-loader')
        }
      ]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
      use: [{
        loader: require.resolve('url-loader'),
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]',
          outputPath: 'images'
        }
      }, {
        loader: require.resolve('image-webpack-loader')
      }]
    }, {
      test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
      use: [{
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts'
        }
      }]
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.BannerPlugin({
      banner: 'build:uba hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve('.')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    new webpack.ProgressPlugin(),
    new webpack.optimize.RuntimeChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'vendor'
        },
        //打包第三方类库
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: Infinity
        }
      }
    })
  ]
};

module.exports = config;
