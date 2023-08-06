"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";


async function getPlans() {
    const token = Cookies.get("token")


    const response = await fetch(`/plans`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

    });

    const result = await response.json()

    if (result.code !== "noPlans") {
        return result;
    }

    return []
}

export default function Dashboard() {
    const router = useRouter()
    useEffect(() => {
        async function getData() {
            const res = await getPlans();

            setPlans(res)
        }

        getData()

    }, [])

    const [plans, setPlans] = useState([])



    const [planSelected, setPlanSelected] = useState({
        duration: "Monthly",
        plan: "Mobile",
        price: "₹ 100"

    });

    return (
        <div className="w-screen h-screen p-4 flex flex-col gap-4">
            <h1 className={`font-medium text-2xl text-center text-neutral-700 font-inter`}>
                Choose the right plan for you
            </h1>

            <section className="mx-auto mt-4">
                <section className="flex justify-center">
                    <section className="flex lg:flex-row sm:flex-col">
                        {/* Duration selection */}
                        <div className="flex flex-col">
                            <section className="flex gap-4 rounded-full bg-primaryBlue p-3 w-fit my-8">
                                <button
                                    className={`rounded-full font-inter transition-all p-4 ${planSelected.duration === "Monthly"
                                        ? "bg-white text-primaryBlue outline-none font-medium"
                                        : "text-white bg-primaryBlue font-light"
                                        }`}
                                    onClick={() =>
                                        setPlanSelected({ ...planSelected, duration: "Monthly" })
                                    }
                                >
                                    Monthly
                                </button>

                                <button
                                    className={` rounded-full font-inter transition-all p-4 ${planSelected.duration === "Yearly"
                                        ? "bg-white text-primaryBlue outline-none font-medium"
                                        : "text-white bg-primaryBlue font-light"
                                        }`}
                                    onClick={() =>
                                        setPlanSelected({ ...planSelected, duration: "Yearly" })
                                    }
                                >
                                    Yearly
                                </button>
                            </section>
                            <section className="flex flex-col divide-y-2 font-inter text-neutral-600 w-full my-8 mr-20">
                                <p className="py-4">Monthly Price</p>
                                <p className="py-4">Video Quality</p>
                                <p className="py-4">Resolution</p>
                                <p className="py-4">Devices you can use to watch</p>
                            </section>
                        </div>
                        {/* Plan selection */}
                        <section className="flex lg:flex-row sm:flex-col basis-2/3">
                            {plans?.length !== 0 && (
                                plans?.map((plan, index) => {
                                    return (
                                        <section key={index} className="h-full flex flex-col ">
                                            <button
                                                className={`${planSelected.plan === plan.title
                                                    ? "bg-primaryBlue after:w-0 after:h-0 after:border-l-2 after:border-t-4 after:border-r-2 after:border-transparent after:border-t-primaryBlue"
                                                    : "bg-primaryLightBlue"
                                                    } bottom-2 font-medium text-white w-36 mx-4 h-36 transition-all rounded-md`}
                                                onClick={() =>
                                                    setPlanSelected({ ...planSelected, plan: plan.title, price: planSelected.duration === "Monthly" ? plan?.monthlyPrice : plan?.yearlyPrice })
                                                }
                                            >
                                                <span className=" text-xl font-medium">{plan.title}</span>
                                            </button>
                                            {planSelected.plan === plan.title && (
                                                <div className="border-solid mx-auto border-t-primaryBlue w-1 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                                            )}

                                            <section className={`flex flex-col divide-y-2 font-inter ${planSelected.plan === plan.title
                                                ? "text-primaryBlue font-semibold my-6"
                                                : "text-neutral-600 font-light my-8"
                                                }  w-full text-center transition-all `}>
                                                <p className="py-4">{planSelected.duration === "Monthly" ? plan?.monthlyPrice : plan?.yearlyPrice}</p>
                                                <p className="py-4">{plan?.videoQuality}</p>
                                                <p className="py-4">{plan?.Res}</p>
                                                <section className="flex flex-col gap-6 py-4">
                                                    {plan?.allowedDevices?.map((device, index) => {
                                                        return (
                                                            <span key={index}>{device}</span>
                                                        )
                                                    })}
                                                </section>
                                            </section>
                                        </section>
                                    )

                                })
                            )}

                        </section>
                    </section>
                </section>
            </section>

            <Link href={{ pathname: '/dashboard/confirmation', query: { plan: planSelected } }}
                className="bg-primaryBlue text-center hover:bg-opacity-90 transition-all rounded-md text-white py-3 text-lg w-1/3 mx-auto"
            >
                Next
            </Link>

        </div>
    );
}
