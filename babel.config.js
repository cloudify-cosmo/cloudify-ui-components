module.exports = api => {
    const env = api.env();
    const testEnvironment = env === 'test';

    return {
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src']
                }
            ],
            testEnvironment && 'require-context-hook'
        ].filter(Boolean),
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
    };
};
