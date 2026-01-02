"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CharactersContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [search, setSearch] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`https://swapi.py4e.com/api/people/?page=${page}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(fetched => {
        if (!cancelled) {
          setData(fetched);
          console.log(fetched);
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error('Failed to fetch characters:', err);
          setData({ results: [], next: null, previous: null });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page]);

  useEffect(() => {
    const filtered = data.results.filter(char => char.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredCharacters(filtered);
  }, [search, data.results]);

 const getId = (url) => url.split('/').slice(-2)[0];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center p-8">
      
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-[#FFE81F] drop-shadow-[0_0_20px_rgba(255,232,31,0.5)]" style={{fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em'}}>
            CHARACTERS
          </h1>
          <p className="text-gray-500 tracking-wider">Heroes and villains of the galaxy</p>
        </div>

        <div className="relative mb-8 w-full max-w-md">
          <input type="text" placeholder="🔍 Search characters..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-4 rounded-xl bg-gray-900 text-white border-2 border-gray-700 focus:border-[#FFE81F] focus:outline-none focus:shadow-[0_0_20px_rgba(255,232,31,0.3)] transition-all placeholder-gray-600"/> </div>

        {loading ? (
          <div className="text-[#FFE81F] text-xl animate-pulse">Loading characters...</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl">
              {filteredCharacters.map((character, index) => (
                <Link key={character.url} href={`/characters/${getId(character.url)}`}>
                  <div className="group relative w-[280px] h-[340px] rounded-2xl overflow-hidden inset-0 bg-gradient-to-br from-gray-900 to-black cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                    }}>

                    <div className="absolute inset-0 border-2 border-gray-700 rounded-2xl group-hover:border-[#FFE81F] group-hover:shadow-[0_0_30px_rgba(255,232,31,0.5)] transition-all"></div>
                    <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
                      <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-[#FFE81F] to-[#D4AF37] flex items-center justify-center text-3xl transform group-hover:scale-125 transition-all duration-300 shadow-[0_0_20px_rgba(255,232,31,0.3)]">
                        👤
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFE81F] transition-colors">
                        {character.name}
                      </h2>
                      <div className="space-y-2 text-gray-400">
                        <p className="flex items-center justify-center gap-2">
                          <span className="text-[#FFE81F]">⚥</span>
                          <span className="capitalize">{character.gender}</span>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                          <span className="text-[#FFE81F]">📅</span>
                          <span>{character.birth_year}</span>
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-[#FFE81F] opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl"></div>
                    </div>

                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#FFE81F] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#FFE81F] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex gap-6">
              {data.previous && (
                <Link href={`/characters?page=${Number(page) - 1}`}>
                  <button className="px-8 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all">
                    ← Previous
                  </button>
                </Link>
              )}
              {data.next && (
                <Link href={`/characters?page=${Number(page) + 1}`}>
                  <button className="px-8 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all">
                    Next →
                  </button>
                </Link>
              )}
            </div>
          </>
        )}

        <Link href="/">
          <button className="mt-8 px-6 py-2 border-2 border-gray-700 text-gray-400 rounded-xl hover:border-[#FFE81F] hover:text-[#FFE81F] hover:shadow-[0_0_20px_rgba(255,232,31,0.3)] transition-all">
            ← Back to Home
          </button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function Characters() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFE81F] text-xl animate-pulse">Loading...</div>
      </div>
    }>
      <CharactersContent />
    </Suspense>
  );
}