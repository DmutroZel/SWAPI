"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-12 px-4">
        <div className="text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 text-[#FFE81F] drop-shadow-[0_0_30px_rgba(255,232,31,0.5)]" style={{fontFamily: 'Arial Black, sans-serif', }}>
            STAR WARS
          </h1>
          <p className="text-xl text-[#FFE81F] tracking-[0.3em] font-light">EXPLORER</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
          <Link href="/characters">
            <div className="group relative w-[280px] h-[280px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0  from-gray-900 to-black"></div>
              <div className="absolute inset-0 border-2 border-[#FFE81F] rounded-2xl group-hover:shadow-[0_0_40px_rgba(255,232,31,0.8)] transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-6 transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]">
                  👨‍🚀
                </div>
                <h2 className="text-3xl font-bold tracking-wide text-[#FFE81F]">CHARACTERS</h2>
                <p className="text-sm mt-3 text-gray-400">Explore the heroes</p>
              </div>
              <div className="absolute inset-0 bg-[#FFE81F] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
          </Link>

          <Link href="/planets">
            <div className="group relative w-[280px] h-[280px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 from-gray-900 to-black"></div>
              <div className="absolute inset-0 border-2 border-[#FFE81F] rounded-2xl group-hover:shadow-[0_0_40px_rgba(255,232,31,0.8)] transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-180 transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]">
                  🌍
                </div>
                <h2 className="text-3xl font-bold tracking-wide text-[#FFE81F]">PLANETS</h2>
                <p className="text-sm mt-3 text-gray-400">Discover new worlds</p>
              </div>
              <div className="absolute inset-0 bg-[#FFE81F] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
          </Link>

          <Link href="/films">
            <div className="group relative w-[280px] h-[280px] rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 from-gray-900 to-black"></div>
              <div className="absolute inset-0 border-2 border-[#FFE81F] rounded-2xl group-hover:shadow-[0_0_40px_rgba(255,232,31,0.8)] transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-6 transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]">
                  🎬
                </div>
                <h2 className="text-3xl font-bold tracking-wide text-[#FFE81F]">FILMS</h2>
                <p className="text-sm mt-3 text-gray-400">Watch the saga</p>
              </div>
              <div className="absolute inset-0 bg-[#FFE81F] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
          </Link>
        </div>
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