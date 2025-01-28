"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function TemplateEditor() {
  const [template, setTemplate] = useState<string>(defaultTemplate)

  return (
    <Card className="h-full border-0 rounded-none glass-panel">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">Qualitative Template Editor</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] w-full pr-4">
          <Textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="min-h-[600px] w-full border-0 focus-visible:ring-0 resize-none font-mono input-field p-4"
            placeholder="Enter your qualitative analysis template here..."
          />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 pb-6">
        <p className="text-sm text-neutral-400">Edit template to regenerate step-by-step analysis</p>
        <button className="btn btn-primary">
          Plan Analysis
        </button>
      </CardFooter>
    </Card>
  )
}

const defaultTemplate = `### **LinkedIn Ad Analysis Template for B2B Companies**

This template is a step-by-step guide for analyzing LinkedIn ads to uncover actionable insights. The goal is to evaluate ad effectiveness, messaging strategy, and targeting precision, providing detailed insights for B2B marketers.

---

## **Step 1: Ad Basics**

- **Objective:** Understand the overall setup and initial impressions.
- **Instructions:**
  1. **Ad Format:**
      - Identify the format: Single Image, Carousel, Video, etc.
      - Note how the format complements the content.
      - Evaluate whether the format is suitable for its intended purpose (e.g., awareness, lead generation).
  2. **Advertiser Name:**
      - Record the company name and any associated branding cues.`