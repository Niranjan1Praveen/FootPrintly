"use client";
import { Button } from "@/components/ui/button";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function Page(props) {
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
    } else {
      setError(false);
      const uniqueToken = crypto.randomUUID();
      const newUser = {
        ...formData,
        authToken: uniqueToken,
      };
      setFormData(newUser);
      
      try {
        const response = await fetch("http://localhost:3001/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        const result = await response.json();
        if(response.ok){
          router.push("/profile");
        }
        else{
          alert("Cannot Sign Up!")
        }
      } 
      
      catch (error) {
        console.error("Error signing up:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10 px-4 bg-gradient-to-b from-black to-black/80 min-h-screen">
      <div className="flex flex-col gap-y-3 px-6 py-10 justify-center bg-[var(--background-base,#ffffff)] rounded-[6px] w-full max-w-md">
        {error && (
          <p className="flex gap-4 items-center my-2 bg-[#E91429] py-3 px-5 text-sm text-white-700">
            <ErrorOutlineOutlinedIcon /> Incorrect username, email, or password.
          </p>
        )}

        <label className="text-sm">Username</label>
        <Input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="text-sm">Email</label>
        <Input
          type="text"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="text-sm">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <hr className="w-full my-6" />

        <Button
          className="bg-[#1ed760] transform transition-transform duration-300 hover:scale-110 text-black border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black mt-4"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <p className="text-sm text-center text-[#B3B3B3] mt-4">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="underline hover:text-[#1ed760] text-white"
          >
            Login to FootPrintly
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Page;
