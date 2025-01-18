"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { EmployeeStats } from "@/components/employees/EmployeeStats";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { UploadModal } from "@/components/employees/UploadModal";
import EmptyState from "@/components/employees/EmptyState";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Confetti from "react-confetti";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");

  const update = () => {
    setStatus("loading");
  };

  React.useEffect(() => {
    if (status === "loading") {
      setTimeout(() => {
        setStatus("done");
      }, 5000);
    }
  }, [status]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto space-y-5 h-screen flex flex-col">
        <header className=" bg-white ">
          <div className="container flex items-center justify-between py-5">
            <h1 className="text-2xl font-semibold">Employees</h1>
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
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              {/* <ConfettiExplosion force={0.8} duration={3000} particleCount={250} width={1600} /> */}
            </>
          )}
        </div>
      </main>

      <UploadModal handleUpload={update} open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </div>
  );
};

export default Index;
