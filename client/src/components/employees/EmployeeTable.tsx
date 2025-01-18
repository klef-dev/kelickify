import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
  {
    id: "HJKL1234",
    profile: "profile 3",
    email: "example3@asure.pro",
    role: "Software Engineer",
    status: "Payroll Only",
  },
  {
    id: "LMNO5678",
    profile: "profile 4",
    email: "example4@asure.pro",
    role: "Product Manager",
    status: "Payroll Only",
  },
  {
    id: "PQRS9101",
    profile: "profile 5",
    email: "example5@asure.pro",
    role: "HR Specialist",
    status: "Invite Sent",
  },
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
            <Input placeholder="Search employee" className="pl-10" />
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
          {[...employees, ...employees]
            .sort(() => Math.random() - 0.5)
            .map((employee, i) => (
              <TableRow key={i} className="font-semibold">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell className="text-primary underline">{employee.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                  {employee.profile}
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <span
                    className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full", {
                      "bg-primary/10 text-primary": employee.status === "Active",
                      "bg-gray-100 text-gray-500": employee.status === "Payroll Only",
                      "bg-purple-100 text-purple-500": employee.status === "Invite Sent",
                    })}
                  >
                    <div
                      className={cn("w-2 h-2 rounded-full mr-2", {
                        "bg-primary": employee.status === "Active",
                        "bg-gray-500": employee.status === "Payroll Only",
                        "bg-purple-500": employee.status === "Invite Sent",
                      })}
                    ></div>
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
