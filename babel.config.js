const moduleResolverPlugin = [
    'module-resolver',
    {
        root: ['./src']
    }
];

module.exports = {
    plugins: [moduleResolverPlugin],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    env: {
        test: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [moduleResolverPlugin, 'require-context-hook']
        }
    }
};
