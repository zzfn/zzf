export default {
  '*.{js,ts,tsx}':["eslint --cache --cache-location .next/cache/eslint/ --fix"],
  '*.(scss|css)': 'stylelint --fix',
  '*.{js,ts,tsx,scss,css}': 'prettier --write',
};
