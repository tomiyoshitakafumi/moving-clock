import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './ex09/dist/caller.js',
    //htmlが出力されるがうまく表示されない
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'ex09/webpack'),
        clean: true,
    },
    mode: 'development',
    // ソースマップを出力する
    devtool: 'source-map'
};