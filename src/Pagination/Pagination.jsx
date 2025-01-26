import "./Pagination.css";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
      {page < totalPages && (
        <button onClick={() => setPage(page + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
