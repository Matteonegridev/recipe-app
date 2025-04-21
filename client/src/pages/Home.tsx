import Card from "../components/Card";
import useFetchRecipes from "../hooks/useFetchRecipes";
import Hero from "../layout/Hero";

function Home() {
  const { data, isLoading } = useFetchRecipes();

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div>
      <Hero />
      <main className="mt-90 px-12 pb-8 max-sm:px-8">
        <h1 className="font-header text-primary-green mb-15 text-center text-6xl font-bold">
          Explore Recipes:
        </h1>
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          <Card data={data} />
        </div>
      </main>
    </div>
  );
}

export default Home;
