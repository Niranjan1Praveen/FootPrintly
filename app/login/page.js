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
import logo from "../../public/logo.png";
import Image from "next/image";
import { useState } from "react";
function page(props) {
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
    <section className="flex flex-col items-center justify-center gap-4 py-[70px] bg-gradient-to-b from-black to-black/90 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col gap-y-3 px-[30px] py-10 justify-center bg-[var(--background-base,#ffffff)] rounded-[6px] w-full max-w-[90%] sm:max-w-[70%] md:max-w-[40%]">
        <Image src={logo} width={80} height={80} className="mx-auto" alt="logo"/>
        <h2 className="font-bold text-[1.7rem] text-center pb-7">
          Log in to FootPrintly
        </h2>
        {/* Error Div */}
        {error && (
          <p className="flex gap-4 items-center my-[10px] bg-[#E91429] py-[12px] px-[20px] text-sm text-white-700">
            <ErrorOutlineOutlinedIcon /> Incorrect username or password.
          </p>
        )}
        <Button className="flex gap-4 w-full">
          <GoogleIcon className="w-100 h-100" />
          Continue with Google
        </Button>
        <Button className="w-full">
          <FacebookIcon />
          Continue with Facebook
        </Button>
        <Button className="w-full">
          <AppleIcon />
          Continue with Apple
        </Button>
        <Button className="w-full">
          <LocalPhoneIcon />
          Continue with phone number
        </Button>

        <hr className="w-full my-8" />

        <label className="text-sm">Email or username</label>
        <Input
          type="text"
          name="username"
          placeholder="Email or username"
          value={formData.username}
          onChange={handleChange}
          className="w-full"
        />

        <label className="text-sm">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full"
        />

        <Button className="bg-[#1ed760] transform transition-transform duration-300 hover:scale-110 text-black border-none outline-none hover:!bg-[#1ed760] hover:!border-none hover:!shadow-none hover:!text-black mt-[12px] w-full" onClick={handleLogin}>
          Log in
        </Button>

        <small className="text-center underline cursor-pointer hover:text-[#1ed760]">
          Forgot your password
        </small>
        <p className="text-sm text-center text-[#B3B3B3]">
          Dont have an account?{" "}
          <Link
            href={"/signup"}
            className="underline hover:text-[#1ed760] text-white"
          >
            Sign up for FootPrintly
          </Link>
        </p>
      </div>
    </section>
  );
}

export default page;