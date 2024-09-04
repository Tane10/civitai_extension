import React, { useState } from 'react';

const App: React.FC = () => {
  // States for form values
  const [model, setModel] = useState<string>('');
  const [resources, setResources] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [negativePrompt, setNegativePrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('square');
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [draftMode, setDraftMode] = useState<boolean>(false);
  const [cfgScale, setCfgScale] = useState<string>('creative');
  const [sampler, setSampler] = useState<string>('');
  const [steps, setSteps] = useState<number>(0);
  const [seed, setSeed] = useState<string>('');
  const [clipSkip, setClipSkip] = useState<number>(0);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form className="space-y-4">
        {/* Model Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Model*</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a model</option>
            <option value="model1">Model 1</option>
            <option value="model2">Model 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Additional Resources Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Resources</label>
          <select
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a resource</option>
            <option value="resource1">Resource 1</option>
            <option value="resource2">Resource 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Prompt Text Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Prompt*</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        {/* Negative Prompt Text Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Negative Prompt</label>
          <textarea
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
          <div className="flex space-x-2">
            {['square', 'landscape', 'portrait'].map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`flex-1 py-2 text-center rounded-md ${aspectRatio === ratio ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {ratio.charAt(0).toUpperCase() + ratio.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* NSFW Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">NSFW</label>
          <input
            type="checkbox"
            checked={nsfw}
            onChange={() => setNsfw(!nsfw)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        {/* Draft Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Draft Mode</label>
          <input
            type="checkbox"
            checked={draftMode}
            onChange={() => setDraftMode(!draftMode)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        {/* Advanced Settings */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">CFG Scale</label>
            <div className="flex space-x-2">
              {['creative', 'balance', 'precise'].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setCfgScale(scale)}
                  className={`px-4 py-2 text-center rounded-md ${cfgScale === scale ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {scale.charAt(0).toUpperCase() + scale.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Slider</label>
            <input
              type="range"
              min={0}
              max={100}
              value={clipSkip}
              onChange={(e) => setClipSkip(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Sampler Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sampler</label>
          <select
            value={sampler}
            onChange={(e) => setSampler(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a sampler</option>
            <option value="sampler1">Sampler 1</option>
            <option value="sampler2">Sampler 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Steps Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Steps</label>
          <input
            type="range"
            min={0}
            max={100}
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Seed Toggle with Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Seed</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={!!seed}
              onChange={() => setSeed(seed ? '' : 'default')}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Enter seed"
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Clip Skip Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Clip Skip</label>
          <input
            type="range"
            min={0}
            max={100}
            value={clipSkip}
            onChange={(e) => setClipSkip(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
       
