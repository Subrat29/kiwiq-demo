import type React from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"

interface LineData {
  name: string
  [key: string]: number | string
}

interface ChartProps {
  type: string
  width?: string
  height?: string
  colorScheme?: string[]
  xAxis?: string
  yAxis?: string
  data: LineData[]
  lines?: string[]
  title?: string
  description?: string
}

const ChartRenderer: React.FC<ChartProps> = ({
  type,
  width = "100%",
  height = "300px",
  colorScheme,
  xAxis,
  yAxis,
  data,
  lines,
  title,
  description,
}) => {
  const defaultColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const colors = colorScheme || defaultColors

  const chartConfig: { [key: string]: { label: string, color: string } } = lines ? 
    lines.reduce((config, line, index) => ({
      ...config,
      [line]: {
        label: line.charAt(0).toUpperCase() + line.slice(1),
        color: colors[index % colors.length],
      }
    }), {}) : 
    { value: { label: "Value", color: colors[0] } }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]}>
              <LabelList dataKey="value" position="top" className="fill-foreground" />
            </Bar>
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {lines && lines.map((line, index) => (
              <Line
                key={line}
                type="monotone"
                dataKey={line}
                stroke={chartConfig[line].color}
                strokeWidth={2}
                dot={{ fill: chartConfig[line].color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        )
      case "pie":
        return (
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        )
      default:
        return <div>Unsupported chart type: {type}</div>
    }
  }

  const getTrend = (dataKey?: string) => {
    if (data.length < 2) return null
    
    const lineToCheck = dataKey || 'value'
    const lastValue = data[data.length - 1][lineToCheck]
    const secondLastValue = data[data.length - 2][lineToCheck]
    
    const trend = ((Number(lastValue) - Number(secondLastValue)) / Number(secondLastValue)) * 100
    return {
      value: Math.abs(trend).toFixed(1),
      direction: trend >= 0 ? "up" : "down",
    }
  }

  const trend = getTrend(lines ? lines[0] : undefined)

  console.log("ChartRenderer", { type, width, height, colorScheme, xAxis, yAxis, data, lines, title, description })

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{title || `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}</CardTitle>
        <CardDescription>{description || "Chart description"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={`h-[${height}]`}>
          <ResponsiveContainer width={width} height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {trend && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending {trend.direction} by {trend.value}%
            {trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="leading-none text-muted-foreground">Showing data for the last {data.length} periods</div>
        </CardFooter>
      )}
    </Card>
  )
}

export default ChartRenderer