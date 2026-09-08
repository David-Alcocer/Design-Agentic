import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const titles = {
  dashboard:  'Dashboard',
  students:   'Alumnos',
  modules:    'Módulos',
  videos:     'Videoteca',
  forum:      'Foro de dudas',
  stats:      'Estadísticas',
  exam:       'Simulador EXANI-II',
  whiteboard: 'Pizarra',
};

export default function Header({ activeSection, onMenuToggle, isMobile }) {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'ease' }}
      style={{
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(4,11,28,0.72)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {isMobile && (
          <button
            onClick={onMenuToggle}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 7, padding: '5px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)', flexShrink: 0,
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <Menu size={17} strokeWidth={1.7} />
          </button>
        )}
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 13, fontWeight: 600,
          color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.01em',
        }}>
          {titles[activeSection] || 'Panel'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {!isMobile && (
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>
            {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}

        {/* User chip — static, no animation */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '4px 10px 4px 6px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)',
            flexShrink: 0,
          }}>
            {user?.avatar || user?.name?.[0] || '?'}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 400 }}>
            {user?.name?.split(' ')[0] || ''}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
