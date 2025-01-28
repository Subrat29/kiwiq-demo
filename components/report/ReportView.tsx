"use client";

import { useState, useEffect } from "react";
import MarkdownRenderer from "@/components/markdown-render/markdown-renderer";
import { Loader2 } from "lucide-react";

export default function ReportView() {
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const documentId = "unique-doc-id"; // Replace with actual document ID logic

  useEffect(() => {
    fetch("/markdown-report.md")
      .then((response) => response.text())
      .then((data) => {
        setMarkdown(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 p-8 bg-red-50 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Failed to Load Report</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        <p className="text-gray-600 font-medium">Loading report...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg h-screen overflow-y-auto markdown">
      <MarkdownRenderer content={markdown} documentId={documentId} />
    </div>
  );
}