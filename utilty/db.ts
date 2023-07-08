import { CarProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const fetchCars = async () => {
  const url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7b957d3774msh8f9ed67418c579ep149e46jsn1810983e1d54",
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
// export const getCuratedPhotos = async (car: CarProps, angle?: string) => {
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
//   const responseJson = await res.json();
//   return responseJson.photos;
// };
