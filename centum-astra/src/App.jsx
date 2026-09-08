import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';

import Stars from './components/ui/Stars';
import Login from './components/auth/Login';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import { mockResourcesByModule } from './data/mockData';
import AdminDashboard from './components/admin/AdminDashboard';
import Statistics from './components/admin/Statistics';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import FileManager from './components/modules/FileManager';
import VideoLibrary from './components/video/VideoLibrary';
import Forum from './components/forum/Forum';
import ExamSimulator from './components/exam/ExamSimulator';
import Whiteboard from './components/whiteboard/Whiteboard';

function AppContent() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [moduleResources, setModuleResources] = useState(mockResourcesByModule);
  const [customQuizzes, setCustomQuizzes] = useState([]);

  useEffect(() => {
    setActiveSection('dashboard');
  }, [user?.id]);

  function addModuleResource(moduleId, resource) {
    setModuleResources(prev => ({
      ...prev,
      [moduleId]: [...(prev[moduleId] || []), resource],
    }));
  }

  function addCustomQuiz(quiz) {
    setCustomQuizzes(prev => [...prev, quiz]);
  }

  function deleteCustomQuiz(quizId) {
    setCustomQuizzes(prev => prev.filter(q => q.id !== quizId));
  }

  if (!user) {
    return <Login />;
  }

  function renderSection() {
    if (user.role === 'admin') {
      if (activeSection === 'dashboard' || activeSection === 'students') return <AdminDashboard setActiveSection={setActiveSection} />;
      if (activeSection === 'stats') return <Statistics />;
    }

    if (user.role === 'teacher') {
      if (activeSection === 'dashboard') return <TeacherDashboard setActiveSection={setActiveSection} />;
      if (activeSection === 'stats') return <Statistics />;
    }

    if (user.role === 'student') {
      if (activeSection === 'dashboard') return <StudentDashboard setActiveSection={setActiveSection} />;
    }

    if (activeSection === 'modules') return <FileManager resources={moduleResources} onAddResource={addModuleResource} />;
    if (activeSection === 'videos') return <VideoLibrary />;
    if (activeSection === 'forum') return <Forum />;
    if (activeSection === 'exam') return <ExamSimulator customQuizzes={customQuizzes} onAddQuiz={addCustomQuiz} onDeleteQuiz={deleteCustomQuiz} />;
    if (activeSection === 'whiteboard' && user.role !== 'student') return <Whiteboard onExportToModule={addModuleResource} />;

    return (
      <div className="flex items-center justify-center h-full text-white/20 text-lg p-8">
        Sección en desarrollo 🚧
      </div>
    );
  }

  return (
    <div className="flex min-h-screen relative">
      <Stars count={60} />
      {/* Global ambient blobs — position:fixed so they show on every panel */}
      <div className="blob blob-gold" style={{ width: '55vw', height: '55vw', top: '-25%', right: '-10%', position: 'fixed', zIndex: 0, pointerEvents: 'none' }} />
      <div className="blob blob-teal" style={{ width: '40vw', height: '40vw', bottom: '-20%', left: '12%', position: 'fixed', zIndex: 0, pointerEvents: 'none' }} />
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Header activeSection={activeSection} />
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + user.role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
