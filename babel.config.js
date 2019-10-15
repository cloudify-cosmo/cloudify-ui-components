module.exports = {
    presets: ['@babel/preset-react'],
    env: {
        test: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['require-context-hook']
        },
        production: {
            ignore: ['**/*.stories.jsx']
        }
    }
};
