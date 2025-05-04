import { memo } from "react";

const CruxSummaryTable = memo(({ metrics, url, onSort, sortConfig }:{metrics:any,url:string,onSort(value:string):void,sortConfig:any}) => {
  const getSortSymbol = (column:string) => {
    if (sortConfig.key !== column) return "";
    return sortConfig.direction === "asc" ? " 🔼" : " 🔽";
  };

  return (
    <table>
      <caption>Performance Metrics For: {url}</caption>
      <thead>
        <tr>
          <th onClick={() => onSort("label")}>Metric {getSortSymbol("label")}</th>
          <th onClick={() => onSort("p75")}>p75 Value {getSortSymbol("p75")}</th>
          <th onClick={() => onSort("good")}>Good % {getSortSymbol("good")}</th>
          <th onClick={() => onSort("needsImprovement")}>
            Needs Improvement % {getSortSymbol("needsImprovement")}
          </th>
          <th onClick={() => onSort("poor")}>Poor % {getSortSymbol("poor")}</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric:any) => (
          <tr key={metric.key}>
            <td>{metric.label}</td>
            <td>{metric.p75}</td>
            <td>{metric.good}</td>
            <td>{metric.needsImprovement}</td>
            <td>{metric.poor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default CruxSummaryTable;
