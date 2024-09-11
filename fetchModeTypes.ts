// Enum definitions for types, sorting, and periods
export enum ModelType {
  Checkpoint = "Checkpoint",
  TextualInversion = "TextualInversion",
  Hypernetwork = "Hypernetwork",
  AestheticGradient = "AestheticGradient",
  LORA = "LORA",
  Controlnet = "Controlnet",
  Poses = "Poses",
}

export enum SortOrder {
  HighestRated = "Highest Rated",
  MostDownloaded = "Most Downloaded",
  Newest = "Newest",
}

export enum TimePeriod {
  AllTime = "AllTime",
  Year = "Year",
  Month = "Month",
  Week = "Week",
  Day = "Day",
}

export enum CommercialUse {
  None = "None",
  Image = "Image",
  Rent = "Rent",
  Sell = "Sell",
}

// Interface for the request parameters
export interface ModelFilterOptions {
  limit?: number; // Number of results per page (1 to 100)
  page?: number; // Page number to start fetching models
  query?: string; // Search query to filter models by name
  tag?: string; // Search query to filter models by tag
  username?: string; // Search query to filter models by user
  types?: ModelType[]; // Array of model types to filter
  sort?: SortOrder; // Sort order
  period?: TimePeriod; // Time frame for sorting models
  rating?: number; // Rating to filter models (deprecated)
  favorites?: boolean; // Filter to favorites of the authenticated user
  hidden?: boolean; // Filter to hidden models of the authenticated user
  primaryFileOnly?: boolean; // Include only the primary file for each model
  allowNoCredit?: boolean; // Filter models based on crediting requirements
  allowDerivatives?: boolean; // Filter models based on derivative allowances
  allowDifferentLicenses?: boolean; // Filter models based on license differences
  allowCommercialUse?: CommercialUse; // Filter models based on commercial permissions
  nsfw?: boolean; // Filter models based on safe images
  supportsGeneration?: boolean; // Return models that support generation
}

export enum ModelMode {
  Archived = "Archived",
  TakenDown = "TakenDown",
}

export enum FloatingPoint {
  FP16 = "fp16",
  FP32 = "fp32",
}

export enum ModelSize {
  Full = "full",
  Pruned = "pruned",
}

export enum ModelFormat {
  SafeTensor = "SafeTensor",
  PickleTensor = "PickleTensor",
  Other = "Other",
}

// Interface for model statistics
export interface ModelStats {
  downloadCount: number;
  favoriteCount: number;
  commentCount: number;
  ratingCount: number;
  rating: number;
}

// Interface for model version files
export interface ModelVersionFiles {
  sizeKb: number;
  pickleScanResult: "Pending" | "Success" | "Danger" | "Error";
  virusScanResult: "Pending" | "Success" | "Danger" | "Error";
  scannedAt: Date | null;
  primary?: boolean;
  metadata: {
    fp?: FloatingPoint;
    size?: ModelSize;
    format?: ModelFormat;
  };
}

// Interface for model version images
export interface ModelVersionImages {
  id: string;
  url: string;
  nsfw: string;
  width: number;
  height: number;
  hash: string;
  meta: object | null;
}

// Interface for model version
export interface ModelVersion {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  downloadUrl: string;
  trainedWords: string[];
  files: ModelVersionFiles;
  images: ModelVersionImages[];
  stats: ModelStats;
}

// Interface for the model creator
export interface ModelCreator {
  username: string;
  image: string | null;
}

// Main model interface
export interface Model {
  id: number;
  name: string;
  description: string;
  type: ModelType;
  nsfw: boolean;
  tags: string[];
  mode: ModelMode | null;
  creator: ModelCreator;
  stats: ModelStats;
  modelVersions: ModelVersion[];
}

// Interface for pagination metadata
export interface Metadata {
  totalItems: string;
  currentPage: string;
  pageSize: string;
  totalPages: string;
  nextPage: string;
  prevPage: string;
}

// Interface for the API response
export interface ApiResponse {
  metadata: Metadata;
  items: Model[];
}
