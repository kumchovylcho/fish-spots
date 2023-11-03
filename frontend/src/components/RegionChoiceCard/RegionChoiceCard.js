import { Link } from 'react-router-dom';


export default function RegionChoiceCard({
    imgUrl,
    imgAlt,
    pText,
    linkTo,
    shouldScale
}) {

    return (
        <Link 
            to={linkTo}
            className={`basis-[26%] p-2 rounded-xl cursor-pointer hover:scale-105 hover:bg-zinc-300 bg-white duration-150 ${shouldScale && "scale-105 bg-zinc-300"}`}
        >
            <section>
                <div className="mb-3">
                    <img
                        src={imgUrl}
                        className="w-9/12 h-auto mx-auto"
                        alt={imgAlt}
                    />
                </div>
                <p>{pText}</p>
            </section>
        </Link>
    );
}
