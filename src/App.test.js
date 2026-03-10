import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StoryForge landing page', () => {
  render(<App />);
  const title = screen.getByTestId('landing-title');
  expect(title).toBeInTheDocument();
});

test('renders enter studio button', () => {
  render(<App />);
  const button = screen.getByTestId('landing-enter-button');
  expect(button).toBeInTheDocument();
});

test('renders tagline', () => {
  render(<App />);
  const tagline = screen.getByTestId('landing-tagline');
  expect(tagline).toBeInTheDocument();
});