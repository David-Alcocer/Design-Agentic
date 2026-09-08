import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GraduationCap, Rocket, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PublicNav from './PublicNav';

const roles = [
  {
    key: 'admin',
    label: 'Administrador',
    Icon: Shield,
    hint: 'admin@centum.mx / admin123',
    accentColor: '#f5c842',
    accentBg: 'rgba(245,200,66,0.08)',
    accentBorder: 'rgba(245,200,66,0.22)',
  },
  {
    key: 'teacher',
    label: 'Profesor',
    Icon: GraduationCap,
    hint: 'sofia@centum.mx / prof123',
    accentColor: '#93c5fd',
    accentBg: 'rgba(96,165,250,0.08)',
    accentBorder: 'rgba(96,165,250,0.22)',
  },
  {
    key: 'student',
    label: 'Alumno',
    Icon: Rocket,
    hint: 'ana@centum.mx / alu123',
    accentColor: '#5eead4',
    accentBg: 'rgba(45,212,191,0.08)',
    accentBorder: 'rgba(45,212,191,0.22)',
  },
];

const testimonials = [
  {
    name: 'Ana García López',
    subject: 'Pre-medicina',
    score: 95,
    initials: 'AG',
    color: '#1de9b6',
    text: 'Centum Astra me dio la estructura y la disciplina que necesitaba. Pasé el EXANI con 95 puntos y hoy estoy viviendo la carrera que siempre soñé.',
  },
  {
    name: 'Diego Reyes Fuentes',
    subject: 'Ciencias de la Salud',
    score: 88,
    initials: 'DR',
    color: '#60a5fa',
    text: 'El simulador EXANI-II es increíblemente preciso. Practicando aquí, el examen real se sintió completamente familiar. Definitivamente cambia la manera de estudiar.',
  },
  {
    name: 'María Morales Cruz',
    subject: 'Pre-medicina',
    score: 97,
    initials: 'MM',
    color: '#f5c842',
    text: 'Estudié 3 meses con la plataforma y quedé en el primer lugar de mi generación. La metodología de los profesores es única y muy efectiva.',
  },
];

const team = [
  { name: 'Dr. Alejandro Torres', role: 'Director Académico', initials: 'AT', color: '#f5c842' },
  { name: 'Mtra. Sofía Ramírez', role: 'Pensamiento Matemático', initials: 'SR', color: '#93c5fd' },
  { name: 'Prof. Carlos Mendoza', role: 'Comprensión Lectora', initials: 'CM', color: '#c084fc' },
  { name: 'Dr. Ramón Solís', role: 'Ciencias de la Salud', initials: 'RS', color: '#1de9b6' },
];

function FocusInput({ type = 'text', value, onChange, placeholder, id }) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="field" style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={isPassword && !showPass ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ paddingRight: isPassword ? 44 : 16 }}
          required
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(s => !s)}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center',
            }}
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      <motion.div
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, height: 2,
          background: 'linear-gradient(90deg, #b8880f, #f5c842)', borderRadius: '0 0 0 10px',
        }}
      />
    </div>
  );
}

export default function Login() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  function handleRoleSelect(role) {
    setSelectedRole(role.key);
    setEmail(role.hint.split(' / ')[0]);
    setPassword(role.hint.split(' / ')[1]);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login(email, password);
    setLoading(false);
  }

  const t = testimonials[testimonialIdx];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      background: '#030a1a',
    }}>
      <PublicNav />
      {/* ── FULL-SCREEN BACKGROUNDS ── */}
      {/* Layer 1: Milky Way — normal crop, covers full page */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${import.meta.env.BASE_URL}timrael-space-4984262_1920.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }} />
      {/* Layer 2: Same image zoomed + shifted — adds depth via screen blend */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${import.meta.env.BASE_URL}timrael-space-4984262_1920.jpg)`,
        backgroundSize: '160%',
        backgroundPosition: 'center 55%',
        opacity: 0.45,
        mixBlendMode: 'screen',
      }} />
      {/* Layer 3: Dark veil — just enough to make text readable */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'rgba(3,10,26,0.52)' }} />
      {/* Layer 4: Subtle gold nebula pulse near center */}
      <div style={{
        position: 'absolute', top: '30%', left: '30%',
        width: '40vw', height: '40vw', zIndex: 0,
        background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── PANELS WRAPPER — starts below fixed nav ── */}
      <div style={{ display: 'flex', flex: 1, paddingTop: 60 }}>

      {/* ── LEFT PANEL — hidden on mobile ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="login-left-panel"
        style={{
          flex: '0 0 58%', padding: '36px 56px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', zIndex: 2,
          overflow: 'hidden',
        }}
      >

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #b8880f 0%, #f5c842 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 28px rgba(245,200,66,0.35)',
            }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.8 6.2H15.2L10.7 9.4L12.5 14.6L8 11.4L3.5 14.6L5.3 9.4L0.8 6.2H6.2L8 1Z" fill="#030a1a" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '0.12em', lineHeight: 1.2 }}>CENTUM</p>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 11, fontWeight: 500, color: '#f5c842', letterSpacing: '0.14em', lineHeight: 1.2 }}>ASTRA</p>
            </div>
          </div>

          {/* Raw Form hero headline — typographic drama */}
          <div style={{ marginBottom: 40 }}>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="resp-hero-h1"
              style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: 58, fontWeight: 800,
                color: 'white', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 22,
              }}
            >
              DOMINA<br />
              EL EXANI.<br />
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #b8880f 0%, #f5c842 55%, #fde68a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '-0.05em',
              }}>
                VIVE TU<br />VOCACIÓN.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'rgba(255,255,255,0.58)', fontSize: 15, lineHeight: 1.7, maxWidth: 380 }}
            >
              La plataforma que prepara a los mejores aspirantes a carreras de salud con metodología probada y tecnología de punta.
            </motion.p>
          </div>

          {/* Raw Form stats — brutalist typographic numbers */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 44 }}>
            {[
              { val: '95%', label: 'Aprobación' },
              { val: '500+', label: 'Alumnos' },
              { val: '5 años', label: 'Experiencia' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
                style={{
                  paddingRight: 32,
                  marginRight: 32,
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <p className="stat-display">{s.val}</p>
                <p className="stat-label">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '24px 24px', marginBottom: 16,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#f5c842">
                    <path d="M6 0.5L7.35 4.65H11.5L8.1 7.2L9.45 11.35L6 8.8L2.55 11.35L3.9 7.2L0.5 4.65H4.65L6 0.5Z" />
                  </svg>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.color}20, ${t.color}08)`,
                    border: `1.5px solid ${t.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: t.color,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{t.subject}</p>
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px', borderRadius: 999,
                  background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.22)',
                  fontFamily: 'Orbitron, sans-serif', fontSize: 13, fontWeight: 700, color: '#f5c842',
                }}>
                  {t.score} pts
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div style={{ display: 'flex', gap: 6 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                style={{
                  width: i === testimonialIdx ? 22 : 6, height: 6,
                  borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: i === testimonialIdx ? '#f5c842' : 'rgba(255,255,255,0.15)',
                  transition: 'width 0.2s cubic-bezier(0.23,1,0.32,1), background 0.15s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Team section */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 14, textTransform: 'uppercase' }}>
            Equipo Astra
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {team.map((member, i) => (
              <div
                key={i}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredTeam(i)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  style={{
                    width: 46, height: 46, borderRadius: '50%', cursor: 'default',
                    background: `linear-gradient(135deg, ${member.color}18, ${member.color}06)`,
                    border: `1.5px solid ${member.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: member.color,
                  }}
                >
                  {member.initials}
                </motion.div>
                {hoveredTeam === i && (
                  <div style={{
                    position: 'absolute', bottom: 54, left: '50%', transform: 'translateX(-50%)',
                    background: '#0c1d45', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, padding: '6px 12px', whiteSpace: 'nowrap', zIndex: 10,
                    pointerEvents: 'none',
                  }}>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11.5, fontWeight: 600, marginBottom: 1 }}>{member.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5 }}>{member.role}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT PANEL ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="login-right-panel"
        style={{
          flex: '0 0 42%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '48px 52px', position: 'relative', zIndex: 2,
        }}
      >
        {/* Glass card — blur only on the form, not the full panel */}
        <div style={{
          width: '100%', maxWidth: 380,
          background: 'rgba(3,10,26,0.60)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          padding: '40px 36px',
        }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700,
              color: 'white', marginBottom: 6, letterSpacing: '-0.01em',
            }}>
              Bienvenido de vuelta
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14 }}>
              Selecciona tu perfil para continuar
            </p>
          </div>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 28 }}>
            {roles.map(role => {
              const active = selectedRole === role.key;
              return (
                <motion.button
                  key={role.key}
                  onClick={() => handleRoleSelect(role)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    padding: '14px 8px', borderRadius: 12, cursor: 'pointer',
                    background: active ? role.accentBg : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${active ? role.accentBorder : 'rgba(255,255,255,0.07)'}`,
                    transition: 'background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: active ? `0 0 20px ${role.accentBg}` : 'none',
                  }}
                >
                  <role.Icon size={20} strokeWidth={1.6} style={{ color: active ? role.accentColor : 'rgba(255,255,255,0.35)' }} />
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: active ? role.accentColor : 'rgba(255,255,255,0.45)' }}>
                    {role.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="field-label" htmlFor="email">Correo electrónico</label>
              <FocusInput
                id="email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="usuario@centum.mx"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="password">Contraseña</label>
              <FocusInput
                id="password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    color: '#f87171', fontSize: 13, textAlign: 'center',
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    borderRadius: 8, padding: '8px 12px',
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="btn-fill"
              style={{ marginTop: 6, width: '100%', padding: '14px 22px', fontSize: 14, opacity: loading ? 0.65 : 1 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 15, height: 15, border: '2px solid rgba(245,200,66,0.3)', borderTopColor: '#f5c842', borderRadius: '50%' }}
                />
              ) : <span>Ingresar</span>}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.22)', fontSize: 12, marginTop: 28 }}>
            © 2025 Centum Astra · Todos los derechos reservados
          </p>
        </div>  {/* end glass card */}
      </motion.div>

      </div> {/* end panels wrapper */}
    </div>
  );
}
