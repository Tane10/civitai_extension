import React, { useState } from "react";
import { Scheduler } from "civitai";

const quantityOptions = [1, 2, 3, 4, 5]; // Adjust as needed

const Form: React.FC = () => {
  const [model, setModel] = useState("");
  const [resources, setResources] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("square");
  // const [nsfw, setNsfw] = useState(false);
  const [draftMode, setDraftMode] = useState(false);
  const [cfgScale, setCfgScale] = useState("balance");
  const [sliderValue, setSliderValue] = useState(7.5);
  const [sample, setSample] = useState<Scheduler | string>("EulerA");
  const [steps, setSteps] = useState(25);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [clipSkip, setClipSkip] = useState(1);
  const [quantity, setQuantity] = useState<number>(1); // Default quantity

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    // console.log({ model, resources, prompt, negativePrompt, aspectRatio, nsfw, draftMode, cfgScale, sliderValue, sample, steps, seed, clipSkip });
    console.log({
      model,
      resources,
      prompt,
      negativePrompt,
      aspectRatio,
      draftMode,
      cfgScale,
      sliderValue,
      sample,
      steps,
      seed,
      clipSkip,
    });
  };

  const handleReset = () => {
    setQuantity(1);
    setPrompt("");
    setNegativePrompt("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-large text-gray-700">Model*</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select model</option>
          {/* Add dropdown options here */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Resources
        </label>
        <select
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select resources</option>
          {/* Add dropdown options here */}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prompt*
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Negative Prompt
        </label>
        <textarea
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Aspect Ratio
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setAspectRatio("square")}
            className={`px-4 py-2 border rounded-md ${
              aspectRatio === "square"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Square
          </button>
          <button
            type="button"
            onClick={() => setAspectRatio("landscape")}
            className={`px-4 py-2 border rounded-md ${
              aspectRatio === "landscape"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Landscape
          </button>
          <button
            type="button"
            onClick={() => setAspectRatio("portrait")}
            className={`px-4 py-2 border rounded-md ${
              aspectRatio === "portrait"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Portrait
          </button>
        </div>
      </div>

      {/* <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={nsfw} onChange={() => setNsfw(!nsfw)} className="h-4 w-4" />
          <span>NSFW</span>
        </label>
      </div> */}

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={draftMode}
            onChange={() => setDraftMode(!draftMode)}
            className="h-4 w-4"
          />
          <span>Draft Mode</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Advanced
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setCfgScale("creative")}
            className={`px-4 py-2 border rounded-md ${
              cfgScale === "creative"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Creative
          </button>
          <button
            type="button"
            onClick={() => setCfgScale("balance")}
            className={`px-4 py-2 border rounded-md ${
              cfgScale === "balance"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Balance
          </button>
          <button
            type="button"
            onClick={() => setCfgScale("precise")}
            className={`px-4 py-2 border rounded-md ${
              cfgScale === "precise"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Precise
          </button>
        </div>

        <div className="cfgScale">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            CFG Scale
          </label>
          <input
            type="range"
            min="10"
            max="30"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="mt-2 w-full"
            step="0.5"
          />
          <input
            className="block w-24 border border-gray-300"
            type="number" // Change type to number
            max="30"
            min="1"
            step="0.5"
            inputMode="decimal"
            onChange={(e) => setSliderValue(Number(e.target.value))}
            aria-invalid="false"
            value={sliderValue}
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Sampler
        </label>
        <select
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select sampler</option>
          {Object.values(Scheduler).map((scheduler) => (
            <option key={scheduler} value={scheduler}>
              {scheduler}
            </option>
          ))}
        </select>

        <div className="step">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Steps
          </label>
          <input
            type="range"
            min="10"
            max="50"
            step="1"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <input
            className="block w-24 border border-gray-300"
            type="number" // Change type to number
            min="10"
            max="50"
            step="1"
            inputMode="numeric"
            onChange={(e) => setSteps(Number(e.target.value))}
            aria-invalid="false"
            value={steps}
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Seed
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={seed !== undefined}
            onChange={() => setSeed(seed === undefined ? 0 : undefined)}
            className="h-4 w-4"
          />
          <input
            type="number"
            value={seed === undefined ? "" : seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            disabled={seed === undefined}
            className="ml-2 border border-gray-300 rounded-md shadow-sm p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Clip Skip
          </label>
          <input
            type="range"
            min="1"
            max="3"
            value={clipSkip}
            onChange={(e) => setClipSkip(Number(e.target.value))}
            className="mt-2 w-full"
          />
          <input
            className="block w-24 border border-gray-300"
            type="number" // Change type to number
            min="1"
            max="3"
            step="1"
            inputMode="numeric"
            onChange={(e) => setClipSkip(Number(e.target.value))}
            aria-invalid="false"
            value={clipSkip}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="form-select block w-24 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {quantityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
