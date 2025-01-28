export type SubStep = {
  id: number;
  name: string;
  description: string;
};

export type StageStep = {
  id: number;
  substeps: SubStep[];
};

export type StagePrompt = {
  name: string;
  value: string;
};

export type Stage = {
  id: string;
  name: string;
  description: string;
  stageNumber: number;
  prompts: StagePrompt[];
  steps: StageStep[];
};