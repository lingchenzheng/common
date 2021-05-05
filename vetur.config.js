module.exports = {
    settings: {
        'vetur.useWorkspaceDependencies': true,
        'vetur.experimental.templateInterpolationService': true
    },
    projects: [
        {
            root: './packages/vue-click-outside',
            package: './package.json',
            tsconfig: './tsconfig.json'
        },
        {
            root: './packages/shared'
        },
        {
            root: './packages/utf8'
        }
    ]
}
