import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockVideos } from '../../data/mockData';

const subjectColors = {
  'Pensamiento Matemático': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Comprensión Lectora': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Redacción Indirecta': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Pre-medicina': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'Ciencias de la Salud': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
};

const thumbColors = {
  'PM': 'from-blue-600 to-blue-800',
  'CL': 'from-purple-600 to-purple-800',
  'RI': 'from-emerald-600 to-emerald-800',
  'CS': 'from-cyan-600 to-cyan-800',
};

function VideoCard({ video, onClick, isActive }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      onClick={() => onClick(video)}
      className="glass overflow-hidden cursor-pointer"
      style={{ border: isActive ? '1px solid rgba(245,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Thumbnail */}
      <div className={`relative h-40 bg-gradient-to-br ${thumbColors[video.thumbnail] || 'from-slate-600 to-slate-800'} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
        >
          <span className="text-2xl ml-1">▶</span>
        </motion.div>
        <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded-md">
          {video.duration}
        </span>
      </div>

      <div style={{ padding: '16px 18px' }}>
        <span className={`badge border ${subjectColors[video.subject] || 'bg-white/10 text-white/50'} text-[10px]`} style={{ marginBottom: 8, display: 'inline-block' }}>
          {video.subject}
        </span>
        <h3 style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13.5, fontWeight: 700, lineHeight: 1.45, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5, color: 'rgba(255,255,255,0.38)' }}>
          <span>{video.instructor}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {video.views}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="glass w-full max-w-2xl p-6"
      >
        <div className={`h-72 rounded-xl bg-gradient-to-br ${thumbColors[video.thumbnail] || 'from-slate-600 to-slate-800'} flex items-center justify-center mb-5`}>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 mx-auto mb-3">
              <span className="text-4xl ml-1">▶</span>
            </div>
            <p className="text-white/70 text-sm">[Vista previa · Conectar a Zoom/Drive]</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className={`badge border ${subjectColors[video.subject] || ''}`}>{video.subject}</span>
          <span className="text-white/40 text-sm">{video.instructor}</span>
          <span className="text-white/40 text-sm">⏱ {video.duration}</span>
          <span className="text-white/40 text-sm">👁 {video.views} vistas</span>
        </div>

        <div className="flex gap-3">
          <button className="btn-gold text-sm flex-1">Reproducir</button>
          <button onClick={onClose} className="btn-ghost text-sm">Cerrar</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function VideoLibrary() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const subjects = ['all', ...new Set(mockVideos.map(v => v.subject))];

  const filtered = mockVideos.filter(v => {
    const matchFilter = filter === 'all' || v.subject === filter;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.instructor.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="section-divider" style={{ marginBottom: 6 }}>
              <h3>Videoteca de Sesiones</h3>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 12.5 }}>
              <span className="stat-display" style={{ fontSize: 18, color: '#f5c842', verticalAlign: 'middle' }}>{mockVideos.length}</span>
              <span style={{ marginLeft: 6 }}>sesiones grabadas · {new Set(mockVideos.map(v => v.subject)).size} materias</span>
            </p>
          </div>
          <input
            type="text"
            placeholder="Buscar sesión..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/40 w-56"
          />
        </div>

        {/* Subject filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border
                ${filter === s
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                }`}
            >
              {s === 'all' ? 'Todas las materias' : s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter + search}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <VideoCard
                video={video}
                onClick={setActiveVideo}
                isActive={activeVideo?.id === video.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <p className="text-5xl mb-3">🎬</p>
          <p>No se encontraron videos</p>
        </div>
      )}

      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </div>
  );
}
