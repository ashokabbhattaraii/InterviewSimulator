"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Filter, Download, Plus, X, AlertCircle } from "lucide-react";

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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Recent Questions</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm">
                  <Download size={16} />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all text-sm font-medium"
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
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Question
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Author
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Category
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Views
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Answers
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Date
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No questions found. Click &quot;Add Question&quot; to
                      create your first question.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-slate-900 border border-white/10 rounded-xl p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Add New Question
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
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
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Question Title *
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter question title..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  />
                  {errors.title && (
                    <div className="flex mt-4 items-center gap-2 text-red-600">
                      <AlertCircle size={16} />
                      <p>{errors.title.message}</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Question Content *
                  </label>
                  <textarea
                    rows={6}
                    {...register("content")}
                    placeholder="Enter detailed question content..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                  />
                  {errors.content && (
                    <div className="flex mt-4 items-center gap-2 text-red-600">
                      <AlertCircle size={16} />
                      <p>{errors.content.message}</p>
                    </div>
                  )}
                </div>

                {/* Category and Tags Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      {...register("category")}
                      placeholder="e.g., Backend, Frontend"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                    {errors.category && (
                      <div className="flex mt-4 items-center gap-2 text-red-600">
                        <AlertCircle size={16} />
                        <p>{errors.category.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tags *
                    </label>
                    <input
                      type="text"
                      {...register("tags")}
                      placeholder="javascript, react, node"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                    {errors.tags && (
                      <div className="flex mt-4 items-center gap-2 text-red-600">
                        <AlertCircle size={16} />
                        <p>{errors.tags.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    {...register("difficulty")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>

                {/* Publish Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    {...register("isPublished")}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isPublished"
                    className="text-sm text-slate-300"
                  >
                    Publish immediately
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all text-sm font-medium"
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
