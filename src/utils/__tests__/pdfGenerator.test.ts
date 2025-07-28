import { generateTaskReport } from '../pdfGenerator';
import type { Task } from '../../types/task';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock jsPDF
const mockSave = vi.fn();
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetTextColor = vi.fn();
const mockAddPage = vi.fn();

vi.mock('jspdf', () => ({
    default: vi.fn().mockImplementation(() => ({
        text: mockText,
        setFontSize: mockSetFontSize,
        setTextColor: mockSetTextColor,
        addPage: mockAddPage,
        save: mockSave,
    })),
}));

const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Test Task 1',
        description: 'Test description 1',
        status: true,
        priority: 'high',
        createdAt: 1753674250,
        updatedAt: '2025-01-08T10:00:00Z',
        dueDate: "2025-01-08"

    },
    {
        id: '2',
        title: 'Test Task 2',
        description: 'Test description 2',
        status: false,
        priority: 'medium',
        createdAt: 1753674250,
        updatedAt: '2025-01-08T10:00:00Z',
        dueDate: "2025-01-09"
    },
];

describe('pdfGenerator', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('generates PDF with correct title and statistics', () => {
        generateTaskReport(mockTasks);

        expect(mockText).toHaveBeenCalledWith('Task Management Report', 20, 30);
        expect(mockText).toHaveBeenCalledWith('Total Tasks: 2', 20, 80);
        expect(mockText).toHaveBeenCalledWith('Completed: 1', 20, 90);
        expect(mockText).toHaveBeenCalledWith('Pending: 1', 20, 100);

    });

    it('includes task details in the PDF', () => {
        generateTaskReport(mockTasks);

        expect(mockText).toHaveBeenCalledWith('Test Task 1', 20, expect.any(Number));
        expect(mockText).toHaveBeenCalledWith('Test Task 2', 20, expect.any(Number));


    });

    it('saves the PDF with correct filename', () => {
        generateTaskReport(mockTasks);

        expect(mockSave).toHaveBeenCalledWith(
            expect.stringMatching(/^task-report-\d{4}-\d{2}-\d{2}\.pdf$/)
        );
    });

    it('handles empty task list', () => {
        generateTaskReport([]);

        expect(mockText).toHaveBeenCalledWith('Total Tasks: 0', 20, 80);
        expect(mockText).toHaveBeenCalledWith('Completed: 0', 20, 90);
        expect(mockText).toHaveBeenCalledWith('Pending: 0', 20, 100);

        expect(mockSave).toHaveBeenCalled();
    });
});