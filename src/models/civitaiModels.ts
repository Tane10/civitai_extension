import { DBModel } from "../types";

export interface CivitaiCheckpointsModelData extends DBModel {
  modelId: number;
  nsfw: boolean;
  latesModelVersion: number;
  modelUrn: string;
}
