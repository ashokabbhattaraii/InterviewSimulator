"use client";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "../../Context";

export default function ImportQuestion() {
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [fileName, setFileName] = useState("");
  const { isImportOpen, setIsImportOpen } = useFormContext();

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Mock preview data - replace with actual file parsing
      setPreviewData([
        {
          id: 1,
          title: "What is React?",
          category: "Frontend",
          difficulty: "EASY",
          isPublished: false,
        },
        {
          id: 2,
          title: "Explain closures in JavaScript",
          category: "Backend",
          difficulty: "MEDIUM",
          isPublished: false,
        },
        {
          id: 3,
          title: "Design a scalable system",
          category: "System Design",
          difficulty: "HARD",
          isPublished: false,
        },
      ]);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl"></div>
        <div className="relative bg-card border border-border rounded-xl p-6 shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              Import Questions
            </h2>
            <button
              onClick={() => setIsImportOpen(false)}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          {/* Upload Area */}
          <div className="space-y-6">
            {/* Drag and Drop Zone */}
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              {!fileName ? (
                <div>
                  <Upload
                    size={32}
                    className="mx-auto mb-3 text-muted-foreground"
                  />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Drag and drop your file here
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    or click to browse
                  </p>
                </div>
              ) : (
                fileName
              )}
              <input
                type="file"
                accept=".json,.csv"
                className="hidden"
                id="file-input"
                onChange={handleFileChange}
              />
            </div>

            {/* File Info */}
            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                Supported formats:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• JSON (.json)</li>
                <li>• CSV (.csv)</li>
              </ul>
            </div>

            {/* Preview Table */}
            {previewData.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Preview ({previewData.length} questions)
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {fileName}
                  </span>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="text-left p-3 text-xs font-semibold text-muted-foreground">
                            Title
                          </th>
                          <th className="text-left p-3 text-xs font-semibold text-muted-foreground">
                            Category
                          </th>
                          <th className="text-left p-3 text-xs font-semibold text-muted-foreground">
                            Difficulty
                          </th>
                          <th className="text-left p-3 text-xs font-semibold text-muted-foreground">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-border hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-3">
                              <p className="text-sm text-foreground">
                                {row.title}
                              </p>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-muted-foreground">
                                {row.category}
                              </span>
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                  row.difficulty === "EASY"
                                    ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                    : row.difficulty === "MEDIUM"
                                      ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                      : "bg-red-500/20 text-red-700 dark:text-red-400"
                                }`}
                              >
                                {row.difficulty}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                Draft
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setIsImportOpen(false)}
                className="px-6 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-all text-sm font-medium text-foreground"
              >
                Cancel
              </button>
              <button
                disabled={previewData.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-lg transition-all text-sm font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Import Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
