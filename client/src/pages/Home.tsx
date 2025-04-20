import Card from "../components/Card";
import useFetchRecipes from "../hooks/useFetchRecipes";

function Home() {
  const { data, isLoading } = useFetchRecipes();

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div className="px-8 py-5">
      <h1 className="py-4 text-center text-4xl font-bold">Explore Recipes:</h1>
      <div className="grid grid-cols-3 gap-4">
        <Card data={data} />
      </div>
    </div>
  );
}

export default Home;
