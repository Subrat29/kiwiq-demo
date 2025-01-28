"use client"

import type React from "react"
import { useState, useRef  } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface HovercardProps {
  id: string
  children: React.ReactNode
}

export const Hovercard: React.FC<HovercardProps> = ({ id, children }) => {
  const [data, setData] = useState<any>(null)

  // Simulating data fetch on hover
  const fetchData = () => {
    console.log(`Fetching data for ID: ${id}`);
    // Replace this with actual API call in a real application
    setTimeout(() => {
      setData({
        id,
        type: "Ad",
        format: "VIDEO",
        impressions: Math.floor(Math.random() * 100000),
        clicks: Math.floor(Math.random() * 1000),
      })
    }, 300)
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-pointer text-red-600 hover:underline" onMouseEnter={fetchData}>
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white shadow-lg rounded-md p-4 z-50">
        {data ? (
          <div>
            <h3 className="font-semibold mb-2">{`Ad ID: ${data.id}`}</h3>
            <p>{`Type: ${data.type}`}</p>
            <p>{`Format: ${data.format}`}</p>
            <p>{`Impressions: ${data.impressions.toLocaleString()}`}</p>
            <p>{`Clicks: ${data.clicks.toLocaleString()}`}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}

