import RegionChoiceCard from "../RegionChoiceCard/RegionChoiceCard";
import { useLocation } from "react-router-dom";


export default function ChoiceContainer({
    linkWeather,
    linkFishSpots,
    linkSuggestedSpots,
}) {

    const pathName = useLocation().pathname;

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-5 max-w-7xl mx-auto text-2xl text-center bg-slate-500 text-black p-10 mb-20 rounded-xl font-medium">
            <RegionChoiceCard
                imgUrl="https://i.ibb.co/bK3jFs1/weather-icon.png"
                imgAlt="прогноза"
                pText="Прогноза за времето"
                linkTo={linkWeather}
                shouldScale={pathName.includes("weather")}
            />
            <RegionChoiceCard
                imgUrl="https://i.ibb.co/DtGhM0x/fish-rod.png"
                imgAlt="въдица"
                pText="Риболовни места"
                linkTo={linkFishSpots}
                shouldScale={pathName.includes("fish-spots")}
            />
            <RegionChoiceCard
                imgUrl="https://i.ibb.co/hffwSTf/spoticon.png"
                imgAlt="локация"
                pText="Предложи ми място"
                linkTo={linkSuggestedSpots}
                shouldScale={pathName.includes("suggested-spots")}
            />
        </div>
    );
}