
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { fetchRM } from './fetchRM'

export default function RMCharactersPage() {
  const { status, data } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchRM.characters
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error :(</p>

  console.info(data)

  return (
    <div>
      <p className='text-xl font-bold'>Characters</p>
      <ul>
        {data.results.map((person: any) => {
          return (
            <li key={person.id}>
              <Link to={`/rickandmorty/characters/${person.id}`}>
                <div >
                  {person.name} - {person.gender}: {person.species}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}