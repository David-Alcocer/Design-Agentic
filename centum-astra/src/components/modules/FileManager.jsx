import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, BarChart2, Presentation, Lock, Upload, X, Plus } from 'lucide-react';
import { mockModules } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { cn } from '../../lib/utils';

const typeIcon  = { pdf: FileText, xlsx: BarChart2, ppt: Presentation };
const typeColor = {
  pdf:  { bg: 'rgba(96,165,250,0.1)',  color: '#93c5fd', border: 'rgba(96,165,250,0.2)'  },
  xlsx: { bg: 'rgba(52,211,153,0.1)', color: '#34d399', border: 'rgba(52,211,153,0.2)' },
  ppt:  { bg: 'rgba(248,113,113,0.1)', color: '#fca5a5', border: 'rgba(248,113,113,0.2)' },
};

function UploadModal({ moduleTitle, isMedical, onClose, onUpload }) {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [fileSize, setFileSize] = useState('');

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const sizeMB = file.size / (1024 * 1024);
    setFileSize(sizeMB >= 1 ? `${sizeMB.toFixed(1)} MB` : `${(file.size / 1024).toFixed(0)} KB`);
    const ext = file.name.split('.').pop().toLowerCase();
    if (['xls', 'xlsx'].includes(ext)) setFileType('xlsx');
    else if (['ppt', 'pptx'].includes(ext)) setFileType('ppt');
    else setFileType('pdf');
  }

  const extLabel = { pdf: 'PDF', xlsx: 'Excel', ppt: 'PPT' };

  function handleSubmit() {
    if (!fileName.trim()) return;
    onUpload({ name: fileName, ext: extLabel[fileType], size: fileSize || '—', type: fileType });
    onClose();
  }

  const accent = isMedical ? { border: 'rgba(29,233,182,0.2)', color: '#1de9b6', active: 'rgba(29,233,182,0.1)', activeBorder: 'rgba(29,233,182,0.25)', activeText: '#5eead4' }
    : { border: 'rgba(245,200,66,0.2)', color: '#f5c842', active: 'rgba(245,200,66,0.1)', activeBorder: 'rgba(245,200,66,0.25)', activeText: '#f5c842' };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(3,10,26,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        style={{ width: '100%', maxWidth: 440, padding: '32px 28px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h3 style={{ color: 'white', fontSize: 17, fontWeight: 700, marginBottom: 3 }}>Subir material</h3>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12.5 }}>{moduleTitle}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <label style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 10, padding: '28px 20px', borderRadius: 12, cursor: 'pointer',
          border: `2px dashed ${accent.border}`, background: 'rgba(255,255,255,0.02)', marginBottom: 18,
        }}>
          <input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.ppt,.pptx,.xls,.xlsx" />
          <Upload size={24} style={{ color: accent.color, opacity: 0.7 }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center' }}>
            {fileName ? `📄 ${fileName}` : 'Haz clic para seleccionar un archivo'}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>PDF · Excel · PowerPoint</p>
        </label>

        <div style={{ marginBottom: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11.5, marginBottom: 6 }}>Nombre del recurso</p>
          <input
            type="text"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            placeholder="Nombre del archivo..."
            style={{
              width: '100%', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
              padding: '10px 14px', color: 'white', fontSize: 13, outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['pdf', 'xlsx', 'ppt'].map(t => {
            const labels = { pdf: 'PDF', xlsx: 'Excel', ppt: 'PowerPoint' };
            const active = fileType === t;
            return (
              <button key={t} onClick={() => setFileType(t)} style={{
                flex: 1, padding: '8px 4px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 500,
                background: active ? accent.active : 'rgba(255,255,255,0.04)',
                color: active ? accent.activeText : 'rgba(255,255,255,0.4)',
                border: `1px solid ${active ? accent.activeBorder : 'rgba(255,255,255,0.08)'}`,
                transition: 'color 0.12s ease, background 0.12s ease, border-color 0.12s ease',
              }}>{labels[t]}</button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <motion.button
            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={!fileName.trim()}
            className="btn-gold"
            style={{ flex: 1, opacity: !fileName.trim() ? 0.4 : 1 }}
          >
            Publicar
          </motion.button>
          <button onClick={onClose} className="btn-ghost">Cancelar</button>
        </div>
      </motion.div>
    </div>
  );
}

function ResourceRow({ resource, isMedical, index, canDownload }) {
  const Icon  = typeIcon[resource.type] || FileText;
  const color = typeColor[resource.type] || typeColor.pdf;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ x: 4, transition: { duration: 0.15 } }}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 16px', borderRadius: 10,
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = isMedical ? 'rgba(29,233,182,0.15)' : 'rgba(255,255,255,0.1)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
        background: color.bg, border: `1px solid ${color.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={16} strokeWidth={1.7} style={{ color: color.color }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: isMedical ? '#e0faf6' : 'rgba(255,255,255,0.82)', fontSize: 13.5, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {resource.name}
        </p>
        <p style={{ color: isMedical ? 'rgba(29,233,182,0.4)' : 'rgba(255,255,255,0.3)', fontSize: 11.5, marginTop: 1 }}>
          {resource.ext} · {resource.size}
        </p>
      </div>

      {canDownload ? (
        <button
          style={{
            width: 30, height: 30, borderRadius: 8, border: 'none',
            background: isMedical ? 'rgba(29,233,182,0.08)' : 'rgba(255,255,255,0.05)',
            color: isMedical ? '#1de9b6' : 'rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'color 0.12s ease', flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = isMedical ? '#1de9b6' : 'rgba(255,255,255,0.3)'}
        >
          <Download size={14} strokeWidth={1.7} />
        </button>
      ) : (
        <div
          style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
          title="Material privado — disponible en sesión con tu profesor"
        >
          <Lock size={12} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.18)' }} />
        </div>
      )}
    </motion.div>
  );
}

export default function FileManager({ resources, onAddResource, defaultModuleId }) {
  const { user } = useAuth();
  const { isMobile } = useBreakpoint();
  const isStaff   = user.role === 'admin' || user.role === 'teacher';

  const [selectedModule, setSelectedModule] = useState(
    () => (defaultModuleId ? mockModules.find(m => m.id === defaultModuleId) : null) ?? mockModules[0],
  );
  const [typeFilter, setTypeFilter]         = useState('all');
  const [showUpload, setShowUpload]         = useState(false);

  const isMedical  = selectedModule.type === 'specific';
  const moduleList = resources[selectedModule.id] || [];
  const filtered   = typeFilter === 'all' ? moduleList : moduleList.filter(r => r.type === typeFilter);

  const moduleSidebarStyle = (mod) => {
    const active = selectedModule.id === mod.id;
    const isMed  = mod.type === 'specific';
    if (active && isMed)  return { bg: 'rgba(29,233,182,0.08)',  border: 'rgba(29,233,182,0.22)',  color: '#5eead4' };
    if (active && !isMed) return { bg: 'rgba(245,200,66,0.08)', border: 'rgba(245,200,66,0.22)', color: '#f5c842' };
    return { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', maxHeight: 'calc(100vh - 4rem)', overflow: 'hidden' }}>

      {showUpload && (
        <UploadModal
          moduleTitle={selectedModule.title}
          isMedical={isMedical}
          onClose={() => setShowUpload(false)}
          onUpload={(resource) => onAddResource(selectedModule.id, resource)}
        />
      )}

      {isMobile ? (
        /* ── MOBILE: horizontal scrolling module pills ── */
        <div style={{
          display: 'flex', gap: 8, padding: '12px 16px',
          overflowX: 'auto', flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.01)',
        }} className="scrollbar-hide">
          {mockModules.map(mod => {
            const active = selectedModule.id === mod.id;
            const isMed  = mod.type === 'specific';
            return (
              <button
                key={mod.id}
                onClick={() => { setSelectedModule(mod); setTypeFilter('all'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 14px', borderRadius: 20, cursor: 'pointer',
                  whiteSpace: 'nowrap', flexShrink: 0, fontSize: 12.5, fontWeight: 500,
                  background: active
                    ? (isMed ? 'rgba(29,233,182,0.12)' : 'rgba(245,200,66,0.12)')
                    : 'rgba(255,255,255,0.04)',
                  color: active
                    ? (isMed ? '#5eead4' : '#f5c842')
                    : 'rgba(255,255,255,0.45)',
                  border: `1px solid ${active
                    ? (isMed ? 'rgba(29,233,182,0.28)' : 'rgba(245,200,66,0.28)')
                    : 'rgba(255,255,255,0.08)'}`,
                  transition: 'color 0.12s ease, background 0.12s ease, border-color 0.12s ease',
                }}
              >
                <span style={{ fontSize: 15 }}>{mod.icon}</span>
                {mod.title}
              </button>
            );
          })}
        </div>
      ) : (
        /* ── DESKTOP: vertical sidebar ── */
        <div style={{
          width: 224, flexShrink: 0, padding: '20px 12px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto', background: 'rgba(255,255,255,0.01)',
        }} className="scrollbar-hide">
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600, padding: '0 8px', marginBottom: 12, letterSpacing: '0.02em' }}>
            Módulos
          </p>
          {mockModules.map(mod => {
            const s = moduleSidebarStyle(mod);
            return (
              <motion.button
                key={mod.id}
                onClick={() => { setSelectedModule(mod); setTypeFilter('all'); }}
                whileHover={{ x: 3 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 12px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  background: s.bg, border: `1px solid ${s.border}`, color: s.color,
                  marginBottom: 4, transition: 'color 0.12s ease, background 0.12s ease, border-color 0.12s ease',
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{mod.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</p>
                  <p style={{ fontSize: 10.5, opacity: 0.55, marginTop: 1 }}>{(resources[mod.id] || []).length} archivos</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? 16 : 28 }} className="scrollbar-hide">

        {/* Module header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border transition-colors duration-300',
              isMedical
                ? 'border-teal-400/20 hover:border-teal-400/35'
                : 'border-yellow-500/20 hover:border-yellow-500/35',
            )}
            style={{ padding: isMobile ? '16px' : '22px 24px', marginBottom: 20 }}
          >
            <div className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
              isMedical
                ? 'bg-[radial-gradient(ellipse_at_top_left,rgba(29,233,182,0.07)_0%,transparent_65%)]'
                : 'bg-[radial-gradient(ellipse_at_top_left,rgba(245,200,66,0.07)_0%,transparent_65%)]',
            )} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: isMedical ? 'rgba(29,233,182,0.12)' : 'rgba(245,200,66,0.12)',
                  border: `1px solid ${isMedical ? 'rgba(29,233,182,0.2)' : 'rgba(245,200,66,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                }}>
                  {selectedModule.icon}
                </div>
                <div>
                  <h2 style={{ color: 'white', fontSize: 18, fontWeight: 700, marginBottom: 3, fontFamily: 'Syne, sans-serif' }}>{selectedModule.title}</h2>
                  <p style={{ color: isMedical ? 'rgba(29,233,182,0.5)' : 'rgba(245,200,66,0.5)', fontSize: 12.5 }}>
                    {selectedModule.topics} temas · {moduleList.length} recursos
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 100, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99, width: `${selectedModule.progress}%`,
                    background: isMedical ? 'linear-gradient(90deg, #0d9488, #1de9b6)' : 'linear-gradient(90deg, #b8880f, #f5c842)',
                  }} />
                </div>
                <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{selectedModule.progress}%</span>

                {isStaff && (
                  <motion.button
                    whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setShowUpload(true)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 7,
                      padding: '8px 14px', borderRadius: 9, cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
                      background: isMedical ? 'rgba(29,233,182,0.1)' : 'rgba(245,200,66,0.1)',
                      color: isMedical ? '#5eead4' : '#f5c842',
                      border: `1px solid ${isMedical ? 'rgba(29,233,182,0.25)' : 'rgba(245,200,66,0.25)'}`,
                    }}
                  >
                    <Plus size={13} /> Subir material
                  </motion.button>
                )}
              </div>
            </div>

            {!isStaff && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 14,
                padding: '8px 12px', borderRadius: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <Lock size={12} style={{ color: 'rgba(255,255,255,0.28)', flexShrink: 0 }} />
                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12 }}>
                  Los archivos son material exclusivo de sesión. La descarga está disponible solo para profesores y administradores.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {selectedModule.subtopics.map(t => (
                <span key={t} style={{
                  fontSize: 11, fontWeight: 500, borderRadius: 999, padding: '3px 10px',
                  background: isMedical ? 'rgba(29,233,182,0.08)' : 'rgba(255,255,255,0.07)',
                  color: isMedical ? '#5eead4' : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${isMedical ? 'rgba(29,233,182,0.15)' : 'rgba(255,255,255,0.1)'}`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Type filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['all', 'pdf', 'xlsx', 'ppt'].map(t => {
            const active = typeFilter === t;
            const labels = { all: 'Todos', pdf: 'PDF', xlsx: 'Excel', ppt: 'PowerPoint' };
            return (
              <button key={t} onClick={() => setTypeFilter(t)} style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                background: active ? (isMedical ? 'rgba(29,233,182,0.1)' : 'rgba(245,200,66,0.1)') : 'rgba(255,255,255,0.04)',
                color: active ? (isMedical ? '#5eead4' : '#f5c842') : 'rgba(255,255,255,0.4)',
                border: `1px solid ${active ? (isMedical ? 'rgba(29,233,182,0.25)' : 'rgba(245,200,66,0.25)') : 'rgba(255,255,255,0.08)'}`,
                transition: 'color 0.12s ease, background 0.12s ease, border-color 0.12s ease',
              }}>{labels[t]}</button>
            );
          })}
        </div>

        {/* Resources */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedModule.id + typeFilter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            {filtered.length > 0 ? filtered.map((r, i) => (
              <ResourceRow key={r.name + i} resource={r} isMedical={isMedical} index={i} canDownload={isStaff} />
            )) : (
              <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.2)' }}>
                <p style={{ fontSize: 32, marginBottom: 8 }}>◎</p>
                <p style={{ fontSize: 14 }}>
                  {isStaff ? 'Sin archivos en esta categoría. Sube el primer material.' : 'Sin archivos en esta categoría.'}
                </p>
                {isStaff && (
                  <motion.button
                    whileHover={{ y: -1 }} onClick={() => setShowUpload(true)}
                    style={{
                      marginTop: 12, padding: '8px 18px', borderRadius: 9, cursor: 'pointer',
                      background: 'rgba(245,200,66,0.08)', color: '#f5c842',
                      border: '1px solid rgba(245,200,66,0.2)', fontSize: 13,
                    }}
                  >
                    + Subir primer archivo
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
