"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { ReportAssistant } from "@/components/report/ReportAssistant";
import ReportView from "@/components/report/ReportView";
import { WorkflowStages } from "@/components/workflow/WorkflowStages";
import { Message } from "@/types";
import { v4 as uuidv4 } from "uuid";
import StageNode from "@/components/workflow/StageNode";
import TemplateEditor from "@/components/workflow/TemplateEditor";

export default function Home() {
  const [selectedStage, setSelectedStage] = useState<string | null>(
    "input-processing"
  );
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const stages = [
    {
      id: "linkedin-ad-analysis-stage-1",
      name: "Stage 1: LinkedIn Ad Basics Analysis",
      description: "Analyzes LinkedIn ads step by step.",
      stageNumber: 1,
      steps: [],
    },
    {
      id: "linkedin-ad-analysis-stage-2",
      name: "Stage 2: Pattern Analysis Across Ads",
      description: "Analyzes patterns across multiple ads.",
      stageNumber: 2,
      steps: [],
    },
    {
      id: "linkedin-ad-analysis-stage-3",
      name: "Stage 3: Section Reporting",
      description: "Generates section reports.",
      stageNumber: 3,
      steps: [],
    },
    {
      id: "linkedin-ad-analysis-stage-4",
      name: "Stage 4: Final Report Generation",
      description: "Generates final LinkedIn Ads analysis report.",
      stageNumber: 4,
      steps: [],
    },
  ];
  

  const streamResponse = async (response: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: "",
      type: "assistant",
      streaming: true,
    };

    setMessages((prev) => [...prev, newMessage]);

    let currentText = "";
    for (let i = 0; i < response.length; i++) {
      currentText += response[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, content: currentText } : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === newMessage.id ? { ...msg, streaming: false } : msg
      )
    );
    setIsStreaming(false);
  };

  const handleQuerySubmit = async (query: string) => {
    if (!query.trim() || isStreaming) return;

    setIsStreaming(true);
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        content: query,
        type: "user",
      },
    ]);
    setCurrentQuery("");

    const sampleResponse =
      "Based on the analysis of G2 Enterprise Reviews for June 2024, there are several key insights:\n\n1. Enterprise security has become a primary selection factor, with 45% of technical decision makers prioritizing security features.\n\n2. API capabilities are increasingly driving technical evaluation, showing a 15% increase from the previous quarter.\n\n3. Integration depth is becoming more critical, with 38% of reviews mentioning integration capabilities.";

    await streamResponse(sampleResponse);
  };

  const selectedStageData = stages.find((s) => s.id === selectedStage);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Tabs defaultValue="report">
        <Header />

        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <TabsContent value="report" className="mt-0">
            <div className="flex gap-6 h-[calc(100vh-8rem)]">
              <ReportAssistant
                messages={messages}
                currentQuery={currentQuery}
                isStreaming={isStreaming}
                onQueryChange={setCurrentQuery}
                onQuerySubmit={handleQuerySubmit}
              />
              <ReportView />
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="mt-0">
            <div className="flex gap-6 h-[calc(100vh-8rem)]">
              <WorkflowStages
                stages={stages}
                selectedStage={selectedStage}
                selectedStep={selectedStep}
                onStageSelect={setSelectedStage}
                onStepSelect={setSelectedStep}
              />

              <div className="flex-1 min-w-0 flex gap-6">
                <div className="flex-1">
                  <StageNode /> 
                </div>
                <div className="flex-1">
                  <TemplateEditor />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
