import { memo } from "react";
import CruxContainer from "./CruxContainer";

const ResultBlock = memo(({ url, data, error }:{url:string,data:any,error:string}) => (
  <div className="result">
    {error || !data ? (
      <div className="error-box">
      <span className="error-text">❌ Failed to fetch data from:</span>
      <br />
      <span className="error-url">{url}</span>
      <br />
      <span className="error-reason">Reason: The URL is unreachable or returned no data.</span>
    </div>
    ) : (
      <CruxContainer rawMetrics={data.metrics} url={url} />
    )}
  </div>
));

export default ResultBlock;
