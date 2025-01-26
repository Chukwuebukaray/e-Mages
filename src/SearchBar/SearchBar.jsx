import "./SearchBar.css"

const SearchBar = ({ onSubmit, searchInput }) => {
  return (
    <div className="searchbar">
      <div className="inputbackground">
        <form className="input">
          <input
            type="text"
            placeholder="Type something to search"
            ref={searchInput}
          />
          <button onClick={onSubmit}>Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar
