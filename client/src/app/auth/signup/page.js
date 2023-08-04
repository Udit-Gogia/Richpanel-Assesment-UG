"use client";
import Link from "next/link";
import { useRef } from "react";
import { signinUser } from "@/scripts/user";
import { useRouter } from "next/navigation";

export default function Signup() {
    const credRef = useRef();
    const router = useRouter();
    return (
        <div className="flex w-screen h-screen items-center justify-center bg-primaryBlue font-inter">
            <section className="rounded-3xl bg-white flex flex-col gap-8 w-1/3 p-8 px-12">
                <h1
                    className={`font-semibold text-2xl text-center text-primaryBlack mt-4`}
                >
                    Create Account
                </h1>

                <form
                    id="signup-form"
                    className="flex flex-col text-primaryBlack gap-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await signinUser({ name: credRef.current.username, email: credRef.current.email, password: credRef.current.password },)
                        if (res?.code === "signup-success") {
                            router.push("/dashboard")
                        }

                    }}>
                    <label className="flex flex-col gap-1">
                        <span className="font-medium">Name</span>
                        <input
                            type="text"
                            required
                            minLength={7}
                            ref={credRef}
                            onChange={(e) => {
                                const { value } = e.target
                                credRef.current.username = value
                            }}
                            className=" focus:outline-primaryBlue transition-all border-2 border-gray-300 px-4 p-2 rounded-md"
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="font-medium">Email</span>
                        <input
                            type="email"
                            required
                            ref={credRef}
                            onChange={(e) => {
                                const { value } = e.target
                                credRef.current.email = value
                            }}
                            className=" focus:outline-primaryBlue transition-all border-2 border-gray-300 px-4 p-2 rounded-md"
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className=" font-medium">Password</span>
                        <input
                            type="password"
                            required
                            ref={credRef}
                            onChange={(e) => {
                                const { value } = e.target
                                credRef.current.password = value
                            }}
                            className=" focus:outline-primaryBlue transition-all border-2 border-gray-300 px-4 p-2 rounded-md"
                        />
                    </label>

                    <label className="flex gap-3 items-center">
                        <input type="checkbox" className=" w-4 h-4" />
                        <span>Remember Me</span>
                    </label>
                </form>
                <button type="submit" form="signup-form" className="bg-primaryBlue w-full rounded-md text-white py-3 text-lg">
                    Sign Up
                </button>


                <p className="text-center font-medium">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-primaryBlue mx-1 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </section>
        </div>
    );
}
