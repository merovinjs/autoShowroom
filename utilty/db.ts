import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 55; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, limit, model, fuel, year } = filters;
  const RapidAPI: string | undefined = process.env.RAPID_API_KEY || "";
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RapidAPI,
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
}
export const getData = async (car: CarProps, angle?: string) => {
  const PexelAPI: string | undefined = process.env.PEXELS_API_KEY || "";
  const { year, make, model, transmission, drive } = car;
  const query = `${make} ${model} ${transmission} ${drive} ${year}`;
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=4&`,
    {
      headers: {
        Authorization: PexelAPI,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const responseJson = await res.json();
  return responseJson.photos;
};
export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};
