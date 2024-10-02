import { Nullable } from "@/types/utils";
import { BackendErrorResponse } from "./backend-error.response";

export type BackendResponse<T> = Promise<APIResponse<T>>;

type APIResponse<T> = [T, null] | [null, BackendErrorResponse];
