const Pagination = ({setPage, totalPages, page}) => {

    return (
        <div className="pagination">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                précédent
            </button>

            {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                return (
                <button
                    key={pageNumber}
                    className={page === pageNumber ? "active" : ""}
                    onClick={() => setPage(pageNumber)}
                >
                    {pageNumber}
                </button>
                );
            })}

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                suivant
            </button>
        </div>
    );

}

export default Pagination;