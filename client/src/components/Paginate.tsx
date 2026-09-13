import ReactPaginateModule from "react-paginate"
const ReactPaginate = ReactPaginateModule.default

export default function Paginate({ pageCount, onPageChange }) {
    return (
        <ReactPaginate
            containerClassName={`button-container`}
            pageCount={pageCount}
            onPageChange={onPageChange}
        />
    );
}

