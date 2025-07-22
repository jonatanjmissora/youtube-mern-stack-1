export const fetchRM = {
    episodes: async () => {
        const res = await fetch('https://rickandmortyapi.com/api/episode')
        return await res.json()
      },
    episodeById: async (id: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        return await res.json()
      },
    characters: async () => {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        return await res.json()
      },
    characterById: async (id: string) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        return await res.json()
      }
}

export const ftt = {
    f: async () => {
      const res = await fetch('https://rickandmortyapi.com/api/episode')
          return await res.json()
    }
  }