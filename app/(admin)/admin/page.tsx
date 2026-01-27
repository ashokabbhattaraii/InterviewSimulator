"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Questions from "./SideMenuComponents/questions";
import User from "./SideMenuComponents/users";
import createClient from "@/lib/client/client";
import { signOut } from "@/app/(auth)/AuthActions/auth";
import { useAuthStore } from "@/app/(auth)/store/userAuth";
import { ThemeToggle } from "@/app/(public)/components/toogleComponent/toogle";
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
    (user?.user_metadata?.firstName ?? "") +
    " " +
    (user?.user_metadata?.lastName ?? "");
  console.log(isProfileOpen);

  return (
    <div className="h-screen bg-background text-foreground ">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-sidebar backdrop-blur-xl border-r border-border transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-sidebar-foreground">
              Admin Panel
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent/10 text-sidebar-foreground rounded-lg transition-colors"
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
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground"
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
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between p-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search questions, users, or content..."
                  className="w-full pl-10 pr-4 py-3 bg-muted/20 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-muted/30 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <ThemeToggle></ThemeToggle>
              <button className="relative p-2 hover:bg-muted/20 rounded-lg transition-colors">
                <Bell className="text-foreground" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>

              <div className="pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {user?.user_metadata?.firstName?.charAt(0) || ""}
                        {user?.user_metadata?.lastName?.charAt(0) || ""}
                      </div>
                      <ChevronDown
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-popover text-popover-foreground rounded shadow-lg border border-border">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border"></DropdownMenuSeparator>
                    <DropdownMenuItem>
                      <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuGroup className="flex justify-between">
                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                      <Link href="/dashboard">
                        <DropdownMenuLabel className="font-bold bg-muted rounded-xl cursor-pointer hover:bg-muted/80">
                          Dashboard
                        </DropdownMenuLabel>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-border"></DropdownMenuSeparator>
                    <DropdownMenuLabel
                      className="cursor-pointer text-destructive hover:text-destructive/80"
                      onClick={() => signOut()}
                    >
                      LogOut
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {activeTab == "questions" && <Questions />}
        {activeTab == "users" && <User />}
      </div>
    </div>
  );
};

export default AdminDashboard;
