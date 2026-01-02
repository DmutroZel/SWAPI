
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi.py4e.com/api/films/')
      .then(res => res.json())
      .then(data => {
        const sorted = data.results.sort((a, b) => a.episode_id - b.episode_id);
        setFilms(sorted);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching films:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center p-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-[#FFE81F] drop-shadow-[0_0_20px_rgba(255,232,31,0.5)]" style={{fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em'}}>
            FILMS
          </h1>
          <p className="text-gray-500 tracking-wider">The complete saga</p>
        </div>
        {loading ? (
          <div className="text-[#FFE81F] text-xl animate-pulse">Loading films...</div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-4xl">
            {films.map((film, index) => (
              <div key={film.url} onClick={() => setSelectedFilm(film)} className="group relative p-6 border-2 border-gray-700 rounded-2xl cursor-pointer hover:border-[#FFE81F] hover:shadow-[0_0_30px_rgba(255,232,31,0.3)] transition-all duration-300 bg-gradient-to-br from-gray-900 to-black overflow-hidden" style={{ animation: `fadeInFilm 0.5s ease-out ${index * 0.1}s both`}}>
                <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-[#FFE81F] flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(255,232,31,0.5)]">
                  {film.episode_id}
                </div>
                <div className="pr-16">
                  <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-[#FFE81F] transition-colors">
                    {film.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-gray-400 mb-3">
                    <p className="flex items-center gap-2">
                      <span className="text-[#FFE81F]">🎬</span>
                      <span>Director: {film.director}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#FFE81F]">📅</span>
                      <span>{film.release_date}</span>
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                    Click to read the opening crawl...
                  </p>
                </div>
                <div className="absolute inset-0 bg-[#FFE81F] opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl pointer-events-none"></div>
                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#FFE81F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#FFE81F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        )}

        <Link href="/">
          <button className="mt-8 px-6 py-2 border-2 border-gray-700 text-gray-400 rounded-xl hover:border-[#FFE81F] hover:text-[#FFE81F] hover:shadow-[0_0_20px_rgba(255,232,31,0.3)] transition-all">
            ← Back to Home
          </button>
        </Link>
      </div>

      {selectedFilm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50 p-4" onClick={() => setSelectedFilm(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl max-w-3xl w-full border-2 border-[#FFE81F] shadow-[0_0_50px_rgba(255,232,31,0.4)] max-h-[80vh] overflow-y-auto"onClick={e => e.stopPropagation()} style={{animation: 'modalOpen 0.3s ease-out'}}>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#FFE81F] flex items-center justify-center text-black font-bold text-3xl shadow-[0_0_30px_rgba(255,232,31,0.5)]">
                {selectedFilm.episode_id}
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-center text-[#FFE81F]" style={{fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.05em'}}>
              {selectedFilm.title}
            </h2>
            <div className="flex justify-center gap-6 mb-6 text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-[#FFE81F]">🎬</span>
                <span>{selectedFilm.director}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#FFE81F]">📅</span>
                <span>{selectedFilm.release_date}</span>
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-6">
              <h3 className="text-[#FFE81F] font-bold mb-3 text-center">Opening Crawl</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-center" style={{fontStyle: 'italic'}}>
                {selectedFilm.opening_crawl}
              </p>
            </div>

            <button onClick={() => setSelectedFilm(null)} className="w-full px-6 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all">
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInFilm {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalOpen {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}