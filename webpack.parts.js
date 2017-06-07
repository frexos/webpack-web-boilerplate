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
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});
exports.loadPUG = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.pug$/,
                loaders: ['file-loader?name=[path][name].html', 'pug-html-loader?pretty&exports=false']
            },
        ],
    },
});
exports.loadPUG = ({ include, exclude } = {}) => ({
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        })
    ],
});
