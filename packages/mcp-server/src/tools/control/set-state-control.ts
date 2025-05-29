// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'control',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/control/state',
  operationId: 'set_control_state',
};

export const tool: Tool = {
  name: 'set_state_control',
  description: 'Sets the operational state of configured resources.',
  inputSchema: {
    type: 'object',
    properties: {
      choice: {
        type: 'string',
        enum: ['port', 'protocol', 'traffic'],
      },
      port: {
        type: 'object',
        description: 'States associated with configured ports.',
        properties: {
          choice: {
            type: 'string',
            enum: ['link', 'capture'],
          },
          capture: {
            type: 'object',
            description: 'Sets the capture state of configured ports',
            properties: {
              state: {
                type: 'string',
                description: 'The capture state.',
                enum: ['start', 'stop'],
              },
              port_names: {
                type: 'array',
                description:
                  'The names of ports to which the capture state will be applied to. If the list of port_names is empty or null the state will be applied to all configured ports.\nIf the list is not empty any port that is not included in the list of port_names MUST be ignored and not included in the state change.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['state'],
          },
          link: {
            type: 'object',
            description: 'Sets the link of configured ports.',
            properties: {
              state: {
                type: 'string',
                description: 'The link state.',
                enum: ['up', 'down'],
              },
              port_names: {
                type: 'array',
                description:
                  'The names of target ports. An empty or null list will target all ports.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['state'],
          },
        },
        required: ['choice'],
      },
      protocol: {
        type: 'object',
        description: 'States associated with protocols on configured resources.',
        properties: {
          choice: {
            type: 'string',
            enum: ['all', 'route', 'lacp', 'bgp', 'isis', 'ospfv2', 'ospfv3'],
          },
          all: {
            type: 'object',
            description:
              'Sets all configured protocols to `start` or `stop` state.\nSetting protocol state to `start` shall be a no-op if preceding `set_config` API call was made with `config.options.protocol_options.auto_start_all` set to `true` or if all the configured protocols are already started.',
            properties: {
              state: {
                type: 'string',
                description: 'Protocol states',
                enum: ['start', 'stop'],
              },
            },
            required: ['state'],
          },
          bgp: {
            type: 'object',
            description: 'Sets state of configured BGP peers.',
            properties: {
              choice: {
                type: 'string',
                enum: ['peers'],
              },
              peers: {
                type: 'object',
                description: 'Sets state of configured BGP peers.',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The desired state of BGP peer. If the desired state is 'up', underlying IP interface(s) would be brought up automatically (if not already up), would attempt to bring up the BGP session(s) and advertise route(s), if configured. If the desired state is 'down', BGP session(s) would be brought down.",
                    enum: ['up', 'down'],
                  },
                  peer_names: {
                    type: 'array',
                    description:
                      'The names of BGP peers for which the state has to be applied. An empty or null list will control all BGP peers.\n\nx-constraint:\n- /components/schemas/Bgp.V4Peer/properties/name\n- /components/schemas/Bgp.V6Peer/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          isis: {
            type: 'object',
            description: 'Sets state of configured ISIS routers.',
            properties: {
              choice: {
                type: 'string',
                enum: ['routers'],
              },
              routers: {
                type: 'object',
                description: 'Sets state of configured ISIS routers.',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The desired state of ISIS router. If the desired state is 'up', would attempt to bring up the ISIS session(s) with respective peer(s) and advertise route(s), if configured. If the desired state is 'down', would bring down ISIS session(s) with respective peer(s).",
                    enum: ['up', 'down'],
                  },
                  router_names: {
                    type: 'array',
                    description:
                      'The names of ISIS routers for which the state has to be applied. An empty or null list will control all ISIS routers.\n\nx-constraint:\n- /components/schemas/Device.IsisRouter/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          lacp: {
            type: 'object',
            description: 'Sets state of configured LACP',
            properties: {
              choice: {
                type: 'string',
                enum: ['admin', 'member_ports'],
              },
              admin: {
                type: 'object',
                description: 'Sets admin state of LACP configured on LAG members',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The LACP Member admin state. 'up' will send LACPDUs with 'sync' flag set on selected member ports. 'down' will send LACPDUs with 'sync' flag unset on selected member ports.",
                    enum: ['up', 'down'],
                  },
                  lag_member_names: {
                    type: 'array',
                    description:
                      'The names of LAG members (ports) for which the state has to be applied. An empty or null list will control all LAG members.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
              member_ports: {
                type: 'object',
                description: 'Sets state of LACP member ports configured on LAG.',
                properties: {
                  state: {
                    type: 'string',
                    description: 'The desired LACP member port state.',
                    enum: ['up', 'down'],
                  },
                  lag_member_names: {
                    type: 'array',
                    description:
                      'The names of LAG members (ports) for which the state has to be applied. An empty or null list will control all LAG members.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          ospfv2: {
            type: 'object',
            description: 'Sets state of configured OSPFv2 routers.',
            properties: {
              choice: {
                type: 'string',
                enum: ['routers'],
              },
              routers: {
                type: 'object',
                description: 'Sets state of configured OSPFv2 routers.',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The desired state of OSPFv2 router. If the desired state is 'up', would attempt to bring up the OSPFv2 session(s) with respective peer(s) and advertise route(s), if configured. If the desired state is 'down', would bring down OSPFv2 session(s) with respective peer(s).",
                    enum: ['up', 'down'],
                  },
                  router_names: {
                    type: 'array',
                    description:
                      'The names of OSPFv2 routers for which the state has to be applied. An empty or null list will control all OSPFv2 routers.\n\nx-constraint:\n- /components/schemas/Device.Ospfv2/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          ospfv3: {
            type: 'object',
            description: 'Sets state of configured OSPFv3 routers.',
            properties: {
              choice: {
                type: 'string',
                enum: ['routers'],
              },
              routers: {
                type: 'object',
                description: 'Sets state of configured OSPFv3 routers.',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The desired state of OSPFv3 router. If the desired state is 'up', would attempt to bring up the OSPFv3 session(s) with respective peer(s) and advertise route(s), if configured. If the desired state is 'down', would bring down OSPFv3 session(s) with respective peer(s).",
                    enum: ['up', 'down'],
                  },
                  router_names: {
                    type: 'array',
                    description:
                      'The names of OSPFv3 routers for which the state has to be applied. An empty or null list will control all OSPFv3 routers.\n\nx-constraint:\n- /components/schemas/Ospfv3.RouterInstance/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          rocev2: {
            type: 'object',
            description: 'Sets state of configured RoCEv2 peers.',
            properties: {
              choice: {
                type: 'string',
                enum: ['peers'],
              },
              peers: {
                type: 'object',
                description: 'Sets state of configured RoCEv2 peers.',
                properties: {
                  state: {
                    type: 'string',
                    description:
                      "The desired state of RoCEv2 peer. If the desired state is 'up', underlying IP interface(s) would be brought up automatically (if not already up),\n would attempt to bring up the RoCEv2 session(s).\nIf the desired state is 'down', RoCEv2 session(s) would be brought down.",
                    enum: ['up', 'down'],
                  },
                  peer_names: {
                    type: 'array',
                    description:
                      'The names of RoCEv2 peers for which the state has to be applied. An empty or null list will control all RoCEv2 peers.\n\nx-constraint:\n- /components/schemas/Rocev2.V4Peer/properties/name\n- /components/schemas/Rocev2.V6Peer/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['state'],
              },
            },
            required: ['choice'],
          },
          route: {
            type: 'object',
            description: 'Sets the state of configured routes',
            properties: {
              state: {
                type: 'string',
                description: 'Route states',
                enum: ['withdraw', 'advertise'],
              },
              names: {
                type: 'array',
                description:
                  'The names of device route objects to control. If no names are specified then all route objects that match the x-constraint will be affected.\n\nx-constraint:\n- /components/schemas/Bgp.V4RouteRange/properties/name\n- /components/schemas/Bgp.V6RouteRange/properties/name\n- /components/schemas/Isis.V4RouteRange/properties/name\n- /components/schemas/Isis.V6RouteRange/properties/name\n- /components/schemas/Ospfv2.V4RouteRange/properties/name\n- /components/schemas/Ospfv3.V6RouteRange/properties/name\n',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['state'],
          },
        },
        required: ['choice'],
      },
      traffic: {
        type: 'object',
        description: 'States associated with configured flows',
        properties: {
          choice: {
            type: 'string',
            enum: ['flow_transmit'],
          },
          flow_transmit: {
            type: 'object',
            description: 'Provides state control of flow transmission.',
            properties: {
              state: {
                type: 'string',
                description:
                  "The transmit state.\nIf the value of the state property is 'start' then all flows defined by the 'flow_names' property will be started and the metric counters MUST be cleared prior to starting the flow(s).\nIf the value of the state property is 'stop' then all flows defined by the 'flow_names' property will be stopped and the metric counters MUST NOT be cleared.\nIf the value of the state property is 'pause' then all flows defined by the 'flow_names' property will be paused and the metric counters MUST NOT be cleared.\nIf the value of the state property is 'resume' then any paused flows defined by the 'flow_names' property will start transmit at the point at which they were paused. Any flow that is stopped will start transmit at the beginning of the flow. The flow(s) MUST NOT have their metric counters cleared.",
                enum: ['start', 'stop', 'pause', 'resume'],
              },
              flow_names: {
                type: 'array',
                description:
                  'The names of flows to which the transmit state will be applied to. If the list of flow_names is empty or null the state will be applied to all configured flows.\nIf the list is not empty any flow that is not included in the list of flow_names MUST be ignored and not included in the state change.\n\nx-constraint:\n- /components/schemas/Flow/properties/name\n',
                items: {
                  type: 'string',
                },
              },
            },
            required: ['state'],
          },
        },
        required: ['choice'],
      },
    },
  },
};

export const handler = (client: Devknot, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.control.setState(body);
};

export default { metadata, tool, handler };
