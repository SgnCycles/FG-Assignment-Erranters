import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  changePage,
  currentPage
}: {
  pageCount: number;
  changePage: ({ selected }: { selected: number }) => void;
  currentPage: number;
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
      forcePage={currentPage}
    />
  );
};

export default Pagination;