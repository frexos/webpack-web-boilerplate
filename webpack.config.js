const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
            // app1: path.resolve(__dirname, "app/app.scss"),
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        node: {
            fs: 'empty'
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: '!!pug-loader!app/index.pug',
                excludeJSChunks: 'style',
                appMountId: 'app',
                mobile: true,
                title: 'My App',
            }),
        ],

    },
    parts.lintJavaScript({ include: PATHS.app }),
    parts.loadPUG(),
    parts.loadJQUERY(),
    parts.loadFonts({
        options: {
            name: '[name].[ext]',
        },
    }),
]);

const productionConfig = merge([
    parts.extractCSS({
        use: ['css-loader', 'sass-loader', parts.autoprefix()],
    }),

    {
        performance: {
            hints: 'warning', // 'error' or false are valid too
            maxEntrypointSize: 100000, // in bytes
            maxAssetSize: 450000, // in bytes
        },
    },

    parts.clean(PATHS.build),
    parts.minifyJavaScript(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            safe: true,
        },
    }),
    parts.loadImages({
        options: {
            // limit: 1000,
            name: './images/[name].[ext]',
        },
    }),

]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadSASS(),
    parts.loadImages(),

]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};