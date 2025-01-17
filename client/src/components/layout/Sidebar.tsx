import { useState } from "react";
import {
  Building2,
  ChevronDown,
  LayoutDashboard,
  Users,
  Wallet,
  CalendarDays,
  FileSpreadsheet,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  {
    icon: null,
    label: "ORGANIZATION",
    href: "#",
    hasSubmenu: true,

    submenuItems: [{ label: "Kelick", href: "#", icon: Building2 }],
  },
  {
    icon: null,
    label: "MANAGE",
    isHeader: true,
  },
  { icon: Users, label: "Employees", href: "/", active: true },
  { icon: Wallet, label: "Payroll", href: "#" },
  { icon: CalendarDays, label: "Leaves", href: "#" },
  { icon: FileSpreadsheet, label: "Claims", href: "#" },
  { icon: MoreHorizontal, label: "More", href: "#" },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
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

      <nav className="flex-1 px-2">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.isHeader ? (
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 mt-4">{item.label}</div>
            ) : (
              <a
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 mt-1 text-sm font-medium rounded-md",
                  item.active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                onClick={() => {
                  if (item.hasSubmenu) {
                    setExpanded(expanded === item.label ? null : item.label);
                  }
                }}
              >
                {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                <span className={item.hasSubmenu ? "font-semibold text-gray-500" : ""}>{item.label}</span>
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
              <div className="ml-4 mt-1">
                {item.submenuItems?.map((subItem, subIdx) => (
                  <div
                    className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                    key={subIdx}
                  >
                    {subItem.icon && <subItem.icon className="h-5 w-5 mr-3" />}
                    <span className="">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
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
