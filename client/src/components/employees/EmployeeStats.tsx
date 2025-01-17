import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  chart?: React.ReactNode;
}

function StatCard({ title, value, subtitle, chart }: StatCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold">{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {chart && <div className="w-24 h-24">{chart}</div>}
      </div>
    </Card>
  );
}

export function EmployeeStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Nationality"
        value="25"
        subtitle="Singaporeans"
      />
      <StatCard
        title="Employment Type"
        value="13"
        subtitle="Full Timers"
      />
      <StatCard
        title="Employee Status"
        value="25"
        subtitle="Active Employees"
      />
    </div>
  );
}