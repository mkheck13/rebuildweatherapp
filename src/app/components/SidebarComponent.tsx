"use client";
import React, { useEffect, useState } from "react";
import MainComponent from "./MainComponent";
import SearchLocation from "./SearchLocationComponent";
import sun from "@/app/assets/sun.png";
import cloud from "@/app/assets/cloud.png";
import cloudy from "@/app/assets/cloudy.png";
import haze from "@/app/assets/haze.png";
import rainy from "@/app/assets/rainy.png";
import snowflake from "@/app/assets/snowflake.png";
import storm from "@/app/assets/storm.png";
import umbrella from "@/app/assets/Umbrella.png";
import wind from "@/app/assets/wind.png";
import drop from "@/app/assets/Drop.png";
import sunrise from "@/app/assets/sunrise.png";
import sunset from "@/app/assets/moon.png";
import Image, { StaticImageData } from "next/image";
import favStar from "@/app/assets/Group 9.png";
import notFavStar from "@/app/assets/Star.png";

import { Coord, ICity, Main } from "@/app/interfaces/interface";
import {
  getCity,
  getWeather,
  getWeatherBySearch,
} from "@/app/dataservices/dataservices";
import { getLocal, saveLocal, removeLocal } from "@/app/Utils/Localstorage";


const SidebarComponent = () => {

  // const apiKey = process.env.NEXT_PUBLIC_MY_API_KEY;
  
  const [isOpen, setIsOpen] = useState(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [degrees, setDegrees] = useState<number>(0);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);
  const [cityName, setCityName] = useState<string>("");
  const [weatherImg, setWeatherImg] = useState<string | StaticImageData>("");
  const [searchCity, setSearchCity] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const [rise, setRise] = useState<number | string>("");
  const [sunSet, setSunSet] = useState<number | string>("");
  const [prec, setPrec] = useState<number>(0);
  const [windSpeed, setWind] = useState<number>(0);
  const [windDir, setWindDir] = useState<string>("");
  const [humid, setHumid] = useState<number>(0);
  const [isSnow, setIsSnow] = useState<boolean>(false);

  const [favCity, setFavCity] = useState<string>("");
  const [isFav, setIsFav] = useState<boolean>(false);
  const [favImg, setFavImg] = useState<string | StaticImageData>(notFavStar);
  const [favArry, setFavArr] = useState<string[]>([])

  useEffect(() => {

     if (searchCity === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported on your browser.");
      }
    } else {
      if (searchCity !== "") {
        const getCoords = async () => {
          const data = await getWeatherBySearch(searchCity);
            console.log(data.lon)
          setLat(data.lat);
          setLng(data.lon);
          setFavImg(favImg)
        };

        getCoords();
      }
    }

    let favorites = getLocal();
   setFavArr(favorites)

    const getCurrentWeather = async () => {
      const data = await getWeather(lat, lng);

      setDegrees(Math.floor(data.main.temp));
      setLow(Math.floor(data.main.temp_min));
      setHigh(Math.floor(data.main.temp_max));
      setWind(data.wind.speed);
      setHumid(data.main.humidity);

      if (data.wind.deg >= 0 && data.wind.deg < 30) {
        setWindDir("East");
      } else if (data.wind.deg >= 30 && data.wind.deg < 60) {
        setWindDir("North East");
      } else if (data.wind.deg >= 60 && data.wind.deg < 120) {
        setWindDir("North");
      } else if (data.wind.deg >= 120 && data.wind.deg < 150) {
        setWindDir("North West");
      } else if (data.wind.deg >= 150 && data.wind.deg < 210) {
        setWindDir("West");
      } else if (data.wind.deg >= 210 && data.wind.deg < 240) {
        setWindDir("South West");
      } else if (data.wind.deg >= 240 && data.wind.deg < 300) {
        setWindDir("South");
      } else if (data.wind.deg >= 300 && data.wind.deg < 330) {
        setWindDir("South East");
      } else if (data.wind.deg >= 330 && data.wind.deg < 360) {
        setWindDir("East");
      }

      if (data.rain?.["1h"]) {
        setIsSnow(false);
        setPrec(data.rain?.["1h"]);
      } else if (data.snow?.["1h"]) {
        setIsSnow(true);
        setPrec(data.snow?.["1h"]);
      }

      switch (data.weather[0].description) {
        case "clear sky":
          setWeatherImg(sun);
          break;
        case "rain":
          setWeatherImg(rainy);
          break;
        case "few clouds":
          setWeatherImg(cloudy);
          break;
        case "scattered clouds":
          setWeatherImg(cloud);
          break;
        case "overcast clouds":
          setWeatherImg(cloud);
          break;
        case "broken clouds":
          setWeatherImg(cloud);
          break;
        case "shower rain":
          setWeatherImg(rainy);
          break;
        case "thunderstorm":
          setWeatherImg(storm);
          break;
        case "snow":
          setWeatherImg(snowflake);
          break;
        case "haze":
          setWeatherImg(haze);
          break;
        case "light rain":
          setWeatherImg(rainy);
          break;
        default:
          break;
      }

      const riseTime = data.sys.sunrise;
      const setTime = data.sys.sunset;

      const rise = new Date(riseTime * 1000);
      const set = new Date(setTime * 1000);

      let setHours = set.getHours();
      let setMinutes = "0" + set.getMinutes();
      let riseHours = rise.getHours();
      let riseMinutes = "0" + rise.getMinutes();

      setSunSet(`${setHours}:${setMinutes.substr(-2)}`);
      setRise(`${riseHours}:${riseMinutes.substr(-2)}`);
    };

    const getCurrentCity = async () => {
      const cityData: ICity = await getCity(lat, lng);

      console.log(cityData);
      setFavCity(cityData.name);
      setCityName(
        `${cityData.name}, ${
          cityData.state ? cityData.state : cityData.country
        }`
      );
    };

    getCurrentWeather();
    getCurrentCity();
  }, [lat, lng]);



  const handleFav = () => {
    setIsFav(!isFav);

    if (isFav === true) {
      saveLocal(favCity);
      setFavImg(favStar);
    } else {
      removeLocal(favCity);
      setFavImg(notFavStar);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-darkblue w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
      {isOpen ? (
        <SearchLocation onClose={() => setIsOpen(false)} />
      ) : (
        <>
          <div className="relative flex justify-between">
            <button
              className="static z-10 px-4 py-2 text bg-[#6E707A] hover:bg-[#6E707A]/70 text-gray-150 shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              Favorites
            </button>
            <button className="static z-10 px-4 py-2 text bg-[#6E707A] hover:bg-[#6E707A]/70 text-gray-150 rounded-full shadow-lg">
              <i className="fas fa-map-marker-alt"></i>
            </button>
          </div>
      {/* Search */}
          <div>
            <div className="flex justify-between my-5 space-x-4">

              <input
                type="search"
                className="border border-gray-150 bg-transparent p-3 flex-grow"
                placeholder="Search Location"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                  setSearchCity((e as React.ChangeEvent<HTMLInputElement>).target.value)
                  if(searchCity !== ''){
                    setInput(searchCity)
                  }
                  (e as React.ChangeEvent<HTMLInputElement>).target.value = ''
                }}}

              />
            </div>

          </div>
      {/* search */}



<div className="bg-[#CAE8FF] w-1/4 h-96 opacity-75 rounded-xl mr-10">
            <div className="">
              <div className="flex justify-between mx-6 mt-6">
                <p className="text-2xl">{cityName}</p>
                <button onClick={handleFav}>
                  <Image src={favImg} alt="Favorite Star Button" />
                </button>
              </div>
              <div className="flex justify-between mx-6 mt-7">
                <p className="text-6xl">{`${degrees}\u00b0`}</p>
                <div className="text-base mr-12">
                  <p>{`High: ${high}\u00b0`}</p>
                  <p>{`Low: ${low}\u00b0`}</p>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Image
                  src={weatherImg}
                  alt="Displayed Weather"
                  className="w-40"
                />
              </div>
            </div>
          </div>




        </>
      )}
    </div>
  );
};

export default SidebarComponent;
