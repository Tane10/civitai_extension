import Dexie, { Table } from "dexie";
import { CivitaiCheckpointsModelData } from "../types";

export class IndexedDbHandler extends Dexie {
  private static instance: IndexedDbHandler;

  // tables: Table<any, any, any>[];
  checkpoints!: Table<CivitaiCheckpointsModelData, number>; // Declare tables

  private constructor() {
    super("CivitaiDB"); // The name of the database

    // Define the schema for your tables
    this.version(1).stores({
      checkpoints: "++id, modelId, name, nsfw, latesModelVersion, modelUrn", // Schema for 'models' table
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
