"use client";

import React from 'react';
import { ChevronRight, Download, Share2, FileText, Workflow } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Header() {
  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-white">
                G2 Enterprise Reviews Analysis
              </h1>
              <div className="flex items-center text-neutral-500">
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-400">June 2024</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-green-400">95% Confidence</span>
              </div>
            </div>

            <TabsList className="h-8 bg-neutral-800/50">
              <TabsTrigger value="report" className="gap-2 text-xs">
                <FileText className="w-3.5 h-3.5" />
                Report View
              </TabsTrigger>
              <TabsTrigger value="workflow" className="gap-2 text-xs">
                <Workflow className="w-3.5 h-3.5" />
                Workflow Editor
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-secondary h-8 text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="btn btn-secondary h-8 text-sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}