// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'monitor',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/monitor/states',
  operationId: 'get_states',
};

export const tool: Tool = {
  name: 'create_states_monitor',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      bgp_prefixes: {
        type: 'object',
        description: 'The request to retrieve BGP peer prefix information.',
        properties: {
          bgp_peer_names: {
            type: 'array',
            description:
              'The names of BGP peers for which prefix information will be retrieved. If no names are specified then the results will contain prefix information for all configured BGP peers.\n\nx-constraint:\n- /components/schemas/Bgp.V4Peer/properties/name\n- /components/schemas/Bgp.V6Peer/properties/name\n',
            items: {
              type: 'string',
            },
          },
          ipv4_unicast_filters: {
            type: 'array',
            description:
              'The IPv4 unicast results can be filtered by specifying additional prefix search criteria. If the ipv4_unicast_filters property is missing or empty then all IPv4 prefixes will be returned.',
            items: {
              type: 'object',
              properties: {
                addresses: {
                  type: 'array',
                  description:
                    'The addresses to match. If the addresses property is missing or empty then all addresses will match.',
                  items: {
                    type: 'string',
                  },
                },
                origin: {
                  type: 'string',
                  description: 'The origin to match. If the origin is missing then all origins will match.',
                  enum: ['igp', 'egp', 'incomplete'],
                },
                path_id: {
                  type: 'integer',
                  description:
                    'The path id to match. If the path id is missing then all path ids will match.',
                },
                prefix_length: {
                  type: 'integer',
                  description:
                    'The prefix length to match. If the prefix length is missing then all prefix lengths will match.',
                },
              },
              required: [],
            },
          },
          ipv6_unicast_filters: {
            type: 'array',
            description:
              'The IPv6 unicast results can be filtered by specifying additional prefix search criteria. If the ipv6_unicast_filters property is missing or empty then all IPv6 prefixes will be returned.',
            items: {
              type: 'object',
              properties: {
                addresses: {
                  type: 'array',
                  description:
                    'The addresses to match. If the addresses property is missing or empty then all addresses will match.',
                  items: {
                    type: 'string',
                  },
                },
                origin: {
                  type: 'string',
                  description: 'The origin to match. If the origin is missing then all origins will match.',
                  enum: ['igp', 'egp', 'incomplete'],
                },
                path_id: {
                  type: 'integer',
                  description:
                    'The path id to match. If the path id is missing then all path ids will match.',
                },
                prefix_length: {
                  type: 'integer',
                  description:
                    'The prefix length to match. If the prefix length is missing then all prefix lengths will match.',
                },
              },
              required: [],
            },
          },
          prefix_filters: {
            type: 'array',
            description:
              'Specify which prefixes to return. If the list is empty or missing then all prefixes will be returned.',
            items: {
              type: 'string',
              enum: ['ipv4_unicast', 'ipv6_unicast'],
            },
          },
        },
        required: [],
      },
      choice: {
        type: 'string',
        enum: [
          'ipv4_neighbors',
          'ipv6_neighbors',
          'bgp_prefixes',
          'isis_lsps',
          'lldp_neighbors',
          'rsvp_lsps',
          'dhcpv4_interfaces',
          'dhcpv4_leases',
          'dhcpv6_interfaces',
          'dhcpv6_leases',
          'ospfv2_lsas',
          'ospfv3_lsas',
        ],
      },
      dhcpv4_interfaces: {
        type: 'object',
        description:
          'The request for assigned IPv4 address information associated with DHCP Client sessions.',
        properties: {
          dhcp_client_names: {
            type: 'array',
            description:
              'The names of DHCPv4 client to return results for. An empty list will return results for all DHCPv4 Client address information.\n\nx-constraint:\n- /components/schemas/Device.Dhcpv4client/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      dhcpv4_leases: {
        type: 'object',
        description: 'The request to retrieve DHCP Server host allocated status.',
        properties: {
          dhcp_server_names: {
            type: 'array',
            description:
              'The names of DHCPv4 server to return results for. An empty list will return results for all DHCPv4 servers.\n\nx-constraint:\n- /components/schemas/Device.Dhcpv4server/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      dhcpv6_interfaces: {
        type: 'object',
        description:
          'The request for assigned IPv6 address information associated with DHCP Client sessions.',
        properties: {
          dhcp_client_names: {
            type: 'array',
            description:
              'The names of DHCPv6 client to return results for. An empty list will return results for all DHCPv6 Client address information.\n\nx-constraint:\n- /components/schemas/Device.Dhcpv6client/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      dhcpv6_leases: {
        type: 'object',
        description: 'The request to retrieve DHCP Server host allocated status.',
        properties: {
          dhcp_server_names: {
            type: 'array',
            description:
              'The names of DHCPv6 server to return results for. An empty list will return results for all DHCPv6 servers.\n\nx-constraint:\n- /components/schemas/Device.Dhcpv6server/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      ipv4_neighbors: {
        type: 'object',
        description:
          'The request to retrieve IPv4 Neighbor state (ARP cache entries) of a network interface(s).',
        properties: {
          ethernet_names: {
            type: 'array',
            description:
              'The names of Ethernet interfaces for which Neighbor state (ARP cache entries) will be retrieved. If no names are specified then the results will contain Neighbor state (ARP cache entries) for all available Ethernet interfaces.\n\nx-constraint:\n- /components/schemas/Device.Ethernet/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      ipv6_neighbors: {
        type: 'object',
        description:
          'The request to retrieve IPv6 Neighbor state (NDISC cache entries) of a network interface(s).',
        properties: {
          ethernet_names: {
            type: 'array',
            description:
              'The names of Ethernet interfaces for which Neighbor state (NDISC cache entries) will be retrieved. If no names are specified then the results will contain Neighbor state (NDISC cache entries) for all available Ethernet interfaces.\n\nx-constraint:\n- /components/schemas/Device.Ethernet/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      isis_lsps: {
        type: 'object',
        description: 'The request to retrieve ISIS Link State PDU (LSP) information learned by the router.',
        properties: {
          isis_router_names: {
            type: 'array',
            description:
              'The names of ISIS routers for which learned information is requested. An empty list will return results for all ISIS routers.\n\nx-constraint:\n- /components/schemas/Device.IsisRouter/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      lldp_neighbors: {
        type: 'object',
        description: 'The request to retrieve LLDP neighbor information for a given instance.',
        properties: {
          lldp_names: {
            type: 'array',
            description:
              'The names of LLDP instances for which neighbor information will be retrieved. If no names are specified then the results will contain neighbor information for all configured LLDP instances.\n\nx-constraint:\n- /components/schemas/Lldp/properties/name\n',
            items: {
              type: 'string',
            },
          },
          neighbor_id_filters: {
            type: 'array',
            description:
              'Specify the neighbors for which information will be returned. If empty  or missing then information for all neighbors will be returned.',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      ospfv2_lsas: {
        type: 'object',
        description:
          'The request to retrieve OSPFv2 Link State Advertisements (LSA) information learned by the routers.',
        properties: {
          router_names: {
            type: 'array',
            description:
              'The names of OSPFv2 routers for which learned information is requested. An empty list will return results for all OSPFv2 routers.\n\nx-constraint:\n- /components/schemas/Device.Ospfv2Router/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      ospfv3_lsas: {
        type: 'object',
        description:
          'The request to retrieve OSPFv3 Link State Advertisements (LSA) information learned by the routers.',
        properties: {
          router_names: {
            type: 'array',
            description:
              'The names of OSPFv3 routers for which learned information is requested. An empty list will return results for all OSPFv3 routers.\n\nx-constraint:\n- /components/schemas/Ospfv3.RouterInstance/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
      rsvp_lsps: {
        type: 'object',
        description:
          'The request to retrieve RSVP Label Switched Path (LSP) information learned by the router.',
        properties: {
          rsvp_router_names: {
            type: 'array',
            description:
              'The names of RSVP-TE routers for which learned information is requested. An empty list will return results for all RSVP=TE routers.\n\nx-constraint:\n- /components/schemas/Device.Rsvp/properties/name\n',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
      },
    },
  },
};

export const handler = (client: Devknot, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.monitor.createStates(body);
};

export default { metadata, tool, handler };
