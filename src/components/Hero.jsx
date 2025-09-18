import Search from "./Search";

export default function Hero({ searchTerm, setSearchTerm }) {
  return (
    <header>
      <img src="/hero.png" alt="Movie discovery hero" />
      <h1 className="text-4xl p-6 sm:text-6xl">
        Find <span className="text-gradient">Movies</span> You'll Enjoy Without Hassle
      </h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

    </header>
  );
}
