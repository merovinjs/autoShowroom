"use client";
import { CarProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { getData } from "@/utilty/db";
interface CarDetailsProps {
  car: CarProps;
  isOpen: boolean;
  closeModal: () => void;
}

const CarDetails = ({ car, isOpen, closeModal }: CarDetailsProps) => {
  const [imagehero, setHero] = useState("");
  const [imageAlt1, setImage1] = useState("");
  const [imageAlt2, setImage2] = useState("");
  const [imageAlt3, setImage3] = useState("");

  useEffect(() => {
    const fetchCarImage = async () => {
      const image = await getData(car);
      const heroImage = image[0].src.medium;
      const Image1 = image[1].src.medium;
      const Image2 = image[2].src.medium;
      const Image3 = image[3].src.medium;

      setHero(heroImage);
      setImage1(Image1);
      setImage2(Image2);
      setImage3(Image3);
    };
    fetchCarImage();
  }, [car]);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-8 text-left shodow-xl transition-all flex flex-col gap-5">
                    <button
                      className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                      type="button"
                      onClick={closeModal}
                    >
                      <Image
                        src="/close.svg"
                        width={18}
                        height={18}
                        alt="close"
                        className="object-contain"
                      />
                    </button>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                        <Image
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                          src={imagehero}
                        />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                            src={imageAlt1}
                          />
                        </div>
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                            src={imageAlt2}
                          />
                        </div>
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                            src={imageAlt3}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <h2 className="font-semibold text-lg capitalize">
                        {car.make} {car.model}
                      </h2>
                    </div>
                    {Object.entries(car).map(([key, value]) => (
                      <div
                        className="flex justify-between gap-5 w-full text-right"
                        key={key}
                      >
                        <h4 className="text-gray capitalize">
                          {key.split("_").join(" ")}
                        </h4>
                        <p className="text-black-100 font-semibold">{value}</p>
                      </div>
                    ))}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
