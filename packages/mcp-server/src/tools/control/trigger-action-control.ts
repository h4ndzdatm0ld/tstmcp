// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'devknot-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'control',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/control/action',
  operationId: 'set_control_action',
};

export const tool: Tool = {
  name: 'trigger_action_control',
  description: 'Triggers actions against configured resources.',
  inputSchema: {
    type: 'object',
    properties: {
      choice: {
        type: 'string',
        enum: ['protocol'],
      },
      protocol: {
        type: 'object',
        description: 'Actions associated with protocols on configured resources.',
        properties: {
          choice: {
            type: 'string',
            enum: ['ipv4', 'ipv6', 'bgp'],
          },
          bgp: {
            type: 'object',
            description: 'Actions associated with BGP on configured resources.',
            properties: {
              choice: {
                type: 'string',
                enum: ['notification', 'initiate_graceful_restart'],
              },
              initiate_graceful_restart: {
                type: 'object',
                description:
                  'Initiates BGP Graceful Restart process for the selected BGP peers. If no name is specified then Graceful Restart will be sent to all configured BGP peers. To emulate scenarios where a peer sends a Notification and stops the session, an optional Notification object is included. If the remote peer and the local peer are both configured to perform Graceful Restart for Notification triggered session , this will result in  Graceful Restart scenario to be triggered as per RFC8538.',
                properties: {
                  notification: {
                    type: 'object',
                    description:
                      'Send a Notification to the peer as per configured parameters when initially bringing down a session as per\nconfigured parameters.',
                    properties: {
                      cease: {
                        $ref: '#/$defs/cease_error',
                      },
                      choice: {
                        type: 'string',
                        description:
                          'Each BGP NOTIFICATION message includes an Error Code field indicating what type of problem occurred. For certain Error Codes, an Error  Subcode field provides additional details about the specific nature of the problem.  The choice value will provide the Error Code used in NOTIFICATION message.  The Subcode can be set for each of the corresponding errors except for Hold Timer Expired error and BGP Finite State Machine error.  In both of these cases Subcode 0 will be sent. If a user wants to use non zero Sub Code then custom choice can be used.',
                        enum: [
                          'cease',
                          'message_header_error',
                          'open_message_error',
                          'update_message_error',
                          'hold_timer_expired',
                          'finite_state_machine_error',
                          'custom',
                        ],
                      },
                      custom: {
                        $ref: '#/$defs/custom_error',
                      },
                      finite_state_machine_error: {
                        type: 'object',
                        description:
                          'Any error detected by the BGP Finite State Machine (e.g., receipt of an unexpected event) is indicated by  sending the NOTIFICATION message with the Error Code-Finite State Machine Error(Error Code 5). The Sub Code used is 0.  If a user wants to use non zero Sub Code then CustomError can be used.',
                      },
                      hold_timer_expired: {
                        type: 'object',
                        description:
                          'If a system does not receive successive KEEPALIVE, UPDATE, and/or NOTIFICATION messages within the period specified  in the Hold Time field of the OPEN message, then the NOTIFICATION message with the Hold Timer Expired Error Code(Error Code 4) is  sent and the BGP connection is closed. The Sub Code used is 0. If a user wants to use non zero Sub Code then CustomError can be used.',
                      },
                      message_header_error: {
                        $ref: '#/$defs/message_header_error',
                      },
                      open_message_error: {
                        $ref: '#/$defs/open_message_error',
                      },
                      update_message_error: {
                        $ref: '#/$defs/update_message_error',
                      },
                    },
                    required: [],
                  },
                  peer_names: {
                    type: 'array',
                    description:
                      'The names of device BGP peers objects to control.\n\nx-constraint:\n- /components/schemas/Bgp.V4Peer/properties/name\n- /components/schemas/Bgp.V6Peer/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                  restart_delay: {
                    type: 'integer',
                    description:
                      'Duration (in seconds) after which selected BGP peers will initiate \nGraceful restart by sending the Open Message with Restart State bit set in the Graceful Restart capability.',
                  },
                },
                required: [],
              },
              notification: {
                type: 'object',
                description:
                  'A NOTIFICATION message is sent when an error is detected with the BGP session, such as hold timer expiring, misconfigured AS number  or a BGP session reset is requested. This causes the BGP connection to close. Send explicit NOTIFICATIONs for list of specified  BGP peers. If a user wants to send custom Error Code and Error Subcode the custom object should be configured. A user can send IANA defined BGP NOTIFICATIONs according to https://www.iana.org/assignments/bgp-parameters/bgp-parameters.xhtml. ',
                properties: {
                  cease: {
                    $ref: '#/$defs/cease_error',
                  },
                  choice: {
                    type: 'string',
                    description:
                      'Each BGP NOTIFICATION message includes an Error Code field indicating what type of problem occurred. For certain Error Codes, an Error  Subcode field provides additional details about the specific nature of the problem.  The choice value will provide the Error Code used in NOTIFICATION message.  The Subcode can be set for each of the corresponding errors except for Hold Timer Expired error and BGP Finite State Machine error.  In both of these cases Subcode 0 will be sent. If a user wants to use non zero Sub Code then custom choice can be used.',
                    enum: [
                      'cease',
                      'message_header_error',
                      'open_message_error',
                      'update_message_error',
                      'hold_timer_expired',
                      'finite_state_machine_error',
                      'custom',
                    ],
                  },
                  custom: {
                    $ref: '#/$defs/custom_error',
                  },
                  finite_state_machine_error: {
                    type: 'object',
                    description:
                      'Any error detected by the BGP Finite State Machine (e.g., receipt of an unexpected event) is indicated by  sending the NOTIFICATION message with the Error Code-Finite State Machine Error(Error Code 5). The Sub Code used is 0.  If a user wants to use non zero Sub Code then CustomError can be used.',
                  },
                  hold_timer_expired: {
                    type: 'object',
                    description:
                      'If a system does not receive successive KEEPALIVE, UPDATE, and/or NOTIFICATION messages within the period specified  in the Hold Time field of the OPEN message, then the NOTIFICATION message with the Hold Timer Expired Error Code(Error Code 4) is  sent and the BGP connection is closed. The Sub Code used is 0. If a user wants to use non zero Sub Code then CustomError can be used.',
                  },
                  message_header_error: {
                    $ref: '#/$defs/message_header_error',
                  },
                  names: {
                    type: 'array',
                    description:
                      'The names of BGP Peers to send NOTIFICATION to. If no name is specified then NOTIFICATION will be sent to all configured BGP peers.\n\nx-constraint:\n- /components/schemas/Bgp.V4Peer/properties/name\n- /components/schemas/Bgp.V6Peer/properties/name\n',
                    items: {
                      type: 'string',
                    },
                  },
                  open_message_error: {
                    $ref: '#/$defs/open_message_error',
                  },
                  update_message_error: {
                    $ref: '#/$defs/update_message_error',
                  },
                },
                required: [],
              },
            },
            required: ['choice'],
          },
          ipv4: {
            type: 'object',
            description: 'Actions associated with IPv4 on configured resources.',
            properties: {
              choice: {
                type: 'string',
                enum: ['ping'],
              },
              ping: {
                type: 'object',
                description: 'Request for initiating ping between multiple source and destination pairs.',
                properties: {
                  requests: {
                    type: 'array',
                    description: 'List of IPv4 ping requests.',
                    items: {
                      type: 'object',
                      description:
                        'Under Review: Most ping request parameters are still TBD.\n\nRequest for initiating ping between a single source and destination pair.\nFor ping request, 1 IPv4 ICMP Echo Request shall be sent and wait for ping response to either succeed or time out. The API wait timeout for each request shall be 300ms.',
                      properties: {
                        dst_ip: {
                          type: 'string',
                          description: 'Destination IPv4 address to ping.',
                        },
                        src_name: {
                          type: 'string',
                          description:
                            'Name of source IPv4 interface to be used.\n\nx-constraint:\n- /components/schemas/Device.Ipv4/properties/name\n',
                        },
                      },
                      required: [],
                    },
                  },
                },
                required: [],
              },
            },
            required: ['choice'],
          },
          ipv6: {
            type: 'object',
            description: 'Actions associated with IPv6 on configured resources.',
            properties: {
              choice: {
                type: 'string',
                enum: ['ping'],
              },
              ping: {
                type: 'object',
                description: 'Request for initiating ping between multiple source and destination pairs.',
                properties: {
                  requests: {
                    type: 'array',
                    description: 'List of IPv6 ping requests.',
                    items: {
                      type: 'object',
                      description:
                        'Under Review: Most ping request parameters are still TBD.\n\nRequest for initiating ping between a single source and destination pair.\nFor ping request, 1 IPv6 ICMP Echo Request shall be sent and wait for ping response to either succeed or time out. The API wait timeout for each request shall be 300ms.',
                      properties: {
                        dst_ip: {
                          type: 'string',
                          description: 'Destination IPv6 address to ping.',
                        },
                        src_name: {
                          type: 'string',
                          description:
                            'Name of source IPv6 interface to be used.\n\nx-constraint:\n- /components/schemas/Device.Ipv6/properties/name\n',
                        },
                      },
                      required: [],
                    },
                  },
                },
                required: [],
              },
            },
            required: ['choice'],
          },
        },
        required: ['choice'],
      },
    },
    $defs: {
      cease_error: {
        type: 'object',
        description:
          "In the absence of any fatal errors, a BGP peer can close its BGP connection by sending the NOTIFICATION message with the  Error Code Cease. The 'hard_reset_code6_subcode9' subcode for Cease Notification can be used to signal a hard reset that will indicate that  Graceful Restart cannot be performed, even when Notification extensions to Graceful Restart procedure is supported.",
        properties: {
          subcode: {
            type: 'string',
            description: 'The Error Subcode to be sent to the peer in the Cease NOTIFICATION.',
            enum: [
              'max_number_prefix_reached_code6_subcode1',
              'admin_shutdown_code6_subcode2',
              'peer_deleted_code6_subcode3',
              'admin_reset_code6_subcode4',
              'connection_reject_code6_subcode5',
              'other_config_changes_code6_subcode6',
              'connection_collision_resolution_code6_subcode7',
              'out_of_resources_code6_subcode8',
              'bfd_session_down_code6_subcode10',
              'hard_reset_code6_subcode9',
            ],
          },
        },
        required: [],
      },
      custom_error: {
        type: 'object',
        description:
          'A BGP peer can send NOTIFICATION message with user defined Error Code and Error Subcode.',
        properties: {
          code: {
            type: 'integer',
            description: 'The Error code to be sent in the NOTIFICATION message to peer.',
          },
          subcode: {
            type: 'integer',
            description: 'The Error Subcode to be sent in the NOTIFICATION message to peer.',
          },
        },
        required: [],
      },
      message_header_error: {
        type: 'object',
        description:
          'All errors detected while processing the Message Header are indicated by sending the NOTIFICATION message  with the Error Code-Message Header Error. The Error Subcode elaborates on the specific nature of the error.',
        properties: {
          subcode: {
            type: 'string',
            description:
              'The Error Subcode indicates the specific type of error encountered during Message Header processing.',
            enum: [
              'connection_not_synchronized_code1_subcode1',
              'bad_message_length_code1_subcode2',
              'bad_message_type_code1_subcode3',
            ],
          },
        },
        required: [],
      },
      open_message_error: {
        type: 'object',
        description:
          'All errors detected while processing the OPEN message are indicated by sending the NOTIFICATION message  with the Error Code-Open Message Error. The Error Subcode elaborates on the specific nature of the error.',
        properties: {
          subcode: {
            type: 'string',
            description:
              'The Error Subcode indicates the specific type of error encountered during OPEN message processing.',
            enum: [
              'unsupported_version_number_code2_subcode1',
              'error_peer_as_code2_subcode2',
              'error_bgp_id_code2_subcode3',
              'unsupported_optional_parameter_code2_subcode4',
              'auth_failed_code2_subcode5',
              'unsupported_hold_time_code2_subcode6',
              'unsupported_capability_code2_subcode7',
            ],
          },
        },
        required: [],
      },
      update_message_error: {
        type: 'object',
        description:
          'All errors detected while processing the UPDATE message are indicated by sending the NOTIFICATION message  with the Error Code-Update Message Error. The Error Subcode elaborates on the specific nature of the error.',
        properties: {
          subcode: {
            type: 'string',
            description:
              'The Error Subcode, the specific type of error encountered during UPDATE processing.',
            enum: [
              'malformed_attrib_list_code3_subcode1',
              'unrecognized_wellknown_attrib_code3_subcode2',
              'wellknown_attrib_missing_code3_subcode3',
              'attrib_flags_error_code3_subcode4',
              'attrib_length_error_code3_subcode5',
              'invalid_origin_attrib_code3_subcode6',
              'as_routing_loop_code3_subcode7',
              'invalid_nhop_attrib_code3_subcode8',
              'error_optional_attrib_code3_subcode9',
              'invalid_network_field_code3_subcode10',
              'abnormal_aspath_code3_subcode11',
            ],
          },
        },
        required: [],
      },
    },
  },
};

export const handler = async (client: Devknot, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.control.triggerAction(body));
};

export default { metadata, tool, handler };
