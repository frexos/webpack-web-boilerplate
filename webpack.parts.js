var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        // hot: true,
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

                    use:
                        plugin.extract({
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

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => ([
            require('autoprefixer')(),
        ]),
    },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ['style-loader', 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve(__dirname, "/scss/includePath")
                        ]
                    },
                }],
            },
        ],
    },
});

exports.loadPUG = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.pug$/,
                include,
                exclude,

                loader: 'pug-loader',
            },
        ],
    },
});

// DECLARE JQUERY GLOBALLY

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

// UGLIFY JS

exports.minifyJavaScript = () => ({
    plugins: [
        new BabiliPlugin(),
    ],
});

// UGLIFY CSS

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

// CLEAN BUILD DIRECTORY BETWEEN BUILDS

exports.clean = (path) => ({
    plugins: [
        new CleanWebpackPlugin([path]),
    ],
});
