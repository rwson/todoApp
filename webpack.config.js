module.exports = {
	entry: [
        "./main.js"
    ],
    output: {
        publicPath: './out/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel"},
            { test: /\.css$/, loader: "style!css"}
        ]
    }
};