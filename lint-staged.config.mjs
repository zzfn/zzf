import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix --max-warnings=0 ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const config = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.(scss|css)': ['stylelint --fix', 'prettier --write'],
};

export default config;
