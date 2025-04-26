import Button from "../components/Button";

function Hero() {
  const scrollIntoView = () => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  };

  return (
    <div>
      <picture className="absolute top-0 -z-10">
        <div className="before:absolute before:z-10 before:h-full before:w-full before:bg-gradient-to-b before:from-white before:from-5% before:to-black before:to-40% before:opacity-35 before:content-['']"></div>
        <img
          loading="lazy"
          src="./assets/images/hero.jpg"
          alt="Cooking Chef"
          className="aspect-video h-auto w-full object-cover max-sm:aspect-square max-sm:h-[85dvh]"
        />
      </picture>
      <div className="px-14 pt-80 max-sm:px-8 max-sm:pt-40">
        <h1 className="font-header mb-4 text-7xl font-bold text-white max-sm:text-6xl">
          Create it. Make it. Share it.
        </h1>
        <p className="font-body mb-14 text-2xl text-white max-sm:text-2xl">
          Make your best recipe
        </p>

        <Button
          onClick={scrollIntoView}
          label="Explore"
          className="bg-secondary-sandyBrown font-body w-[8rem] cursor-pointer rounded-xl py-2 text-xl font-bold text-white"
        />
      </div>
    </div>
  );
}

export default Hero;
