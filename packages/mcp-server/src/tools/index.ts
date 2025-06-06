// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_config from './config/create-config';
import retrieve_config from './config/retrieve-config';
import update_config from './config/update-config';
import set_state_control from './control/set-state-control';
import trigger_action_control from './control/trigger-action-control';
import capture_monitor from './monitor/capture-monitor';
import create_metrics_monitor from './monitor/create-metrics-monitor';
import create_states_monitor from './monitor/create-states-monitor';
import retrieve_version_capabilities from './capabilities/retrieve-version-capabilities';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_config);
addEndpoint(retrieve_config);
addEndpoint(update_config);
addEndpoint(set_state_control);
addEndpoint(trigger_action_control);
addEndpoint(capture_monitor);
addEndpoint(create_metrics_monitor);
addEndpoint(create_states_monitor);
addEndpoint(retrieve_version_capabilities);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  if (unmatchedFilters.size > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${[...unmatchedFilters]
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
