module.exports = {
  '*.{js,ts,tsx}': 'next lint --fix src',
  '*.(scss|css)': 'stylelint --fix',
  '*.{js,ts,tsx,scss,css}': 'prettier --write',
};
