"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  GraduationCap,
  Dumbbell,
  User,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const tabs: Tab[] = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/learn", label: "Learn", Icon: GraduationCap },
  { href: "/train", label: "Train", Icon: Dumbbell },
  { href: "/profile", label: "Profile", Icon: User },
  { href: "/more", label: "More", Icon: MoreHorizontal },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 pb-safe",
        "border-t border-border/60 bg-bg/85 backdrop-blur-xl"
      )}
    >
      <ul className="mx-auto grid max-w-screen-sm grid-cols-5">
        {tabs.map(({ href, label, Icon }) => {
          const active =
            href === "/home"
              ? pathname === href
              : pathname?.startsWith(href) ?? false;
          return (
            <li key={href}>
              <Link
                href={href}
                className="relative grid place-items-center gap-1 py-2.5"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="relative grid place-items-center"
                >
                  <Icon
                    className={cn(
                      "size-[22px] transition-colors",
                      active ? "text-primary" : "text-text-secondary"
                    )}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wide transition-colors",
                    active ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {label}
                </span>
                {active && (
                  <motion.span
                    layoutId="tab-dot"
                    className="absolute bottom-0.5 size-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
