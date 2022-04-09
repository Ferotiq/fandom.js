/** @format */

import { FetchClient } from "./fetch-client";
import type { HttpClient, Credentials, QueryResponse } from "../types";

export class FandomClient {
  private baseURL: string;
  private httpClient: HttpClient;

  public constructor(wiki: string) {
    this.baseURL = `https://${wiki}.fandom.com/`;

    this.httpClient = new FetchClient(this.baseURL);
  }

  public async login(credentials: Credentials): Promise<any> {
    const loginToken = await this.getLoginToken();

    const response = await this.httpClient.post<any>("api.php", {
      query: {
        action: "login",
        lgname: credentials.username,
        format: "json"
      },
      body: {
        lgpassword: credentials.password,
        lgtoken: loginToken
      }
    });

    return response;
  }

  private async getLoginToken() {
    const response = await this.httpClient.get<QueryResponse>("api.php", {
      query: {
        action: "query",
        meta: "tokens",
        type: "login",
        format: "json"
      }
    });

    return response?.query.tokens.logintoken;
  }
}
