export default function RegionChoiceCard({
    imgUrl,
    imgAlt,
    pText,
    dataKey,
    showData,
    setShowData,
}) {

    const isSelectedClasses = () => {
        return showData[dataKey]
            ? 'scale-105 bg-zinc-300'
            : 'hover:scale-105 hover:bg-zinc-300 bg-white duration-150';
    };

    const selectCard = () => {
        const resetData = {}
        for (const key of Object.keys(showData)) {
            resetData[key] = false;
        }

        resetData[dataKey] = true;
        setShowData(resetData);
    }


    return (
        <section
            className={`basis-[26%] p-2 rounded-xl cursor-pointer ${isSelectedClasses()}`}
            onClick={selectCard}
            >
            <div className="mb-3">
                <img
                    src={imgUrl}
                    className="w-9/12 h-auto mx-auto"
                    alt={imgAlt}
                />
            </div>
            <p>{pText}</p>
        </section>
    );
}
