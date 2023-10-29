import FishPlacesCard from "../FishPlacesCard/FishPlacesCard";
import { getSuggestedSpots } from "./getSuggestedSpots";


export default function SuggestedSpots({ weatherData, fishSpots, modalOpen }) {

    const suggestedSpots = getSuggestedSpots(weatherData, fishSpots);


    return (
        <>
            <h3 className="pb-4 text-2xl text-center">
                Предложените места са за <span className="text-4xl font-bold text-cyan-800">ДНЕС</span> на база на днешното време.
            </h3>
            <p className="text-center text-2xl pb-8">
                Информацията се обновява на всеки <span className="text-4xl font-bold text-cyan-800 animate-pulse">3</span> часа.
            </p>
            {suggestedSpots.length ? (
            <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-12 py-8 bg-slate-400 rounded-xl mb-16 shadow-gray-900 shadow-2xl">
                {suggestedSpots.map((obj) =>      
                                <FishPlacesCard
                                    key={obj.id}
                                    props={obj}
                                    modalOpen={modalOpen}
                                />
                )}
            </div>
            )
            : <h3 className="text-2xl py-12 text-center">Няма предложени места. Времето е бурно, стойте си вкъщи.</h3>
            }
        </>
    );
}