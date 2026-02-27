import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap,
  FunnelChart,
  Funnel,
  Sector,
} from "recharts";
import SimpleTable from "./Table";
import { CHART_TYPES } from "../../../core/constants/chartTypes";
import { DYCHARTCOLORS, CHARTICONS } from "../../../core/constants/chartStyles";

export default function DynamicChartViewer({
  possibleCharts,
  data,
  xAxis,
  yAxis,
  title,
  darkMode,
}) {
  const [chartType, setChartType] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const isValidAxes =
    xAxis && yAxis && typeof xAxis === "string" && typeof yAxis === "string";
  const hasTable = possibleCharts.some((c) => c.toLowerCase() === "table");

  const normalizedData = isValidAxes
    ? data?.map((d) => {
        const xKey = Object.keys(d).find(
          (k) =>
            k &&
            typeof k === "string" &&
            k.toLowerCase() === xAxis.toLowerCase(),
        );
        const yKey = Object.keys(d).find(
          (k) =>
            k &&
            typeof k === "string" &&
            k.toLowerCase() === yAxis.toLowerCase(),
        );
        const yValue = d[yKey];
        return {
          [xAxis]: d[xKey] ?? "",
          [yAxis]: isNaN(Number(yValue)) ? 0 : Number(yValue),
        };
      })
    : [];

  const total = normalizedData.reduce((sum, d) => sum + (d[yAxis] || 0), 0);
  const graphs = possibleCharts.filter((t) =>
    CHART_TYPES.includes(t.toLowerCase()),
  );

  useEffect(() => {
    if (!chartType && graphs.length) setChartType(graphs[0].toLowerCase());
  }, [graphs, chartType]);

  if (!isValidAxes && !hasTable)
    return (
      <Typography sx={{ textAlign: "center", py: 3, color: "gray" }}>
        Invalid axis configuration. Please check your data schema.
      </Typography>
    );

  if (!data?.length || graphs.length === 0)
    return (
      <Typography sx={{ textAlign: "center", py: 3, color: "gray" }}>
        No data to display
      </Typography>
    );

  const axisColor = darkMode ? "#e2e8f0" : "#1e293b";
  const gridColor = darkMode ? "#475569" : "#e2e8f0";
  const barHover = darkMode ? "rgba(27, 38, 53, 0.85)" : "rgba(0, 0, 0, 0.2)";

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    const percent = ["pie", "donut"].includes(chartType)
      ? ` (${((value / total) * 100).toFixed(1)}%)`
      : "";
    return (
      <Box
        sx={{
          bgcolor: darkMode ? "#334155" : "#fff",
          p: 1.5,
          borderRadius: 2,
          color: darkMode ? "#e2e8f0" : "#1e293b",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: "bold" }}>
          {label}
        </Typography>
        <Typography
          sx={{ fontSize: 12 }}
        >{`${name}: ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}${percent}`}</Typography>
      </Box>
    );
  };

  const activePie = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={5}
      />
    );
  };

  const renderChart = () => {
    const commonProps = {
      data: normalizedData,
      margin: { top: 20, right: 15, bottom: 10, left: 0 },
      animationDuration: 800,
      animationEasing: "ease-out",
    };
    const axisProps = {
      stroke: axisColor,
      tick: { fill: axisColor, fontSize: 12 },
    };

    switch (chartType) {
      case "bar":
      case "histogram":
      case "waterfall":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxis}
              {...axisProps}
              tick={{ fill: axisColor, fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              {...axisProps}
              tick={{ fill: axisColor, fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: barHover, stroke: "none", opacity: 1 }}
            />
            <Legend wrapperStyle={{ color: axisColor, fontSize: 12 }} />
            <Bar dataKey={yAxis} radius={[5, 5, 0, 0]}>
              {normalizedData.map((d, i) => (
                <Cell
                  key={i}
                  fill={DYCHARTCOLORS[i % DYCHARTCOLORS.length]}
                  cursor="pointer"
                  stroke={darkMode ? "#1e293b" : "#fff"}
                />
              ))}
            </Bar>
          </BarChart>
        );

      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: axisColor, fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey={yAxis}
              stroke={DYCHARTCOLORS[0]}
              strokeWidth={2}
              dot={{ fill: DYCHARTCOLORS[0] }}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey={yAxis}
              fill={DYCHARTCOLORS[0]}
              stroke={DYCHARTCOLORS[0]}
            />
          </AreaChart>
        );

      case "pie":
      case "donut":
        const showLabels = normalizedData.length <= 10;
        return (
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={normalizedData}
              dataKey={yAxis}
              nameKey={xAxis}
              cx="50%"
              cy="50%"
              innerRadius={chartType === "donut" ? 60 : 0}
              outerRadius="80%"
              fill={DYCHARTCOLORS[0]}
              stroke="none"
              animationDuration={500}
              animationEasing="ease-out"
              activeIndex={activeIndex}
              activeShape={activePie}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              labelLine={false}
              label={
                showLabels
                  ? ({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      index,
                      name,
                      value,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) / 2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const percent = ((value / total) * 100).toFixed(1);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight={600}
                        >
                          {`${name}: ${percent}%`}
                        </text>
                      );
                    }
                  : false
              }
            >
              {normalizedData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={DYCHARTCOLORS[index % DYCHARTCOLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );

      case "scatter":
      case "bubble":
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis
              type={isNaN(normalizedData[0][xAxis]) ? "category" : "number"}
              dataKey={xAxis}
              {...axisProps}
            />
            <YAxis type="number" dataKey={yAxis} {...axisProps} />
            {chartType === "bubble" && (
              <ZAxis dataKey={yAxis} range={[50, 500]} />
            )}
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <Box
                    sx={{
                      bgcolor: darkMode ? "#334155" : "#fff",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 12 }}
                    >{`${xAxis}: ${d[xAxis]}`}</Typography>
                    <Typography
                      sx={{ fontSize: 12 }}
                    >{`${yAxis}: ${d[yAxis]}`}</Typography>
                    {chartType === "bubble" && (
                      <Typography
                        sx={{ fontSize: 12 }}
                      >{`Size: ${d[yAxis]}`}</Typography>
                    )}
                  </Box>
                );
              }}
            />
            <Scatter
              name={title}
              data={normalizedData}
              fill={DYCHARTCOLORS[0]}
              shape="circle"
            />
          </ScatterChart>
        );

      case "radar":
        return (
          <RadarChart outerRadius={100} data={normalizedData}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxis} />
            <PolarRadiusAxis />
            <Radar
              name={title}
              dataKey={yAxis}
              stroke={DYCHARTCOLORS[0]}
              fill={DYCHARTCOLORS[0]}
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        );

      case "treemap":
        return (
          <Treemap
            data={normalizedData}
            dataKey={yAxis}
            nameKey={xAxis}
            stroke="#fff"
            content={({ x, y, width, height, name, value, index }) => (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={DYCHARTCOLORS[index % DYCHARTCOLORS.length]}
                  stroke="#fff"
                />
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={12}
                >{`${name}: ${value}`}</text>
              </g>
            )}
          />
        );

      case "funnel":
        return (
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel data={normalizedData} dataKey={yAxis} nameKey={xAxis} />
          </FunnelChart>
        );

      case "table":
        return <SimpleTable data={data} darkMode={darkMode} title={title} />;

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        width: chartType === "table" ? "fit-content" : "100%",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        height: chartType === "table" ? "auto" : "70vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InsightsIcon sx={{ color: "#fff" }} />
          {title ||
            `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart`}
        </Typography>
        {graphs.length > 1 && (
          <FormControl
            size="small"
            sx={{
              minWidth: 130,
              ml: 10,
              mr: 1,
              backgroundColor: "transparent",
            }}
          >
            <InputLabel sx={{ color: darkMode ? "#e2e8f0" : "#1e293b" }}>
              Chart Type
            </InputLabel>
            <Select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              label="Chart Type"
              sx={{
                color: darkMode ? "#e2e8f0" : "#1e293b",
                backgroundColor: "transparent",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#475569" : "#cbd5e1",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4f46e5",
                },
              }}
            >
              {graphs.map((t) => (
                <MenuItem
                  key={t}
                  value={t.toLowerCase()}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {CHARTICONS[t.toLowerCase()] || null}
                  <Typography sx={{ lineHeight: 1 }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box
        sx={{
          flex: chartType === "table" ? "0 0 auto" : 1,
          minHeight: chartType === "table" ? "auto" : 0,
          width: chartType === "table" ? "fit-content" : "100%",
          overflowX: chartType === "table" ? "auto" : "hidden",
          overflowY: chartType === "table" ? "auto" : "hidden",
          backgroundColor: "transparent",
        }}
      >
        {chartType === "table" ? (
          <Box sx={{ display: "inline-block" }}>{renderChart()}</Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
}
