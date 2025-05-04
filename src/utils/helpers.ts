const METRIC_MAP = {
    first_contentful_paint: "First Contentful Paint (ms)",
    largest_contentful_paint: "Largest Contentful Paint (ms)",
    cumulative_layout_shift: "Cumulative Layout Shift",
    interaction_to_next_paint: "Interaction to Next Paint (ms)",
    experimental_time_to_first_byte: "Time to First Byte (ms)"
  };
  export type FilterState = {
    column: string,
    condition: string,
    value: string
  }
  export const METRIC_FILTER_COL_FIELDS = [
    { value: "label", label: "Metric" },
    { value: "p75", label: "p75 Value" },
    { value: "good", label: "Good (%)" },
    { value: "needsImprovement", label: "Needs Improvement (%)" },
    { value: "poor", label: "Poor (%)" },
  ];
  export const METRIC_FILTER_CONDITIONS= (isNumericField:boolean)=>{
   return  isNumericField? [
        { value: "", label: "Select Condition", disabled: true },
        { value: "gt", label: "Greater than", disabled: false },
        { value: "lt", label: "Less than", disabled: false },
        { value: "eq", label: "Equals", disabled: false },
      ]
    : [{ value: "", label: "Select Condition", disabled: true },{ value: "contains", label: "Contains" ,disabled: false}];
  }
  
  export const getRelevantMetrics = (rawMetrics: any) => {
    return Object.entries(rawMetrics || {})
    .filter(([key]) => Object.keys(METRIC_MAP).includes(key))
    .map(([key, metric]) => {
      const p75 = metric?.percentiles?.p75 ?? "–";
      const histogram = metric?.histogram ?? [];
      return {
        key,
        label: METRIC_MAP[key],
        p75: Number?.(p75) ,
        good: histogram[0] ? parseFloat((histogram[0].density * 100).toFixed(2)) : 0,
        needsImprovement: histogram[1] ? parseFloat((histogram[1].density * 100).toFixed(2)) : 0,
        poor: histogram[2] ? parseFloat((histogram[2].density * 100).toFixed(2)) : 0
      };
    });
  };
  
 
  