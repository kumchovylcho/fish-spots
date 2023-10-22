export default function TodayWeatherCard({ props }) {

    return (
        <section className="bg-cyan-400 rounded-xl p-4 text-center text-xl mb-6 max-w-[170px]">
            <p>
                {props.time.slice(0, 5)}ч
            </p>
            <div className="w-24 h-24 mx-auto">
                <img className="w-full h-auto" src={props.weather_icon_url} />
            </div>
            <p className="mb-5">
                {props.normal_temp}
                <i className="ml-1.5 fa-solid fa-temperature-low"></i>
            </p>

            <div className="flex flex-col gap-3">
                <div className="bg-white rounded-xl p-1">
                    <p>Усеща се</p>
                    <p>{props.feels_like}</p>
                </div>
                
                <div className="bg-white rounded-xl p-1">
                    <p>Мин. темп.</p>
                    <p>{props.min_temp}</p>
                </div>

                <div className="bg-white rounded-xl p-1">
                    <p>Макс. темп.</p>
                    <p>{props.max_temp}</p>
                </div>

                <div className="bg-white rounded-xl p-1">
                    <p>Вятър</p>
                    <p>{props.wind_direction}</p>
                </div>

                <div className="bg-white rounded-xl p-1">
                    <p>Скорост</p>
                    <p>{props.wind_speed}м/с</p>
                </div>
            </div>

        </section>
    );
}