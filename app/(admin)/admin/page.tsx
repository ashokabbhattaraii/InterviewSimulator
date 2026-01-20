"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Questions from "./SideMenuComponents/questions";
import User from "./SideMenuComponents/users";
import createClient from "@/lib/client/client";
import { signOut } from "@/app/(auth)/AuthActions/auth";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  MessageSquare,
  Settings,
  TrendingUp,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  AlertCircle,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    difficulty: "MEDIUM",
    isPublished: false,
  });

  const questionSchema = z.object({
    title: z.string().min(5, "Titile should be atleast 5 character"),
    content: z.string().min(1, "Content is required "),
    category: z.string().min(1, "Category is "),
    tags: z.string().min(1, "Atleast 1 tag"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    isPublished: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(questionSchema) });

  async function onValidSubmit() {}
  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Questions", icon: FileQuestion, key: "questions" },
    { name: "Users", icon: Users, key: "users" },
    { name: "Answers", icon: MessageSquare, key: "answers" },
    { name: "Analytics", icon: TrendingUp, key: "analytics" },
    { name: "Settings", icon: Settings, key: "settings" },
  ];

  const { setUser, user } = useAuthStore();
  useEffect(() => {
    async function saveUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(typeof user);
      setUser(user);
      console.log(typeof user, user);
    }
    saveUser();
    console.log("Logged in user", user, typeof user);
  }, []);

  const fullName =
    (user?.user_metadata?.fname ?? "") +
    " " +
    (user?.user_metadata?.lname ?? "");
  console.log(isProfileOpen);
  const handleInputChange = () => {};

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          {sidebarOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.key
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && (
                <span className="flex-1 text-left">{item.name}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search questions, users, or content..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="text-white" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                      {user?.user_metadata?.fname?.charAt(0) || ""}
                      {user?.user_metadata?.lname?.charAt(0) || ""}
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white text-black rounded shadow-lg">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>
                    <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex justify-between">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <Link href="/dashboard">
                      <DropdownMenuLabel className="font-bold bg-slate-300 rounded-xl cursor-pointer">
                        Dashboard
                      </DropdownMenuLabel>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuLabel
                    className="cursor-pointer "
                    onClick={() => signOut()}
                  >
                    LogOut
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {activeTab == "questions" && <Questions></Questions>}
        {activeTab == "users" && <User></User>}
      </div>
    </div>
  );
};

export default AdminDashboard;
