import { Route, Routes } from 'react-router'
import './_styles/index.css'
import HomePage from './NOTES/home-page'
import CreateNotePage from './NOTES/note-create'
import DetailNotePage from './NOTES/note-detail'
import Header from './components/Header'
import Footer from './components/Footer'
import RickAndMortyPage from './RICKandMORTY/RickAndMortyPage'
import RMEpisodesPage from './RICKandMORTY/RMEpisodesPage'
import RMCharactersPage from './RICKandMORTY/RMCharactersPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Episode from './RICKandMORTY/Episode'
import Character from './RICKandMORTY/Character'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="page-layout">

        <Header />

        <div className='flex-1'>

          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/createNote'
              element={<CreateNotePage />}
            />
            <Route
              path='/note/:id'
              element={<DetailNotePage />}
            />
            <Route
              path='/rickandmorty'
              element={<RickAndMortyPage />}
            />
            <Route
              path='/rickandmorty/episodes'
              element={<RMEpisodesPage />}
            />
            <Route
              path="/rickandmorty/episodes/:episodeId"
              element={<Episode />}
            />
            <Route
              path='/rickandmorty/characters'
              element={<RMCharactersPage />}
            />
            <Route
              path="/rickandmorty/characters/:characterId"
              element={<Character />}
            />
          </Routes>

        </div>

        <Footer />

      </div>
    </QueryClientProvider>
  )
}

export default App
