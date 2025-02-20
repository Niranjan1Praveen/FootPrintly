import Navbar from "@/components/ui/navbar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gradient-to-b from-black to-black/90">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
