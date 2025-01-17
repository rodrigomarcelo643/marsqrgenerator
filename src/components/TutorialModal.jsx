import React, { useState } from "react";

function TutorialModal({ closeModal }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Welcome to the Mars QR Code Generator!",
      description: "This tool helps you create custom QR codes with ease.",
      icon: "🧑‍💻",
    },
    {
      title: "Step 1: Enter URL or Text",
      description: "Type the content you want to encode in the input field.",
      icon: "✏️",
    },
    {
      title: "Step 2: Customize",
      description: "Adjust size, colors, and even add frames for your QR code.",
      icon: "🎨",
    },
    {
      title: "Step 3: Preview and Download",
      description: "Preview your QR code and download it as a PNG image.",
      icon: "📥",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("qr-tutorial-completed", "true");
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#f8f9fa] p-8 rounded-lg shadow-xl w-11/12 max-w-lg">
        {/* Step Icon Display */}
        <div className="flex justify-center mb-4 text-4xl text-[#343a40]">
          {steps[step].icon}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-[#212529]">
          {steps[step].title}
        </h2>

        {/* Description */}
        <p className="text-[#495057] mb-6 text-lg">{steps[step].description}</p>

        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index <= step ? "bg-[#6c757d]" : "bg-[#dee2e6]"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Final Step Message */}
        {step === steps.length - 1 && (
          <div className="text-center mb-6">
            <p className="text-xl text-[#495057] font-semibold">
              You're all set up! Generate your QR code now!
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            className={`py-2 px-4 rounded-md border-2 border-[#495057] text-[#495057] ${
              step === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#dee2e6]"
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="bg-[#343a40] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#212529]"
          >
            {step < steps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialModal;
