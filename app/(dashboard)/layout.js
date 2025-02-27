import Navbar from "@/components/navbar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex overflow-hidden">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
