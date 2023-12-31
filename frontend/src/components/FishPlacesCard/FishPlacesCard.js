export default function FishPlacesCard({ props, modalOpen }) {

    return (
        <section className="max-w-[224px] text-center rounded p-3 bg-cyan-950 shadow-2xl shadow-black">
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
            <section className="bg-white rounded-b py-2 max-h-[200px] px-1">
                <p className="mb-3">
                    {props.description.slice(0, 50)}...
                </p>
                <button 
                    className="text-center bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                    onClick={() => modalOpen(props.id)}
                    >
                    Виж повече
                </button>
            </section>
        </section>

        
    );
}