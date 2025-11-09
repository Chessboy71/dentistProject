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

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-row ">
      <Image
        src={dentistImage}
        alt="Dentist Office"
        width={2000}
        height={2000}
        className="h-screen w-1/3 object-cover"
      />
      <div className="w-2/3 flex flex-col justify-center p-8 text-sm ml-24 gap-12">
        {/* nav bar */}
        <div className="flex flex-row gap-8 border-b-2 border-slate-200 pb-4 w-full ">
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-6 w-6 font-bold flex justify-center items-center rounded-xs pt-0.5 ${
                step === 0
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              1
            </div>
            <p
              className={` ${
                step === 0 ? "font-semibold text-slate-900" : "text-slate-700"
              }`}
            >
              Informations personnelles
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-6 w-6 font-bold flex justify-center items-center rounded-xs pt-0.5 ${
                step === 1
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              2
            </div>
            <p
              className={` ${
                step === 1 ? "font-semibold text-slate-900" : "text-slate-700"
              }`}
            >
              Details de service
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              className={`h-6 w-6 font-bold flex justify-center items-center rounded-xs pt-0.5 ${
                step === 2
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-300 text-white"
              }`}
            >
              3
            </div>
            <p
              className={` ${
                step === 2 ? "font-semibold text-slate-900" : "text-slate-700"
              }`}
            >
              Finalisation
            </p>
          </div>
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
