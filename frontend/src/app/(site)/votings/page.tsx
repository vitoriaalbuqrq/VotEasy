import { SearchInput } from "./components/searchInput";
import { VotingCard } from "./components/card";

export default function Votings() {
  return (
    <main className="bg-gray-100 flex flex-col items-start justify-start min-h-[100vh]">
      <div className="w-full max-w-7xl mx-auto py-10 sm:px-20">
        <header className="mb-10">
          <h1 className="font-bold text-2xl text-start text-secondary">
            Votações públicas para você participar</h1>
        </header>
        <div className="flex gap-3 items-end my-8">
          {/* TODO: Exigir quantidade limitada de cards*/}
          <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Todas</p>
          <p className="font-medium text-gray-600 bg-gray-300 rounded-full px-3 py-1">Recentes</p>
          <SearchInput/>
        </div>
        <section className="flex gap-5 flex-wrap">
          <VotingCard 
            id={1}
            name="Votação para presidência"
            image="/"
            description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, illo rerum? Perspiciatis praesentium distinctio sdkfjhahf laksdjflh l adlfjl a djf l açldjf  adjf ç ajdfncvn.gf fglafjgn,cn"
            startDate="22 de mar"
            endDate="25 de mar"
          />
        </section>
      </div>
    </main>
  )
}