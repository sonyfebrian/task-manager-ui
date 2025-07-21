# Task Management Dashboard

A beautiful, production-ready task management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter and search tasks
- ✅ Dashboard with task statistics
- ✅ PDF report generation
- ✅ Modern, clean UI with smooth animations

## Tech Stack

- **Frontend**: React  + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API**: https://mockapi.io/ (mock backend)
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

1. **Clone this repository:**
   ```bash
   git clone https://github.com/yourusername/task-manager-ui.git
   cd task-manager-ui
   ```


2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server :**
   ```bash
   npm run dev
   ```

   The dev server will start at http://localhost:5173
4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

   The preview server will start at http://localhost:4173

   

## Testing

1. **Run tests:**
   ```bash
   npm run test
   ```

   This will execute the test suite and show test coverage

## Project Structure




## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx
│   │   └── StatsCard.tsx
│   ├── Layout/
│   │   └── Sidebar.tsx
│   └── Tasks/
│       ├── TaskCard.tsx
│       ├── TaskFilters.tsx
│       ├── TaskForm.tsx
│       └── TaskList.tsx
├── services/
│   └── api.ts
├── stores/
│   └── taskStore.ts
├── types/
│   └── task.ts
├── utils/
│   └── pdfGenerator.ts
└── App.tsx
```

## Features Detail

### Task Management
- Create tasks with title, description, priority, and due date
- Edit existing tasks inline
- Mark tasks as complete/incomplete with visual feedback
- Delete tasks with confirmation
- Visual indicators for overdue tasks

### Dashboard Analytics
- Total tasks count
- Completed  tasks count
- Completion rate with progress bar

### Filtering & Search
- Search tasks by title or description
- Filter by status (All, Completed, Pending)
- Real-time filtering

### PDF Reports
- Generate comprehensive PDF reports
- Includes task statistics and detailed task list
- Downloadable with timestamp



## Development

- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

