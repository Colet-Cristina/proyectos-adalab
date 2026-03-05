function FilterHouse({ handleFilterHouse, filterHouse }) {
  return (
    <div className="filter-house">
      <label htmlFor="filterByHouse" className="label-house">
        Casas de Hogwarts
      </label>
      <select
        className="filter-select"
        id="filterByHouse"
        onChange={handleFilterHouse}
        value={filterHouse}
      >
        <option value="Gryffindor">Gryffindor</option>
        <option value="Slytherin">Slytherin</option>
        <option value="Hufflepuff">Hufflepuff</option>
        <option value="Ravenclaw">Ravenclaw</option>
      </select>
    </div>
  );
}

export default FilterHouse;
