import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex overflow-hidden">
      <Navbar />
      <main>{children}</main>
      <Toaster className="bg-white"/>
    </div>
  );
}
