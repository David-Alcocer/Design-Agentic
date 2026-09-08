import { motion } from 'framer-motion';

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

export default function Header({ activeSection }) {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(6,15,40,0.6)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {titles[activeSection] || 'Panel'}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12.5 }}>
          {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '5px 12px', borderRadius: 999,
          background: 'rgba(52,211,153,0.07)',
          border: '1px solid rgba(52,211,153,0.15)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'twinkle 2s ease-in-out infinite' }} />
          <span style={{ color: '#34d399', fontSize: 12, fontWeight: 500 }}>En línea</span>
        </div>
      </div>
    </motion.header>
  );
}
