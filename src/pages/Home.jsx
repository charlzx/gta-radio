import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdRadio, MdLiveTv } from 'react-icons/md';
import { FaPlay, FaGamepad, FaUsers, FaBolt } from 'react-icons/fa';
import { SiReact, SiVite, SiTailwindcss } from 'react-icons/si';
import { games as gamesData } from '../data/games';

const LiveBadge = () => (
  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-mono whitespace-nowrap">
    <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
    LIVE
  </span>
);

const Stat = ({ value, label }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <div className="text-2xl font-black text-white">{value}</div>
    <div className="text-xs tracking-wider uppercase text-white/60">{label}</div>
  </div>
);

export default function Home() {
  const hasPlayableSource = (station) => !!(station?.youtubeUrl || station?.audioUrl);

  // Removed unused formatGameName function

  const gameList = useMemo(() => Object.values(gamesData), []);
  const playableStations = useMemo(() => {
    const all = Object.values(gamesData).flatMap((g) =>
      (g.stations || []).filter((s) => hasPlayableSource(s))
    );
    return all.slice(0, 6);
  }, []);

  return (
  <div className="relative min-h-screen bg-black text-white">
      {/* Animated particles background */}
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden animate-parallax-slow opacity-30 sm:opacity-40 lg:opacity-60">
        {/* Generate particles using absolute positioned divs */}
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-particle-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${(Math.random() * 2 + 1.5).toFixed(2)}px`,
              height: `${(Math.random() * 2 + 1.5).toFixed(2)}px`,
              backgroundColor: [
                'rgba(255,255,255,0.16)',
                'rgba(255,105,180,0.18)',
                'rgba(139,69,19,0.12)'
              ][i % 3],
              boxShadow: '0 0 6px rgba(255,255,255,0.04)',
              willChange: 'transform, opacity',
              animationDelay: `${(Math.random() * 10).toFixed(2)}s`
            }}
          />
        ))}
      </div>

      {/* Ambient animated background */}
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-40 w-[38rem] h-[38rem] rounded-full bg-pink-600/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[42rem] h-[42rem] rounded-full bg-purple-700/20 blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[24rem] h-[24rem] rounded-full bg-cyan-500/10 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-10 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <LiveBadge />
              <span className="text-xs text-white/60">Synchronized global playback</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none">
              GTA Radio
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Authentic Grand Theft Auto radio stations, perfectly in sync — like real radio. Tune in and hear what everyone else is hearing right now.
            </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/radio"
        className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 transition-colors font-semibold shadow-lg shadow-pink-500/20"
              >
                <MdRadio className="text-xl" /> Start Listening
              </Link>
              <a
                href="#live-now"
        className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                <FaPlay className="text-sm" /> See what's live
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <Stat value="24/7" label="Streaming" />
              <Stat value={`${playableStations.length}+`} label="Stations" />
              <Stat value="100%" label="Sync" />
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-4 sm:p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs sm:text-sm text-white/70">Tuner</div>
                <LiveBadge />
              </div>
              <div className="mt-3 sm:mt-4 h-32 sm:h-40 rounded-lg bg-black/50 border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:18px_18px] sm:bg-[size:20px_20px]" />
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                      {['Flash FM','V-Rock','Emotion 98.3','Wave 103','Paradise FM','VCPR'].map((n) => (
                        <div key={n} className="px-6 sm:px-8 text-pink-400 font-bold text-lg sm:text-xl">{n}</div>
                      ))}
                      {['Flash FM','V-Rock','Emotion 98.3','Wave 103','Paradise FM','VCPR'].map((n, i) => (
                        <div key={`${n}-dup-${i}`} className="px-6 sm:px-8 text-pink-400 font-bold text-lg sm:text-xl">{n}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-pink-500 to-transparent" />
              </div>
              <div className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-white/60">Auto-tuning across stations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle divider */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Live now */}
  <section id="live-now" className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 max-[500px]:flex-col max-[500px]:items-stretch max-[500px]:gap-2">
            <div className="max-[500px]:order-1">
              <h2 className="text-2xl md:text-3xl font-bold">Live now</h2>
              <p className="text-white/60 text-sm">Stations you can jump into immediately</p>
            </div>
            <Link
              to="/radio"
              className="text-pink-400 hover:text-pink-300 text-sm max-[500px]:order-2 max-[500px]:inline-flex max-[500px]:items-center max-[500px]:justify-center max-[500px]:px-4 max-[500px]:py-2 max-[500px]:rounded-lg max-[500px]:bg-gradient-to-r max-[500px]:from-pink-600 max-[500px]:to-purple-600 max-[500px]:text-white max-[500px]:shadow-lg max-[500px]:shadow-pink-500/20 max-[500px]:w-full" 
            >
              Open full player →
            </Link>
          </div>

          {playableStations.length === 0 ? (
            <div className="text-white/60">No live stations yet.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              {playableStations.map((s) => (
                <Link key={s.id} to="/radio" className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  <img src={s.logo} alt={s.name} className="aspect-square w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="text-sm font-semibold">{s.name}</div>
                    <div className="text-[10px] text-white/70">Click to listen</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subtle divider */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Games */}
  <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Choose your era</h2>
            <p className="text-white/60 max-w-2xl mx-auto">From Vice City Stories to Los Santos — the stations you remember, presented with a modern player.</p>
          </div>

          <div className="grid grid-cols-2 max-[500px]:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {gameList.map((g) => {
              const isLive = (g.stations || []).some((s) => hasPlayableSource(s));
              return (
                <div
                  key={g.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 transition-colors"
                >
                  {/* Background image layer */}
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundImage: `url(${g.banner})`,
                      backgroundSize: '120%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  
                  {/* Dark overlay for better text readability - covers entire card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40 rounded-xl" />
                  
                  <div className="relative p-3 sm:p-4 md:p-5 flex flex-col h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 justify-between z-10">
                    <div className="flex items-center justify-end">
                      {isLive ? <LiveBadge /> : (
                        <span className="text-xs px-2 py-1 rounded-full bg-black/60 border border-white/20 text-white whitespace-nowrap">Coming soon</span>
                      )}
                    </div>

                    {/* Remove the banner image section since it's now the background */}
                    <div className="flex-1" />

                    <div className="flex items-center justify-between">
                      <div className="text-[11px] sm:text-xs text-white/70">
                        {(g.stations || []).length} stations
                      </div>
                      <Link
                        to="/radio"
                        className={`inline-flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${isLive ? 'bg-pink-600 hover:bg-pink-500' : 'bg-black/60 hover:bg-black/50 border border-white/20 text-white'}`}
                      >
                        <MdRadio /> {isLive ? 'Listen' : 'Explore'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subtle divider */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Features */}
  <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-pink-400 text-3xl"><MdLiveTv /></div>
            <h3 className="mt-3 text-lg font-bold">Synchronized playback</h3>
            <p className="text-white/70 text-sm mt-1">We use a global epoch so everyone hears the same moment together.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-purple-400 text-3xl"><FaGamepad /></div>
            <h3 className="mt-3 text-lg font-bold">Series-wide coverage</h3>
            <p className="text-white/70 text-sm mt-1">Classic stations across GTA entries, growing over time.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="text-cyan-400 text-3xl"><FaUsers /></div>
            <h3 className="mt-3 text-lg font-bold">Community vibes</h3>
            <p className="text-white/70 text-sm mt-1">Discover tracks, share moments, and relive the nostalgia together.</p>
          </div>
        </div>
      </section>

      {/* Subtle divider */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to tune in?</h2>
          <p className="text-white/70 mt-2">Jump into the live player and start listening now.</p>
          <Link
            to="/radio"
            className="mt-6 inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 font-semibold shadow-lg shadow-pink-500/20"
          >
            <MdRadio className="text-xl" /> Open Player
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-white/80 max-[500px]:flex-col max-[500px]:items-center">
            <span className="text-xs sm:text-sm max-[500px]:w-full max-[500px]:text-center">Built with</span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
              <SiReact className="text-cyan-300" /> <span>React</span>
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
              <SiVite className="text-purple-300" /> <span>Vite</span>
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
              <SiTailwindcss className="text-sky-300" /> <span>Tailwind CSS</span>
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-white/60 text-center md:text-right max-w-2xl">
            GTA Radio is a fan-made project. Not affiliated with Rockstar Games or Take-Two Interactive. For educational purposes only.
          </p>
        </div>
      </footer>

      <style>{`
        .animate-marquee { animation: marquee 22s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-float-slow { animation: float 16s ease-in-out infinite; }
        .animate-float-slower { animation: float 22s ease-in-out infinite reverse; }
        @keyframes float { 0% { transform: translateY(0) } 50% { transform: translateY(-20px) } 100% { transform: translateY(0) } }
        
        /* Particle animations */
  .animate-float-particle-1 { animation: floatParticle1 9s ease-in-out infinite; }
  .animate-float-particle-2 { animation: floatParticle2 13s ease-in-out infinite; }
  .animate-float-particle-3 { animation: floatParticle3 11s ease-in-out infinite; }
        
        @keyframes floatParticle1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          33% { transform: translate(10px, -14px) scale(1.15); opacity: 0.45; }
          66% { transform: translate(-7px, 10px) scale(0.9); opacity: 0.9; }
        }
        
        @keyframes floatParticle2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(-10px, -10px) scale(1.08); opacity: 0.8; }
          50% { transform: translate(12px, 4px) scale(0.95); opacity: 0.35; }
          75% { transform: translate(-6px, 14px) scale(1.18); opacity: 0.75; }
        }
        
        @keyframes floatParticle3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          40% { transform: translate(14px, -10px) scale(0.85); opacity: 0.55; }
          80% { transform: translate(-12px, 8px) scale(1.1); opacity: 0.9; }
        }

        /* Slow parallax pan for the whole particle layer */
        .animate-parallax-slow { animation: parallaxPan 60s ease-in-out infinite alternate; }
        @keyframes parallaxPan {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-20px, -12px, 0) scale(1.005); }
          100% { transform: translate3d(20px, 12px, 0) scale(1); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float-particle-1, .animate-float-particle-2, .animate-float-particle-3 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}