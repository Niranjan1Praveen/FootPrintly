"use client";
import { Button } from "@/components/ui/button";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo/logo.png";

function Page() {
  const [error, setError] = useState(false);
  const [isBounce, setIsBounce] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    authToken: "",
  });
  const handleFocus = () => {
    setIsBounce(true);
  };

  const handleBlur = () => {
    setIsBounce(false);
  };
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
    <section className="flex flex-col gap-6 section-p min-h-screen">
      {/* SignUp Content */}
      <div className="flex gap-10 items-center flex-wrap">
        <div className="flex flex-col gap-5 max-w-[600px]">
          <h2 className="text-2xl font-bold text-[#1CB0F6]">Get Started with FootPrintly</h2>
          <p>
            The easiest way to get icons on your website is with a Kit. It's
            your very own custom version of Font Awesome, all bundled up with
            only the icons, tools, and settings you need.
          </p>
        </div>
        <div className="flex items-center">
          <Image src={logo} alt="bounce logo icon" width={200} height={200} className={isBounce ? 'animate-bounce' : ''}/>
          <quote className="italic border-pl-4 max-w-[200px]">Getting values in those fields makes me happy!</quote>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-8 py-10 bg-[var(--secondary-background)] rounded-xl shadow-md">
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />

        <label className="text-sm text-gray-700">Email</label>
        <Input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />

        <label className="text-sm text-gray-700">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="bg-gray-200 text-gray-900 border border-gray-300"
        />

        <Button
          className="w-[100px] bg-[#1ed760] transform transition-all duration-300 hover:scale-105 text-white mt-4 py-2 rounded-full border-none"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <Link
          href="/login"
          className="underline text-[#1ed760] hover:text-green-600"
        >
          {" "}
          Login to FootPrintly
        </Link>
      </p>
    </section>
  );
}

export default Page;
