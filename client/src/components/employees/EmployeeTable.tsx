import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

const employees = [
  {
    id: "FHAJ3717",
    profile: "profile 1",
    email: "example@asure.pro",
    role: "Senior Marketer",
    status: "Active",
  },
  {
    id: "GSD4522",
    profile: "profile testing testing test...",
    email: "example@asure.pro",
    role: "Lead Designer",
    status: "Active",
  },
  // Add more sample data as needed
];

export function EmployeeTable() {
  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All Employees</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employee"
              className="pl-10"
            />
          </div>
          <Button variant="outline">All Status</Button>
          <Button variant="outline">All Role</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee Profile</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <input type="checkbox" className="rounded border-gray-300" />
              </TableCell>
              <TableCell className="font-medium text-primary">{employee.id}</TableCell>
              <TableCell>{employee.profile}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  employee.status === "Active" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-800"
                }`}>
                  {employee.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}