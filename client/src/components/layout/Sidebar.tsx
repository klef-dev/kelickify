import { useState } from "react";
import { ChevronDown, BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  KelickCalendarIcon,
  KelickHomeIcon,
  KelickMoreIcon,
  KelickOrgIcon,
  KelickReceiveCashIcon,
  KelickSendCashIcon,
  KelickUsersIcon,
  KelickWalletIcon,
} from "../icons";

const menuItems = [
  { icon: KelickHomeIcon, label: "Dashboard", href: "/" },
  {
    icon: null,
    label: "ORGANIZATION",
    href: "#",
    hasSubmenu: true,
    submenuItems: [{ label: "Kelick", href: "#", icon: KelickOrgIcon }],
  },
  {
    icon: null,
    label: "MANAGE",
    isHeader: true,
  },
  { icon: KelickUsersIcon, label: "Employees", href: "/", active: true },
  { icon: KelickSendCashIcon, label: "Payroll", href: "#" },
  { icon: KelickCalendarIcon, label: "Leaves", href: "#" },
  { icon: KelickReceiveCashIcon, label: "Claims", href: "#" },
  { icon: KelickMoreIcon, label: "More", href: "#" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="w-52 h-screen bg-white border-r flex flex-col">
      <div className="p-4">
        <Image
          src={"/kelick-logo.svg"}
          alt="Kelick"
          height={20}
          objectFit="contain"
          width={100}
          className="object-contain"
        />
      </div>

      <nav className="flex-1 px-2 space-y-5">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.isHeader ? (
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 mt-4">{item.label}</div>
            ) : (
              <a
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 mt-1 text-sm font-medium rounded-md",
                  item.active
                    ? "bg-gray-100 text-gray-900 border"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={() => {
                  if (item.hasSubmenu) {
                    setExpanded(expanded === item.label ? null : item.label);
                  }
                }}
              >
                {item.icon && <item.icon className="text-gray-700 h-6 w-6 mr-4" />}
                <span className={item.hasSubmenu ? "font-semibold text-gray-500 text-sm" : "text-base text-gray-700"}>
                  {item.label}
                </span>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      expanded === item.label ? "transform rotate-180" : "",
                    )}
                  />
                )}
              </a>
            )}
            {item.hasSubmenu && expanded === item.label && (
              <div className="mt-1">
                {item.submenuItems?.map((subItem, subIdx) => (
                  <div
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    key={subIdx}
                  >
                    {subItem.icon && <subItem.icon className="h-6 w-6 mr-2 text-gray-700" />}
                    <span className="text-base text-gray-700">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 text-gray-700 space-y-2 border-t">
        <div className="flex space-x-2">
          <KelickWalletIcon className="text-gray-700" color="currentColor" />
          <p>Free Plan</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs">1/10 Employees</p>
          <div className="w-full bg-gray-100 h-1 rounded-full">
            <div className="w-1/4 bg-primary h-full rounded-full" />
          </div>
        </div>
      </div>

      <div className="border-t p-4 space-y-4">
        <div className="flex space-x-2">
          <BellIcon className="text-gray-700" color="currentColor" size={20} />
          <p className="text-base">Notifications</p>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div className="flex-1">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-500">johndoe@asure.pro</div>
          </div>
        </div>
      </div>
    </div>
  );
}
