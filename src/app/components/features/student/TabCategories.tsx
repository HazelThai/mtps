export default function TabCategories({
  category,
  isActive,
  onClick,
}: {
  category: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        isActive ? "bg-white text-black" : "text-white"
      } rounded-sm flex items-center justify-center cursor-pointer transition-all duration-300`}
    >
      <p>{category}</p>
    </div>
  );
}
