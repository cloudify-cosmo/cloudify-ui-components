const path = require('path');

module.exports = {
    collectCoverageFrom: ['./src/**/*.jsx', './src/**/*.js', '!./src/**/*.stories.jsx'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    moduleNameMapper: {
        '\\.css$': path.resolve(__dirname, '.jest/stub.js')
    },
    transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter)'],
    setupFiles: [path.resolve(__dirname, '.jest/register-context.js')],
    setupFilesAfterEnv: [path.resolve(__dirname, '.jest/enzyme.js')]
};
