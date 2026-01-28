"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Edit2, Save, X, Camera } from "lucide-react";
import useUpdateProfileMutation from "@/app/(public)/hooks/profile";
import UserResult from "../userResult";
interface userType {
  id: string;
  phone: string;
  email: string;
  created_at: string;
  app_metadata: {
    role?: string;
    provider?: string;
    providers?: string[];
  };
  user_metadata: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    email_verified?: boolean;
    user_metadata?: {
      bio?: string;
      firstName?: string;
      lastName?: string;
      location?: string;
      phone?: string;
    };
  };
}
interface UpdateProfilePayload {
  name: string;
  phone?: string;
  bio: string;
  location: string;
  avatar: string;
}
interface ProfileProps {
  user: userType | null;
}
export default function Profile(user: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    streak,
    isFetching,
    data,
    userSuccessRate,
    userAttemptData,
    totalInterview,
  } = UserResult();
  const loggedUser = user?.user;
  const fullname =
    (loggedUser?.user_metadata?.firstName || "") +
    " " +
    (loggedUser?.user_metadata?.lastName || "");
  const nestedMeta = loggedUser?.user_metadata?.user_metadata || {};
  const [profile, setProfile] = useState<UpdateProfilePayload>({
    name: fullname || "",

    phone: loggedUser?.user_metadata?.user_metadata?.phone || "",
    bio: nestedMeta?.bio || "",
    location: nestedMeta?.location || "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });
  const { mutate: handleEdit } = useUpdateProfileMutation(profile);

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };
  const joinedDate = loggedUser?.created_at
    ? new Date(loggedUser.created_at).toLocaleDateString()
    : "";

  const handleSave = () => {
    handleEdit(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12 max-w-7xl w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header with Actions */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and profile information
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
              isEditing
                ? "bg-red-50 text-red-600 hover:bg-red-100"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isEditing ? (
              <>
                <X size={20} /> Cancel
              </>
            ) : (
              <>
                <Edit2 size={20} /> Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Cover Section */}
          <div className="h-32 bg-slate-400"></div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:gap-6 -mt-16 mb-8">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition">
                    <Camera size={20} />
                  </button>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="text-2xl font-bold text-gray-900 mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                )}
                <p className="text-gray-600 mt-2">Joined </p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 text-lg">{profile.bio}</p>
              )}
            </div>

            {/* Contact Information Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-indigo-600" size={20} />
                  <label className="font-semibold text-gray-700 text-sm">
                    Email
                  </label>
                </div>
                <p className="text-gray-600">{loggedUser?.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="text-indigo-600" size={20} />
                  <label className="font-semibold text-gray-700 text-sm">
                    Phone
                  </label>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">
                    {loggedUser?.user_metadata?.user_metadata?.phone}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="text-indigo-600" size={20} />
                  <label className="font-semibold text-gray-700 text-sm">
                    Location
                  </label>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.location}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
              >
                <Save size={20} /> Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Stats & Skills Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Interview Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Total Interviews
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {totalInterview}
            </p>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Success Rate
            </p>
            <p className="text-2xl font-bold text-green-600">
              {userSuccessRate}%
            </p>
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              Member Since
            </p>
            <p className="text-xl  font-bold text-purple-600">{joinedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
