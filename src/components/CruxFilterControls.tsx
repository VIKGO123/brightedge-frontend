import {
  FilterState,
  METRIC_FILTER_COL_FIELDS,
  METRIC_FILTER_CONDITIONS,
} from "../utils/helpers";

const CruxFilterControls = ({
  filter,
  setFilter,
}: {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const isNumericField = ["p75", "good", "needsImprovement", "poor"].includes(
    filter.column
  );
  const conditions = METRIC_FILTER_CONDITIONS(isNumericField);

  return (
    <div className="filter-controls" style={{ marginBottom: "1rem" }}>
      <label>
        Column:&nbsp;
        <select
          value={filter.column}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              column: e.target.value,
              condition: "",
              value: "",
            }))
          }
        >
          {METRIC_FILTER_COL_FIELDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </label>
      &nbsp;
      <label>
        Condition:&nbsp;
        <select
          value={filter.condition}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, condition: e.target.value }))
          }
        >
          {conditions.map((c) => (
            <option key={c.value} value={c.value} disabled={c.disabled}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      &nbsp;
      <label>
        Value:&nbsp;
        <input
          type={isNumericField ? "number" : "text"}
          value={filter.value}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, value: e.target.value }))
          }
          placeholder={isNumericField ? "Enter number" : "Enter text"}
        />
      </label>
    </div>
  );
};

export default CruxFilterControls;
