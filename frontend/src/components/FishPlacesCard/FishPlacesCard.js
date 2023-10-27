export default function FishPlacesCard({ props, modalOpen }) {

    return (
        <section className="max-w-[200px] text-center rounded p-3 bg-cyan-950 shadow-2xl shadow-black">
            <h3 className="font-medium mb-2 text-white">
                {props.bg_place_name}
            </h3>
            <div>
                <img 
                    className="rounded-t"
                    src={props.image_url}
                    alt={props.bg_place_name}
                    loading="lazy"
                />
            </div>
            <section className="bg-white rounded-b py-2">
                <p className="mb-3">
                    {props.description.slice(0, 50)}...
                </p>
                <button 
                    className="text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                    onClick={() => modalOpen()}
                    >
                    Виж повече
                </button>
            </section>
        </section>

        
    );
}