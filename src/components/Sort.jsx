function Sort({ onSort }) {
    return (
        <select data-testid="sort-select" onChange={(e) => onSort(e.target.value)}>
            <option value={"date"}>Date</option>
            <option value={"amount"}>Amount</option>
            <option value={"name"}>Name</option>
        </select>
    );
}

export default Sort;