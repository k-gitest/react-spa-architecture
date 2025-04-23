import { render, screen } from '@testing-library/react';
import { MainWrapper } from '@/components/layout/main-wrapper';

describe('MainWrapper Component', () => {
  it('children prop がレンダリングされること', () => {
    const mockChildren = <div data-testid="child">Children Content</div>;
    render(<MainWrapper>{mockChildren}</MainWrapper>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('main 要素がレンダリングされること', () => {
    const mockChildren = <div data-testid="child">Children Content</div>;
    render(<MainWrapper>{mockChildren}</MainWrapper>);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('children prop が main 要素の子要素であること', () => {
    const mockChildren = <div data-testid="child">Children Content</div>;
    render(<MainWrapper>{mockChildren}</MainWrapper>);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toContainElement(screen.getByTestId('child'));
  });

  it('className が適用されていること', () => {
    const mockChildren = <div data-testid="child">Children Content</div>;
    render(<MainWrapper>{mockChildren}</MainWrapper>);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('w-full');
    expect(mainElement).toHaveClass('p-4');
  });

  it('children prop がない場合でもエラーが発生しないこと', () => {
    render(<MainWrapper />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement.childNodes.length).toBe(0);
  });
});