import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, FolderOpen, Video,
  MessageCircle, BarChart2, FileText, PenTool, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const adminNav = [
  { id: 'dashboard', label: 'Dashboard',      Icon: LayoutDashboard },
  { id: 'students',  label: 'Alumnos',         Icon: Users },
  { id: 'modules',   label: 'Módulos',          Icon: FolderOpen },
  { id: 'videos',    label: 'Videoteca',        Icon: Video },
  { id: 'forum',     label: 'Foro',             Icon: MessageCircle },
  { id: 'exam',      label: 'Simulador EXANI',  Icon: FileText },
  { id: 'stats',     label: 'Estadísticas',     Icon: BarChart2 },
];

const teacherNav = [
  { id: 'dashboard', label: 'Mi Panel',         Icon: LayoutDashboard },
  { id: 'modules',   label: 'Módulos',          Icon: FolderOpen },
  { id: 'videos',    label: 'Videoteca',        Icon: Video },
  { id: 'forum',     label: 'Foro de dudas',    Icon: MessageCircle },
  { id: 'exam',      label: 'Simulador EXANI',  Icon: FileText },
  { id: 'stats',     label: 'Estadísticas',     Icon: BarChart2 },
];

const studentNav = [
  { id: 'dashboard',  label: 'Mi progreso',     Icon: LayoutDashboard },
  { id: 'modules',    label: 'Módulos',          Icon: FolderOpen },
  { id: 'videos',     label: 'Videoteca',        Icon: Video },
  { id: 'forum',      label: 'Foro',             Icon: MessageCircle },
  { id: 'exam',       label: 'Simulador EXANI',  Icon: FileText },
];

const navByRole = { admin: adminNav, teacher: teacherNav, student: studentNav };

const roleLabel = { admin: 'Administrador', teacher: 'Profesor', student: 'Alumno' };

const roleBadge = {
  admin:   { bg: 'rgba(245,200,66,0.12)',  color: '#f5c842',  border: 'rgba(245,200,66,0.25)' },
  teacher: { bg: 'rgba(96,165,250,0.12)',  color: '#93c5fd',  border: 'rgba(96,165,250,0.25)' },
  student: { bg: 'rgba(45,212,191,0.12)',  color: '#5eead4',  border: 'rgba(45,212,191,0.25)' },
};

export default function Sidebar({ activeSection, setActiveSection }) {
  const { user, logout } = useAuth();
  const [logoutHover, setLogoutHover] = useState(false);
  const nav = navByRole[user.role] || studentNav;
  const badge = roleBadge[user.role];

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      style={{
        width: 232,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #060f28 0%, #050d22 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Logotype */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, #b8880f 0%, #f5c842 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(245,200,66,0.3)',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9.8 6.2H15.2L10.7 9.4L12.5 14.6L8 11.4L3.5 14.6L5.3 9.4L0.8 6.2H6.2L8 1Z" fill="#030a1a" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.12em', lineHeight: 1.2 }}>
              CENTUM
            </p>
            <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 500, color: '#f5c842', letterSpacing: '0.14em', lineHeight: 1.2 }}>
              ASTRA
            </p>
          </div>
        </div>
      </div>

      {/* User */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1e3a6e 0%, #0c1d45 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'white',
            border: `2px solid ${badge.border}`,
            flexShrink: 0,
          }}>
            {user.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name.split(' ').slice(0, 2).join(' ')}
            </p>
            <span style={{
              display: 'inline-block', marginTop: 2,
              background: badge.bg, color: badge.color,
              border: `1px solid ${badge.border}`,
              borderRadius: 999, padding: '1px 8px', fontSize: 10, fontWeight: 600,
            }}>
              {roleLabel[user.role]}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }} className="scrollbar-hide">
        {nav.map(({ id, label, Icon }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`nav-link ${active ? 'nav-link-active' : ''}`}
              style={{ marginBottom: 2 }}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.7} style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Solar system decorative strip */}
      <div style={{
        margin: '8px 12px',
        height: 52,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${import.meta.env.BASE_URL}51581-solar-system-439046_1920.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          opacity: 0.28,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(6,15,40,0.7) 0%, transparent 40%, transparent 60%, rgba(6,15,40,0.7) 100%)',
        }} />
      </div>

      {/* Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={logout}
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 14px', borderRadius: 10,
            color: logoutHover ? '#f87171' : 'rgba(255,255,255,0.3)',
            fontSize: 13, fontWeight: 500,
            background: logoutHover ? 'rgba(248,113,113,0.07)' : 'none',
            border: 'none', cursor: 'pointer',
            transition: 'color 0.15s ease, background 0.15s ease',
          }}
        >
          <LogOut size={15} strokeWidth={1.7} />
          Cerrar sesión
        </button>
      </div>
    </motion.aside>
  );
}
