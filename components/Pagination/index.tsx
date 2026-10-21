import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  changePage,
}: {
  pageCount: number;
  changePage: ({ selected }: { selected: number }) => void;
}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName="paginationButtons"
      previousLinkClassName="previousButton"
      nextLinkClassName="nextLink"
      activeClassName="paginationActive"
      pageRangeDisplayed={5}
      renderOnZeroPageCount={null}
      pageLinkClassName={"paginationLink"}
      activeLinkClassName={"paginationLinkActive"}
    />
  );
};

export default Pagination;