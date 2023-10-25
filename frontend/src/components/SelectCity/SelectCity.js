export default function SelectCity({ city1, city2, city3, setCityKey }) {

    const bulgarianToEnglish = (city) => {
        const cities = {
            "Шабла": "shabla",
            "Кранево": "kranevo",
            "Варна": "varna",
            "Бургас": "burgas",
            "Черноморец": "chernomorets",
            "Приморско": "primorsko"
        }

        return cities[city]
    }

    return (
        <div className="max-w-3xl mx-auto p-6 text-2xl bg-white rounded-xl mb-20">
            <p className="text-center mb-10 font-medium">
                Избери град
            </p>
            <section className="flex justify-around gap-10 text-white">
                <p 
                    onClick={() => {setCityKey(bulgarianToEnglish(city1))}}
                    className="bg-cyan-700 hover:bg-cyan-800 py-2 px-6 rounded cursor-pointer">                 
                    {city1}
                </p>
                <p 
                    onClick={() => {setCityKey(bulgarianToEnglish(city2))}}
                    className="bg-cyan-700 hover:bg-cyan-800 py-2 px-6 rounded cursor-pointer">
                    {city2}
                </p>
                <p 
                    onClick={() => {setCityKey(bulgarianToEnglish(city3))}}
                    className="bg-cyan-700 hover:bg-cyan-800 py-2 px-6 rounded cursor-pointer">                
                    {city3}
                </p>
            </section>
        </div>
    );
}