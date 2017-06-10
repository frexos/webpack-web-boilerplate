var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename: '[name].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use: ['css-loader'],
                        fallback: 'style-loader',
                    }),
                },
                {
                    test: /\.scss$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [ plugin ],
    };
};

exports.lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',

                loader: 'eslint-loader',
                options,
            },
        ],
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});

// exports.loadPUG = ({ include, exclude } = {}) => ({
//     module: {
//         rules: [
//             {
//                 test: /\.pug$/,
//                 loader: ['file-loader', 'pug-html-loader'],
//             },
//         ],
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './app/index.pug'
//         })
//     ]
// });

// exports.loadPUG = ({ include, exclude } = {}) => ({
//     plugins: [
//         new HtmlWebpackPlugin({
//           // Required
//           inject: false,
//           template: '!!pug-loader!index.pug',
//           // Optional
//           appMountId: 'app',
//           mobile: true,
//           title: 'My App'
//           // Other options...
//         })
//       ]
// });


exports.loadJQUERY = ({ include, exclude } = {}) => ({
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
    ],
});
