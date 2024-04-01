import { useState, useContext } from 'react';
import { createFishPlace } from '../../services/fish-spots';
import AuthContext from '../../context/AuthContext';

export default function FishSpotForm() {
    const { Id } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        place: '',
        bg_place_name: '',
        description: '',
        longitude: '',
        latitude: '',
        region: '',
        max_wind_speed: '',
        bad_wind_directions: '',
        image: null,
    });

    const handleFieldChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const buildFormData = new FormData();
        for (const [attribute, value] of Object.entries(formData)) {
            buildFormData.append(attribute, value);
        }
        buildFormData.append('creator', Id);

        try {
            const response = await createFishPlace(buildFormData);
            const data = await response.json();
            console.log(data);
        } catch (error) {}
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="max-w-lg mx-auto mb-10 p-4 rounded-xl flex flex-col items-center gap-4 bg-gradient-to-b from-slate-700 to-gray-900"
            encType="multipart/form-data"
        >
            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Място на латиница:
                </span>
                <input
                    type="text"
                    className="block w-full rounded p-1.5 text-stone-950 outline-none"
                    name="place"
                    maxLength="50"
                    placeholder="Morska Gara"
                    value={formData.place}
                    onChange={handleFieldChange}
                />
            </section>

            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Място на български:
                </span>
                <input
                    type="text"
                    className="block w-full rounded p-1.5 text-stone-950 outline-none"
                    name="bg_place_name"
                    maxLength="50"
                    placeholder="Морска Гара"
                    value={formData.bg_place_name}
                    onChange={handleFieldChange}
                />
            </section>

            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Описание на пейзажа:
                </span>
                <textarea
                    className="block w-full resize-none rounded p-1.5 text-stone-950 outline-none"
                    name="description"
                    rows="5"
                    cols="25"
                    autoComplete="off"
                    autoCorrect="on"
                    maxLength="300"
                    placeholder="Това място.."
                    value={formData.description}
                    onChange={handleFieldChange}
                />
            </section>

            <div className="w-10/12 flex flex-wrap justify-between max-md:flex-col max-md:gap-4">
                <section className="w-5/12 max-md:w-full">
                    <span className="dark:text-white dark:font-medium">
                        Географска дължина:
                    </span>
                    <input
                        type="text"
                        className="block w-full rounded p-1.5 text-stone-950 outline-none"
                        name="longitude"
                        maxLength="30"
                        placeholder="43.1548419"
                        value={formData.longitude}
                        onChange={handleFieldChange}
                    />
                </section>

                <section className="w-5/12 max-md:w-full">
                    <span className="dark:text-white dark:font-medium">
                        Географска ширина:
                    </span>
                    <input
                        type="text"
                        className="block w-full rounded p-1.5 text-stone-950 outline-none"
                        name="latitude"
                        maxLength="30"
                        placeholder="27.932876"
                        value={formData.latitude}
                        onChange={handleFieldChange}
                    />
                </section>
            </div>

            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Регион:
                </span>
                <select
                    className="block w-full rounded p-1.5 text-stone-950 outline-none"
                    name="region"
                    value={formData.region}
                    onChange={handleFieldChange}
                >
                    <option value="">--Избери--</option>
                    <option value="north">Север</option>
                    <option value="south">Юг</option>
                </select>
            </section>

            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Макс. Допустим Вятър(m/s):
                </span>
                <input
                    className="block w-full rounded p-1.5 text-stone-950 outline-none"
                    type="number"
                    name="max_wind_speed"
                    placeholder="3"
                    min="0"
                    max="10"
                    value={formData.max_wind_speed}
                    onChange={handleFieldChange}
                />
            </section>

            <section className="w-10/12">
                <span className="dark:text-white dark:font-medium">
                    Лоши посоки на вятъра:
                </span>
                <input
                    className="block w-full rounded p-1.5 text-stone-950 outline-none"
                    type="text"
                    name="bad_wind_directions"
                    placeholder="Изток, Югоизток.."
                    maxLength="255"
                    value={formData.bad_wind_directions}
                    onChange={handleFieldChange}
                />
            </section>

            <section>
                <span className="dark:text-gray-400">Избери снимка</span>
                <input
                    className="block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFieldChange}
                />
            </section>

            <div className="text-center mt-4">
                <button className="px-4 py-2 text-black font-medium rounded-lg bg-gradient-to-r from-green-200 via-green-400 to-green-500 hover:from-green-300 hover:via-green-500 hover:to-green-600">
                    Create!
                </button>
            </div>
        </form>
    );
}
