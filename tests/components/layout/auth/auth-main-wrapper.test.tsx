import { render, screen } from '@testing-library/react';
import { AuthMainWrapper } from '@/components/layout/auth/auth-main-wrapper';

describe('AuthMainWrapper', () => {
  it('renders children inside a <main> element', () => {
    render(
      <AuthMainWrapper>
        <p>Test Content</p>
      </AuthMainWrapper>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveTextContent('Test Content');
  });

  it('has the correct className', () => {
    render(<AuthMainWrapper />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('w-full p-4');
  });
});
