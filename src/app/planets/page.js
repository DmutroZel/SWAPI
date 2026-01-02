'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Planets() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [data, setData] = useState({ results: [], next: null, previous: null });
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.py4e.com/api/planets/?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
        setLoading(false);
      });
  }, [page]);

  const sortedPlanets = [...data.results].sort((a, b) => {
    const popA = a.population === 'unknown' ? -1 : parseInt(a.population);
    const popB = b.population === 'unknown' ? -1 : parseInt(b.population);
    return sortOrder === 'asc' ? popA - popB : popB - popA;
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">

      <div className="relative z-10 flex flex-col items-center p-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-[#FFE81F] drop-shadow-[0_0_20px_rgba(255,232,31,0.5)]" style={{fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em'}}>
            PLANETS
          </h1>
          <p className="text-gray-500 tracking-wider">Worlds across the galaxy</p>
        </div>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="mb-8 px-8 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all flex items-center gap-2">
          <span>📊</span>
          Sort by Population: {sortOrder === 'asc' ? '↑ Increase' : '↓ Decrease'}
        </button>

        {loading ? (
          <div className="text-[#FFE81F] text-xl ">Loading planets...</div>
        ) : (
          <>
            <div className="w-full max-w-6xl bg-gray-900/80 rounded-2xl border-2 border-gray-700 overflow-hidden shadow-[0_0_30px_rgba(255,232,31,0.1)]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFE81F]">
                    <th className="p-4 text-left text-black font-bold">🌍 Planet Name</th>
                    <th className="p-4 text-left text-black font-bold">👥 Population</th>
                    <th className="p-4 text-left text-black font-bold">🌡️ Climate</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlanets.map((planet, index) => (
                    <tr 
                      key={planet.url} 
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-all duration-300 group"
                      style={{
                        animation: `fadeInRow 0.5s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFE81F] to-[#D4AF37] flex items-center justify-center text-xl transform group-hover:scale-110 group-hover:rotate-180 transition-all duration-300 shadow-[0_0_15px_rgba(255,232,31,0.3)]">
                            🪐
                          </div>
                          <span className="text-white font-semibold group-hover:text-[#FFE81F] transition-colors">
                            {planet.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
                          {planet.population === 'unknown' ? 'Unknown' : Number(planet.population).toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm capitalize border border-gray-700 group-hover:border-[#FFE81F] group-hover:text-[#FFE81F] transition-colors">
                          {planet.climate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 flex gap-6">
              {data.previous && (
                <a href={`/planets?page=${Number(page) - 1}`}>
                  <button className="px-8 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all">
                    ← Previous
                  </button>
                </a>
              )}
              {data.next && (
                <a href={`/planets?page=${Number(page) + 1}`}>
                  <button className="px-8 py-3 bg-[#FFE81F] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,232,31,0.6)] transform hover:scale-105 transition-all">
                    Next →
                  </button>
                </a>
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
        @keyframes fadeInRow {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}