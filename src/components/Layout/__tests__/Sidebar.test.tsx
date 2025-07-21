import { render, screen, fireEvent, } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from '../Sidebar'; 

describe('Sidebar', () => {
  const mockOnTabChange = vi.fn(); 

  beforeEach(() => {
   
    mockOnTabChange.mockClear();
  });

  it('renders the sidebar title', () => {
    render(<Sidebar activeTab="tasks" onTabChange={mockOnTabChange} />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
  });

  it('renders both menu items', () => {
    render(<Sidebar activeTab="tasks" onTabChange={mockOnTabChange} />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    render(<Sidebar activeTab="tasks" onTabChange={mockOnTabChange} />);
    const tasksTab = screen.getByText('Tasks').closest('button');
    const analyticsTab = screen.getByText('Analytics').closest('button');

   
    expect(tasksTab).toHaveClass('bg-blue-50');
    expect(tasksTab).toHaveClass('text-blue-600');
    expect(tasksTab).toHaveClass('border-r-2');
    expect(analyticsTab).not.toHaveClass('bg-blue-50');
  });

  it('calls onTabChange when a tab is clicked', () => {
    render(<Sidebar activeTab="tasks" onTabChange={mockOnTabChange} />);
    const analyticsTab = screen.getByText('Analytics').closest('button');

    if (analyticsTab) {
      fireEvent.click(analyticsTab);
      expect(mockOnTabChange).toHaveBeenCalledTimes(1);
      expect(mockOnTabChange).toHaveBeenCalledWith('analytics');
    } else {
      fail('Analytics tab button not found');
    }
  });

  it('does not call onTabChange if the active tab is clicked again', () => {
    render(<Sidebar activeTab="tasks" onTabChange={mockOnTabChange} />);
    const tasksTab = screen.getByText('Tasks').closest('button');

    if (tasksTab) {
      fireEvent.click(tasksTab);
      
      expect(mockOnTabChange).toHaveBeenCalledTimes(1);
      expect(mockOnTabChange).toHaveBeenCalledWith('tasks');
    } else {
      fail('Tasks tab button not found');
    }
  });
});

function fail(_arg0: string) {
    throw new Error('Function not implemented.');
}
