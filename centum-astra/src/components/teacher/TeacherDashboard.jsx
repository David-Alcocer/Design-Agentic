import { motion } from 'framer-motion';
import { Users, MessageCircle, TrendingUp, CalendarDays } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudents, mockStats } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const tooltipStyle = {
  contentStyle: { background: '#0c1d45', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 12 },
  cursor: { fill: 'rgba(255,255,255,0.03)' },
};

export default function TeacherDashboard({ setActiveSection }) {
  const { user } = useAuth();
  const myStudents  = mockStudents.slice(0, 4);
  const topStudents = [...myStudents].sort((a, b) => b.avgScore - a.avgScore);

  const stats = [
    { Icon: Users,         val: myStudents.length, label: 'Mis alumnos',          color: '#93c5fd' },
    { Icon: MessageCircle, val: '8',                label: 'Dudas pendientes',     color: '#f5c842' },
    { Icon: TrendingUp,    val: '84%',              label: 'Promedio del grupo',   color: '#34d399' },
    { Icon: CalendarDays,  val: '3',                label: 'Sesiones esta semana', color: '#c084fc' },
  ];

  return (
    <div className="scrollbar-hide resp-padding" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto', maxHeight: 'calc(100vh - 4rem)', position: 'relative' }}>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 4, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Bienvenida, <span className="text-gradient-gold">{user.name.split(' ')[1]}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            {user.subject}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setActiveSection('forum')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <MessageCircle size={14} strokeWidth={1.7} /> Foro
          </button>
          <button onClick={() => setActiveSection('stats')} className="btn-fill" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>
            <TrendingUp size={14} strokeWidth={2} /> Estadísticas
          </button>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {stats.map(({ Icon, val, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass"
            style={{ padding: '20px 20px', textAlign: 'center' }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, margin: '0 auto 12px',
              background: `${color}18`, border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={17} strokeWidth={1.7} style={{ color }} />
            </div>
            <p className="stat-display" style={{ color, fontSize: 26, marginBottom: 4 }}>{val}</p>
            <p className="stat-label">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart + ranking */}
      <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass"
          style={{ padding: '22px 20px' }}
        >
          <div className="section-divider" style={{ marginBottom: 18 }}><h3>Progreso del grupo</h3></div>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={mockStats.progressData}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="promedio" name="Promedio" stroke="#f5c842" strokeWidth={2} dot={{ fill: '#f5c842', r: 3 }} />
              <Line type="monotone" dataKey="maxScore" name="Máximo"  stroke="#60a5fa" strokeWidth={1.5} dot={{ fill: '#60a5fa', r: 2 }} strokeDasharray="4 3" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[['#f5c842','Promedio'],['#60a5fa','Máximo']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'rgba(255,255,255,0.4)' }}>
                <span style={{ width: 16, height: 2, borderRadius: 1, background: c, display: 'inline-block' }} />
                {l}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass"
          style={{ padding: '22px 20px' }}
        >
          <div className="section-divider" style={{ marginBottom: 18 }}><h3>Ranking del grupo</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topStudents.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: i === 0 ? 'rgba(245,200,66,0.2)' : i === 1 ? 'rgba(148,163,184,0.15)' : 'rgba(255,255,255,0.06)',
                  color:      i === 0 ? '#f5c842' : i === 1 ? '#94a3b8' : 'rgba(255,255,255,0.4)',
                }}>
                  {i + 1}
                </span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.name.split(' ').slice(0,2).join(' ')}
                  </p>
                  <div style={{ width: '100%', height: 2, borderRadius: 99, background: 'rgba(255,255,255,0.07)', marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.avgScore}%`, background: 'linear-gradient(90deg, #1e3a6e, #3b82f6)', borderRadius: 99 }} />
                  </div>
                </div>

                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{s.avgScore}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
