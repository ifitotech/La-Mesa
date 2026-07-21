type Props = {
  title: string;
  description: string;
};

export default function DashboardCard({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>
    </div>
  );
}