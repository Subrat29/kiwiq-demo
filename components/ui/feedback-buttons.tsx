"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackButtonsProps {
  onFeedback?: (type: "up" | "down") => void;
  className?: string;
}

export function FeedbackButtons({ onFeedback, className }: FeedbackButtonsProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<"up" | "down" | null>(null);

  const handleFeedback = (type: "up" | "down") => {
    setSelectedFeedback(type);
    onFeedback?.(type);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "text-gray-600 hover:text-green-500",
          selectedFeedback === "up" && "text-green-500"
        )}
        onClick={() => handleFeedback("up")}
      >
        <ThumbsUp className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "hover:text-red-400 text-gray-600",
          selectedFeedback === "down" && "text-red-400"
        )}
        onClick={() => handleFeedback("down")}
      >
        <ThumbsDown className="w-4 h-4 mt-1" />
      </Button>
    </div>
  );
}