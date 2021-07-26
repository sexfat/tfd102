const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const webpack = require('webpack');







module.exports = {
    entry: {
        main: './src/js/app.js', //chunks
        about: './src/js/app2.js' // chunks
    },               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name]-bundle.js'
    },// 出口文件
    module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 css > style
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './dist'
                }
            },
                // 'style-loader',//跟MiniCssExtractPlugin 會衝突所以要關掉
                'css-loader',
                'sass-loader'
            ],
        },
        //babel loader
        {
            test: /\.(js)$/,
            exclude: /(node_modules)/,

            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }],
            include: path.resolve(__dirname, 'src/js'),
        },

        ]

    },            // 處裡對應模組
    plugins: [
        //清理舊的檔案
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],  //選擇注入資源 chunk
            inject: 'body', //預設<body> js </body>  head or body
            template: './src/index.html',
            //來源
            filename: 'index.html'
            // 目的地
        }),
        new HtmlWebpackPlugin({
            chunks: ['about'],  //選擇注入資源 chunk
            inject: 'head', //預設<body> js </body>  head or body
            template: './src/aboutus.html',
            //來源
            filename: 'aboutus.html'
            // 目的地
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })

    ],
   //解決vue jquery 路徑
    resolve: {
        alias: {
           vue: 'vue/dist/vue.js'
        }
      },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 3300,
        // 指定首頁檔案
        index: 'index.html',
        open: true
    },         // 服務器配置
    mode: 'development'      // 開發模式配置 development  production
}