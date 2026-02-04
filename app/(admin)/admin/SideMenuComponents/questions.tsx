"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Filter, Download, Plus, X, AlertCircle } from "lucide-react";
import { GetAllQuestions } from "@/app/(public)/hooks/question";

export default function Questions() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    difficulty: "MEDIUM",
    isPublished: false,
  });

  const { data, isFetching, error } = GetAllQuestions();

  const questionSchema = z.object({
    title: z.string().min(5, "Title should be at least 5 characters"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    tags: z.string().min(1, "At least 1 tag"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    isPublished: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(questionSchema) });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function onValidSubmit(data: any) {
    console.log("Valid data:", data);
    setShowAddForm(false);
    reset();
  }

  return (
    <>
      {/* Content */}
      <div className="p-6">
        {/* Questions Table */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl blur-xl"></div>
          <div className="relative bg-card backdrop-blur-xl border border-border rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-card-foreground">
                Recent Questions ({data?.length || 0})
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-all text-sm text-foreground">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-all text-sm text-foreground">
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-lg transition-all text-sm font-medium shadow-md"
                >
                  <Plus size={16} />
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Question
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Difficulty
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isFetching ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-muted-foreground"
                      >
                        Loading questions...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-destructive"
                      >
                        Error loading questions. Please try again.
                      </td>
                    </tr>
                  ) : data && data.length > 0 ? (
                    data.map((question: any) => (
                      <tr
                        key={question.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <p className="text-sm font-medium text-foreground">
                            {question.title}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {question.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              question.difficulty === "EASY"
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : question.difficulty === "MEDIUM"
                                  ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                  : "bg-red-500/20 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              question.isPublished
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {question.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-muted-foreground">
                            {new Date(question.createdAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <button className="text-sm text-primary hover:text-primary/80 font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-muted-foreground"
                      >
                        No questions found. Click &quot;Add Question&quot; to
                        create your first question.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl"></div>
            <div className="relative bg-card border border-border rounded-xl p-6 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-foreground">
                  Add New Question
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onValidSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Question Title *
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter question title..."
                    className="w-full px-4 py-3 bg-muted/30 border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-muted/50 transition-all"
                  />
                  {errors.title && (
                    <div className="flex mt-4 items-center gap-2 text-destructive">
                      <AlertCircle size={16} />
                      <p>{errors.title.message}</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Question Content *
                  </label>
                  <textarea
                    rows={6}
                    {...register("content")}
                    placeholder="Enter detailed question content..."
                    className="w-full px-4 py-3 bg-muted/30 border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-muted/50 transition-all resize-none"
                  />
                  {errors.content && (
                    <div className="flex mt-4 items-center gap-2 text-destructive">
                      <AlertCircle size={16} />
                      <p>{errors.content.message}</p>
                    </div>
                  )}
                </div>

                {/* Category and Tags Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      {...register("category")}
                      placeholder="e.g., Backend, Frontend"
                      className="w-full px-4 py-3 bg-muted/30 border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-muted/50 transition-all"
                    />
                    {errors.category && (
                      <div className="flex mt-4 items-center gap-2 text-destructive">
                        <AlertCircle size={16} />
                        <p>{errors.category.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tags *
                    </label>
                    <input
                      type="text"
                      {...register("tags")}
                      placeholder="javascript, react, node"
                      className="w-full px-4 py-3 bg-muted/30 border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-muted/50 transition-all"
                    />
                    {errors.tags && (
                      <div className="flex mt-4 items-center gap-2 text-destructive">
                        <AlertCircle size={16} />
                        <p>{errors.tags.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    {...register("difficulty")}
                    className="w-full px-4 py-3 bg-muted/30 border border-input rounded-lg text-foreground focus:outline-none focus:border-primary focus:bg-muted/50 transition-all"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 bg-muted hover:bg-muted/80 border border-border rounded-lg transition-all text-sm font-medium text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-lg transition-all text-sm font-medium shadow-md"
                  >
                    Create Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
