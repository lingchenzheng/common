const path = require('path')
const { rollup } = require('rollup')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const ts = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

const name = require('../package.json').name.substr(7)
function getPath() {
    return path.resolve(__dirname, '..', ...arguments)
}

const inputConfig = {
    input: getPath('index.ts'),
    plugins: [
        nodeResolve(),
        commonjs(),
        ts(),
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
    external(id) {
        return /^vue/.test(id)
    }
}
const outputConfig = [
    {
        file: getPath(`dist/${name}.cjs.js`),
        format: 'cjs',
        export: 'auto'
    },
    {
        file: getPath(`dist/${name}.esm.js`),
        format: 'esm'
    }
]

const build = async () => {
    const bundle = await rollup(inputConfig)
    for (let conf of outputConfig) {
        await bundle.generate(conf)
        await bundle.write(conf)
    }
}

build()
