"use client";
import { useRef } from "react";
import IconCreditCard from "../../../assets/card.png";
import Image from "next/image";

export default function Confirmation() {
  const cardRef = useRef();
  return (
    <div className="w-screen h-screen bg-primaryBlue flex justify-center items-center">
      <section className="flex font-inter">
        <div className="bg-white p-10 rounded-tl-lg rounded-bl-lg flex flex-col gap-2">
          <h1 className="font-semibold text-3xl">Complete Payment</h1>
          <p className="text-neutral-500 mb-4 ">
            Enter your credit or debit card details below
          </p>

          <form
            id="payment"
            className="flex bg-white border-[1px] border-neutral-500 rounded-md py-2 gap-4"
          >
            <section className="flex">
              <Image
                src={IconCreditCard}
                alt="icon-credit-card"
                width={"22"}
                height={"22"}
                className="ml-4"
              />
              <input
                type="number"
                maxLength={16}
                onChange={(e) => {
                  const { value } = e.target;
                  cardRef.current.card = value;
                }}
                ref={cardRef}
                required
                placeholder="Card Number"
                className="focus:outline-none placeholder:font-semibold placeholder:text-neutral-500 px-4"
              />
            </section>

            <input
              type="number"
              min={1}
              max={12}
              onChange={(e) => {
                const { value } = e.target;
                cardRef.current.exp = value;
              }}
              ref={cardRef}
              required
              placeholder="MM/YY"
              className="focus:outline-none placeholder:font-semibold placeholder:text-neutral-500 max-w-fit"
            />
            <input
              type="number"
              maxLength={3}
              onChange={(e) => {
                const { value } = e.target;
                cardRef.current.exp = value;
              }}
              ref={cardRef}
              required
              placeholder="CVC"
              pattern="[0-9]+"
              className="focus:outline-none placeholder:font-semibold placeholder:text-neutral-500 max-w-fit w-12"
            />
          </form>

          <button
            type="submit"
            form="payment"
            className="bg-primaryBlue font-light w-fit mt-6 px-4 rounded-md text-white py-3 text-lg hover:bg-opacity-90 transition-all"
          >
            Confirm Payment
          </button>
        </div>
        <div className="bg-neutral-100 p-10 rounded-tr-lg rounded-br-lg">
          <h1 className="text-primaryBlack text-2xl font-semibold mb-2">
            Order Summary
          </h1>

          <section className="flex flex-col divide-y-2 divide-neutral-300">
            <p className="w-64 flex py-3">
              Plan Name <span className="font-medium ml-auto">Basic</span>
            </p>
            <p className="w-64 flex py-3">
              Billing Cycle <span className="font-medium ml-auto">Monthly</span>
            </p>
            <p className="w-64 flex py-3">
              Plan Price <span className="font-medium ml-auto">₹ 200/mo</span>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
