import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';
import dayjs from 'dayjs';

const mockDataSource = {
  address: 'Test Address',
  createdAt: dayjs().toString(),
};

const mockMutate = jest.fn();
const mockCommentId = 'test-comment-id';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer dataSource={mockDataSource} commentId={mockCommentId} mutate={mockMutate} />);
    expect(screen.getByText('Test Address')).toBeVisible();
  });

  it('displays the correct time in Tooltip', () => {
    render(<Footer dataSource={mockDataSource} commentId={mockCommentId} mutate={mockMutate} />);
    expect(
      screen.getByText(dayjs(mockDataSource.createdAt).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeVisible();
  });

  // Add more tests as needed
});
