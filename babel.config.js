module.exports = {
  presets: [
    '@babel/preset-flow',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
}
