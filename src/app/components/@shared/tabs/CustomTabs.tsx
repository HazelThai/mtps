import { AppTypes } from "@/types";
import { useEffect, useState } from "react";
export default function CustomTabs({
  tabs,
  value,
  onChange,
}: {
  tabs: AppTypes.TabType[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState(value);
  const [length, setLength] = useState(0);
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setLength(tabs.length);
  }, [tabs]);
  return (
    <div
      className={`grid w-full grid-cols-${length} overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-center text-sm font-medium dark:border-gray-700 dark:bg-gray-800 m-auto`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.title)}
          className={`py-2 px-4 transition-colors ${
            activeTab === tab.title
              ? "bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
              : "text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
}
