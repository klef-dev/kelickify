"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { UploadModal } from "@/components/employees/UploadModal";
import { UserPlus } from "lucide-react";
import EmptyState from "@/components/employees/EmptyState";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto space-y-5 h-screen flex flex-col">
        <header className="container flex items-center justify-between bg-white py-5">
          <h1 className="text-2xl font-semibold">Employees</h1>
          <div className="flex gap-3">
            <Button onClick={() => setUploadModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </header>
        <div className="container flex-grow">
          <EmptyState />
          {/* <EmployeeStats />
          <EmployeeTable /> */}
        </div>
      </main>

      <UploadModal open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
};

export default Index;
