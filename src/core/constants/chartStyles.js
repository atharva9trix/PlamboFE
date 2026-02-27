import {
  BarChart as BarIcon,
  ShowChart as LineIcon,
  PieChart as PieIcon,
  TableChart as TableIcon,
  StackedLineChart as AreaIcon,
  ScatterPlot as ScatterIcon,
  DonutSmall as DonutIcon,
  Timeline as FunnelIcon,
  BubbleChart as BubbleIcon,
  Radar as RadarIcon,
  Layers as TreemapIcon,
  GridOn as HeatmapIcon,
} from "@mui/icons-material";


export const DYCHARTCOLORS = [
  "#2563eb",
  "#9333ea",
  "#db2777",
  "#fde047",
  "#34d399",
  "#f97316",
  "#8b5cf6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
];

export const CHARTICONS = {
  bar: <BarIcon fontSize="small" sx={{ mr: 1 }} />,
  line: <LineIcon fontSize="small" sx={{ mr: 1 }} />,
  pie: <PieIcon fontSize="small" sx={{ mr: 1 }} />,
  donut: <DonutIcon fontSize="small" sx={{ mr: 1 }} />,
  area: <AreaIcon fontSize="small" sx={{ mr: 1 }} />,
  scatter: <ScatterIcon fontSize="small" sx={{ mr: 1 }} />,
  bubble: <BubbleIcon fontSize="small" sx={{ mr: 1 }} />,
  radar: <RadarIcon fontSize="small" sx={{ mr: 1 }} />,
  treemap: <TreemapIcon fontSize="small" sx={{ mr: 1 }} />,
  funnel: <FunnelIcon fontSize="small" sx={{ mr: 1 }} />,
  histogram: <BarIcon fontSize="small" sx={{ mr: 1 }} />,
  table: <TableIcon fontSize="small" sx={{ mr: 1 }} />,
  heatmap: <HeatmapIcon fontSize="small" sx={{ mr: 1 }} />,
};