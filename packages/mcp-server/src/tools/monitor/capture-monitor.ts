// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'monitor',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/monitor/capture',
  operationId: 'get_capture',
};

export const tool: Tool = {
  name: 'capture_monitor',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      port_name: {
        type: 'string',
        description:
          'The name of a port a capture is started on.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n',
      },
    },
  },
};

export const handler = (client: Devknot, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.monitor.capture(body);
};

export default { metadata, tool, handler };
