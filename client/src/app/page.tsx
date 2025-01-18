"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { UploadModal } from "@/components/employees/UploadModal";
import EmptyState from "@/components/employees/EmptyState";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { KelickAddUserIcon, KelickCircleCheckIcon } from "@/components/icons";
import SuccessDialog from "@/components/employees/SuccessDialog";
import { toast } from "sonner";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const update = () => {
    setStatus("loading");
  };

  React.useEffect(() => {
    if (status === "loading") {
      setTimeout(() => {
        setStatus("done");
        setIsDialogOpen(true);
        toast("Employees successfully added", {
          className: "rounded-xl space-x-2",
          position: "bottom-center",
          icon: <KelickCircleCheckIcon />,
        });
      }, 2000);
    }
  }, [status]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto space-y-5 h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-white">
          <div className="container flex items-center justify-between py-5">
            <h1 className="text-2xl font-semibold">Employees</h1>
            {true && (
              <Button onClick={() => setUploadModalOpen(true)}>
                <KelickAddUserIcon className="scale-125" />
                Add Employee
              </Button>
            )}
          </div>
        </header>
        <div className="container flex-grow space-y-5">
          {status === "loading" && (
            <div className="flex items-center justify-center h-full">
              <DotLottieReact
                src="https://lottie.host/880c8f3e-3541-4c31-9699-629992fd9454/PAEO9KIjQn.lottie"
                loop
                autoplay
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
          {status === "idle" && <EmptyState handleUpload={update} />}
          {status === "done" && (
            <>
              <EmployeeStats />
              <EmployeeTable />
              {isDialogOpen && <Confetti style={{ zIndex: 1000 }} />}
              <SuccessDialog isDialogOpen={isDialogOpen} setIsDialogOpen={() => setIsDialogOpen(false)} />
            </>
          )}
        </div>
      </main>

      <UploadModal handleUpload={update} open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
};

export default Index;
