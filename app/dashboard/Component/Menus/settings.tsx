import { useAuthStore } from "@/app/(auth)/store/userAuth";
import useChangePassword from "@/app/(public)/hooks/change-password";
import { z } from "zod";
import {
  Bell,
  Lock,
  Palette,
  Volume2,
  User,
  Save,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Eye,
  Database,
  Clock,
  Mail,
  Code,
  Download,
  Trash2,
  ToggleRight,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

// Zod validation schema
const passwordSchema = z
  .object({
    oldPass: z.string().min(1, "Current password is required"),
    newPass: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain a special character (!@#$%^&*)",
      ),
    confirmPass: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPass === data.confirmPass, {
    message: "Passwords don't match",
    path: ["confirmPass"],
  })
  .refine((data) => data.oldPass !== data.newPass, {
    message: "New password must be different from current password",
    path: ["newPass"],
  });

interface changePasswordType {
  currentUser: string;
  oldPass: string;
  newPass: string;
}

export default function SettingsMenu() {
  const { user } = useAuthStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState<
    changePasswordType & { confirmPass?: string }
  >({
    oldPass: "",
    newPass: "",
    confirmPass: "",
    currentUser: user?.id || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const { mutate: changePass } = useChangePassword(passwords);

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");

    try {
      // Validate using Zod schema
      const validatedData = passwordSchema.parse(passwords);

      // Call the mutation
      changePass();

      setPasswords({
        oldPass: "",
        newPass: "",
        currentUser: user?.id || "",
        confirmPass: "",
      });
      setShowPasswordModal(false);
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPasswords({
      oldPass: "",
      newPass: "",
      currentUser: user?.id || "",
      confirmPass: "",
    });
    setErrors({});
    setSubmitError("");
  };

  return (
    <div className="min-h-screen max-w-8xl w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-8xl w-full mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Manage your account preferences and settings
          </p>

          {/* Content Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Account Settings */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Account Settings
              </h2>

              {/* Profile Card */}
              <div className="flex items-center gap-6 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    JD
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                    <User size={16} />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    John Doe
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    john@example.com
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    Premium Member • Joined Jan 2025
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Password
                  </label>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Change Password
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {[
                {
                  label: "Push Notifications",
                  desc: "Get alerts for important interview updates",
                  icon: Bell,
                },
                {
                  label: "Email Updates",
                  desc: "Receive tips, practice sessions, and reminders",
                  icon: Mail,
                },
                {
                  label: "Practice Reminders",
                  desc: "Daily reminders to practice interviews",
                  icon: Clock,
                },
                {
                  label: "Performance Reports",
                  desc: "Weekly performance summaries and insights",
                  icon: Zap,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {item.label}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <button className="relative w-14 h-8 bg-blue-500 rounded-full shadow-md hover:shadow-lg transition-all">
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Privacy & Security
            </h2>

            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 transition">
                <div className="flex items-start gap-4">
                  <Shield
                    className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 border-2 border-green-600 text-green-600 dark:text-green-400 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-slate-600 transition">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition">
                <div className="flex items-start gap-4">
                  <Smartphone
                    className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Active Sessions
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Manage your logged-in devices and sessions
                    </p>
                    <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition">
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 transition">
                <div className="flex items-start gap-4">
                  <Eye
                    className="text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Privacy Settings
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Control what information is visible to others
                    </p>
                    <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-slate-600 transition">
                      Manage Privacy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Prep Settings */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Interview Preparation
            </h2>

            <div className="space-y-4">
              {[
                {
                  label: "Difficulty Level",
                  options: ["Beginner", "Intermediate", "Advanced"],
                },
                {
                  label: "Interview Type",
                  options: ["Technical", "Behavioral", "Mixed"],
                },
                {
                  label: "Question Duration",
                  options: ["2 mins", "5 mins", "10 mins"],
                },
              ].map((setting, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    {setting.label}
                  </label>
                  <select className="w-full px-4 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {setting.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Appearance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 transition">
                <div className="flex items-center gap-4">
                  <Palette
                    className="text-purple-600 dark:text-purple-400"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Dark Mode
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Enable dark theme for comfortable viewing
                    </p>
                  </div>
                </div>
                <button className="relative w-14 h-8 bg-slate-300 dark:bg-blue-500 rounded-full shadow-md hover:shadow-lg transition-all">
                  <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-white rounded-full transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 transition">
                <div className="flex items-center gap-4">
                  <Volume2
                    className="text-orange-600 dark:text-orange-400"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Sound Effects
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Enable audio feedback during interactions
                    </p>
                  </div>
                </div>
                <button className="relative w-14 h-8 bg-blue-500 rounded-full shadow-md hover:shadow-lg transition-all">
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500 transition">
                <div className="flex items-center gap-4">
                  <Globe className="text-red-600 dark:text-red-400" size={24} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Language
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
                <select className="px-3 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Data & Privacy
            </h2>

            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Download
                      className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Download Your Data
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Get a copy of all your personal data
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition">
                    Export
                  </button>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Trash2
                      className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1"
                      size={24}
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border-2 border-red-600 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-slate-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* API & Integration */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              API & Integration
            </h2>

            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  API Key
                </h3>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="sk_live_51234567890abcdef"
                    readOnly
                    className="flex-1 px-4 py-3 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all">
                    Copy
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Keep this key secure. Never share it publicly.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Connected Apps
                </h3>
                <div className="space-y-3">
                  {["GitHub", "Slack", "Discord"].map((app) => (
                    <div
                      key={app}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-500 rounded-lg"
                    >
                      <span className="font-medium text-slate-900 dark:text-white">
                        {app}
                      </span>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                        Disconnect
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock size={24} />
                Change Password
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitPassword} className="p-6 space-y-4">
              {submitError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle
                    size={18}
                    className="text-red-600 dark:text-red-400 flex-shrink-0"
                  />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {submitError}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPass"
                  value={passwords.oldPass}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border ${
                    errors.oldPass
                      ? "border-red-500 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    errors.oldPass
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } transition`}
                  required
                />
                {errors.oldPass && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.oldPass}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPass"
                  value={passwords.newPass}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border ${
                    errors.newPass
                      ? "border-red-500 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    errors.newPass
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } transition`}
                  required
                />
                {errors.newPass && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.newPass}
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  • At least 8 characters • Uppercase & lowercase • Number •
                  Special character (!@#$%^&*)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  value={passwords.confirmPass || ""}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border ${
                    errors.confirmPass
                      ? "border-red-500 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-600"
                  } rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    errors.confirmPass
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-500"
                  } transition`}
                  required
                />
                {errors.confirmPass && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.confirmPass}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
