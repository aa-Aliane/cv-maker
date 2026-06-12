"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashboardShell } from "@/features/dashboard/components/shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname().slice(1);
  console.log("aaaaaaaa", currentPath);
  return <DashboardShell currentPath={currentPath}>{children}</DashboardShell>;
}
