import React from "react";
import { CarCard, SearchBar } from "./index";
import { CustomFilter } from "./index";
import { fetchCars } from "@/utilty/db";
const Features = async () => {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore the cars you might like</p>
      </div>
      <div className="home__filters">
        <SearchBar />
        <div className="home__filter-container">
          <CustomFilter />
          <CustomFilter />
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">
            Opps,no result
            <p>{allCars?.message}</p>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Features;