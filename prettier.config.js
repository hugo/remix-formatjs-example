module.exports = {
  printWidth: 80,
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.ts', '*.tsx'],
      options: {
        singleQuote: true,
      },
    },
    {
      files: '*.html',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
