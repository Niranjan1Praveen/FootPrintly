import Navbar from "@/components/navbar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
