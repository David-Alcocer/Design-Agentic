import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import { mockStats } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0c1d45', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px' }}>
        <p className="text-white/60 text-xs mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}{typeof p.value === 'number' && p.value <= 100 ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Statistics() {
  return (
    <div className="p-8 space-y-8 overflow-y-auto scrollbar-hide max-h-[calc(100vh-4rem)]" style={{ position: 'relative' }}>
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tiempo promedio/pregunta', val: '2.4 min', icon: '⏱️', color: 'blue' },
          { label: 'Tiempo total/examen', val: '48 min', icon: '⌛', color: 'gold' },
          { label: 'Tasa de aprobación', val: '78%', icon: '✅', color: 'green' },
          { label: 'Alumnos evaluados', val: '312', icon: '🎓', color: 'purple' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass"
          style={{ padding: '20px 22px' }}
          >
            <p style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</p>
            <p className="stat-display" style={{ color: '#f5c842', fontSize: 28, marginBottom: 4 }}>{s.val}</p>
            <p className="stat-label">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Rendimiento por materia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-6"
      >
        <div className="section-divider" style={{ marginBottom: 20 }}><h3>Rendimiento por Materia</h3></div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={mockStats.subjectPerformance} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="avg" name="Promedio" fill="#f5c842" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Evolución + Tiempo por pregunta */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6"
        >
          <div className="section-divider" style={{ marginBottom: 20 }}><h3>Evolución Semanal</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockStats.progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
              <Line type="monotone" dataKey="promedio" name="Promedio" stroke="#f5c842" strokeWidth={2.5} dot={{ fill: '#f5c842', r: 4 }} />
              <Line type="monotone" dataKey="maxScore" name="Máximo" stroke="#60a5fa" strokeWidth={2} dot={{ fill: '#60a5fa', r: 3 }} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6"
        >
          <div className="section-divider" style={{ marginBottom: 20 }}><h3>Tiempo Promedio por Pregunta (min)</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockStats.timeMetrics} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="question" type="category" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="avgTime" name="Promedio" fill="#1de9b6" radius={[0, 6, 6, 0]} />
              <Bar dataKey="limit" name="Límite" fill="rgba(251,191,36,0.2)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
