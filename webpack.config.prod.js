const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let config = {
  mode: 'production',
  entry: {
    main: ['./src/stylesheets/app.scss', './src/scripts/main.js']
  },

  output: {
    path: path.resolve('./build'),
    filename: '[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  /*
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./fonts')
      ],
    },
  */
  module: {

    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.s?css/i,
        use: [

          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie > 8']
                }),
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(ico|jpg|mp4|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }

    ]
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",

    }),
    new CopyWebpackPlugin([
      { from: 'static' },
    ]),

    new ManifestPlugin(),

    new CleanWebpackPlugin(['build'], {
      root: path.resolve('./'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html'
    }),
    new VueLoaderPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),

    ]

  },


};

module.exports = config;

