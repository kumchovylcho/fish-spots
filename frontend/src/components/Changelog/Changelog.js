export default function Changelog() {
    return (
        <main className="max-w-6xl mx-auto py-10">
            <article className="p-6 bg-cyan-950 rounded text-white">
                <h1 className="text-center text-2xl font-medium uppercase mb-10">
                    Промени по уебсайта
                </h1>
                <section className="mb-10">
                    <h3 className="text-2xl font-medium text-center">
                        02/05/2024
                    </h3>
                    <ul className="flex flex-col gap-2 list-disc text-xl">
                        <li>
                            Добавена е страница за чепарета в която можете да се
                            свържете с майсторите които изработват чепарета.
                        </li>
                        <li>
                            Добавена е страница в която се описват новостите в
                            сайта.
                        </li>
                    </ul>
                </section>
                <section className="mb-10">
                    <h3 className="text-2xl font-medium text-center">
                        14/06/2024
                    </h3>
                    <ul className="flex flex-col gap-2 list-disc text-xl">
                        <li>
                            Добавена е опция при която вече може да се добавят риболовните места в любими.
                        </li>
                        <li>
                            Добавена информация за чепаретата в главната страница.
                        </li>
                    </ul>
                </section>
            </article>
        </main>
    );
}
