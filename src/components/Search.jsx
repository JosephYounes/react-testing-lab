import React from "react";

function Search({ search = "", setSearch }) {
  return (
    <div className="ui large fluid icon input">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search your Recent Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
