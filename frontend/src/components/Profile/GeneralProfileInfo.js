export default function GeneralProfileInfo({
    username,
    email,
    createdLandscapes,
    showEmail
    }) {

    return (
        <div className="max-md:text-center flex justify-center grow text-left max-w-2xl break-words text-white p-2 rounded bg-gradient-to-b from-sky-400 to-blue-500">
            <section className="flex flex-col gap-5">
                <p className="max-md:inline-flex max-md:flex-col break-all">
                    Потребителско име:
                    <span className="ml-2 text-red-900 font-medium">
                        {username}
                    </span>
                </p>

                <p className="max-md:inline-flex max-md:flex-col">
                    Имейл адрес:
                    <span className="ml-2 text-red-900 font-medium break-all">
                        {showEmail ? email : "скрит"}
                    </span>
                </p>
                  
                <p>
                    Създадени пейзажа:
                    <span className="ml-2 text-orange-400 font-medium">
                        {createdLandscapes}
                        <span className="ml-2 text-white">бр.</span>
                    </span>
                </p>
            </section>
        </div>
    );
}
