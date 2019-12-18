const moduleResolverPlugin = [
    'module-resolver',
    {
        root: ['./src']
    }
];

module.exports = {
    plugins: [moduleResolverPlugin],
    presets: ['@babel/preset-react'],
    env: {
        test: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [moduleResolverPlugin, 'require-context-hook']
        }
    }
};
