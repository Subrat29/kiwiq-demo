import type React from "react"
import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from "next/image"
import { Hovercard } from "./hover-card"
import CodeBlock from "./code-block"
import { CommentSystem } from "./comment-system"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ChartRenderer from "./chart-renderer"
import { parseChartConfig } from "./chart-parser"

interface Comment {
  id: string
  startIndex: number
  endIndex: number
  commentContent: string
  author: string
  timestamp: string
}

interface MarkdownRendererProps {
  content: string
  documentId: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, documentId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [charts, setCharts] = useState<any[]>([])

  console.log("Rendering MarkdownRenderer")

  useEffect(() => {
    // Fetch comments from API or local storage
    const fetchedComments: Comment[] = [] // Replace with actual API call
    setComments(fetchedComments)

    // Parse chart configurations
    const parsedCharts = parseChartConfig(content)
    setCharts(parsedCharts)
  }, [content]) // Removed unnecessary dependency: documentId

  const highlightComments = (text: string) => {
    let lastIndex = 0
    const parts = []

    comments
      .sort((a, b) => a.startIndex - b.startIndex)
      .forEach((comment) => {
        if (comment.startIndex > lastIndex) {
          parts.push(text.slice(lastIndex, comment.startIndex))
        }
        parts.push(
          <Popover key={comment.id}>
            <PopoverTrigger asChild>
              <span className="bg-yellow-100 cursor-pointer">{text.slice(comment.startIndex, comment.endIndex)}</span>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="font-semibold">Comment:</p>
              <p>{comment.commentContent}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(comment.timestamp).toLocaleString()} - {comment.author}
              </p>
            </PopoverContent>
          </Popover>,
        )
        lastIndex = comment.endIndex
      })

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return <>{parts}</>
  }

  const renderContent = () => {
    const parts = content.split(/<chart[\s\S]*?<\/chart>/)
    const renderedParts = []

    for (let i = 0; i < parts.length; i++) {
      renderedParts.push(
        <ReactMarkdown
          key={`markdown-${i}`}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-800" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mt-4 mb-2 text-gray-800" {...props} />,
            p: ({ node, ...props }) => (
              <p className="mb-4 text-gray-700 leading-relaxed">{highlightComments(props.children as string)}</p>
            ),
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-700" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-700" {...props} />,
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
            th: ({ node, ...props }) => (
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                {...props}
              />
            ),
            td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
            img: ({ node, ...props }) => (
              <Image
                src={props.src || ""}
                alt={props.alt || ""}
                width={500}
                height={300}
                className="my-4 rounded-lg shadow-md"
              />
            ),
            code: ({ node, className, children, ...props }) => {
              const content = children?.toString() || ""
              const isAdId = /^[A-Za-z0-9_-]+$/.test(content)

              if (isAdId) {
                return (
                  <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props}>
                    <Hovercard id={content}>{content}</Hovercard>
                  </code>
                )
              }

              const match = className?.match(/language-(\w+)/)
              const language = match ? match[1] : undefined
              return <CodeBlock language={language || "text"} value={String(children)} />
            },
            span: ({ node, ...props }) => {
              return <span {...props} />
            },
          }}
        >
          {parts[i]}
        </ReactMarkdown>,
      )

      if (i < charts.length) {
        renderedParts.push(
          <ChartRenderer
            key={`chart-${i}`}
            colorScheme={charts[i].colorScheme}
            data={charts[i].data}
            description={charts[i].description}
            height={charts[i].height}
            lines={charts[i].lines}
            type={charts[i].type}
            width={charts[i].width}
            xAxis={charts[i].xAxis}
            yAxis={charts[i].yAxis}
          />,
        )
      }
    }

    return renderedParts
  }

  return <CommentSystem documentId={documentId}>{renderContent()}</CommentSystem>
}

export default MarkdownRenderer

