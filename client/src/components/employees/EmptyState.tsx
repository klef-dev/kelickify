import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UploadModal } from "./UploadModal";
import { KelickAddUserIcon, KelickBulkUploadIcon } from "../icons";

const EmptyState = ({ handleUpload }: { handleUpload: () => void }) => {
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  return (
    <>
      <div className="bg-white container border rounded-xl flex flex-col items-center justify-center py-20 text-center">
        <Image alt="search" width={200} height={200} objectFit="contain" src={"/people-search.png"} />
        <h4 className="font-bold text-3xl">Start building your team</h4>
        <p className="text-gray-700 text-base">Add your first team member or import your entire team.</p>
        <div className="p-4 flex items-center justify-center space-x-2">
          <Button variant="outline" onClick={() => setUploadModalOpen(true)} className="text-base font-semibold">
            <KelickBulkUploadIcon className="scale-150 mr-2" />
            Bulk Upload
          </Button>
          <Button type="submit" className="text-base font-semibold">
            <KelickAddUserIcon className="scale-150 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>
      <UploadModal handleUpload={handleUpload} open={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
    </>
  );
};

export default EmptyState;
