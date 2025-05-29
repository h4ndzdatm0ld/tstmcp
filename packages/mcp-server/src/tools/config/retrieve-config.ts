// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'config',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/config',
  operationId: 'get_config',
};

export const tool: Tool = {
  name: 'retrieve_config',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: Devknot, args: Record<string, unknown> | undefined) => {
  return client.config.retrieve();
};

export default { metadata, tool, handler };
