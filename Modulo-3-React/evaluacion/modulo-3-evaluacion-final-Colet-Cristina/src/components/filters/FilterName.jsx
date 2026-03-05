function FilterName({ handleFilterName, filterName }) {
  return (
    <form className="filter-group">
      <label htmlFor="filterByCharacter" className="label-character">
        Búsqueda de Brujas y Magos
      </label>
      <input
        className="filter-input"
        type="text"
        id="filterByCharacter"
        placeholder="Harry"
        onInput={handleFilterName}
        value={filterName}
      />
    </form>
  );
}

export default FilterName;
