"use client";
import { ReactComponentElement, useState } from "react";
import React from "react";
import { SearchManufacturer } from "./index";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        width={40}
        height={40}
        className="object-contain"
        alt="Search"
      />
    </button>
  );
};

const SearchBar = () => {
  const [manifacturer, setManifacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manifacturer === "" && model === "") {
      return alert("Please search for a car");
    }
    updateSearcParams(
      model.toLocaleLowerCase(),
      manifacturer.toLocaleLowerCase()
    );
  };

  const updateSearcParams = (model: string, manifacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    if (manifacturer) {
      searchParams.set("manifacturer", manifacturer);
    } else {
      searchParams.delete("manifacturer");
    }
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manifacturer={manifacturer}
          setManifacturer={setManifacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
