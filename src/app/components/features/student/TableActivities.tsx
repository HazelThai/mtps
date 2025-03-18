import DisciplineModal from "./ModelDiscipline";

export default function TableActivities({
  category,
  total_points,
  activities,
  isFaculty,
}: {
  category: string;
  total_points: number;
  activities: {
    name: string;
    date: string;
    points: number;
  }[];
  isFaculty: boolean;
}) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <p className="text-2xl font-bold capitalize">{category}</p>
        <div className="flex items-center gap-2 bg-gray-300 rounded-lg p-2">
          <p>{total_points}</p>
          <p>Points</p>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 font-medium text-left">
                <p>Activity Name</p>
              </th>
              <th className="py-2 px-4 font-medium text-left">
                <p>Date</p>
              </th>
              <th className="py-2 px-4 font-medium text-left">
                <p>Total points</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity) => (
              <tr key={activity.name}>
                <td className="py-2 px-4">
                  <p>{activity.name}</p>
                </td>
                <td className="py-2 px-4">
                  <p>{activity.date}</p>
                </td>
                <td className="py-2 px-4">
                  <p>{activity.points}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {category === "Discipline" && isFaculty ? <DisciplineModal /> : <></>}
      </div>
    </div>
  );
}
