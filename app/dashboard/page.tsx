import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getActivitiesByUserId } from "@/lib/db/activities";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { Download, Clock, FileText, User } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/login");
  }

  const activities = await getActivitiesByUserId(user.id, 10);

  const getToolName = (toolType: string) => {
    return tools.find((t) => t.id === toolType)?.name || toolType;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back, {user.name || user.email}! Here&apos;s your activity history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Recent Activity
            </h2>

            {activities.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No activity yet. Start using our tools!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {getToolName(activity.toolType)}
                        </span>
                        <span className="text-sm text-gray-500">·</span>
                        <span className="text-sm text-gray-600">{activity.fileName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatFileSize(activity.fileSize)}</span>
                        <span>{formatDate(activity.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{user.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
            <div className="space-y-2">
              {tools.slice(0, 5).map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.route}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{tool.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

