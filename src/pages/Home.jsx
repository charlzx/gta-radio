import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaMusic } from 'react-icons/fa';
import { MdRadio } from 'react-icons/md';

export default function Home() {
  return (
    <>
      {/* Background with VCS theme */}
      <div className="fixed inset-0 w-full h-full bg-cover bg-center" style={{ 
        backgroundImage: 'url(https://storage.googleapis.com/gtavcsradio/vicecitystories_bg.jpg)',
        zIndex: -2 
      }} />
      <div className="fixed inset-0 w-full h-full bg-black/70 backdrop-blur-sm" style={{ zIndex: -1 }} />

      <div className="min-h-screen text-white font-sans flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Logo/Title Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <MdRadio className="text-6xl text-pink-500" />
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
              GTA RADIO
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experience synchronized radio stations from across the Grand Theft Auto series. 
              Listen to the same tracks at the same time as other players worldwide.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
              <FaMusic className="text-3xl text-pink-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Synchronized Playback</h3>
              <p className="text-gray-400">All users hear the same track at the same time, just like real radio</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
              <MdRadio className="text-3xl text-cyan-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Multiple Games</h3>
              <p className="text-gray-400">Radio stations from Vice City Stories, Vice City, San Andreas and more</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
              <FaPlay className="text-3xl text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Live Experience</h3>
              <p className="text-gray-400">Full track information, mini player, and focus mode for immersive listening</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link 
              to="/radio"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaPlay className="text-lg" />
              <span>Start Listening</span>
            </Link>
          </div>

          {/* Current Status */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Currently featuring <span className="text-pink-400 font-semibold">Vice City Stories</span> stations with more games coming soon
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          background-color: #0c0c0c; 
        }
      `}</style>
    </>
  );
}