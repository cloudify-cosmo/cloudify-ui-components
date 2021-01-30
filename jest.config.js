// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const stubLink = path.resolve(__dirname, '.jest/stub.js');

module.exports = {
    collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}', '!./src/**/*.stories.{jsx,tsx}', '!./src/decorators/**'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    moduleNameMapper: {
        '\\.css$': stubLink,
        '\\.scss$': stubLink,
        '\\.png$': stubLink
    },
    transformIgnorePatterns: ['node_modules/(?!react-syntax-highlighter)'],
    setupFiles: [path.resolve(__dirname, '.jest/register-context.js')],
    setupFilesAfterEnv: [path.resolve(__dirname, '.jest/enzyme.js')]
};
