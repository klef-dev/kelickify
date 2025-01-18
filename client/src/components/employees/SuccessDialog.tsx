import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { KelickCircleCheckIcon } from "../icons";
import { Button } from "../ui/button";

const SuccessDialog = ({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean; setIsDialogOpen: () => void }) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <div className="container flex flex-col items-center justify-center space-y-5 py-5">
          <KelickCircleCheckIcon className="size-24" />
          <h2 className="text-center text-xl font-semibold text-black">
            Congrats! You&apos;ve successfully added your employees!
          </h2>
          <p className="text-center text-lg font-medium">Would you like to generate a payroll?</p>

          <div className="flex w-full justify-around">
            <Button
              variant={"outline"}
              className="rounded-xl font-semibold text-lg"
              size={"lg"}
              onClick={setIsDialogOpen}
            >
              I&apos;ll do it later
            </Button>
            <Button className="rounded-xl font-semibold text-lg" size={"lg"} onClick={setIsDialogOpen}>
              Generate Payroll
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
