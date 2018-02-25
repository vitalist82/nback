const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require('path');

const isProduction = process.argv.indexOf('-p') >= 0;
const outPath = Path.resolve(__dirname, 'dist');
const sourcePath = Path.resolve(__dirname, 'src');
const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: ["core-js/fn/promise", "./src"],
    output: {
        filename: "bundle.js",
        path: outPath
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProduction ? "none" : "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            //{ test: /\.css?$/, loaders: ExtractTextPlugin.extract("css-loader") }

            { test: /\.scss?$/, use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        query: {
                            sourceMap: !isProduction
                          }
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/index.html" },
            { from: "./node_modules/react/umd/react.production.min.js" },
            { from: "./node_modules/react-dom/umd/react-dom.production.min.js" },
            { from: "./media/", to: "media" }
        ]),
        new ExtractTextPlugin("styles.css"),
        extractSass
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};