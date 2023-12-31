import { BuildOptions } from "./types/config";
import webpack from "webpack";
import path from 'path';
import { buildPlugins } from "./buildPlugin"; 
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;
    
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            clean: true //deletes previous js files
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(),
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}