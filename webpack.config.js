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
        },
        output: {
            path: PATHS.build,
            filename: '[name].js',
        },
        // plugins: [
        //     new HtmlWebpackPlugin({
        //         title: 'Webpack demo',
        //     }),
        // ],
        plugins: [
            new HtmlWebpackPlugin({
                // Required
                inject: false,
                // template: require('html-webpack-template-pug'),
                // template: '!!pug-loader!node_modules/html-webpack-template-pug/layout.pug'
                template: '!!pug-loader!app/index.pug',

                // Optional
                excludeJSChunks: 'style',	// don't include specific chunks in scripts (when .js is a byproduct of an already extracted .css)
                // excludeJSChunks: ['style1', 'style2']
                appMountId: 'app',
                mobile: true,
                title: 'My App'
                // Other html-webpack-plugin options...
            }),
        ]
    },
    parts.lintJavaScript({ include: PATHS.app }),
    // parts.loadPUG(),
    parts.loadJQUERY(),
]);

const productionConfig = merge([
    parts.extractCSS({ use: ['css-loader', 'sass-loader'] }),
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadSASS(),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};