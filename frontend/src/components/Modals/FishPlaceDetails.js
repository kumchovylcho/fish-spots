import { Link } from 'react-router-dom';

export default function FishPlaceDetails({ data, closeModal }) {

    return (
        <article className="fixed top-0 left-0 bottom-0 right-0 bg-black/[.50]">
            <div className="absolute left-2/4 top-2/4 bg-white -translate-x-2/4 -translate-y-2/4 max-w-2xl break-words p-4 rounded">
                <div className="flex justify-center items-center gap-8">
                    <div className="max-w-[40%]">
                        <img 
                            className="rounded-lg"
                            src={data.image_url}
                            alt={data.bg_place_name}
                            loading="lazy"
                        />
                    </div>
                    <section className="max-w-[60%] text-2xl">
                        <h3 className="text-center mb-4 font-bold text-2xl uppercase">
                            {data.bg_place_name}
                        </h3>
                        <p>
                            {data.description}
                        </p>
                    </section>
                </div>
               
               <section className="flex justify-center flex-wrap items-center gap-20 py-6 text-white font-medium text-3xl">
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