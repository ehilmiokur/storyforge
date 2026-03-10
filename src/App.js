import { useState, useEffect } from "react";

const FilmGrain = () => (
  <svg style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',
    pointerEvents:'none',opacity:0.04,zIndex:100}}>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)"/>
  </svg>
);

const FilmStrip = ({ position }) => (
  <div data-testid={`film-strip-${position}`} style={{
    position:'fixed', [position]:0, left:0, right:0, height:'28px',
    background:'#0a0a0a',
    borderTop: position==='bottom'?'1px solid #2a2a2a':'none',
    borderBottom: position==='top'?'1px solid #2a2a2a':'none',
    display:'flex', alignItems:'center', zIndex:50, overflow:'hidden'
  }}>
    {Array.from({length:40}).map((_,i) => (
      <div key={i} style={{
        minWidth:'28px', height:'18px', border:'1px solid #333',
        margin:'0 4px', borderRadius:'1px', background:'#111', flexShrink:0
      }}/>
    ))}
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-4 my-6">
    <div style={{width:'80px', height:'1px',
      background:'linear-gradient(to right, transparent, #d4af37)'}}/>
    <div style={{width:'8px', height:'8px', border:'1px solid #d4af37',
      transform:'rotate(45deg)'}}/>
    <div style={{width:'80px', height:'1px',
      background:'linear-gradient(to left, transparent, #d4af37)'}}/>
  </div>
);

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
const LandingPage = ({ onEnter }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div
      data-testid="landing-page"
      style={{
        minHeight:'100vh', background:'#0c0b09',
        fontFamily:"'Playfair Display', Georgia, serif",
        position:'relative', overflow:'hidden'
      }}
      className="flex flex-col items-center justify-center"
    >
      <FilmGrain/>
      <FilmStrip position="top"/>
      <FilmStrip position="bottom"/>

      {/* Spotlight */}
      <div style={{
        position:'absolute', top:'-20%', left:'50%', transform:'translateX(-50%)',
        width:'600px', height:'600px', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
        pointerEvents:'none'
      }}/>

      {/* Top ornament */}
      <div style={{
        position:'absolute', top:'40px', left:'50%', transform:'translateX(-50%)',
        opacity: visible ? 0.6 : 0, transition:'opacity 1s ease 0.3s'
      }} className="flex items-center gap-3">
        <div style={{width:'60px', height:'1px',
          background:'linear-gradient(to right, transparent, #d4af37)'}}/>
        <div style={{width:'6px', height:'6px', background:'#d4af37', transform:'rotate(45deg)'}}/>
        <div style={{width:'60px', height:'1px',
          background:'linear-gradient(to left, transparent, #d4af37)'}}/>
      </div>

      {/* Main content */}
      <div
        data-testid="landing-content"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition:'all 1.2s cubic-bezier(0.16,1,0.3,1)'
        }}
        className="text-center z-10 px-5"
      >
        <p data-testid="landing-studio-label" style={{
          letterSpacing:'0.4em', fontSize:'10px', color:'#d4af37',
          textTransform:'uppercase', marginBottom:'24px',
          fontFamily:"'Crimson Text', Georgia, serif"
        }}>
          ✦ A Personal Story Studio ✦
        </p>

        <h1
          data-testid="landing-title"
          style={{
            fontSize:'clamp(56px, 10vw, 110px)', fontWeight:'700',
            color:'#f5f0e8', margin:'0', lineHeight:'0.9',
            textShadow:'0 0 80px rgba(212,175,55,0.15)',
            letterSpacing:'-0.02em'
          }}
        >
          Story<span style={{color:'#d4af37', fontStyle:'italic'}}>Forge</span>
        </h1>

        <Divider/>

        <p
          data-testid="landing-tagline"
          style={{
            fontSize:'clamp(14px, 2vw, 18px)', color:'#9a8f7e',
            letterSpacing:'0.15em', textTransform:'uppercase',
            fontFamily:"'Crimson Text', Georgia, serif", fontStyle:'italic',
            margin:'0 0 56px 0'
          }}
        >
          Where Every Scene Becomes a Legend
        </p>

        <button
          data-testid="landing-enter-button"
          onClick={onEnter}
          style={{
            background:'transparent', border:'1px solid #d4af37',
            color:'#d4af37', padding:'16px 48px', fontSize:'11px',
            letterSpacing:'0.3em', textTransform:'uppercase', cursor:'pointer',
            fontFamily:"'Playfair Display', Georgia, serif",
            transition:'all 0.4s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background='#d4af37';
            e.currentTarget.style.color='#0c0b09';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background='transparent';
            e.currentTarget.style.color='#d4af37';
          }}
        >
          Enter the Studio
        </button>

        <p
          data-testid="landing-footer"
          style={{
            marginTop:'40px', fontSize:'11px', color:'#4a4540',
            letterSpacing:'0.2em', textTransform:'uppercase'
          }}
        >
          Est. 2026 · OKUR Productions
        </p>
      </div>

      {/* Bottom ornament */}
      <div style={{
        position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)',
        opacity: visible ? 0.6 : 0, transition:'opacity 1s ease 0.5s'
      }} className="flex items-center gap-3">
        <div style={{width:'60px', height:'1px',
          background:'linear-gradient(to right, transparent, #d4af37)'}}/>
        <div style={{width:'6px', height:'6px', background:'#d4af37', transform:'rotate(45deg)'}}/>
        <div style={{width:'60px', height:'1px',
          background:'linear-gradient(to left, transparent, #d4af37)'}}/>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Crimson+Text:ital@0;1&display=swap');
      `}</style>
    </div>
  );
};

// ─── LOGIN PAGE ──────────────────────────────────────────────────────────────
const LoginPage = ({ onBack }) => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div
      data-testid="login-page"
      style={{
        minHeight:'100vh', background:'#0c0b09',
        fontFamily:"'Playfair Display', Georgia, serif",
        position:'relative', overflow:'hidden'
      }}
      className="flex flex-col items-center justify-center"
    >
      <FilmGrain/>
      <FilmStrip position="top"/>
      <FilmStrip position="bottom"/>

      <div style={{
        position:'absolute', top:'-10%', right:'10%',
        width:'400px', height:'400px', borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents:'none'
      }}/>

      <div
        data-testid="login-form-container"
        style={{
          width:'100%', maxWidth:'420px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition:'all 1s cubic-bezier(0.16,1,0.3,1)'
        }}
        className="z-10 px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <p data-testid="login-studio-label" style={{
            fontSize:'10px', letterSpacing:'0.4em', color:'#d4af37',
            textTransform:'uppercase', marginBottom:'16px'
          }}>✦ The Studio ✦</p>

          <h2
            data-testid="login-title"
            style={{fontSize:'42px', color:'#f5f0e8', margin:'0',
              fontWeight:'700', letterSpacing:'-0.02em'}}
          >
            Welcome Back
          </h2>

          <p data-testid="login-subtitle" style={{
            fontSize:'13px', color:'#6a6058', marginTop:'8px',
            fontStyle:'italic', fontFamily:"'Crimson Text', Georgia, serif"
          }}>
            Sign in to continue your story
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label style={{
              display:'block', fontSize:'9px', letterSpacing:'0.3em',
              textTransform:'uppercase', color:'#d4af37', marginBottom:'8px'
            }}>
              Email Address
            </label>
            <input
              data-testid="login-email-input"
              type="email"
              value={email}
              placeholder="you@storyforge.com"
              onChange={e => setEmail(e.target.value)}
              style={{
                width:'100%', background:'transparent', border:'none',
                borderBottom:'1px solid #2e2b26', color:'#f5f0e8',
                padding:'12px 0', fontSize:'15px', outline:'none',
                fontFamily:"'Crimson Text', Georgia, serif",
                boxSizing:'border-box', transition:'border-color 0.3s ease'
              }}
              onFocus={e => e.target.style.borderBottomColor='#d4af37'}
              onBlur={e => e.target.style.borderBottomColor='#2e2b26'}
            />
          </div>

          <div>
            <label style={{
              display:'block', fontSize:'9px', letterSpacing:'0.3em',
              textTransform:'uppercase', color:'#d4af37', marginBottom:'8px'
            }}>
              Password
            </label>
            <input
              data-testid="login-password-input"
              type="password"
              value={password}
              placeholder="••••••••••"
              onChange={e => setPassword(e.target.value)}
              style={{
                width:'100%', background:'transparent', border:'none',
                borderBottom:'1px solid #2e2b26', color:'#f5f0e8',
                padding:'12px 0', fontSize:'15px', outline:'none',
                fontFamily:"'Crimson Text', Georgia, serif",
                boxSizing:'border-box', transition:'border-color 0.3s ease'
              }}
              onFocus={e => e.target.style.borderBottomColor='#d4af37'}
              onBlur={e => e.target.style.borderBottomColor='#2e2b26'}
            />
          </div>

          <button
            data-testid="login-submit-button"
            style={{
              marginTop:'12px', background:'#d4af37', border:'none',
              color:'#0c0b09', padding:'16px', fontSize:'10px',
              letterSpacing:'0.3em', textTransform:'uppercase', cursor:'pointer',
              fontFamily:"'Playfair Display', Georgia, serif", fontWeight:'700',
              transition:'all 0.3s ease', width:'100%'
            }}
            onMouseEnter={e => e.currentTarget.style.background='#e8c84a'}
            onMouseLeave={e => e.currentTarget.style.background='#d4af37'}
          >
            Enter the Studio
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div style={{flex:1, height:'1px', background:'#1e1b18'}}/>
          <span style={{fontSize:'10px', color:'#4a4540', letterSpacing:'0.2em'}}>OR</span>
          <div style={{flex:1, height:'1px', background:'#1e1b18'}}/>
        </div>

        {/* Back link */}
        <div className="text-center">
          <button
            data-testid="login-back-button"
            onClick={onBack}
            style={{
              background:'none', border:'none', color:'#6a6058',
              fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase',
              cursor:'pointer', fontFamily:"'Playfair Display', Georgia, serif",
              transition:'color 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.color='#d4af37'}
            onMouseLeave={e => e.currentTarget.style.color='#6a6058'}
          >
            ← Back to Main Stage
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Crimson+Text:ital@0;1&display=swap');
        input::placeholder { color: #3a3530; }
      `}</style>
    </div>
  );
};

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('landing');
  if (page === 'login') return <LoginPage onBack={() => setPage('landing')}/>;
  return <LandingPage onEnter={() => setPage('login')}/>;
}