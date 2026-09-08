import { useState } from 'react';
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
    accentBg: 'rgba(245,200,66,0.07)',
    accentBorder: 'rgba(245,200,66,0.2)',
  },
  {
    key: 'teacher',
    label: 'Profesor',
    Icon: GraduationCap,
    hint: 'sofia@centum.mx / prof123',
    accentColor: '#93c5fd',
    accentBg: 'rgba(96,165,250,0.07)',
    accentBorder: 'rgba(96,165,250,0.2)',
  },
  {
    key: 'student',
    label: 'Alumno',
    Icon: Rocket,
    hint: 'ana@centum.mx / alu123',
    accentColor: '#5eead4',
    accentBg: 'rgba(45,212,191,0.07)',
    accentBorder: 'rgba(45,212,191,0.2)',
  },
];

/* ── Animated focus underline on inputs ─── */
function FocusInput({ type = 'text', value, onChange, placeholder, id }) {
  const [focused,  setFocused]  = useState(false);
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
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [loading,      setLoading]      = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  function handleRoleSelect(role) {
    setSelectedRole(role.key);
    setEmail(role.hint.split(' / ')[0]);
    setPassword(role.hint.split(' / ')[1]);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login(email, password);
    setLoading(false);
  }

  /* stagger container — one orchestrated entrance */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      background: '#030a1a',
    }}>
      <PublicNav />

      {/* ── Background layers ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${import.meta.env.BASE_URL}timrael-space-4984262_1920.jpg)`,
        backgroundSize: 'cover', backgroundPosition: 'center 20%',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${import.meta.env.BASE_URL}timrael-space-4984262_1920.jpg)`,
        backgroundSize: '160%', backgroundPosition: 'center 55%',
        opacity: 0.35, mixBlendMode: 'screen',
      }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'rgba(3,10,26,0.58)' }} />

      {/* Subtle gold nebula — passive, no animation */}
      <div style={{
        position: 'absolute', top: '25%', left: '25%',
        width: '50vw', height: '50vw', zIndex: 0,
        background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── PANELS WRAPPER ── */}
      <div style={{ display: 'flex', flex: 1, paddingTop: 60 }}>

        {/* ── LEFT PANEL ── */}
        <motion.div
          className="login-left-panel"
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            flex: '0 0 58%', padding: '52px 64px 48px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative', zIndex: 2,
          }}
        >
          {/* Brand mark */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 64 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: 'linear-gradient(135deg, #b8880f 0%, #f5c842 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 22px rgba(245,200,66,0.28)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L9.8 6.2H15.2L10.7 9.4L12.5 14.6L8 11.4L3.5 14.6L5.3 9.4L0.8 6.2H6.2L8 1Z" fill="#030a1a" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 11.5, fontWeight: 700, color: 'white', letterSpacing: '0.14em', lineHeight: 1.2 }}>CENTUM</p>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 9.5, fontWeight: 500, color: '#f5c842', letterSpacing: '0.16em', lineHeight: 1.2 }}>ASTRA</p>
            </div>
          </motion.div>

          {/* Hero headline — Syne, mixed case, editorial */}
          <motion.div variants={item} style={{ marginBottom: 28, position: 'relative' }}>
            {/* Blur nebuloso dorado detrás del headline */}
            <div style={{
              position: 'absolute',
              top: '30%', left: '-8%',
              width: '60%', height: '120%',
              background: 'radial-gradient(ellipse at 40% 50%, rgba(245,200,66,0.13) 0%, transparent 70%)',
              filter: 'blur(32px)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <h1
              className="resp-hero-h1"
              style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 54, lineHeight: 1.0, letterSpacing: '-0.03em',
                color: 'white', marginBottom: 20,
                position: 'relative', zIndex: 1,
              }}
            >
              Domina el EXANI-II.<br />
              <span style={{
                background: 'linear-gradient(90deg, #b8880f 0%, #f5c842 45%, #fde68a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 800,
              }}>
                Vive tu vocación.
              </span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.45)', fontSize: 15.5, lineHeight: 1.75,
              maxWidth: 400, fontWeight: 400,
              position: 'relative', zIndex: 1,
            }}>
              La plataforma que prepara a los mejores aspirantes a carreras de salud — metodología probada, simuladores reales.
            </p>
          </motion.div>

          {/* Stats — quiet, typographic */}
          <motion.div variants={item} style={{ display: 'flex', gap: 36, marginBottom: 0 }}>
            {[
              { val: '95 %', label: 'tasa de aprobación' },
              { val: '500+', label: 'alumnos activos' },
              { val: '5 años', label: 'de experiencia' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: 'white', lineHeight: 1, marginBottom: 5 }}>
                  {s.val}
                </p>
                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.32)', fontWeight: 400, letterSpacing: '0.01em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="login-right-panel"
          style={{
            flex: '0 0 42%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '48px 48px', position: 'relative', zIndex: 2,
          }}
        >
          <div style={{
            width: '100%', maxWidth: 372,
            background: 'rgba(3,10,26,0.55)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18,
            padding: '36px 32px',
          }}>
            {/* Form header */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700,
                color: 'white', marginBottom: 5, letterSpacing: '-0.02em',
              }}>
                Bienvenido
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13.5, lineHeight: 1.5 }}>
                Selecciona tu perfil para continuar
              </p>
            </div>

            {/* Role selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 26 }}>
              {roles.map(role => {
                const active = selectedRole === role.key;
                return (
                  <motion.button
                    key={role.key}
                    onClick={() => handleRoleSelect(role)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                      padding: '13px 8px', borderRadius: 10, cursor: 'pointer',
                      background: active ? role.accentBg : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${active ? role.accentBorder : 'rgba(255,255,255,0.06)'}`,
                      transition: 'background 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    <role.Icon
                      size={18}
                      strokeWidth={1.6}
                      style={{ color: active ? role.accentColor : 'rgba(255,255,255,0.3)', transition: 'color 0.15s ease' }}
                    />
                    <span style={{
                      fontSize: 11, fontWeight: 500,
                      color: active ? role.accentColor : 'rgba(255,255,255,0.38)',
                      transition: 'color 0.15s ease',
                    }}>
                      {role.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                      color: '#f87171', fontSize: 12.5, textAlign: 'center',
                      background: 'rgba(248,113,113,0.06)',
                      border: '1px solid rgba(248,113,113,0.15)',
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
                style={{ marginTop: 4, width: '100%', padding: '13px 22px', opacity: loading ? 0.6 : 1 }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 14, height: 14, border: '2px solid rgba(245,200,66,0.25)', borderTopColor: '#f5c842', borderRadius: '50%' }}
                  />
                ) : 'Ingresar'}
              </button>
            </form>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.18)', fontSize: 11.5, marginTop: 24 }}>
              © 2025 Centum Astra · Todos los derechos reservados
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
