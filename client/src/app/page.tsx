"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { UploadModal } from "@/components/employees/UploadModal";
import { UserPlus } from "lucide-react";
import EmptyState from "@/components/employees/EmptyState";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("loading");

  const update = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
    }, 2000);
  };

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
          {status === "loading" && (
            <div className="flex items-center justify-center h-full">
              <DotLottieReact
                src="https://lottie.host/880c8f3e-3541-4c31-9699-629992fd9454/PAEO9KIjQn.lottie"
                loop
                autoplay
                className="scale-[.2]"
              />
            </div>
          )}
          {status === "idle" && <EmptyState handleUpload={update} />}
          {status === "done" && (
            <>
              <EmployeeStats />
              <EmployeeTable />
            </>
          )}
        </div>
      </main>

      <UploadModal handleUpload={update} open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
};

export default Index;
