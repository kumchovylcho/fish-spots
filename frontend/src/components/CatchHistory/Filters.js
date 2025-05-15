export default function Filters({
    oldestYear,
    currentYear,
    selectedYear,
    selectedMonth,
    onChangeYear,
    onChangeMonth,
}) {
    // Generate years array from oldestYear to currentYear (descending)
    const years = [];
    for (let y = currentYear; y >= oldestYear; y--) {
        years.push(y);
    }

    // Months array 1-12 with Bulgarian month names (or your own)
    const months = [
        { value: 1, name: 'Януари' },
        { value: 2, name: 'Февруари' },
        { value: 3, name: 'Март' },
        { value: 4, name: 'Април' },
        { value: 5, name: 'Май' },
        { value: 6, name: 'Юни' },
        { value: 7, name: 'Юли' },
        { value: 8, name: 'Август' },
        { value: 9, name: 'Септември' },
        { value: 10, name: 'Октомври' },
        { value: 11, name: 'Ноември' },
        { value: 12, name: 'Декември' },
    ];

    return (
        <div className="flex space-x-4 mb-6 px-4 items-center">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Година
                </label>
                <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={selectedYear}
                    onChange={(e) => onChangeYear(parseInt(e.target.value))}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Месец
                </label>
                <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={selectedMonth}
                    onChange={(e) => onChangeMonth(parseInt(e.target.value))}
                >
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
