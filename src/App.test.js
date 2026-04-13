import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group and team members', () => {
  render(<App />);
  
  expect(screen.getByText(/Group 10/i)).toBeInTheDocument();
  expect(screen.getByText(/Vivek Patel/i)).toBeInTheDocument();
  expect(screen.getByText(/Babatunde Ogunnowo/i)).toBeInTheDocument();
  expect(screen.getByText(/Shogo Hardy/i)).toBeInTheDocument();
});