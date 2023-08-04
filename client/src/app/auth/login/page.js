"use client"
import { useState } from "react"
import Link from "next/link"

export default function Login() {
    const [userData, setUserData] = useState({ email: "", password: "" })
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-primaryBlue font-inter">
            <section className="rounded-3xl bg-white flex flex-col gap-8 w-1/3 p-8 px-12">
                <h1 className={`font-semibold text-2xl text-center text-primaryBlack mt-4`}>Login to your account</h1>

                <section className="flex flex-col text-primaryBlack gap-4">

                    <label className="flex flex-col gap-1">
                        <span className="font-medium">Email</span>
                        <input type="email" className=" focus:outline-primaryBlue transition-all border-2 border-gray-300 px-4 p-2 rounded-md" />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className=" font-medium">Password</span>
                        <input type="password" className=" focus:outline-primaryBlue transition-all border-2 border-gray-300 px-4 p-2 rounded-md" />
                    </label>

                    <label className="flex gap-3 items-center">
                        <input type="checkbox" className=" w-4 h-4" />
                        <span>Remember Me</span>
                    </label>
                </section>

                <button className="bg-primaryBlue w-full rounded-md text-white py-3 text-lg">Sign Up</button>

                <p className="text-center font-medium">New to MyApp? <Link href="/auth/signup" className="text-primaryBlue mx-1 hover:underline">Sign Up</Link></p>
            </section>
        </div>
    )
}