import { useState, useEffect, useContext } from 'react';
import { fetchCatchStats } from './services';
import CatchHistoryTable from './CatchHistoryTable';
import Pagination from './Pagination';
import SortDropdown from './SortDropdown';
import StatsSummary from './StatsSummary';
import Filters from './Filters';
import Spinner from '../Spinner/Spinner';
import AuthContext from '../../context/AuthContext';
import CatchHistoryForm from './CatchHistoryForm';

const now = new Date();
const defaultFetchParams = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    page: 1,
    pageSize: 10,
    ordering: '-date',
};

export default function CatchHistory() {
    const { isLogged } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [fetchParams, setFetchParams] = useState(defaultFetchParams);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);

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
        <div className="py-6">
            {' '}
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <StatsSummary
                        yearlyStats={stats.yearlyStats}
                        monthlyStats={stats.monthlyStats}
                    />
                    {isLogged && (
                        <>
                            <section
                                className={`flex justify-center ${
                                    formOpen ? '' : 'mb-10'
                                }`}
                            >
                                <button
                                    type="button"
                                    className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() =>
                                        setFormOpen((isOpen) => !isOpen)
                                    }
                                >
                                    {formOpen
                                        ? 'Скрий формата'
                                        : 'Добави запис'}
                                </button>
                            </section>
                            <CatchHistoryForm
                                showForm={formOpen}
                                closeForm={() => setFormOpen(false)}
                            />
                        </>
                    )}
                    <SortDropdown
                        ordering={fetchParams.ordering}
                        setOrdering={(ordering) =>
                            setFetchParams((prev) => ({
                                ...prev,
                                ordering,
                                page: 1, // reset to first page on sort change
                            }))
                        }
                    />
                    <div className="mb-4 px-4">
                        <p className="text-gray-600 italic text-sm">
                            Използвайте филтрите по-долу, за да изберете година
                            и месец за показване на данните.
                        </p>
                    </div>
                    <Filters
                        oldestYear={stats.oldestYearData}
                        currentYear={now.getFullYear()}
                        selectedYear={fetchParams.year}
                        selectedMonth={fetchParams.month}
                        currentPageSize={fetchParams.pageSize}
                        onChangeYear={(year) =>
                            setFetchParams((prev) => ({
                                ...prev,
                                year,
                                page: 1,
                            }))
                        }
                        onChangeMonth={(month) =>
                            setFetchParams((prev) => ({
                                ...prev,
                                month,
                                page: 1,
                            }))
                        }
                        onChangePageSize={(pageSize) =>
                            setFetchParams((prev) => ({
                                ...prev,
                                pageSize: pageSize,
                                page: 1,
                            }))
                        }
                    />
                    <CatchHistoryTable data={stats.results} />
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
        </div>
    );
}
