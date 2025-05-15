export default function Pagination({ pagination, onPageChange }) {
    const {
        current_page,
        totalPages,
        hasPrevious,
        hasNext,
        previousPage,
        nextPage,
    } = pagination;

    const generatePageNumbers = () => {
        const maxPages = 10;
        const pagesToShow = Math.min(maxPages, totalPages);
        let start = Math.max(current_page - 4, 1);
        let end = start + pagesToShow - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - pagesToShow + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center items-center flex-wrap gap-2 mt-6">
            <button
                onClick={() => onPageChange(previousPage)}
                disabled={!hasPrevious}
                className={`px-3 py-1.5 border rounded-lg text-sm ${
                    hasPrevious
                        ? 'hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed'
                }`}
            >
                Prev
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1.5 rounded-lg border text-sm ${
                        page === current_page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(nextPage)}
                disabled={!hasNext}
                className={`px-3 py-1.5 border rounded-lg text-sm ${
                    hasNext
                        ? 'hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed'
                }`}
            >
                Next
            </button>
        </div>
    );
}
