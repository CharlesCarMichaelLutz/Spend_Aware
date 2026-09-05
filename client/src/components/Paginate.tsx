import ReactPaginateModule from "react-paginate"
const ReactPaginate = ReactPaginateModule.default

export default function Paginate({ totalPages, handlePageClick }) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageClick}
            previousLabel="Previous"
            nextLabel="Next"
        />
    );
}

