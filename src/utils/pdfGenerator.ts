import jsPDF from 'jspdf';
import type { Task } from '../types/task';
import { format } from 'date-fns';

export const generateTaskReport = (tasks: Task[]): void => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text('Task Management Report', 20, 30);

    // Date
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128); // Gray color
    doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 20, 45);

    // Statistics
    const completed = tasks.filter(task => task.status).length;
    const pending = tasks.filter(task => !task.status).length;


    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Summary Statistics', 20, 65);

    doc.setFontSize(11);
    doc.text(`Total Tasks: ${tasks.length}`, 20, 80);
    doc.text(`Completed: ${completed}`, 20, 90);
    doc.text(`Pending: ${pending}`, 20, 100);


    // Tasks table header
    let yPosition = 135;
    doc.setFontSize(14);
    doc.text('Task Details', 20, yPosition);
    yPosition += 15;

    // Table headers
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246);
    doc.text('Title', 20, yPosition);
    doc.text('Status', 40, yPosition);
    doc.text('Description', 60, yPosition);
    doc.text('Due Date', 90, yPosition);

    yPosition += 10;

    // Table content
    doc.setTextColor(0, 0, 0);
    tasks.forEach((task,) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 30;
        }

        const title = task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title;
        const status = task.status ? 'Completed' : 'Pending';
        const description = task.description.length > 20 ? task.description.substring(0, 20) + '...' : task.description;
        const dueDate = format(new Date(task.dueDate), 'MMM dd, yyyy');


        doc.text(title, 20, yPosition);
        doc.text(status, 40, yPosition);
        doc.text(description, 60, yPosition);
        doc.text(dueDate, 90, yPosition);



        yPosition += 10;
    });


    doc.save(`task-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};