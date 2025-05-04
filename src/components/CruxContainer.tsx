import  { useState, useMemo, useCallback } from "react";
import CruxSummaryTable from "./CruxSummaryTable";
import CruxFilterControls from "./CruxFilterControls";
import { FilterState,getRelevantMetrics } from "../utils/helpers";


const CruxContainer = ({ rawMetrics, url }) => {
  const [sortConfig, setSortConfig] = useState({ key: "label", direction: "asc" });
  const [filter, setFilter] = useState<FilterState>({
    column: "good",
    condition: "",
    value: ""
  });

  const parsed = useMemo(() => getRelevantMetrics(rawMetrics), [rawMetrics]);

  const applyFilter = (metrics) => {
    const { column, condition, value } = filter;
    if (!value || !condition || !column) return metrics;
  
    return metrics.filter((m) => {
      const fieldVal = m[column];
  
      if (fieldVal === undefined) return true;
  
      if (["good", "needsImprovement", "poor", "p75"].includes(column)) {
        const val = parseFloat(value);
        if (isNaN(val)) return true;
        switch (condition) {
          case "gt":
            return fieldVal > val;
          case "lt":
            return fieldVal < val;
          case "eq":
            return fieldVal === val;
          default:
            return true;
        }
      } else if (column === "label") {
        return fieldVal.toLowerCase().includes(value.toLowerCase());
      }
  
      return true;
    });
  };
  

  const sortedFiltered = useMemo(() => {
    let metrics = applyFilter([...parsed]);

    // Sort
    metrics.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === "string") {
        return sortConfig.direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
    });

    return metrics;
  }, [parsed, filter, sortConfig]);

  const handleSort = useCallback((column) => {
    setSortConfig((prev) =>
      prev.key === column
        ? { key: column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key: column, direction: "asc" }
    );
  }, []);

  return (
    <div>
      <CruxFilterControls filter={filter} setFilter={setFilter} />
      <CruxSummaryTable
        metrics={sortedFiltered}
        url={url}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default CruxContainer;
