import React, { useState } from 'react';
import CreateLeaveTypeModal from './CreateLeaveTypeModal'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-10">
      
      
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >Create Leave Type
      </button>

      
      <CreateLeaveTypeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;