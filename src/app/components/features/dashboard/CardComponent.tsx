import { Award } from "lucide-react";

export default function CardComponent({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
}) {
  return (
    <div className="rounded-lg background-common">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
