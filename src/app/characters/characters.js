import React from 'react'
import Head from 'next/head';

export default async function Characters() {
  const res = await fetch('https://swapi.py4e.com/api/people/')
  const data = await res.json()
  console.log(data)
  
  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
        <meta name="description" content="A list of Star Wars characters fetched from the SWAPI." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <div className='min-h-screen w-full flex flex-wrap justify-around align-center gap-8'>
        {data.results.map(character => (
          <div key={character.url} className="w-[250px] h-[300px] rounded-3xl border-2 border-[#eefe0c] text-[#ffffff] flex flex-col justify-center items-center hover:bg-[#eefe0c] hover:text-[#000000] transition-all">
            <h1>{character.name}</h1>
            <h2>Gender: {character.gender}</h2>
            <p>Birth Year: {character.birth_year}</p>
          </div>
        ))}
      </div>
    </>
  )
}