"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { X, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { type StageStep, SubStep } from "@/types/workflow"

// Replace this with your AnalystAgent JSON data
const analystAgentData = {
  steps: [
    {
      id: 1,
      substeps: [
        { id: 1, name: "Analyze Market Trends", description: "Gather and analyze market data to identify trends." },
        { id: 2, name: "Competitor Analysis", description: "Evaluate competitors' strategies and performance." },
      ],
    },
    {
      id: 2,
      substeps: [
        { id: 1, name: "Customer Feedback", description: "Analyze feedback from customers to improve services." },
      ],
    },
  ],
}

export default function StageNode() {
  // Initialize state using JSON data
  const [steps, setSteps] = useState<StageStep[]>(analystAgentData.steps)
  const [expandedSteps, setExpandedSteps] = useState<number[]>(steps.map((step) => step.id))

  const addStep = () => {
    const newStepId = steps.length + 1
    setSteps([...steps, { id: newStepId, substeps: [] }])
    setExpandedSteps([...expandedSteps, newStepId])
  }

  const removeStep = (stepId: number) => {
    setSteps(steps.filter((step) => step.id !== stepId))
    setExpandedSteps(expandedSteps.filter((id) => id !== stepId))
  }

  const addSubstep = (stepId: number) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            substeps: [
              ...step.substeps,
              { id: step.substeps.length + 1, name: "New SubStep", description: "Description of the substep." },
            ],
          }
        }
        return step
      }),
    )
  }

  const removeSubstep = (stepId: number, substepId: number) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            substeps: step.substeps.filter((substep) => substep.id !== substepId),
          }
        }
        return step
      }),
    )
  }

  const updateSubstep = (stepId: number, substepId: number, field: "name" | "description", value: string) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            substeps: step.substeps.map((substep) => {
              if (substep.id === substepId) {
                return { ...substep, [field]: value }
              }
              return substep
            }),
          }
        }
        return step
      }),
    )
  }

  const toggleStepExpansion = (stepId: number) => {
    setExpandedSteps(
      expandedSteps.includes(stepId) ? expandedSteps.filter((id) => id !== stepId) : [...expandedSteps, stepId],
    )
  }

  return (
    <Card className="h-full border-0 rounded-none glass-panel">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">Stage Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] w-full pr-4">
          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <Input placeholder="Stage Name" className="input-field" value="Stage 1: Linkedln Ad Basics Analysis" />
              <Input placeholder="Stage Description" className="input-field" value="Analyzes Linkedln ads step by step." />
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Step-by-Step Analysis</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <Card key={step.id} className="glass-panel">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md font-semibold text-white">Step {step.id}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <button
                            className="icon-button"
                            onClick={() => toggleStepExpansion(step.id)}
                          >
                            {expandedSteps.includes(step.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <button
                            className="icon-button text-red-400"
                            onClick={() => removeStep(step.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </CardHeader>
                    {expandedSteps.includes(step.id) && (
                      <CardContent className="p-4 pt-0 space-y-2">
                        {step.substeps.map((substep) => (
                          <div key={substep.id} className="flex items-center gap-2">
                            <Input
                              placeholder="SubStep Name"
                              value={substep.name}
                              onChange={(e) => updateSubstep(step.id, substep.id, "name", e.target.value)}
                              className="w-1/3 input-field"
                            />
                            <Input
                              placeholder="SubStep Description"
                              value={substep.description}
                              onChange={(e) => updateSubstep(step.id, substep.id, "description", e.target.value)}
                              className="flex-1 input-field"
                            />
                            <button
                              className="icon-button text-red-400"
                              onClick={() => removeSubstep(step.id, substep.id)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          className="btn btn-secondary w-full mt-2"
                          onClick={() => addSubstep(step.id)}
                        >
                          <Plus size={16} className="mr-2" /> Add Substep
                        </button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
              <button
                className="btn btn-secondary w-full mt-4"
                onClick={addStep}
              >
                <Plus size={16} className="mr-2" /> Add Step
              </button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
