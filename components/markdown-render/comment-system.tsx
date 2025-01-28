import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MessageCircle } from "lucide-react"

interface Comment {
  id: string
  selectedText: string
  startIndex: number
  endIndex: number
  commentContent: string
  timestamp: string
  author: string
}

interface CommentSystemProps {
  documentId: string
  children: React.ReactNode
}

export const CommentSystem: React.FC<CommentSystemProps> = ({ documentId, children }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [selectedText, setSelectedText] = useState("")
  const [commentInput, setCommentInput] = useState("")
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null)
  const [commentIconPosition, setCommentIconPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    // Fetch comments from API or local storage
    const fetchedComments: Comment[] = [] // Replace with actual API call
    setComments(fetchedComments)
  }, [documentId])

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0)
      const start = range.startOffset
      const end = range.endOffset
      setSelectedText(selection.toString())
      setSelectionRange({ start, end })

      // Calculate position for comment icon
      const rect = range.getBoundingClientRect()
      setCommentIconPosition({
        x: rect.right + window.scrollX,
        y: rect.top + window.scrollY,
      })
    } else {
      setSelectedText("")
      setSelectionRange(null)
      setCommentIconPosition(null)
    }
  }, [])

  const addComment = useCallback(() => {
    if (selectedText && selectionRange && commentInput.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        selectedText,
        startIndex: selectionRange.start,
        endIndex: selectionRange.end,
        commentContent: commentInput.trim(),
        timestamp: new Date().toISOString(),
        author: "current_user_id", // Replace with actual user ID
      }
      setComments([...comments, newComment])
      setCommentInput("")
      setSelectedText("")
      setSelectionRange(null)
      setCommentIconPosition(null)
    }
  }, [selectedText, selectionRange, commentInput, comments])

  return (
    <div onMouseUp={handleTextSelection}>
      {children}
      {commentIconPosition && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="absolute"
              style={{
                left: `${commentIconPosition.x}px`,
                top: `${commentIconPosition.y}px`,
                transform: "translate(8px, -50%)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <p className="font-semibold">Add a comment to:</p>
              <p className="italic">"{selectedText}"</p>
              <Input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Type your comment here..."
              />
              <Button onClick={addComment}>Submit Comment</Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

