"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.py4e.com/api/people/${id}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Character not found');
        }
        return res.json();
      })
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFE81F] text-xl animate-pulse">Loading character...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-[#FFE81F] text-xl">Error: {error}</div>
        <Link href="/characters">
          <button className="mt-8 px-6 py-2 border-2 border-gray-700 text-gray-400 rounded-xl hover:border-[#FFE81F] hover:text-[#FFE81F] hover:shadow-[0_0_20px_rgba(255,232,31,0.3)] transition-all">
            ← Back to Characters
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-8 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 text-[#FFE81F] drop-shadow-[0_0_20px_rgba(255,232,31,0.5)]" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.1em' }}>
            {character.name}
          </h1>
          <p className="text-gray-500 tracking-wider">Character Profile</p>
        </div>

        <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 border-[#FFE81F] p-8 shadow-[0_0_30px_rgba(255,232,31,0.5)]">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-[#FFE81F] to-[#D4AF37] flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(255,232,31,0.3)]">
              👤
            </div>
            <div className="text-white text-center space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">⚥ Gender:</span>
                  <span className="capitalize">{character.gender}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">📅 Birth Year:</span>
                  <span>{character.birth_year}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">📏 Height:</span>
                  <span>{character.height} cm</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">⚖️ Mass:</span>
                  <span>{character.mass} kg</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">👁️ Eye Color:</span>
                  <span className="capitalize">{character.eye_color}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">💇 Hair Color:</span>
                  <span className="capitalize">{character.hair_color}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#FFE81F]">🎨 Skin Color:</span>
                  <span className="capitalize">{character.skin_color}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#FFE81F]"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#FFE81F]"></div>
        </div>

        <Link href="/characters">
          <button className="mt-8 px-6 py-2 border-2 border-gray-700 text-gray-400 rounded-xl hover:border-[#FFE81F] hover:text-[#FFE81F] hover:shadow-[0_0_20px_rgba(255,232,31,0.3)] transition-all">
            ← Back to Characters
          </button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes moveStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }

        .stars {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 779px 1331px #FFE81F, 324px 42px #FFF, 303px 586px #FFF, 1312px 276px #FFE81F, 451px 625px #FFF, 521px 1931px #FFF, 1087px 1871px #FFE81F, 36px 1546px #FFF, 132px 934px #FFF, 1698px 901px #FFE81F, 1418px 664px #FFF, 1448px 1157px #FFF, 1084px 232px #FFE81F, 347px 1776px #FFF, 1722px 243px #FFF, 1629px 835px #FFE81F, 479px 969px #FFF, 1231px 960px #FFF, 586px 384px #FFE81F, 164px 527px #FFF;
          animation: moveStars 100s linear infinite;
        }

        .stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: 779px 1331px #FFF, 324px 42px #FFE81F, 303px 586px #FFF, 1312px 276px #FFF, 451px 625px #FFE81F, 521px 1931px #FFF, 1087px 1871px #FFF, 36px 1546px #FFE81F, 132px 934px #FFF, 1698px 901px #FFF;
          animation: moveStars 150s linear infinite;
        }

        .stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: 779px 1331px #FFE81F, 324px 42px #FFF, 303px 586px #FFF, 1312px 276px #FFE81F, 451px 625px #FFF;
          animation: moveStars 200s linear infinite;
        }
      `}</style>
    </div>
  );
}