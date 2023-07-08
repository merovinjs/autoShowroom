"use client";
import { CarProps } from "@/types";
import { calculateCarRent } from "@/utilty/db";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CarDetails, CustomButton } from "./index";

interface CarCardProps {
  car: CarProps;
}
// async function getData(car: CarProps, angle?: string) {
//   const { year, make, model, transmission, drive } = car;
//   const query = `${make} ${model} ${transmission} ${drive} ${year}`;
//   const res = await fetch(
//     `https://api.pexels.com/v1/search?query=${query}&per_page=4&`,
//     {
//       headers: {
//         Authorization:
//           "IlzNSyzg1Ven2gRa5wcGtfHdVr7b9bPQzlkrO2N4UNoXuCt747JqVBUJ",
//       },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const responseJson = await res.json();
//   return responseJson.photos;
// }

const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photos1, setPhotos] = useState("");

  const { city_mpg, year, make, model, transmission, drive } = car;

  // const photos = await getData(car);

  // setPhotos(photos[0].src.large);

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          alt="car model"
          fill
          priority
          className="object-contain"
          src="/hero.png"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              alt="steering whell"
              width={20}
              height={20}
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manuel"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" alt="tire" width={20} height={20} />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px]
            "
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
