"use client";
import { useState } from "react";

import SmallCard from "./SmallCardComponent";

const MainComponent = () => {
  const [temp, setTemp] = useState("C");

  return (
    <div className="text-gray-150 p-10 flex-grow backimage">


      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-5 gap-10 justify-center">


        <SmallCard
          dayTitle="Tomorrow"
          img="Shower"
          max={20}
          min={12}
          temp="F"
        />
        <SmallCard
          dayTitle="day 3"
          img="Clear"
          max={27}
          min={18}
          temp="F"
        />
        <SmallCard
          dayTitle="day 4"
          img="Clear"
          max={27}
          min={18}
          temp="F"
        />
        <SmallCard
          dayTitle="day 5"
          img="Clear"
          max={27}
          min={18}
          temp="F"
        />
      </div>
    </div>
  );
};

export default MainComponent;
