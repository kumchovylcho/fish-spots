export default function LandscapeDetails({ data, isOpen, closeModal }) {
    const {title, image_url, description, author, created_at} = data;

    return (
        <article
            className={`fixed inset-0 flex justify-center items-center transition-colors
                    ${isOpen ? "visible bg-black/[.50]" : "invisible"}
                    `}
            onClick={() => closeModal()}
            >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-cyan-800 max-w-xs break-words p-4 rounded text-white transition-all ease-linear duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                >
                
                <section className="text-2xl">
                    <h3 className="text-center mb-4 font-bold uppercase">
                        {title}
                    </h3>
                </section>
                <div className="flex justify-center mb-3">
                    <img
                        className="rounded-lg h-[200px]"
                        src={image_url}
                        alt={title}
                        loading="lazy"
                    />
                </div>
                <p>Описание:</p>
                <p className="text-lg mb-4 bg-white text-black rounded p-2 max-h-[170px] overflow-auto">
                    {description}
                </p>
                <p className="text-lg">
                    Създал: <span className="font-bold text-red-500">{author?.username}</span>
                </p>
                <p className="text-lg">
                    Създадено на: {created_at}
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
