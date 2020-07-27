const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({ mode }) => {
  return {
    mode,
    entry: './src/index.js',
    devServer: {
      host: '0.0.0.0',//your ip address
      port: 8080,
      disableHostCheck: true,
      proxy: {
        '/log': {
            target: 'http://localhost:3000',
            secure: false
        },
        '/images': {
            target: 'http://localhost:3000',
            secure: false
        }
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
      new CompressionPlugin({
        // asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new CopyPlugin({ patterns: [
        { from: "src/images", to: 'images' },
        { from: "src/manifest.json", to: '.' },
        { from: "src/offline.js", to: '.' },
        { from: "src/robots.txt", to: '.' },
      ]}),
    ],
    devtool: mode === 'development' ? 'source-map' : 'none' 
  };
};