import { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TaskList } from './components/Tasks/TaskList';
import { useTaskStore } from './stores/taskStores';
import { ToastContainer } from 'react-toastify';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const { fetchTasks, error } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Dashboard />;
      case 'tasks':
        return <TaskList />;

    
      default:
        return <TaskList />;
    }
  };


  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-red-500 mt-1">
              Error get data from server
            </p>
          </div>
        )}
        
        {renderContent()}
      </main>
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
    </>
  )
}

export default App
