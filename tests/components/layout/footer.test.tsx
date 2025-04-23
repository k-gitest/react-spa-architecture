import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

describe('Footer Component', () => {
  it('フッターがレンダリングされること', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('著作権テキストが表示されること', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} copyrights. All rights reserved.`)).toBeInTheDocument();
  });

  it('className が適用されていること', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('text-center');
    expect(footerElement).toHaveClass('px-5');
    expect(footerElement).toHaveClass('py-5');
  });

  it('テキストの色が gray-500 であること', () => {
    render(<Footer />);
    const paragraphElement = screen.getByText(/©/);
    expect(paragraphElement).toHaveClass('text-gray-500');
  });
});