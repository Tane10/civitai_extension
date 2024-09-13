import {
  Civitai,
  Job,
  JobStatus,
  JobStatusCollection,
  ProblemDetails,
  Scheduler,
} from "civitai";

import {
  CivitaiCheckpointsModelData,
  Message,
  ModelType,
  SortOrder,
} from "../types";
import { IndexedDbHandler } from "./indexedDBHandler";
import { FromTextInput } from "civitai/dist/types/Inputs";
import { error } from "console";

// NOTE: Actions related to the civitAI script

let civitai: Civitai | undefined;

const baseURL = "https://civitai.com/api/v1/";

const db = IndexedDbHandler.getInstance();

// {
//   "model": "urn:air:sd1:checkpoint:civitai:7240@119057",
//   "resources": "",
//   "prompt": "this is a test",
//   "negativePrompt": "",
//   "aspectRatio": "landscape",
//   "draftMode": false,
//   "cfgScale": "balance",
//   "sliderValue": 19.5,
//   "sample": "DPM2A",
//   "steps": 35,
//   "clipSkip": 2
// }

// Example for txt2img input
// const input = {
//   model: "urn:air:sdxl:checkpoint:civitai:101055@128078",
//   params: {
//     prompt:
//       "RAW photo, face portrait photo of 26 y.o woman, wearing black dress, happy face, hard shadows, cinematic shot, dramatic lighting",
//     negativePrompt:
//       "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers:1.4), (deformed, distorted, disfigured:1.3)",
//     scheduler: Scheduler.EULER_A,
//     steps: 20,
//     cfgScale: 7,
//     width: 512,
//     height: 512,
//     clipSkip: 2,
//   },
// };

export const initCivitai = (apiKey: string): void => {
  if (!apiKey) {
    console.error("API_KEY not found in environment variables.");
    return; // Exit early if no API key is present
  }

  try {
    civitai = new Civitai({ auth: apiKey });
    console.log("Civitai initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Civitai:", err);
  }
};

export const handleImageJob = async (
  request: FromTextInput
  // sender: chrome.runtime.MessageSender,
  // sendResponse: (response?: any) => void
): Promise<JobStatusCollection | ProblemDetails | any> => {
  if (!civitai) {
    console.error("Civitai instance is not initialized.");
    throw new Error(
      JSON.stringify({
        status: "error",
        message: "Civitai instance is not available.",
      })
    );
  }

  const response = await civitai.image.fromText(request);

  // TODO: FIX ME, DB doesn't have jobs as a seperate field dunno why
  if (response.token && response.jobs) {
    await db.jobs.add({ token: response.token, jobs: response.jobs });
  }

  console.log(response);
  console.log("Processing prompt request:", response);
  return response;

  // Example response (modify according to actual logic)
  // sendResponse({ status: "success", message: "Request processed." });
};

function formateCheckpoint({
  rawBaseModel,
  modelId,
  versionId,
}: {
  rawBaseModel: string;
  modelId: number;
  versionId: number;
}) {
  let baseModel = "";

  if (/SD 1[\*]?|SD 1/i.test(rawBaseModel)) {
    baseModel = "sd1";
  } else if (/sdxl/i.test(rawBaseModel)) {
    baseModel = "sdxl";
  } else if (/flux/i.test(rawBaseModel)) {
    baseModel = "flux";
  } else if (/Pony/i.test(rawBaseModel)) {
    baseModel = "sd1";
  } else {
    console.error("unknown model");
    return "";
  }

  // returns "urn:air:{base model}:checkpoint:civitai:{id}@{model version}"
  return `urn:air:${baseModel}:checkpoint:civitai:${modelId}@${versionId}`;
}

/**
 * Converts an object to URL-encoded query parameters.
 *
 * @param params - The object to convert to query parameters.
 * @returns The URL-encoded query string.
 */
const objectToQueryString = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];

      // If the value is an array, map each item to a key=value format
      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          )
          .join("&");
      }

      // For other types, directly encode the key and value
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return queryString;
};

/**
 * Fetches model data from a specified API with the given query parameters.
 * The function constructs a query string from the provided parameters, sends a GET request, and processes the response.
 *
 * @async
 * @function fetchModelData
 * @param {Object} params - Parameters for fetching the model data.
 * @param {number} params.limit - The number of results to be returned per page (between 1 and 100).
 * @param {number} params.page - The page number to fetch the models from.
 * @param {SortOrder} params.sort - The sorting order of the results (e.g., "Highest Rated", "Most Downloaded").
 * @param {Array<ModelType>} params.types - An array of model types to filter the results (e.g., "Checkpoint", "LORA").
 * @returns {Promise<Array<ModelData>>} - A promise that resolves to an array of model data objects.
 *
 * @typedef {Object} ModelData - Represents a model's basic data.
 * @property {number} modelId - The unique identifier for the model.
 * @property {string} name - The name of the model.
 * @property {boolean} nsfw - Indicates whether the model is marked as NSFW (Not Safe For Work).
 * @property {number} latesModelVersion - The ID of the latest version of the model.
 * @property {string} modelUrn - The formatted model URN (Uniform Resource Name), which is based on the base model and version ID.
 *
 * @typedef {('Highest Rated' | 'Most Downloaded' | 'Newest')} SortOrder - Defines the sorting options for the models.
 * @typedef {('Checkpoint' | 'LORA' | 'Controlnet' | 'Hypernetwork')} ModelType - Defines the possible types of models to filter.
 *
 * @example
 * // Example usage of the fetchModelData function
 * fetchModelData({
 *   limit: 10,
 *   page: 1,
 *   sort: SortOrder.HIGHEST_RATED,
 *   types: [ModelType.CHECKPOINT, ModelType.LORA]
 * }).then((models) => {
 *   console.log(models);
 * }).catch((error) => {
 *   console.error('Error fetching model data:', error);
 * });
 */
export const fetchModelData = async ({
  limit,
  page,
  sort,
  types,
}: {
  limit: number;
  page: number;
  sort: SortOrder;
  types: Array<ModelType>;
}): Promise<Array<CivitaiCheckpointsModelData>> => {
  let items = [];

  // Construct query parameters from the input object
  const queryParms = objectToQueryString({
    limit,
    page,
    sort: sort.toString(),
    types,
  });

  // Construct the request URL using the base URL and query parameters
  const url = `${baseURL}models?${queryParms}`;

  try {
    // Fetch model data from the API
    const modelsReq = await fetch(url, {
      headers: new Headers([["Content-Type", "application/json"]]),
      method: "GET",
    });

    // Check if the response is successful
    if (modelsReq.status === 200) {
      const resp = await modelsReq.json();

      // Map the response items to the expected ModelData format
      items = resp.items.map(
        (item: {
          id: any;
          name: any;
          nsfw: any;
          modelVersions: {
            baseModel: any;
            id: any;
          }[];
        }) => {
          return {
            modelId: item.id,
            name: item.name,
            nsfw: item.nsfw,
            latesModelVersion: item.modelVersions[0].id,
            modelUrn: formateCheckpoint({
              rawBaseModel: item.modelVersions[0].baseModel,
              modelId: item.id,
              versionId: item.modelVersions[0].id,
            }),
          };
        }
      );
    }

    if (items.length == 0) {
      throw new Error("fetch is failing");
    }
  } catch (error) {
    // Log any errors that occur during the fetch process
    console.error(error);
  }

  // Return the array of model data
  return items;
};

export const initSetCivitaiModels = async (): Promise<number> => {
  let recordCount = 0;
  const defaultQueryPrams = {
    limit: 20,
    page: 1,
    sort: SortOrder.HighestRated,
    types: [ModelType.Checkpoint],
  };
  const fetchedModels: Array<CivitaiCheckpointsModelData> =
    await fetchModelData(defaultQueryPrams);

  try {
    if (fetchModelData.length != 0) {
      recordCount = await db.checkpoints.bulkAdd(fetchedModels);
    }
  } catch (err: any) {
    if (err.name == "BulkError") {
      console.error(err);
    } else {
      throw new Error(err);
    }
  }
  return recordCount;
};

export const fetchAllCheckpoints = () => {
  const checkpoints = db.table("checkpoints").toArray();
};

export const updateJobs = async () => {
  const jobs = await db.table("jobs").toArray();

  for (const job of jobs) {
    job["jobs"].map(async (x: JobStatus) => {
      if (!x.result.available) {
        if (x.jobId) {
          const checkedJob = await civitai?.jobs.getById(x.jobId);

          if (checkedJob?.result) {
            console.log(checkedJob.result);
          }
        }
      }
    });
  }
};
