import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

function getPath() {
    return path.resolve(__dirname, ...arguments)
}
const input = getPath('index.ts')
export default [
    {
        input,
        plugins: [
            nodeResolve(),
            commonjs(),
            ts({
                check: false,
                tsconfigOverride: {
                    declaration: false
                },
                tsconfig: './tsconfig.json',
                clean: true,
                cacheRoot: '../../node_modules/.cache/rollup-plugin-typescript2'
            }),
            getBabelOutputPlugin({
                plugins: [
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            helpers: true,
                            regenerator: true,
                            corejs: 3
                        }
                    ]
                ]
            })
        ],
        output: [
            {
                format: 'esm',
                file: getPath(`dist/${pkg.name.substr(7)}.esm.js`)
            },
            {
                format: 'cjs',
                file: getPath(`dist/${pkg.name.substr(7)}.cjs.js`)
            }
        ]
    },
    {
        input,
        output: {
            format: 'esm',
            file: getPath(pkg.types)
        },
        plugins: [dts()]
    }
]
