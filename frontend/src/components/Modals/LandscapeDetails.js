export default function LandscapeDetails({ data, closeModal }) {

    return (
        <article
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/[.50]"
            onClick={() => closeModal()}
        >
            <div
                className="absolute left-2/4 top-2/4 bg-cyan-800 -translate-x-2/4 -translate-y-2/4 max-w-xs break-words p-4 rounded text-white"
                onClick={(e) => e.stopPropagation()}
                >
                
                <section className="text-2xl">
                    <h3 className="text-center mb-4 font-bold uppercase">
                        {data.title}
                    </h3>
                </section>
                <div className="flex justify-center mb-3">
                    <img
                        className="rounded-lg h-[200px]"
                        src={data.image_url}
                        alt={data.title}
                        loading="lazy"
                    />
                </div>
                <p>Описание:</p>
                <p className="text-lg mb-4 bg-white text-black rounded p-2 max-h-[170px] overflow-auto">
                    {data.description}
                </p>
                <p className="text-lg">
                    Създал: <span className="font-bold text-red-500">{data.author.username}</span>
                </p>
                <p className="text-lg">
                    Създадено на: {data.created_at}
                </p>
                <section className="flex justify-center flex-wrap items-center gap-20 py-6 font-medium text-3xl">
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
