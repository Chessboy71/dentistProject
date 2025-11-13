"use client";

import Image from "next/image";
import dentistImage from "../../public/dentistImageLeftForm.png";
import MultiStepForm from "./components/multiStepForm";
import { useState } from "react";

export default function ClientFormPage() {
  const [step, setStep] = useState(0);

  const content = [
    {
      title: "Informations personnelles",
      description: "Veuillez remplir vos informations personnelles ci-dessous.",
    },
    {
      title: "Details de service",
      description: "Veuillez fournir les détails du service souhaité.",
    },
    {
      title: "Finalisations",
      description: "Veuillez fournir les détails du service souhaité",
    },
  ];
  const navContent = [
    "Informations personnelles",
    "Details de service",
    "Finalisation",
  ];

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-row h-screen items-center">
      <Image
        src={dentistImage}
        alt="Dentist Office"
        width={2000}
        height={2000}
        className="hidden md:block h-screen w-1/3 object-cover"
      />
      <div className="w-full lg:w-2/3 flex flex-col justify-center p-8 text-sm lg:ml-24 gap-12">
        {/* nav bar */}
        <div className="flex flex-row gap-8 border-b-2 border-slate-200 pb-4 w-full ">
          {navContent.map((i, index) => (
            <div className="flex flex-row items-center gap-2" key={i}>
              <div
                className={`h-6 w-6 font-bold flex justify-center items-center rounded-xs pt-0.5 ${
                  step === index
                    ? "bg-emerald-400 text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`text-[0.6rem] lg:text-sm ${
                  step === index
                    ? "font-semibold text-slate-900"
                    : "text-slate-700"
                }`}
              >
                {i}
              </p>
            </div>
          ))}
        </div>

        {/* Heading */}
        <div>
          <span className="text-xs text-emerald-500 font-semibold">
            Étape {step + 1}
          </span>
          <h3 className="text-2xl font-bold">{content[step].title}</h3>
          <p className="text-slate-400">{content[step].description}</p>
        </div>

        {/* Form Component */}
        <MultiStepForm step={step} setStep={setStep} onBack={onBack} />
      </div>
    </div>
  );
}
