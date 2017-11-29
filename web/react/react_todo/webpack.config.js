'use strict';
devtool : 'source-map';
const path = require('path');
module.exports = {
    entry: [
        "./src/entry.js"
    ],
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: "bundle.js"
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader!babel-loader?presets[]=react,presets[]=es2015", include: /src/},
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}       
        ]
    }
}