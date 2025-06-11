import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@/hooks/use-media-query';

const TestComponent = ({ query }: { query: string }) => {
  const isMatch = useMediaQuery(query);
  return <div>{isMatch ? 'Matched' : 'Not Matched'}</div>;
};

describe('useMediaQuery', () => {
  it('メディアクエリが一致するとtrueを返す', () => {
    render(<TestComponent query="(min-width: 768px)" />);
    expect(screen.getByText('Matched')).toBeInTheDocument();
  });

  it('メディアクエリが一致しない場合はfalseを返す', () => {
    render(<TestComponent query="(max-width: 500px)" />);
    expect(screen.getByText('Not Matched')).toBeInTheDocument();
  });
});
