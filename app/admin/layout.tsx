import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/Shell";

export const metadata: Metadata = {
  title: "Admin",
  /* Internal tool: keep it out of search results entirely. */
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
