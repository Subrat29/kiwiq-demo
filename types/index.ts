export type Tab = 'report' | 'workflow';

export type Stage = {
  id: string;
  name: string;
  description: string;
  stageNumber: number;
  steps: Step[];
};

export type Step = {
  id: string;
  name: string;
  description: string;
  stepNumber: number;
  nodes: Node[];
};

export type Tag = {
  id: string;
  name: string;
  description: string;
};

export type Node = {
  id: string;
  name: string;
  type: string;
  description: string;
  prompt?: string;
  tags: Tag[];
};

export type Message = {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  streaming?: boolean;
};

export type ReportData = {
  timePeriod: {
    start: string;
    totalReviews: number;
  };
  criticalInsights: string[];
  metrics: {
    totalReviews: {
      value: number;
      change: string;
    };
    satisfactionScore: {
      value: number;
      change: string;
    };
  };
  industryDistribution: {
    [key: string]: number;
  };
  featureAnalysis: {
    strongest: {
      name: string;
      score: string;
    }[];
    improvements: {
      name: string;
      score: string;
      details: string[];
    }[];
  };
  buyerPersonas: {
    technical: {
      concerns: {
        name: string;
        percentage: number;
      }[];
      requirements: string[];
    };
    operations: {
      concerns: {
        name: string;
        percentage: number;
      }[];
      requirements: string[];
    };
  };
};