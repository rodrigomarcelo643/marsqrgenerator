import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import TutorialModal from "./components/TutorialModal";

function App() {
  const [input, setInput] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrType, setQrType] = useState("Model 2");
  const [showFrame, setShowFrame] = useState(false);
  const [frameColor, setFrameColor] = useState("#adb5bd");
  const [showTutorial, setShowTutorial] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("qr-tutorial-seen");
    if (!firstVisit) {
      setShowTutorial(true);
      localStorage.setItem("qr-tutorial-seen", "true");
    }
  }, []);

  const qrTypes = ["Micro QR", "Model 1", "Model 2", "IQR", "SQRC", "Frame QR"];
  const qrStyles = {
    "Micro QR": { size: 128, fgColor: "#FF0000", bgColor: "#FFFFFF" },
    "Model 1": { size: 200, fgColor: "#0000FF", bgColor: "#F0F0F0" },
    "Model 2": { size: 256, fgColor: fgColor, bgColor: bgColor },
    IQR: { size: 300, fgColor: "#00FF00", bgColor: "#000000" },
    SQRC: { size: 256, fgColor: "#FFFFFF", bgColor: "#333333" },
    "Frame QR": { size: 256, fgColor: "#000000", bgColor: "#FFFFFF" },
  };

  const downloadQRCode = () => {
    if (!input) {
      setError(true);
      return;
    }

    setError(false);

    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    const { fgColor: defaultFg, bgColor: defaultBg } = qrStyles[qrType];
    setFgColor(defaultFg);
    setBgColor(defaultBg);
  }, [qrType]);

  const handleGenerate = () => {
    if (!input) {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex flex-col items-center p-4">
      {showTutorial && (
        <TutorialModal closeModal={() => setShowTutorial(false)} />
      )}

      <header className="bg-[#212529] text-white p-6 rounded-lg shadow-lg text-center w-full max-w-3xl">
        <h1 className="text-3xl font-bold">Mars QR Code Generator</h1>
        <p>Create stunning, customizable QR codes with ease!</p>
      </header>

      <main className="mt-8 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <label className="block text-[#495057] font-medium mb-2">
            Enter URL or Text
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
            onBlur={handleGenerate}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#343a40]"
          />
          {error && (
            <p className="text-red-600 text-sm mt-2">
              Please enter a URL or text.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#495057] font-medium mb-2">
              QR Code Type
            </label>
            <select
              value={qrType}
              onChange={(e) => setQrType(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#343a40]"
            >
              {qrTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#495057] font-medium mb-2">
              Foreground Color
            </label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 cursor-pointer border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[#495057] font-medium mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 cursor-pointer border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[#495057] font-medium mb-2">
              Show Frame
            </label>
            <input
              type="checkbox"
              checked={showFrame}
              onChange={(e) => setShowFrame(e.target.checked)}
              className="cursor-pointer"
            />
          </div>

          {showFrame && (
            <div>
              <label className="block text-[#495057] font-medium mb-2">
                Frame Color
              </label>
              <input
                type="color"
                value={frameColor}
                onChange={(e) => setFrameColor(e.target.value)}
                className="w-full h-10 cursor-pointer border rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <div
            className={`inline-block p-4 rounded-lg ${
              showFrame ? `bg-[${frameColor}]` : ""
            }`}
          >
            <QRCodeCanvas
              value={input || ""}
              size={qrStyles[qrType]?.size || 256}
              fgColor={fgColor}
              bgColor={bgColor}
            />
          </div>
          <button
            onClick={downloadQRCode}
            className="mt-4 bg-[#343a40] text-white py-2 px-6 rounded-lg shadow-lg hover:bg-[#212529]"
          >
            Download QR Code
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2">
              Please enter a URL or text before downloading the QR code.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
