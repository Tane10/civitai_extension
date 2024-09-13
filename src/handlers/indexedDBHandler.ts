import Dexie, { Table } from "dexie";
import { CivitaiCheckpointsModelData } from "../types";
import { JobStatusCollection } from "civitai";

export class IndexedDbHandler extends Dexie {
  private static instance: IndexedDbHandler;

  // tables: Table<any, any, any>[];
  checkpoints!: Table<CivitaiCheckpointsModelData, number>; // Declare tables
  jobs!: Table<JobStatusCollection, number>; // Declare tables

  private constructor() {
    super("CivitaiDB"); // The name of the database

    // Define the schema for your tables
    this.version(1).stores({
      checkpoints:
        "++id, &modelId, name, nsfw, latesModelVersion, modelUrn, page", // Schema for 'models' table
      jobs: "++id, &token, jobs",
    });
  }

  // Static method to get the singleton instance
  public static getInstance(): IndexedDbHandler {
    if (!IndexedDbHandler.instance) {
      IndexedDbHandler.instance = new IndexedDbHandler();
    }
    return IndexedDbHandler.instance;
  }
}
