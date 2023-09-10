import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const dataSource: any = {
  id: '6972548384855035914',
  updateTime: '2022-10-11 13:54:56',
  createTime: '2021-05-13 17:23:16',
  logo: 'https://cdn.orluma.ltd/article/6972548384855035914/logo_1665413773511.jpg',
  title: '博客设计方案与实施',
  content: '',
  summary: '记录博客的技术架构',
  tag: 'other',
  orderNum: 1,
};
describe('Home', () => {
  it('renders a heading', async () => {
    // render(<HomeArticleCard dataSource={dataSource} />);
    // expect(await screen.findByText('博客设计方案与实施')).toBeVisible();
  });

  it('renders homepage unchanged', () => {
    // const { container } = render(<HomeArticleCard dataSource={dataSource} />);
    // expect(container).toMatchSnapshot();
  });
});
