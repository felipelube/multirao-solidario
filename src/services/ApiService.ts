import { AUTH_TOKEN_NAME } from "../config/auth";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ErrorModel = {
  detail: string;
};

export class ApiError extends Error {
  statusCode: number;
  errors: ErrorModel[];

  constructor(message: string, statusCode: number, errors?: ErrorModel[]) {
    super(message);
    this.name = "ApiError";

    this.errors = errors ?? [];
    this.statusCode = statusCode;
  }
}

const request = async (
  endpoint: string,
  method: HttpMethod,
  options: RequestInit
) => {
  const url = new URL(endpoint, process.env.REACT_APP_API_URL);
  const isMultiPartFormData = options.body instanceof FormData;

  const res = await fetch(url, {
    ...options,
    method: method ?? "GET",
    headers: {
      ...(isMultiPartFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME) ?? ""}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let json;

    try {
      json = await res.json();
    } catch {
      json = {};
    }

    throw new ApiError(json.message ?? res.statusText, res.status, json.errors);
  }

  try {
    return await res.json();
  } catch {
    return undefined;
  }
};

export class ApiService {
  static async get(endpoint: string, options?: RequestInit) {
    return await request(endpoint, "GET", { ...options });
  }

  static async post(endpoint: string, payload: unknown, options?: RequestInit) {
    const isMultiPartFormData = payload instanceof FormData;
    return await request(endpoint, "POST", {
      body: isMultiPartFormData ? payload : JSON.stringify(payload),
      ...options,
    });
  }

  static async put(endpoint: string, payload: unknown, options?: RequestInit) {
    return await request(endpoint, "PUT", {
      body: JSON.stringify(payload),
      ...options,
    });
  }

  static async patch(
    endpoint: string,
    payload: unknown,
    options?: RequestInit
  ) {
    return await request(endpoint, "PATCH", {
      body: JSON.stringify(payload),
      ...options,
    });
  }

  static async delete(endpoint: string, options?: RequestInit) {
    return await request(endpoint, "DELETE", { ...options });
  }

  constructor() {
    throw new Error("This class should not be instantiated");
  }
}
