// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Capabilities extends APIResource {
  retrieveVersion(options?: RequestOptions): APIPromise<CapabilityRetrieveVersionResponse> {
    return this._client.get('/capabilities/version', options);
  }
}

/**
 * Version details
 */
export interface CapabilityRetrieveVersionResponse {
  /**
   * Version of API specification
   */
  api_spec_version?: string;

  /**
   * Version of application consuming or serving the API
   */
  app_version?: string;

  /**
   * Version of SDK generated from API specification
   */
  sdk_version?: string;
}

export declare namespace Capabilities {
  export { type CapabilityRetrieveVersionResponse as CapabilityRetrieveVersionResponse };
}
