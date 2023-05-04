import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

describe('Home', () => {
  it('renders text', () => {
    async () => {
      render(<Home currentNumber={1} />);
      expect(screen.getByText('Product Line')).toBeInTheDocument();
      expect(screen.getByText('Next Stock Number')).toBeInTheDocument();
      expect(screen.getByText('Product Code')).toBeInTheDocument();
    };
  });
});
