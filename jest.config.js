const path = require('path');

module.exports = {
    collectCoverageFrom: ['./src/**/*.jsx', '!./src/**/*.stories.jsx'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    moduleNameMapper: {
        '\\.css$': path.resolve(__dirname, '.jest/stub.js')
    },
    transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter)'],
    setupFiles: [path.resolve(__dirname, '.jest/register-context.js')],
    setupFilesAfterEnv: [path.resolve(__dirname, '.jest/enzyme.js')]
};
