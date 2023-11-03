import RegionChoiceCard from "../RegionChoiceCard/RegionChoiceCard";
import { useLocation } from "react-router-dom";


export default function ChoiceContainer({
    linkWeather,
    linkFishSpots,
    linkSuggestedSpots,
}) {

    const pathName = useLocation().pathname;

    return (
        <div className="flex flex-wrap justify-around max-w-7xl mx-auto text-2xl text-center bg-slate-500 text-black p-10 mb-20 rounded-xl font-medium">
            <RegionChoiceCard
                imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310078774165575/weather.png?ex=65466295&is=6533ed95&hm=a87916564083109acf2ca9cd386299b8e8298147b255054b676fc8455f45473b&"
                imgAlt="прогноза"
                pText="Прогноза за времето"
                linkTo={linkWeather}
                shouldScale={pathName.includes("weather")}
            />
            <RegionChoiceCard
                imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310390880714934/fish-rod.png?ex=654662df&is=6533eddf&hm=76ef89e86ef21eedecb16ae7637ae23cd5cddbe93c04eeec45f1dad6ce32ae38&"
                imgAlt="въдица"
                pText="Риболовни места"
                linkTo={linkFishSpots}
                shouldScale={pathName.includes("fish-spots")}
            />
            <RegionChoiceCard
                imgUrl="https://cdn.discordapp.com/attachments/1156335620919152650/1165310579825721456/spoticon.png?ex=6546630c&is=6533ee0c&hm=789298118befac39d5978b6954eab78850977cd54933dbce1cd2d4dcd3c33ec9&"
                imgAlt="локация"
                pText="Предложи ми място"
                linkTo={linkSuggestedSpots}
                shouldScale={pathName.includes("suggested-spots")}
            />
        </div>
    );
}