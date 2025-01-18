import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function EmployeeStats() {
  return (
    <div className="w-full flex  space-x-5 items-stretch">
      <Card className={"p-5 w-1/4 space-y-3 flex flex-col justify-between rounded-xl"}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
            <p className="text-3xl font-semibold">25</p>
            <p className="text-base text-gray-700 font-semibold">Singaporeans</p>
          </div>
          <CircleChart />
        </div>
        <div className="flex items-start gap-2 flex-wrap">
          <ChartChip text="25 Singaporean" className="bg-[#02B9B0]" />
          <ChartChip text="10 PR" className="bg-[#FAC905]" />
          <ChartChip text="10 Foreigner" className="bg-[#B774FC]" />
          <ChartChip text="6 Others" className="bg-[#B3BEBE]" />
        </div>
      </Card>
      <Card className={"p-5 w-1/2 flex flex-col space-y-4 rounded-xl"}>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Employment Type</h3>
            <p className="text-3xl font-semibold">13</p>
            <p className="text-base text-gray-700 font-semibold">Full Timers</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {["#02B9B0", "#FAC905", "#B774FC", "#B3BEBE"].map((c, i) => (
            <div
              className={cn("h-3 rounded-full flex-grow", {
                "w-2/5": i <= 1,
                "w-[10%]": i > 1,
              })}
              style={{ backgroundColor: c }}
              key={c}
            />
          ))}
        </div>
        <div className="flex-grow" />
        <div className="flex items-start gap-2 flex-wrap">
          <ChartChip text="25 Full-Timer" className="bg-[#02B9B0]" />
          <ChartChip text="10 Part-Timer" className="bg-[#FAC905]" />
          <ChartChip text="5 Contract" className="bg-[#B774FC]" />
          <ChartChip text="6 Intern" className="bg-[#B3BEBE]" />
        </div>
      </Card>
      <Card className={"p-5 w-1/3 space-y-3 flex flex-col justify-between rounded-xl"}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Employee Status</h3>
            <p className="text-3xl font-semibold">25</p>
            <p className="text-base text-gray-700 font-semibold">Active Employees</p>
          </div>
          <Donuts />
        </div>
        <div className="flex items-start gap-2 flex-wrap">
          <ChartChip text="25 Active" className="bg-[#02B9B0]" />
          <ChartChip text="10 Invite Sent" className="bg-[#B774FC]" />
          <ChartChip text="6 Payroll Only" className="bg-[#B3BEBE]" />
          <ChartChip text="6 Others" className="bg-[#FAC905]" />
        </div>
      </Card>
    </div>
  );
}

const CircleChart = () => (
  <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.19227 69.4439C6.79313 70.1878 5.04718 69.6634 4.38306 68.2247C0.04301 58.8224 -1.12372 48.2436 1.10524 38.0843C3.33511 27.9209 8.82983 18.7861 16.7178 12.04C17.9192 11.0125 19.7204 11.263 20.6802 12.5192C21.646 13.7834 21.3926 15.5848 20.1926 16.6293C13.4007 22.5416 8.66849 30.4841 6.73262 39.3076C4.7974 48.128 5.77089 57.3078 9.46517 65.4981C10.1203 66.9505 9.59904 68.6959 8.19227 69.4439Z"
      fill="#02B9B0"
    />
    <path
      d="M23.2838 10.7208C22.4096 9.39242 22.7782 7.59836 24.1599 6.81129C32.2588 2.19799 41.5359 0.0341949 50.8509 0.586075C52.4327 0.679787 53.5558 2.11721 53.3665 3.69041C53.1774 5.26118 51.7513 6.37167 50.1713 6.29068C42.1948 5.88184 34.2629 7.73341 27.3007 11.6295C25.9213 12.4014 24.1527 12.0412 23.2838 10.7208Z"
      fill="#B774FC"
    />
    <path
      d="M55.7654 92.5166C56.0395 94.078 54.9949 95.5743 53.4197 95.7525C45.0095 96.7039 36.4773 95.426 28.6965 92.0242C20.9234 88.6257 14.2113 83.2435 9.22688 76.4448C8.2849 75.16 8.68226 73.3686 10.0253 72.5116C11.3603 71.6597 13.1251 72.0543 14.0713 73.3243C18.4373 79.1847 24.2717 83.8275 31.0129 86.7749C37.7571 89.7235 45.1429 90.8588 52.4357 90.0922C54.0088 89.9269 55.492 90.9588 55.7654 92.5166Z"
      fill="#B3BEBE"
    />
    <path
      d="M56.4326 4.15482C56.7295 2.60136 58.2312 1.57317 59.7649 1.9591C69.487 4.40543 78.2216 9.82973 84.7126 17.5006C91.8199 25.8997 95.8035 36.4796 95.9929 47.4595C96.1824 58.4394 92.5661 69.1492 85.7527 77.7863C79.5301 85.6746 70.9876 91.3943 61.3555 94.1714C59.836 94.6095 58.3002 93.6337 57.95 92.0916C57.5988 90.5451 58.5733 89.0168 60.0933 88.5647C68.4304 86.0852 75.8199 81.0941 81.2224 74.2456C87.2182 66.6449 90.4005 57.2203 90.2338 47.5579C90.0671 37.8956 86.5615 28.5854 80.3071 21.1941C74.6712 14.5339 67.1135 9.79816 58.6953 7.60521C57.1611 7.20555 56.135 5.71203 56.4326 4.15482Z"
      fill="#FAC905"
    />
  </svg>
);

const ChartChip = ({ className, text }: { text: string; className?: string }) => (
  <div className="flex items-center w-fit space-x-2">
    <div className={cn("h-5 w-1 rounded-full bg-gray-300", className)}></div>
    <span className="text-sm">{text}</span>
  </div>
);

const Donuts = () => (
  <svg className="scale-75" width="134" height="68" viewBox="0 0 134 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.02 67.2913C1.81086 67.2913 -0.012342 65.4986 0.118293 63.2933C0.980727 48.7344 6.5351 34.8094 15.9989 23.6526C25.4579 12.5014 38.2558 4.78346 52.4219 1.61212C54.5798 1.12904 56.6446 2.66298 56.9944 4.84639C57.3436 7.02561 55.8632 9.09869 53.7134 9.59804C41.4295 12.4513 30.3409 19.1965 22.119 28.8892C13.8947 38.5849 9.02543 50.6561 8.1744 63.2942C8.02598 65.4983 6.22914 67.2913 4.02 67.2913Z"
      fill="#02B9B0"
    />
    <path
      d="M60.2625 4.39615C60.0274 2.201 61.6115 0.180756 63.8167 0.0753632C77.2566 -0.56691 90.613 2.87038 102.124 9.98713C113.641 17.1078 122.715 27.5445 128.196 39.8947C129.09 41.9098 128.016 44.2249 125.954 45.0045C123.883 45.7872 121.562 44.7403 120.647 42.7246C115.804 32.0563 107.901 23.0416 97.9088 16.8636C87.9184 10.6867 76.3479 7.65958 64.6853 8.11998C62.4764 8.20718 60.498 6.59415 60.2625 4.39615Z"
      fill="#B774FC"
    />
    <path
      d="M127.375 49.3196C129.496 48.6883 131.759 49.8908 132.258 52.0466C132.972 55.1309 133.469 58.262 133.744 61.4166C133.936 63.617 132.164 65.4593 129.956 65.5214C127.748 65.5834 125.901 63.8412 125.691 61.6416C125.456 59.1813 125.068 56.7382 124.53 54.3266C124.049 52.1742 125.261 49.9488 127.375 49.3196Z"
      fill="#B3BEBE"
    />
  </svg>
);
