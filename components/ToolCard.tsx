import Link from "next/link";
import { ToolConfig } from "@/types";

interface ToolCardProps {
  tool: ToolConfig;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.route}
      className="card hover:shadow-lg transition-shadow group cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl group-hover:scale-110 transition-transform">{tool.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
          <p className="text-gray-600 text-sm">{tool.description}</p>
        </div>
      </div>
    </Link>
  );
}

