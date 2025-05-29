import { useState, useEffect } from 'react';
import { fetchCatchStats } from './services';
import Pagination from './Pagination';
import StatsSummary from './StatsSummary';
import Spinner from '../Spinner/Spinner';

export default function CatchHistoryTable({ fetchParams, setFetchParams }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setLoading(true);
        fetchCatchStats({ ...fetchParams })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Моля опитайте по-късно.');
                }

                return response.json();
            })
            .then((data) => setStats(data))
            .catch((error) => {
                console.error(error.message);
                setError(error.message);
            })
            .finally(() => setLoading(false));

        return () => {
            new AbortController().abort();
        };
    }, [fetchParams]);

    if (error) {
        return (
            <p className="bg-red-100 text-red-800 text-center border border-red-300 rounded-md px-4 py-2 mb-4">
                ⚠️ {error}
            </p>
        );
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <StatsSummary
                        yearlyStats={stats.yearlyStats}
                        monthlyStats={stats.monthlyStats}
                    />
                    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                <tr>
                                    <th
                                        className="px-4 py-3 text-left"
                                        title="ГГГГ-ММ-ДД"
                                    >
                                        Дата
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Град
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Риболовно Място
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Вид Риба
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Количество (кг)
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Примамка
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        От час
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        До час
                                    </th>
                                    <th className="px-4 py-3 text-right">
                                        Късания
                                    </th>
                                    <th className="px-4 py-3 text-center">
                                        Добро Време
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                                {stats.results && stats.results.length > 0 ? (
                                    stats.results.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 even:bg-gray-200"
                                        >
                                            <td className="px-4 py-2">
                                                {item.date}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.city}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.fish_spot}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.fish_type}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.lure_type}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.from_hour}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.to_hour}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {item.snaps}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {item.good_weather
                                                    ? '✅'
                                                    : '❌'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="text-center text-gray-500 py-4"
                                        >
                                            No catch history available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pagination={stats.pagination}
                        onPageChange={(page) =>
                            setFetchParams((prev) => ({
                                ...prev,
                                page,
                            }))
                        }
                    />
                </>
            )}
        </>
    );
}
