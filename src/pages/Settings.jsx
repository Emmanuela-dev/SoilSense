import { useState } from "react"
import DashboardLayout from "../components/layout/DashboardLayout"
import {
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Save,
  Camera,
} from "lucide-react"

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-[#166534]" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  )
}

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile")

  const tabs = [
    { label: "Profile", icon: User },
    { label: "Notifications", icon: Bell },
    { label: "Security", icon: Shield },
    { label: "Data & Sync", icon: Database },
    { label: "Regional", icon: Globe },
  ]

  // Profile State
  const [profile, setProfile] = useState({
    name: "James Kariuki",
    email: "james@soilsense.ai",
    phone: "+254 712 345 678",
    role: "Extension Officer",
    organization: "Kiambu County Agriculture Office",
    location: "Kiambu Town, Kenya",
  })

  // Notification State
  const [notifications, setNotifications] = useState({
    highRiskAlerts: true,
    weeklyReports: true,
    weatherAlerts: true,
    aiRecommendations: false,
    emailNotifications: true,
    smsNotifications: false,
  })

  // Regional State
  const [regional, setRegional] = useState({
    language: "English",
    timezone: "Africa/Nairobi (EAT UTC+3)",
    units: "Metric (°C, mm, kg)",
    currency: "Kenyan Shilling (KES)",
  })

  function toggleNotification(key) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <DashboardLayout pageTitle="Settings">

      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-gray-800 text-2xl font-bold">Settings</h2>
        <p className="text-gray-600 text-sm mt-1">
          Manage your account preferences and system configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Profile Preview */}
            <div className="p-6 bg-gradient-to-br from-[#166534] to-[#22C55E] text-center">
              <div className="relative inline-block mb-3">
                <div className="w-16 h-16 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  JK
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow border border-gray-100">
                  <Camera className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              <p className="text-white font-bold text-sm">{profile.name}</p>
              <p className="text-green-200 text-xs mt-0.5">{profile.role}</p>
            </div>

            {/* Tab Buttons */}
            <div className="p-3 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.label
                        ? "bg-[#166534] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Profile Tab */}
            {activeTab === "Profile" && (
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-base mb-6">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", key: "name", type: "text" },
                    { label: "Email Address", key: "email", type: "email" },
                    { label: "Phone Number", key: "phone", type: "tel" },
                    { label: "Role", key: "role", type: "text" },
                    { label: "Organization", key: "organization", type: "text" },
                    { label: "Location", key: "location", type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={profile[field.key]}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="mt-5">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your agricultural work..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all resize-none"
                  />
                </div>

                <button className="mt-6 flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Profile
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "Notifications" && (
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-base mb-6">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      key: "highRiskAlerts",
                      title: "High Risk Soil Alerts",
                      description: "Get notified immediately when a farm is classified as high risk.",
                    },
                    {
                      key: "weeklyReports",
                      title: "Weekly Soil Reports",
                      description: "Receive a weekly summary of all soil health assessments.",
                    },
                    {
                      key: "weatherAlerts",
                      title: "Weather Farming Alerts",
                      description: "Get weather-based farming advisories for your location.",
                    },
                    {
                      key: "aiRecommendations",
                      title: "AI Recommendation Updates",
                      description: "Be notified when new AI recommendations are generated.",
                    },
                    {
                      key: "emailNotifications",
                      title: "Email Notifications",
                      description: "Receive all notifications via email.",
                    },
                    {
                      key: "smsNotifications",
                      title: "SMS Notifications",
                      description: "Receive critical alerts via SMS to your phone.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1 mr-4">
                        <p className="text-gray-800 text-sm font-semibold">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <ToggleSwitch
                        enabled={notifications[item.key]}
                        onChange={() => toggleNotification(item.key)}
                      />
                    </div>
                  ))}
                </div>

                <button className="mt-6 flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "Security" && (
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-base mb-6">
                  Security Settings
                </h3>

                {/* Change Password */}
                <div className="mb-6">
                  <h4 className="text-gray-700 font-semibold text-sm mb-4">
                    Change Password
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Current Password",
                      "New Password",
                      "Confirm New Password",
                    ].map((label) => (
                      <div key={label}>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          {label}
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm">
                    <Save className="w-4 h-4" />
                    Update Password
                  </button>
                </div>

                {/* Security Info */}
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-700 text-sm font-bold">
                        Account Secured
                      </p>
                      <p className="text-green-600 text-xs mt-1 leading-relaxed">
                        Your account is protected. Last login was today from Kiambu Town, Kenya. If this was not you, change your password immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data & Sync Tab */}
            {activeTab === "Data & Sync" && (
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-base mb-6">
                  Data & Sync Settings
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Auto Sync to Cloud",
                      description: "Automatically sync all soil data to the cloud after each assessment.",
                      enabled: true,
                    },
                    {
                      title: "Offline Mode",
                      description: "Allow data collection without internet. Sync when connected.",
                      enabled: true,
                    },
                    {
                      title: "Auto Backup",
                      description: "Automatically backup all farm data every 24 hours.",
                      enabled: false,
                    },
                    {
                      title: "Share Anonymous Data",
                      description: "Help improve SoilSense AI by sharing anonymous usage data.",
                      enabled: false,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1 mr-4">
                        <p className="text-gray-800 text-sm font-semibold">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-xs mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <ToggleSwitch
                        enabled={item.enabled}
                        onChange={() => {}}
                      />
                    </div>
                  ))}
                </div>

                {/* Storage Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 text-sm font-semibold mb-3">
                    Storage Usage
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-2 bg-[#166534] rounded-full"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <p className="text-gray-600 text-xs">
                    3.5 GB used of 10 GB — 35% full
                  </p>
                </div>

                <button className="mt-6 flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            )}

            {/* Regional Tab */}
            {activeTab === "Regional" && (
              <div className="p-6">
                <h3 className="text-gray-800 font-bold text-base mb-6">
                  Regional Preferences
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Language",
                      key: "language",
                      options: ["English", "Swahili", "French"],
                    },
                    {
                      label: "Timezone",
                      key: "timezone",
                      options: [
                        "Africa/Nairobi (EAT UTC+3)",
                        "Africa/Lagos (WAT UTC+1)",
                        "UTC",
                      ],
                    },
                    {
                      label: "Units",
                      key: "units",
                      options: [
                        "Metric (°C, mm, kg)",
                        "Imperial (°F, in, lb)",
                      ],
                    },
                    {
                      label: "Currency",
                      key: "currency",
                      options: [
                        "Kenyan Shilling (KES)",
                        "US Dollar (USD)",
                        "Euro (EUR)",
                      ],
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        {field.label}
                      </label>
                      <select
                        value={regional[field.key]}
                        onChange={(e) =>
                          setRegional((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-800 text-sm focus:outline-none focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition-all"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <button className="mt-6 flex items-center gap-2 bg-[#166534] hover:bg-green-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-sm">
                  <Save className="w-4 h-4" />
                  Save Regional Settings
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Settings