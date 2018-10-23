const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;



module.exports = {

    module: {
        rules: [
            {
                test: /\.js$/, use: [
                    {
                        loader: "babel-loader",
                        options: {"presets": ["@babel/preset-env"]}
                    }
                ]
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: 'css-loader', options: {minimize: true, sourceMap: true}},
                        {loader: 'sass-loader', options: {sourceMap: true}},
                    ]
                })
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                    {
                        loader: "img-loader"
                    },

                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader'
                }
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            hash: false,
            title: 'My Awesome application',
            myPageHeader: 'Hello World',
            template: './src/index.html',
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false,
        })
    ],
    devServer: {
        contentBase: __dirname + "/src"
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    inline: true,
                    drop_console: true
                },
            },
        })]
    },


};