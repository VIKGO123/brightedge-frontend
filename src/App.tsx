import { useState } from "react";
import "./App.css";
import InputForm from "./components/InputForm";
import ResultBlock from "./components/ResultBlock";
import { fetchCruxData } from "./services/cruxService";
import { JSX } from "react/jsx-runtime";

const App = () => {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    const urlList = urls
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter((u) => u);

    if (!urlList.length) return;

    setLoading(true); // start loading
    setResults([]); // clear old results

    const fetchedResults = await Promise.all(urlList.map(fetchCruxData));

    setResults(fetchedResults);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2>CrUX Performance Report Viewer</h2>
        <InputForm urls={urls} setUrls={setUrls} onSubmit={handleFetch} />

        {loading && <p className="loading">Fetching data, please wait...</p>}

        {!loading &&
          results.map((res: JSX.IntrinsicAttributes & { url: string; data: any; error: string; }) => <ResultBlock key={res.url} {...res} />)}
      </div>
      <div className="footer">
        <em>
          Tip: Click on column headers to sort. A filter menu is available at
          the top of the grid.
        </em>
      </div>
    </div>
  );
};

export default App;
