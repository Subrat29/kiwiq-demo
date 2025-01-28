import React, { useCallback, useState, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, ClipboardCopy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  value: string;
  showLineNumbers?: boolean;
  copyButtonPosition?: 'top-right' | 'bottom-right' | 'hidden';
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "tsx",
  value,
  showLineNumbers = false,
  copyButtonPosition = 'top-right'
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(console.error);
  }, [value]);

  const renderCopyButton = useMemo(() => {
    if (copyButtonPosition === 'hidden') return null;

    return (
      <button
        onClick={handleCopy}
        className={`
          absolute ${copyButtonPosition === 'top-right' ? 'top-2 right-2' : 'bottom-2 right-2'}
          p-1.5 rounded text-xs
          bg-gray-100 hover:bg-gray-200
          transition-colors duration-150
          flex items-center gap-1.5
          text-gray-600 hover:text-gray-800
        `}
        aria-label={isCopied ? "Copied!" : "Copy code"}
      >
        {isCopied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <ClipboardCopy className="h-3.5 w-3.5" />
        )}
        <span className="hidden sm:inline">
          {isCopied ? "Copied" : "Copy"}
        </span>
      </button>
    );
  }, [isCopied, copyButtonPosition, handleCopy]);

  return (
    <div className="relative rounded-md overflow-hidden bg-gray-50/50 border border-gray-100">
      {renderCopyButton}
      
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "#f5f5f5", // #f5f5f5 #FFFDF7
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
        codeTagProps={{
          className: "font-mono tracking-tight",
        }}
      >
        {value || ""}
      </SyntaxHighlighter>
    </div>
  );
};

export default React.memo(CodeBlock);