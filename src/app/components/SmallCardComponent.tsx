
interface SmallCardProps {
    dayTitle: string;
    img:
      | "Clear"
      | "Hail"
      | "HeavyCloud"
      | "HeavyRain"
      | "LightCloud"
      | "LightRain"
      | "Shower"
      | "Sleet"
      | "Snow"
      | "Thunderstorm";
    min: number;
    max: number;
    temp: string;
  }
  
  const SmallCardComponent: React.FC<SmallCardProps> = ({
    dayTitle,
    img,
    min,
    max,
    temp,
  }) => {
    return (
      <div className="bg-darkblue py-7 px-10 flex flex-col items-center justify-between space-y-4">
        <p >{dayTitle}</p>
        <img src={`/images/${img}.png`} alt="weather-icon" className="max-h-16" />
        <div className="flex justify-between space-x-5">
          <p>
            {max}&deg;{temp}
          </p>
          <p className="text-gray-250">
            {min}&deg;{temp}
          </p>
        </div>
      </div>
    );
  };
  
  export default SmallCardComponent;