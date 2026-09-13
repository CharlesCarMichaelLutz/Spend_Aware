// import ReactPaginateModule from "react-paginate"
// const ReactPaginate = ReactPaginateModule.default
//
// export default function Paginate({ totalPages, handlePageClick, setCurrentPage }) {
//     return (
//         <ReactPaginate
//             // pageCount={Math.ceil(totalPages)}
//             pageCount={totalPages}
//             onPageChange={handlePageClick}
//             // previousLabel={"Previous"}
//             // nextLabel={"Next"}
//             setCurrentPage={setCurrentPage}
//             containerClassName={`button-container`}
//         />
//     );
// }

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

