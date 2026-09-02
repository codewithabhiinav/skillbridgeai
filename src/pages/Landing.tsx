import { useNavigate } from 'react-router-dom';
import { 
  Zap, GraduationCap, Building2, Landmark, BookOpen,
  Brain, Target, TrendingUp, ArrowRight,
  CheckCircle2, Users, Briefcase, Sparkles
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      {/* Hero */}
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={28} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
            SKILL<span style={{ color: 'var(--color-accent)' }}>BRIDGE</span> AI
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-ghost" style={{ color: 'var(--color-text-muted)' }} onClick={() => navigate('/demo')}>
            Demo Login
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/demo')}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '80px 40px 60px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div className="animate-fade-in" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          background: 'rgba(6, 182, 212, 0.1)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          marginBottom: '32px',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-accent)',
          fontWeight: 600,
        }}>
          <Sparkles size={16} />
          Smart India Hackathon 2026 | SIH26044 | Team DOOMED MINDS
        </div>

        <h1 className="animate-slide-up" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          Bridge Skills.<br />
          Discover Opportunities.<br />
          <span className="text-gradient">Build Careers.</span>
        </h1>

        <p className="animate-slide-up delay-1" style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text-muted)',
          maxWidth: '680px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          An intelligent Academia–Industry collaboration ecosystem for skill assessment, 
          personalized learning, internships and placement.
        </p>

        <div className="animate-slide-up delay-2" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/demo')}>
            Explore Platform <ArrowRight size={18} />
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/demo')} style={{
            color: 'var(--color-accent)',
            borderColor: 'rgba(6, 182, 212, 0.4)',
          }}>
            Demo Login
          </button>
        </div>
      </section>

      {/* Ecosystem Flow */}
      <section className="animate-slide-up delay-3" style={{
        maxWidth: '900px',
        margin: '0 auto 80px',
        padding: '0 40px',
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-dark)',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          {[
            { icon: GraduationCap, label: 'Student', sublabel: 'Profile & Skills' },
            { icon: Brain, label: 'Skill Intelligence', sublabel: 'AI Assessment' },
            { icon: BookOpen, label: 'Learning', sublabel: 'Personalized Path' },
            { icon: Target, label: 'Opportunity', sublabel: 'Smart Matching' },
            { icon: Building2, label: 'Industry', sublabel: 'Recruitment' },
          ].map((item, i) => (
            <div key={item.label}>
              <div style={{ textAlign: 'center', flex: '1 1 100px', minWidth: '100px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(6, 182, 212, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <item.icon size={24} style={{ color: 'var(--color-accent)' }} />
                </div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                  {item.label}
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
                  {item.sublabel}
                </div>
              </div>
              {i < 4 && (
                <ArrowRight size={20} style={{ color: 'var(--color-border-dark)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto 80px',
        padding: '0 40px',
      }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '16px', fontSize: 'var(--font-size-3xl)' }}>
          Built for Every Stakeholder
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          A comprehensive platform connecting students, industry, institutions, and academia through intelligent skill mapping.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: GraduationCap,
              title: 'Students',
              desc: 'Assess skills, discover gaps, get personalized learning paths, and find matching opportunities.',
              color: 'var(--color-accent)',
              bg: 'rgba(6, 182, 212, 0.08)',
            },
            {
              icon: Building2,
              title: 'Industry',
              desc: 'Post opportunities, view AI-ranked candidates, make data-driven hiring decisions.',
              color: 'var(--color-accent-blue)',
              bg: 'rgba(59, 130, 246, 0.08)',
            },
            {
              icon: Landmark,
              title: 'Institutions',
              desc: 'Track student readiness, analyze skill gaps, monitor placement trends.',
              color: 'var(--color-accent-purple)',
              bg: 'rgba(139, 92, 246, 0.08)',
            },
            {
              icon: BookOpen,
              title: 'Academicians',
              desc: 'Browse FDP, research collaborations, guest lectures, and industry projects.',
              color: 'var(--color-accent-green)',
              bg: 'rgba(16, 185, 129, 0.08)',
            },
          ].map((feat) => (
            <div key={feat.title} style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-dark)',
              padding: '32px 24px',
              transition: 'all var(--transition-base)',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: feat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <feat.icon size={22} style={{ color: feat.color }} />
              </div>
              <h3 style={{ color: 'white', fontSize: 'var(--font-size-lg)', marginBottom: '8px' }}>
                {feat.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto 80px',
        padding: '0 40px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(6, 182, 212, 0.15)',
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          textAlign: 'center',
        }}>
          {[
            { value: '10,000+', label: 'Students Assessed', icon: Users },
            { value: '500+', label: 'Companies', icon: Building2 },
            { value: '2,500+', label: 'Opportunities', icon: Briefcase },
            { value: '92%', label: 'Placement Rate', icon: TrendingUp },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 900,
                color: 'white',
                marginBottom: '4px',
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto 80px',
        padding: '0 40px',
      }}>
        <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '48px', fontSize: 'var(--font-size-2xl)' }}>
          Powered by Smart Automation
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            'AI-Powered Skill Assessment',
            'Transparent Match Scoring',
            'Personalized Learning Paths',
            'Explainable Recommendations',
            'Skill Gap Heatmaps',
            'Real-time Analytics Dashboard',
            'Digital Student Portfolio',
            'Industry Collaboration Hub',
          ].map((feature) => (
            <div key={feature} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border-dark)',
            }}>
              <CheckCircle2 size={18} style={{ color: 'var(--color-accent-green)', flexShrink: 0 }} />
              <span style={{ color: 'var(--color-text-light)', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center',
        padding: '60px 40px 80px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <h2 style={{ color: 'white', marginBottom: '16px', fontSize: 'var(--font-size-3xl)' }}>
          Ready to Bridge the Skill Gap?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
          Experience the future of academia–industry collaboration.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/demo')}>
          Try Demo Now <ArrowRight size={18} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border-dark)',
        padding: '32px 40px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <Zap size={20} style={{ color: 'var(--color-accent)' }} />
          <span style={{ fontWeight: 800, color: 'white', fontSize: 'var(--font-size-base)' }}>
            SKILL<span style={{ color: 'var(--color-accent)' }}>BRIDGE</span> AI
          </span>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>
          Smart India Hackathon 2026 · Problem: SIH26044 · Theme: Smart Automation
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '4px' }}>
          Built with ❤️ by Team DOOMED MINDS
        </p>
      </footer>
    </div>
  );
}
