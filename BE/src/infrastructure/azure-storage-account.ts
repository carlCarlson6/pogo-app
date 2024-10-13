import { BlobServiceClient } from "@azure/storage-blob";
import { env } from "../common/env";

export const blobServiceClient = BlobServiceClient.fromConnectionString(env.storageConnStr);