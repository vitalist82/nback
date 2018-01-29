const CopyWebpackPlugin = require('copy-webpack-plugin');
const Path = require('path');

const outPath = Path.resolve(__dirname, 'dist');
const sourcePath = Path.resolve(__dirname, 'src');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: outPath
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/index.html" },
            { from: "./node_modules/react/umd/react.development.js" },
            { from: "./node_modules/react-dom/umd/react-dom.development.js" }
        ])
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