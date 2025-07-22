import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { fetchRM } from "./fetchRM";

export default function RMEpisodesPage() {

  const { data, status, error } = useQuery({
    queryKey: ["episodes"],
    queryFn: fetchRM.episodes
  })

  if (status === "pending") {
    return <p>Loading...</p>
  }
  if (status === "error") {
    return <p>Error : {error.message}</p>
  }

  return (
    <div>
      <p className="text-xl font-bold">Episodes</p>
      <ul>
        {data.results.map((episode: any) => (
          <li key={episode.id}>
            <Link to={`/rickandmorty/episodes/${episode.id}`}>
              <div >
                {episode.episode} - {episode.name} <em>{episode.air_date}</em>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
