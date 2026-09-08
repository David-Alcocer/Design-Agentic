import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockForumPosts } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const subjectColors = {
  'Pensamiento Matemático': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'Comprensión Lectora': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Redacción Indirecta': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'Pre-medicina': 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  'Ciencias de la Salud': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

function PostCard({ post, onClick, selected }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={() => onClick(post)}
      className={`glass p-5 cursor-pointer transition-all border
        ${selected ? 'border-amber-400/40 bg-amber-400/5' : 'border-white/8 hover:border-white/20'}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-white font-semibold text-sm leading-snug flex-1">{post.title}</h3>
        {post.resolved && (
          <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] flex-shrink-0">✓ Resuelta</span>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className={`badge border ${subjectColors[post.subject] || 'bg-white/10 text-white/50'} text-[10px]`}>{post.subject}</span>
        <span className="text-white/30 text-xs">por {post.author}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-white/30">
        <span>💬 {post.replies.length} {post.replies.length === 1 ? 'respuesta' : 'respuestas'}</span>
        <span>❤️ {post.likes}</span>
        <span>{new Date(post.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
      </div>
    </motion.div>
  );
}

function PostDetail({ post, onClose, onAddReply }) {
  const { user } = useAuth();
  const [reply, setReply] = useState('');
  const replies = post.replies;

  function handleReply() {
    if (!reply.trim()) return;
    onAddReply(post.id, {
      id: Date.now(),
      author: user.name,
      role: user.role,
      content: reply,
      date: new Date().toISOString().split('T')[0],
    });
    setReply('');
  }

  const roleColors = {
    teacher: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    admin: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    student: 'bg-white/10 text-white/50 border-white/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-white font-bold text-lg leading-snug flex-1">{post.title}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl cursor-pointer flex-shrink-0">✕</button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`badge border ${subjectColors[post.subject] || ''} text-[10px]`}>{post.subject}</span>
          <span className="text-white/40 text-xs">por {post.author}</span>
          {post.resolved && <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px]">✓ Resuelta</span>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-4">
        {/* Original post */}
        <div className="bg-white/5 rounded-xl p-4">
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 1.7 }}>{post.content}</p>
        </div>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">{replies.length} {replies.length === 1 ? 'Respuesta' : 'Respuestas'}</p>
            {replies.map(r => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {r.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-xs font-semibold">{r.author}</span>
                    <span className={`badge border ${roleColors[r.role]} text-[9px]`}>
                      {r.role === 'teacher' ? 'Profesor' : r.role === 'admin' ? 'Admin' : 'Alumno'}
                    </span>
                    <span className="text-white/30 text-[10px]">{r.date}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13.5, lineHeight: 1.65 }}>{r.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {replies.length === 0 && (
          <div className="text-center py-8 text-white/30">
            <p className="text-3xl mb-2">💬</p>
            <p className="text-sm">Sé el primero en responder</p>
          </div>
        )}
      </div>

      {/* Reply input */}
      <div className="p-4 border-t border-white/8">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Escribe tu respuesta..."
            value={reply}
            onChange={e => setReply(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleReply()}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/40"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReply}
            disabled={!reply.trim()}
            className="btn-gold text-sm px-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Forum() {
  const [posts, setPosts] = useState(mockForumPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('Pensamiento Matemático');
  const { user } = useAuth();

  function handleAddReply(postId, reply) {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
    ));
    setSelectedPost(prev => prev && prev.id === postId
      ? { ...prev, replies: [...prev.replies, reply] }
      : prev
    );
  }

  const filtered = posts.filter(p => {
    if (filter === 'resolved') return p.resolved;
    if (filter === 'open') return !p.resolved;
    return true;
  });

  function handleNewPost() {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost = {
      id: Date.now(),
      title: newTitle,
      subject: newSubject,
      author: user.name,
      authorRole: user.role,
      date: new Date().toISOString().split('T')[0],
      content: newContent,
      replies: [],
      likes: 0,
      resolved: false,
    };
    setPosts(prev => [newPost, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewSubject('Pensamiento Matemático');
    setShowNewPost(false);
    setSelectedPost(newPost);
  }

  return (
    <div style={{ padding: '28px 32px', display: 'flex', gap: 20, maxHeight: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
      {/* Post list */}
      <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        <div className="section-divider" style={{ marginBottom: 4 }}>
          <h3>Foro de dudas</h3>
        </div>
        {/* Controls */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowNewPost(true)}
            className="btn-fill flex-1"
            style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', padding: '9px 14px' }}
          >
            + Nueva pregunta
          </motion.button>
        </div>

        <div className="flex gap-1.5">
          {[['all', 'Todos'], ['open', 'Abiertas'], ['resolved', 'Resueltas']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border
                ${filter === val ? 'bg-amber-400/15 text-amber-300 border-amber-400/30' : 'bg-white/5 text-white/50 border-white/10 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }} className="scrollbar-hide">
          <AnimatePresence>
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <PostCard post={post} onClick={setSelectedPost} selected={selectedPost?.id === post.id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail / New post */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {showNewPost ? (
            <motion.div
              key="new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-6 h-full flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">Nueva Pregunta</h2>
                <button onClick={() => setShowNewPost(false)} className="text-white/40 hover:text-white cursor-pointer">✕</button>
              </div>
              <input
                type="text"
                placeholder="Título de tu pregunta..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/40"
              />
              <select
                value={newSubject}
                onChange={e => setNewSubject(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-amber-400/40"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {Object.keys(subjectColors).map(s => (
                  <option key={s} value={s} style={{ background: '#0c1d45', color: 'white' }}>{s}</option>
                ))}
              </select>
              <textarea
                placeholder="Describe tu duda con detalle..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={8}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-amber-400/40 resize-none"
              />
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNewPost} className="btn-gold flex-1">
                  Publicar pregunta
                </motion.button>
                <button onClick={() => setShowNewPost(false)} className="btn-ghost">Cancelar</button>
              </div>
            </motion.div>
          ) : selectedPost ? (
            <motion.div key={selectedPost.id} className="h-full">
              <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} onAddReply={handleAddReply} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass h-full"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}
            >
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(245,200,66,0.4)" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 600 }}>Selecciona una pregunta</p>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>o crea una nueva para comenzar</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
