"use client";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../public/logo/logo.png";
import Image from "next/image";
import { useState } from "react";

function LoginPage() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/profile");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(true);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-10 bg-white">
      <div className="flex flex-col gap-y-4 px-10 py-12 bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <Image src={logo} width={90} height={90} className="mx-auto mb-3" alt="logo" />
        <h2 className="text-gray-900 font-bold text-2xl text-center">Log in to FootPrintly</h2>
        {error && (
          <p className="flex gap-2 items-center my-3 bg-red-500 py-3 px-4 text-white rounded-md">
            <ErrorOutlineOutlinedIcon /> Incorrect username or password.
          </p>
        )}
        <div className="flex flex-col gap-3">
          <Button className="flex items-center justify-center gap-3 w-full bg-[#34A853] text-white py-2 rounded-md hover:bg-[#357ae8]">
            <GoogleIcon /> Continue with Google
          </Button>
          <Button className="flex items-center justify-center gap-3 w-full bg-[#1877F2] text-white py-2 rounded-md hover:bg-[#165cd9]">
            <FacebookIcon /> Continue with Facebook
          </Button>
          <Button className="flex items-center justify-center gap-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            <AppleIcon /> Continue with Apple
          </Button>
          <Button className="flex items-center justify-center gap-3 w-full bg-[#34A853] text-white py-2 rounded-md hover:bg-[#2c8c42]">
            <LocalPhoneIcon /> Continue with phone number
          </Button>
        </div>
        <hr className="w-full my-6 border-gray-300" />
        <div className="flex flex-col gap-3">
          <label className="text-gray-600 text-sm">Email or username</label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your email or username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <label className="text-gray-600 text-sm">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
          <Button
            className="w-full bg-[#34A853] text-white py-3 rounded-md hover:bg-[#2c8c42] transition-transform transform hover:scale-105"
            onClick={handleLogin}
          >
            Log in
          </Button>
          <small className="text-center text-gray-500 cursor-pointer hover:text-green-500">Forgot your password?</small>
          <p className="text-sm text-center text-gray-500">
            Don’t have an account? {" "}
            <Link href="/signup" className="text-green-500 underline hover:text-green-400">
              Sign up for FootPrintly
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;