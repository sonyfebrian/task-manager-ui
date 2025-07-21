import { render, screen } from '@testing-library/react';
import { CheckSquare } from 'lucide-react';
import { StatsCard } from '../StatsCard';
import {  describe, expect, it } from 'vitest';

describe('StatsCard', () => {
  const mockProps = {
    title: 'Total Tasks',
    value: 42,
    icon: CheckSquare,
    color: 'bg-blue-500',
  };

  it('renders title and value correctly', () => {
    render(<StatsCard {...mockProps} />);
    
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

 

  it('renders with different values', () => {
    render(
      <StatsCard
        title="Completed Tasks"
        value={15}
        icon={CheckSquare}
        color="bg-green-500"
      />
    );
    
    expect(screen.getByText('Completed Tasks')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});