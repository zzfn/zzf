import path from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.(scss|css)': 'stylelint --fix',
  '*.{js,ts,tsx,scss,css}': 'prettier --write',
};
