import { memo } from "react";

const InputForm = memo(({ urls, setUrls, onSubmit }:{urls:string,setUrls(value:string):void,onSubmit():void}) => (
  <div>
    <textarea
      className="input"
      rows={4}
      value={urls}
      placeholder="Enter URLs (comma or newline separated)"
      onChange={(e) => setUrls(e.target.value)}
    />
    <button className="button" onClick={onSubmit}>Search</button>
  </div>
));

export default InputForm;
