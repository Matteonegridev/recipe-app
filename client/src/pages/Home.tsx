import Card from "../components/Card";
import useFetchRecipes from "../hooks/useFetchRecipes";
import Hero from "../layout/Hero";

function Home() {
  const { data } = useFetchRecipes();

  if (!data) return <p>No data available</p>;

  return (
    <>
      <Hero />
      <main className="mt-14 px-12 pb-8 max-sm:mt-10 max-sm:px-8">
        <h1 className="font-header text-primary-green md: pb-10 text-center text-5xl font-bold">
          Explore Recipes:
        </h1>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          <Card data={data} />
        </div>
      </main>
    </>
  );
}

export default Home;
