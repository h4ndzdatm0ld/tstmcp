// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'devknot-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'capabilities',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/capabilities/version',
  operationId: 'get_version',
};

export const tool: Tool = {
  name: 'retrieve_version_capabilities',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = async (client: Devknot, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.capabilities.retrieveVersion());
};

export default { metadata, tool, handler };
