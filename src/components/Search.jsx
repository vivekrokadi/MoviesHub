import React from "react";

function Search({searchTerm, setSearchTerm}) {
  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="" />
        <input className="text-white"
          type="text"
          placeholder="search movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Search;
