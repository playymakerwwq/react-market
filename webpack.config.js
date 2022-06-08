const path = require('path');
module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [{
                test: [/\.css$/, /\.scss$/, ],
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" }, // to inject the result into the DOM as a style block
                    { loader: "css-modules-typescript-loader" }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    { loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                    { loader: "sass-loader" }, // to convert SASS to CSS
                    // process.env.NODE_ENV !== "production" ?
                    // "style-loader" :
                    // MiniCssExtractPlugin.loader,
                    // {
                    //     loader: "css-loader",
                    //     options: {
                    //         modules: true
                    //     }
                    // },
                    // "sass-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            // {
            //     test: /\.json?$/,
            //     exclude: /node_modules/,
            //     loader: 'json-loader'
            // }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.jpg', '.png'],
        alias: {
            // ...
            'react-dom$': 'react-dom/profiling',
        },
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
        // publicPath: '/public/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
};

// new webpack.DefinePlugin({
//     "process.env": {
//         NODE_ENV: JSON.stringify("development")
//     }
// })