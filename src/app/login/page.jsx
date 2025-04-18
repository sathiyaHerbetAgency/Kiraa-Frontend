"use client"

import React from "react"
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginApi } from './../../Api/LoginApi/Api';
import MaxWidthWrapper from './../../components/MaxWidthWapper/MaxWidthWrapper';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form data submitted:", formData)
    try{
    const response=await LoginApi(formData)
    if (response?.data?.token) {
      // Store the token in a cookie (set expiration as needed)
      Cookies.set("token", response.data.token, { expires: 1 }); // expires in 1 day
      console.log("Token stored in cookie");
      router.push("/");

      toast.success("Login successful! Welcome back.");
    } else {
      toast.error("Invalid credentials. Please check your username and password.");
    }


    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-center ">
     {/* <MaxWidthWrapper> */}
    <div className="flex justify-center ">
      <Card className="w-full self-center max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your username and password to access your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
     
    </div>
    <ToastContainer />
    </div>
    // </MaxWidthWrapper>
  
  )
}

