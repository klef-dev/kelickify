import React, { SVGProps } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

const SuccessDialog = ({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean; setIsDialogOpen: () => void }) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <div className="container flex flex-col items-center justify-center space-y-5 py-5">
          <SuccessCheckIcon className="size-24" />
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

const SuccessCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={80} height={80} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M23.3335 41.6667L33.3335 51.6667L56.6668 28.3333"
      stroke="#30D96E"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39.9998 73.3333C58.4093 73.3333 73.3332 58.4095 73.3332 40C73.3332 21.5905 58.4093 6.66666 39.9998 6.66666C21.5903 6.66666 6.6665 21.5905 6.6665 40C6.6665 58.4095 21.5903 73.3333 39.9998 73.3333Z"
      stroke="#30D96E"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SuccessDialog;
