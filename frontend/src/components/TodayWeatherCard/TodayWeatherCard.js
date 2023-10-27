export default function TodayWeatherCard({ props }) {

    const getWindDirectionArrow = (bulgarianDirection) => {
        const directions = {
            "Север": "fa-arrow-down-long",
            "Североизток": "fa-arrow-down-long rotate-45",
            "Изток": "fa-arrow-left-long",
            "Югоизток": "fa-arrow-left-long rotate-45",
            "Юг": "fa-arrow-up-long",
            "Югозапад": "fa-arrow-up-long rotate-45",
            "Запад": "fa-arrow-right-long",
            "Северозапад": "fa-arrow-right-long rotate-45"
        };

        return directions[bulgarianDirection]
    }

    return (
        <section className="bg-cyan-400 rounded-xl p-4 text-center text-xl mb-6 w-[170px]">
            <p>
                {props.time.slice(0, 5)}ч
            </p>
            <div className="w-24 h-24 mx-auto">
                <img className="w-full h-auto" src={props.weather_icon_url} alt="времето"/>
            </div>
            <p className="mb-5">
                {props.normal_temp}
                <i className="ml-1.5 fa-solid fa-temperature-low"></i>
            </p>

            <div className="flex flex-col gap-3">
                <div className="bg-white rounded-xl p-1">
                    <p>Усеща се</p>
                    <p className="relative">
                        {props.feels_like}
                        <i className="absolute top-[15%] ml-0.5 text-[8px] fa-regular fa-circle"></i>
                    </p>
                </div>

                <div className="bg-white rounded-xl p-1">
                    <p>Вятър</p>
                    <p>{props.wind_direction}</p>
                    <p>
                        <i className={`fa-solid ${getWindDirectionArrow(props.wind_direction)}`}>
                            
                        </i>
                    </p>
                </div>

                <div className="bg-white rounded-xl p-1">
                    <p>Скорост</p>
                    <p>{props.wind_speed}м/с</p>
                </div>
            </div>

        </section>
    );
}