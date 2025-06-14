// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Devknot } from '../client';

export abstract class APIResource {
  protected _client: Devknot;

  constructor(client: Devknot) {
    this._client = client;
  }
}
