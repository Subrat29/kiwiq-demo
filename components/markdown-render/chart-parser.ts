interface ChartData {
  name: string
  [key: string]: number | string
}

interface ChartConfig {
  type: string
  width?: string
  height?: string
  colorScheme?: string[]
  xAxis?: string
  yAxis?: string
  lines?: string[]
  data: ChartData[]
}

export function parseChartConfig(markdown: string): ChartConfig[] {
  const chartRegex = /<chart([^>]*)>([\s\S]*?)<\/chart>/g
  const charts: ChartConfig[] = []

  let match
  while ((match = chartRegex.exec(markdown)) !== null) {
    const [, attributes, content] = match

    const config: Partial<ChartConfig> = {
      type: getAttribute(attributes, "type"),
      width: getAttribute(attributes, "width"),
      height: getAttribute(attributes, "height"),
      colorScheme: getAttribute(attributes, "colorScheme")?.split(','),
      xAxis: getAttribute(attributes, "xAxis"),
      yAxis: getAttribute(attributes, "yAxis"),
      lines: getAttribute(attributes, "lines")?.split(',')
    }

    try {
      const jsonContent = JSON.parse(content.trim())
      
      // Support both direct data and { data: ... } format
      config.data = Array.isArray(jsonContent) ? jsonContent : jsonContent.data

      // If lines aren't specified, try to infer from data keys
      if (!config.lines && config.data && config.data.length > 0) {
        const dataKeys = Object.keys(config.data[0])
        config.lines = dataKeys.filter(key => key !== 'name')
      }
    } catch (error) {
      console.error("Error parsing chart data:", error)
      continue
    }

    if (config.type && config.data) {
      charts.push(config as ChartConfig)
    }
  }

  return charts
}

function getAttribute(attributes: string, name: string): string | undefined {
  const match = new RegExp(`${name}="([^"]*)"`, "i").exec(attributes)
  return match ? match[1] : undefined
}