import React from "react";

export default function StudentInformation({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
