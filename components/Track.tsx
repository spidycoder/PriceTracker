"use client";
import { addUserEmailToProduct } from "@/lib/actions";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";

interface Props {
  productId: string;
  currentPrice: number;
}

export default function Track({ productId, currentPrice }: Props) {
  let [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    //alerting user if the price is becoming lower than the price provided by user
    if (currentPrice < parseInt(price)) {
      //todo:call this function every 20s after to update it the price of database
      await addUserEmailToProduct(productId, email, parseInt(price));
    }
    setSubmitting(false);
    setEmail("");
    setPrice("");
    closeModel();
  };
  const openModel = () => setIsOpen(true);
  const closeModel = () => setIsOpen(false);
  return (
    <>
      <button
        type="button"
        className="bg-black px-10 rounded-[16px] py-3 font-semibold text-white text-center"
        onClick={openModel}
      >
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModel} className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        height={28}
                        width={28}
                      />
                    </div>
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      height={24}
                      width={24}
                      className="cursor-pointer"
                      onClick={closeModel}
                    />
                  </div>
                  <h4 className="font-semibold mt-2">
                    Stay Updated with product pricing alerts right in your
                    inbox!
                  </h4>
                  <p className="opacity-8 mt-2">
                    Never miss a bargain again with our timely alerts.
                  </p>
                </div>
                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="email"
                      height={18}
                      width={18}
                    />
                    <input
                      placeholder="Enter your email addrss"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      id="email"
                      className="dialog-input"
                    />
                  </div>

                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mt-3"
                  >
                    Enter the Price below which you want this product
                  </label>
                  <div className="dialog-input_container">
                    <input
                      placeholder="Enter price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      id="price"
                      className="dialog-input"
                    />
                  </div>
                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? "Submitting.." : "Track"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
