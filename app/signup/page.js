"use client";
import { Button } from "@/components/ui/button";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function Page() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    authToken: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError(true);
      return;
    }
    setError(false);
    const uniqueToken = crypto.randomUUID();
    const newUser = {
      ...formData,
      authToken: uniqueToken,
    };
    
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const result = await response.json();
      if (response.ok) {
        router.push("/profile");
      } else {
        alert("Cannot Sign Up!");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-12 px-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="flex flex-col gap-4 px-8 py-10 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Sign Up for FootPrintly</h2>
        {error && (
          <p className="flex items-center gap-3 bg-red-100 text-red-700 py-3 px-4 rounded-lg text-sm border border-red-300">
            <ErrorOutlineOutlinedIcon /> Incorrect username, email, or password.
          </p>
        )}
        
        <label className="text-sm text-gray-700">Username</label>
        <Input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />

        <label className="text-sm text-gray-700">Email</label>
        <Input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />

        <label className="text-sm text-gray-700">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />
        
        <Button
          className="bg-[#1ed760] transform transition-all duration-300 hover:scale-105 text-white font-semibold mt-4 py-2 rounded-lg"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? 
          <Link href="/login" className="underline text-[#1ed760] hover:text-green-400"> Login to FootPrintly</Link>
        </p>
      </div>
    </section>
  );
}

export default Page;
