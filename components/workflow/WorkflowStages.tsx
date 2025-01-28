"use client";

import React from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Stage } from '@/types';

interface WorkflowStagesProps {
  stages: Stage[];
  selectedStage: string | null;
  selectedStep: string | null;
  onStageSelect: (stageId: string) => void;
  onStepSelect: (stepId: string | null) => void;
}

export function WorkflowStages({ 
  stages, 
  selectedStage, 
  selectedStep,
  onStageSelect, 
  onStepSelect
}: WorkflowStagesProps) {
  const handleStageClick = (stageId: string) => {
    if (selectedStage === stageId) {
      // If clicking the same stage, just clear the step selection
      onStepSelect(null);
    } else {
      // If clicking a different stage, select it and clear step selection
      onStageSelect(stageId);
      onStepSelect(null);
    }
  };

  return (
    <div className="w-72 shrink-0">
      <div className="sticky top-6">
        <div className="glass-panel">
          <div className="p-4 border-b border-neutral-700/50">
            <h2 className="font-semibold text-white">Workflow Stages</h2>
            <p className="text-sm text-neutral-400 mt-1">Configure your analysis pipeline</p>
          </div>
          <div className="p-2">
            {stages.map((stage) => (
              <div key={stage.id}>
                <button
                  className={`workflow-stage-btn ${
                    selectedStage === stage.id
                      ? 'workflow-stage-btn-selected'
                      : 'workflow-stage-btn-default'
                  }`}
                  onClick={() => handleStageClick(stage.id)}
                >
                  <div className="flex items-start gap-2">
                    <span className="stage-number">
                      {stage.stageNumber}
                    </span>
                    <div className="flex-1">
                      <span className="font-medium block">{stage.name}</span>
                      <p className="text-sm text-neutral-400 mt-1">{stage.description}</p>
                    </div>
                    {/* <ChevronDown className={`w-4 h-4 mt-1 flex-shrink-0 transition-transform ${
                      selectedStage === stage.id ? 'rotate-180' : ''
                    }`} /> */}
                  </div>
                </button>

                {/* {selectedStage === stage.id && (
                  <div className="ml-8 mt-2 space-y-1">
                    {stage.steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => onStepSelect(step.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedStep === step.id
                            ? 'bg-green-500/10 text-green-500'
                            : 'text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50'
                        }`}
                      >
                        {step.name}
                      </button>
                    ))}
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-green-500 hover:bg-green-500/10 transition-colors flex items-center gap-2">
                      <Plus className="w-3.5 h-3.5" />
                      Add Step
                    </button>
                  </div>
                )} */}
              </div>
            ))}
            {/* <button className="w-full mt-2 p-3 flex items-center justify-center text-sm font-medium text-green-500 hover:bg-green-500/10 rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add New Stage
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}