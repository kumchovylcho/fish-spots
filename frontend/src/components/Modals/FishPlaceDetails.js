import { Link } from 'react-router-dom';

export default function FishPlaceDetails({ data, isOpen, closeModal }) {
    return (
        <article
            className={`fixed inset-0 flex justify-center items-center transition-colors
                ${isOpen ? 'visible bg-black/[.50]' : 'invisible'}
            `}
            onClick={closeModal}
        >
            <div
                className={`max-md:overflow-auto bg-white max-w-2xl break-words p-4 rounded transition-all ease-linear duration-300 ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-md:flex-col flex justify-center items-center gap-8">
                    <div className="max-md:max-w-full max-w-[40%]">
                        <img
                            className="rounded-lg"
                            src={data.image}
                            alt={data.bg_place_name}
                            loading="lazy"
                        />
                    </div>
                    <section className="max-md:max-w-full max-md:text-center max-w-[60%] text-2xl">
                        <h3 className="text-center mb-4 font-bold text-2xl uppercase">
                            {data.bg_place_name}
                        </h3>
                        <p>{data.description}</p>
                    </section>
                </div>

                <section className="max-md:gap-5 max-md:text-center flex justify-center flex-wrap items-center gap-20 py-6 text-white font-medium text-3xl">
                    <Link
                        className="bg-green-600 hover:bg-green-800 py-2 px-4 rounded-xl"
                        to={`https://www.google.com/maps/@${data.longitude},${data.latitude},18z?entry=ttu`}
                        target="_blank"
                    >
                        Покажи в Google Maps
                    </Link>
                    <button
                        className="bg-red-600 py-2 px-4 rounded-xl hover:bg-red-800"
                        onClick={() => closeModal()}
                    >
                        Затвори
                    </button>
                </section>
            </div>
        </article>
    );
}
