import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import VoteCard from '../VoteCard';
import type { CardValue } from '../../types/session';

describe('VoteCard', () => {
  const defaultProps = {
    value: '5' as CardValue,
    selected: false,
    revealed: false,
    onClick: vi.fn(),
  };

  it('renders value if revealed', () => {
    render(<VoteCard {...defaultProps} revealed={true} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<VoteCard {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('has selected=true attribute when selected is true', () => {
    render(<VoteCard {...defaultProps} selected={true} />);
    const card = screen.getByTestId('vote-card');
    expect(card).toHaveAttribute('data-selected', 'true');
  });
});
