import ReactPaginate from "react-paginate";

export function Paginate({ pageCount }) {
    function handlePageChange(selectedItem: {selected: number}) {
        setCurrentPage(selectedItem.selected);
    }
    
    return (
       <ReactPaginate
           pageCount={pageCount}
           onPageChange={handlePageChange}
       />
    )
}