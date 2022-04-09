/** @format */

import fetch from "node-fetch";

import { stringifyQuery } from "../util";

import type { HttpClientOptions, HttpClient } from "../types";

export class FetchClient implements HttpClient {
  private baseUrl: string;
  private cookie: string;

  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;

    this.cookie = "";
  }

  private async makeRequest<T>(
    path: string,
    method: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    try {
      const params = stringifyQuery(options.query);

      const response = await fetch(`${this.baseUrl}${path}${params}`, {
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          cookie: this.cookie
        },
        body: options.body
      });

      const rawHeaders = response.headers.raw();

      const cookie = rawHeaders["set-cookie"];

      if (cookie) {
        // this.cookie = cookie.map(entry => entry.split(";")[0]).join(";");
        this.cookie = cookie.join("");
      }

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  public async get<T>(
    url: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    return await this.makeRequest<T>(url, "GET", options);
  }

  public async post<T>(
    url: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    return await this.makeRequest<T>(url, "POST", options);
  }

  public async patch<T>(
    url: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    return await this.makeRequest<T>(url, "PATCH", options);
  }

  public async put<T>(
    url: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    return await this.makeRequest<T>(url, "PUT", options);
  }

  public async delete<T>(
    url: string,
    options: HttpClientOptions
  ): Promise<T | undefined> {
    return await this.makeRequest<T>(url, "DELETE", options);
  }
}
