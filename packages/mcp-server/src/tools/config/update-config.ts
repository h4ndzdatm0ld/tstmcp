// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Devknot from 'devknot';

export const metadata: Metadata = {
  resource: 'config',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/config',
  operationId: 'update_config',
};

export const tool: Tool = {
  name: 'update_config',
  description:
    'Updates specific attributes of resources configured on the traffic generator. The fetched configuration shall reflect the updates applied successfully.\nThe Response.Warnings in the Success response is available for implementers to disclose additional information about a state change including any implicit changes that are outside the scope of the state change.',
  inputSchema: {
    type: 'object',
    properties: {
      choice: {
        type: 'string',
        enum: ['flows'],
      },
      flows: {
        type: 'object',
        description:
          'A container of flows with associated properties to be updated without affecting the flows current transmit state.',
        properties: {
          flows: {
            type: 'array',
            description: 'The list of configured flows for which given property will be updated.',
            items: {
              $ref: '#/$defs/flow',
            },
          },
          property_names: {
            type: 'array',
            description: 'Flow properties to be updated without affecting the transmit state.',
            items: {
              type: 'string',
              enum: ['rate', 'size'],
            },
          },
        },
        required: ['flows', 'property_names'],
      },
    },
    $defs: {
      flow: {
        type: 'object',
        description: 'A high level data plane traffic flow.',
        properties: {
          name: {
            type: 'string',
            description:
              'Globally unique name of an object. It also serves as the primary key for arrays of objects.',
          },
          tx_rx: {
            type: 'object',
            description: 'The transmit and receive endpoints.',
            properties: {
              choice: {
                type: 'string',
                description: 'The type of transmit and receive container used by the flow.',
                enum: ['port', 'device'],
              },
              device: {
                type: 'object',
                description:
                  'A container for declaring a map of 1..n transmit devices to 1..n receive devices. This allows for a single flow to have  different tx to rx device flows such as a single one to one map or a  many to many map.',
                properties: {
                  rx_names: {
                    type: 'array',
                    description:
                      'TBD\n\nx-constraint:\n- /components/schemas/Device.Ethernet/properties/name\n- /components/schemas/Device.Ipv4/properties/name\n- /components/schemas/Device.Ipv6/properties/name\n- /components/schemas/Bgp.V4RouteRange/properties/name\n- /components/schemas/Bgp.V6RouteRange/properties/name\n- /components/schemas/Bgp.CMacIpRange/properties/name\n- /components/schemas/Rsvp.LspIpv4Interface.P2PEgressIpv4Lsp/properties/name\n- /components/schemas/Isis.V4RouteRange/properties/name\n- /components/schemas/Isis.V6RouteRange/properties/name\n- /components/schemas/Device.Dhcpv4client/properties/name\n- /components/schemas/Ospfv2.V4RouteRange/properties/name\n- /components/schemas/Ospfv3.V6RouteRange/properties/name\n- /components/schemas/Device.Dhcpv6client/properties/name\n',
                    items: {
                      type: 'string',
                      description: 'The unique name of an emulated device that will be receiving.',
                    },
                  },
                  tx_names: {
                    type: 'array',
                    description:
                      'TBD\n\nx-constraint:\n- /components/schemas/Device.Ethernet/properties/name\n- /components/schemas/Device.Ipv4/properties/name\n- /components/schemas/Device.Ipv6/properties/name\n- /components/schemas/Bgp.V4RouteRange/properties/name\n- /components/schemas/Bgp.V6RouteRange/properties/name\n- /components/schemas/Bgp.CMacIpRange/properties/name\n- /components/schemas/Rsvp.LspIpv4Interface.P2PIngressIpv4Lsp/properties/name\n- /components/schemas/Isis.V4RouteRange/properties/name\n- /components/schemas/Isis.V6RouteRange/properties/name\n- /components/schemas/Ospfv2.V4RouteRange/properties/name\n- /components/schemas/Ospfv3.V6RouteRange/properties/name\n- /components/schemas/Device.Dhcpv4client/properties/name\n- /components/schemas/Device.Dhcpv6client/properties/name\n',
                    items: {
                      type: 'string',
                      description: 'The unique name of an emulated device that will be transmitting.',
                    },
                  },
                  mode: {
                    type: 'string',
                    description:
                      'Determines the intent of creating traffic sub-flow(s) between the device \nendpoints, from the entities of <b>tx_names</b> to the entities of <b>rx_names</b> \nto derive how <b>auto</b> packet fields can be populated with \nthe actual value(s) by the implementation.\n\nThe <b>one_to_one</b> mode creates traffic sub-flow(s) between each device endpoint pair in \ntx_names to rx_names by index.\nThe length of tx_names and rx_names MUST be the same.\nThe same device name can be repeated multiple times in tx_names or rx_names, in any order to create desired meshing between device(s).\nFor 2 values in tx_names and 2 values in rx_names, 2 device endpoint pairs would be generated (each pair representing a traffic sub-flow).\n\nThe <b>mesh</b> mode creates traffic sub-flow(s) between each value in tx_names to\nevery value in rx_names, forming the device endpoint pair(s).\nFor 2 values in tx_names and 3 values in rx_names, generated device endpoint pairs would be 2x3=6. \n\nA generated device endpoint pair with same device endpoint name for both transmit & receive device endpoint MUST raise an error.\n\nPacket fields of type <b>auto</b> would be populated with one value for each device endpoint pair (representing the traffic sub-flow). \nThe value would be determined considering transmit & receive device of the sub-flow. And the sequence of the populated value(s) \nwould be in the order of generated device endpoint pair(s).\nIf 2 device endpoint pairs are generated (based on mode, tx_names and rx_names), say (d1 to d3) and (d2 to d3), and ethernet.dst is set as <b>auto</b>, then \nthe auto field would be <b>replaced</b> by the implementation with a sequence of 2 values, [v1,v2] where \nv1 is determined using context (d1,d3) and v2 using context (d2,d3).\nThe final outcome is that packets generated on the wire will contain the values v1,v2,v1,... for ethernet.dst field. Any non-auto packet fields \nshould be configured accordingly. For example, non-auto packet field ethernet.src can be configured with values [u1, u2], where \nu1 & u2 are source MAC of the connected interface of device d1 and d2 respectively. Then packets on the wire will contain correct value pairs \n(u1,v1),(u2,v2),(u1,v1),... for (ethernet.src,ethernet.dst) fields.',
                    enum: ['mesh', 'one_to_one'],
                  },
                },
                required: ['rx_names', 'tx_names'],
              },
              port: {
                type: 'object',
                description:
                  "A container for a transmit port and 0..n intended receive ports.\nWhen assigning this container to a flow the flows's \npacket headers will not be populated with any address resolution \ninformation such as source and/or destination addresses. \nFor example Flow.Ethernet dst mac address values will be defaulted to 0. \nFor full control over the Flow.properties.packet header contents use this \ncontainer. ",
                properties: {
                  tx_name: {
                    type: 'string',
                    description:
                      'The unique name of a port that is the transmit port.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n- /components/schemas/Lag/properties/name\n',
                  },
                  rx_name: {
                    type: 'string',
                    description:
                      'Deprecated: This property is deprecated in favor of property rx_names\n\nThe unique name of a port that is the intended receive port.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n- /components/schemas/Lag/properties/name\n',
                  },
                  rx_names: {
                    type: 'array',
                    description:
                      'Unique name of ports or lags that are intended receive endpoints.\n\nx-constraint:\n- /components/schemas/Port/properties/name\n- /components/schemas/Lag/properties/name\n',
                    items: {
                      type: 'string',
                      description: 'The unique name of a port or lag that is the intended receive port.',
                    },
                  },
                },
                required: ['tx_name'],
              },
            },
            required: [],
          },
          duration: {
            type: 'object',
            description: 'The transmit duration of the packets.',
            properties: {
              burst: {
                type: 'object',
                description:
                  'Transmits continuous or fixed burst of packets. \nFor continuous burst of packets, it will not automatically stop.\nFor fixed burst of packets, it will stop after transmitting fixed number of bursts.      ',
                properties: {
                  bursts: {
                    type: 'integer',
                    description:
                      'The number of packet bursts transmitted per flow.\nA value of 0 implies continuous burst of packets.',
                  },
                  gap: {
                    type: 'integer',
                    description: 'The minimum gap between packets expressed as bytes.',
                  },
                  inter_burst_gap: {
                    type: 'object',
                    description: 'The optional container for specifying a gap between bursts.',
                    properties: {
                      bytes: {
                        type: 'number',
                        description:
                          'The amount of time between bursts expressed in bytes.\nA value of 0 indicates no gap between bursts.',
                      },
                      choice: {
                        type: 'string',
                        description: 'The type of inter burst gap units.',
                        enum: ['bytes', 'nanoseconds', 'microseconds'],
                      },
                      microseconds: {
                        type: 'number',
                        description:
                          'The amount of time between bursts expressed in microseconds.\nA value of 0 indicates no gap between bursts.',
                      },
                      nanoseconds: {
                        type: 'number',
                        description:
                          'The amount of time between bursts expressed in nanoseconds.\nA value of 0 indicates no gap between bursts.',
                      },
                    },
                    required: [],
                  },
                  packets: {
                    type: 'integer',
                    description: 'The number of packets transmitted per burst.',
                  },
                },
                required: [],
              },
              choice: {
                type: 'string',
                description: 'A choice used to determine the type of duration.',
                enum: ['fixed_packets', 'fixed_seconds', 'burst', 'continuous'],
              },
              continuous: {
                type: 'object',
                description: 'Transmit will be continuous and will not stop automatically. ',
                properties: {
                  delay: {
                    $ref: '#/$defs/flow_delay',
                  },
                  gap: {
                    type: 'integer',
                    description: 'The minimum gap between packets expressed as bytes.',
                  },
                },
                required: [],
              },
              fixed_packets: {
                type: 'object',
                description: 'Transmit a fixed number of packets after which the flow will stop.',
                properties: {
                  delay: {
                    $ref: '#/$defs/flow_delay',
                  },
                  gap: {
                    type: 'integer',
                    description: 'The minimum gap between packets expressed as bytes.',
                  },
                  packets: {
                    type: 'integer',
                    description: 'Stop transmit of the flow after this number of packets.',
                  },
                },
                required: [],
              },
              fixed_seconds: {
                type: 'object',
                description: 'Transmit for a fixed number of seconds after which the flow will stop.',
                properties: {
                  delay: {
                    $ref: '#/$defs/flow_delay',
                  },
                  gap: {
                    type: 'integer',
                    description: 'The minimum gap between packets expressed as bytes.',
                  },
                  seconds: {
                    type: 'number',
                    description: 'Stop transmit of the flow after this number of seconds.',
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          egress_packet: {
            type: 'array',
            description:
              'Under Review: The packet header schema for egress tracking currently exposes unwanted fields. The query structure for tagged metrics inside flows metrics requires documenting expected response format.\n\nThe list of protocol headers defining the shape of all \nintended packets in corresponding flow as it is received\nby traffic-generator port.\n\nFor all protocol headers, only the `metric_tags` property is configurable.',
            items: {
              $ref: '#/$defs/flow_header',
            },
          },
          metrics: {
            type: 'object',
            description: 'Flow metrics. ',
            properties: {
              enable: {
                type: 'boolean',
                description:
                  'Enables flow metrics.\nEnabling this option may affect the resultant packet payload due to \nadditional instrumentation data.',
              },
              latency: {
                type: 'object',
                description: 'Latency metrics.',
                properties: {
                  enable: {
                    type: 'boolean',
                    description:
                      'True to enable latency metrics using timestamps.\n\nEnabling this option may affect the resultant packet payload due to \nadditional instrumentation data.',
                  },
                  mode: {
                    type: 'string',
                    description:
                      'Select the type of latency measurement. The different types of \nlatency measurements are:\n\n\nstore_forward:\nThe time interval starting when the last bit of the frame leaves the\nsending port and ending when the first bit of the frame is seen on\nthe receiving port (LIFO).  This is based on the RFC 1242 standard.\n\n\ncut_through:\nThe time interval starting when the first bit of the frame leaves\nthe sending port and ending when the first bit of the frame is seen\non the receiving port (FIFO).  This is based on the RFC 1242 \nstandard.',
                    enum: ['store_forward', 'cut_through'],
                  },
                },
                required: [],
              },
              loss: {
                type: 'boolean',
                description: 'Enables additional flow metric loss calculation.',
              },
              predefined_metric_tags: {
                type: 'object',
                description: 'Predefined metric tags',
                properties: {
                  rx_name: {
                    type: 'boolean',
                    description:
                      'Enables Rx port or lag level disaggregation with predefined metrics tag name set as "rx_name".\nThe Rx port / lag names can be found under tagged_metrics tag names in flow metrics response.',
                  },
                },
                required: [],
              },
              rx_tx_ratio: {
                type: 'object',
                description: 'Rx Tx ratio.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['rx_count', 'value'],
                  },
                  rx_count: {
                    type: 'object',
                    description:
                      'This is for cases where one copy of Tx packet is received on all Rx ports and so the sum total of Rx packets\nreceived across all Rx ports is a multiple of Rx port count and Tx packets.',
                  },
                  value: {
                    type: 'number',
                    description:
                      'Should be a positive, non-zero value. The default value of 1, is when the Rx packet count across\nall ports is expected to match the Tx packet count. A custom integer value (>1) can be specified for\nloss calculation for cases when there are multiple destination addresses configured within one flow,\nbut DUT is configured to replicate only to a subset of Rx ports. For cases when Tx side generates two\npackets from each source in 1:1 protection mode but only one of the two packets are received by the\nRx port, we may need to specify a fractional value instead.',
                  },
                },
                required: [],
              },
              timestamps: {
                type: 'boolean',
                description: 'Enables additional flow metric first and last timestamps.',
              },
            },
            required: [],
          },
          packet: {
            type: 'array',
            description:
              'The list of protocol headers defining the shape of all \nintended packets in corresponding flow as it is transmitted\nby traffic-generator port.\n\nThe order of protocol headers assigned to the list is the\norder they will appear on the wire.\n\nIn the case of an empty list the keyword/value of minItems: 1 \nindicates that an implementation MUST provide at least one \nFlow.Header object.\n\nThe default value for the Flow.Header choice property is ethernet \nwhich will result in an implementation by default providing at least \none ethernet packet header.',
            items: {
              $ref: '#/$defs/flow_header',
            },
          },
          rate: {
            type: 'object',
            description: 'The transmit rate of the packets.',
            properties: {
              bps: {
                type: 'integer',
                description: 'Bits per second.',
              },
              choice: {
                type: 'string',
                description: 'The available types of flow rate.',
                enum: ['pps', 'bps', 'kbps', 'mbps', 'gbps', 'percentage'],
              },
              gbps: {
                type: 'integer',
                description: 'Gigabits per second.',
              },
              kbps: {
                type: 'integer',
                description: 'Kilobits per second.',
              },
              mbps: {
                type: 'integer',
                description: 'Megabits per second. ',
              },
              percentage: {
                type: 'number',
                description: "The percentage of a port location's available bandwidth.",
              },
              pps: {
                type: 'integer',
                description: 'Packets per second.',
              },
            },
            required: [],
          },
          size: {
            type: 'object',
            description: 'The size of the packets.',
            properties: {
              choice: {
                type: 'string',
                enum: ['fixed', 'increment', 'random', 'weight_pairs'],
              },
              fixed: {
                type: 'integer',
              },
              increment: {
                type: 'object',
                description:
                  'Frame size that increments from a starting size to \nan ending size incrementing by a step size.',
                properties: {
                  end: {
                    type: 'integer',
                    description: 'Ending frame size in bytes',
                  },
                  start: {
                    type: 'integer',
                    description: 'Starting frame size in bytes',
                  },
                  step: {
                    type: 'integer',
                    description: 'Step frame size in bytes',
                  },
                },
                required: [],
              },
              random: {
                type: 'object',
                description: 'Random frame size from a min value to a max value.',
                properties: {
                  max: {
                    type: 'integer',
                  },
                  min: {
                    type: 'integer',
                  },
                },
                required: [],
              },
              weight_pairs: {
                type: 'object',
                description:
                  'Frame size distribution, defined as <size, weight> pairs (including IMIX distribution).\nFrames are randomly generated such that the proportion of each frame size out of the total number of frames \nare matching with the weight value of the <size, weight> pair. However, as with any other probability \ndistribution, the sample distribution is close to theoretical value only if the size of the sample is reasonably large. \nWhen the number of frames is very low the transmitted frames may not come close to the ratio described in the weight.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['predefined', 'custom'],
                  },
                  custom: {
                    type: 'array',
                    items: {
                      type: 'object',
                      description: 'Custom frame size distribution <size, weight> pair.',
                      properties: {
                        size: {
                          type: 'integer',
                          description: 'The size of the frame (in bytes) for this weight pair.',
                        },
                        weight: {
                          type: 'number',
                          description:
                            'Weight assigned to the corresponding frame size in this weight pair. \nHigher weight means more packets.',
                        },
                      },
                      required: [],
                    },
                  },
                  predefined: {
                    type: 'string',
                    description:
                      'Specify predefined frame size distribution <size, weight> pairs (including IMIX distribution).  \nThe available predefined distribution pairs are:\n- IMIX (64:7, 570:4, and 1518:1)  \n- IPSec IMIX (90:58.67, 92:2, 594:23.66 and 1418:15.67)  \n- IPv6 IMIX (60:58.67, 496:2, 594:23.66 and 1518:15.67)  \n- Standard IMIX (58:58.67, 62:2, 594:23.66 and 1518:15.67)  \n- TCP IMIX (90:58.67, 92:2, 594:23.66 and 1518:15.67)',
                    enum: ['imix', 'ipsec_imix', 'ipv6_imix', 'standard_imix', 'tcp_imix'],
                  },
                },
                required: [],
              },
            },
            required: [],
          },
        },
        required: ['name', 'tx_rx'],
      },
      flow_delay: {
        type: 'object',
        description: 'The optional container to specify the delay before starting \ntransmission of packets.',
        properties: {
          bytes: {
            type: 'number',
            description:
              'The delay before starting transmission of packets.\nA value of 0 indicates no delay.',
          },
          choice: {
            type: 'string',
            enum: ['bytes', 'nanoseconds', 'microseconds'],
          },
          microseconds: {
            type: 'number',
            description:
              'The delay before starting transmission of packets.\nA value of 0 indicates no delay.',
          },
          nanoseconds: {
            type: 'number',
            description:
              'The delay before starting transmission of packets.\nA value of 0 indicates no delay.',
          },
        },
        required: [],
      },
      flow_header: {
        type: 'object',
        description: 'Configuration for all traffic packet headers',
        properties: {
          arp: {
            type: 'object',
            description: 'ARP packet header',
            properties: {
              hardware_length: {
                type: 'object',
                description: 'Length (in octets) of a hardware address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_hardware_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_hardware_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              hardware_type: {
                type: 'object',
                description: 'Network link protocol type',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_hardware_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_hardware_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              operation: {
                type: 'object',
                description: 'The operation that the sender is performing',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_operation_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_operation_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              protocol_length: {
                type: 'object',
                description: 'Length (in octets) of internetwork addresses',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_protocol_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_protocol_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              protocol_type: {
                type: 'object',
                description: 'The internetwork protocol for which the ARP request is intended',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_protocol_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_protocol_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              sender_hardware_addr: {
                type: 'object',
                description: 'Media address of the sender',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_sender_hardware_addr_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_sender_hardware_addr_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              sender_protocol_addr: {
                type: 'object',
                description: 'Internetwork address of the sender',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_sender_protocol_addr_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_sender_protocol_addr_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              target_hardware_addr: {
                type: 'object',
                description: 'Media address of the target',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_target_hardware_addr_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_target_hardware_addr_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              target_protocol_addr: {
                type: 'object',
                description: 'Internetwork address of the target',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_arp_target_protocol_addr_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_arp_target_protocol_addr_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          choice: {
            type: 'string',
            description:
              'The available types of flow headers. If one is not provided the \ndefault ethernet packet header MUST be provided.',
            enum: [
              'custom',
              'ethernet',
              'vlan',
              'vxlan',
              'ipv4',
              'ipv6',
              'pfcpause',
              'ethernetpause',
              'tcp',
              'udp',
              'gre',
              'gtpv1',
              'gtpv2',
              'arp',
              'icmp',
              'icmpv6',
              'ppp',
              'igmpv1',
              'mpls',
              'snmpv2c',
              'rsvp',
              'macsec',
            ],
          },
          custom: {
            type: 'object',
            description: 'Custom packet header',
            properties: {
              bytes: {
                type: 'string',
                description:
                  'A custom packet header defined as a string of hex bytes. The string MUST contain sequence of valid hex bytes. Spaces or colons can be part of the bytes but will be discarded. This packet header can be used in multiple places in the packet.',
              },
              metric_tags: {
                type: 'array',
                description:
                  'One or more metric tags can be used to enable tracking portion of or all bits\nin a corresponding header field for metrics per each applicable value.\nThese would appear as tagged metrics in corresponding flow metrics.',
                items: {
                  type: 'object',
                  description:
                    'Metric Tag can be used to enable tracking portion of or all bits\nin a corresponding header field for metrics per each applicable value.\nThese would appear as tagged metrics in corresponding flow metrics.',
                  properties: {
                    name: {
                      type: 'string',
                      description:
                        'Name used to identify the metrics associated with the values applicable\nfor configured offset and length inside corresponding header field',
                    },
                    length: {
                      type: 'integer',
                      description:
                        'Number of bits to track for metrics starting from configured offset\nof corresponding header field',
                    },
                    offset: {
                      type: 'integer',
                      description: 'Offset in bits relative to start of corresponding header field',
                    },
                  },
                  required: ['name'],
                },
              },
            },
            required: ['bytes'],
          },
          ethernet: {
            type: 'object',
            description: 'Ethernet packet header',
            properties: {
              dst: {
                type: 'object',
                description: 'Destination MAC address',
                properties: {
                  auto: {
                    type: 'string',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_dst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_dst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              ether_type: {
                type: 'object',
                description: 'Ethernet type',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_ether_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_ether_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pfc_queue: {
                type: 'object',
                description: 'Priority flow control queue',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pfc_queue_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pfc_queue_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src: {
                type: 'object',
                description: 'Source MAC address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_src_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_src_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          ethernetpause: {
            type: 'object',
            description: 'IEEE 802.3x global ethernet pause packet header',
            properties: {
              control_op_code: {
                type: 'object',
                description: 'Control operation code',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_control_op_code_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_control_op_code_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              dst: {
                type: 'object',
                description: 'Destination MAC address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_dst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_dst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              ether_type: {
                type: 'object',
                description: 'Ethernet type',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_ether_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_ether_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src: {
                type: 'object',
                description: 'Source MAC address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_src_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_src_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              time: {
                type: 'object',
                description: 'Time',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_time_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ethernet_pause_time_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          gre: {
            type: 'object',
            description: 'Standard GRE packet header (RFC2784)',
            properties: {
              checksum: {
                type: 'object',
                description:
                  'Optional checksum of GRE header and payload. Only present if the checksum_present bit is set.',
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              checksum_present: {
                type: 'object',
                description: 'Checksum present bit',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gre_checksum_present_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gre_checksum_present_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              protocol: {
                type: 'object',
                description: 'Protocol type of encapsulated payload',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'auto'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gre_protocol_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gre_protocol_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved0: {
                type: 'object',
                description: 'Reserved bits',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gre_reserved0_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gre_reserved0_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved1: {
                type: 'object',
                description: 'Optional reserved field. Only present if the checksum_present bit is set.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gre_reserved1_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gre_reserved1_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'GRE version number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gre_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gre_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          gtpv1: {
            type: 'object',
            description: 'GTPv1 packet header',
            properties: {
              e_flag: {
                type: 'object',
                description: 'Extension header field present',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_e_flag_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_e_flag_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              extension_headers: {
                type: 'array',
                description: 'A list of optional extension headers.',
                items: {
                  type: 'object',
                  properties: {
                    contents: {
                      type: 'object',
                      description: 'The extension header contents',
                      properties: {
                        choice: {
                          type: 'string',
                          enum: ['value', 'values', 'increment', 'decrement'],
                        },
                        decrement: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_contents_counter',
                        },
                        increment: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_contents_counter',
                        },
                        metric_tags: {
                          type: 'array',
                          description:
                            'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          items: {
                            type: 'object',
                            description:
                              'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            properties: {
                              name: {
                                type: 'string',
                                description:
                                  'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                              },
                              length: {
                                type: 'integer',
                                description:
                                  'Number of bits to track for metrics starting from configured offset of corresponding header field',
                              },
                              offset: {
                                type: 'integer',
                                description: 'Offset in bits relative to start of corresponding header field',
                              },
                            },
                            required: ['name'],
                          },
                        },
                        value: {
                          type: 'integer',
                        },
                        values: {
                          type: 'array',
                          items: {
                            type: 'integer',
                          },
                        },
                      },
                      required: [],
                    },
                    extension_length: {
                      type: 'object',
                      description:
                        'This field states the length of this extension header,  including the length, the contents, and the next extension header field, in 4-octet units, so the length of the extension must  always be a multiple of 4.',
                      properties: {
                        choice: {
                          type: 'string',
                          enum: ['value', 'values', 'increment', 'decrement'],
                        },
                        decrement: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_extension_length_counter',
                        },
                        increment: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_extension_length_counter',
                        },
                        metric_tags: {
                          type: 'array',
                          description:
                            'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          items: {
                            type: 'object',
                            description:
                              'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            properties: {
                              name: {
                                type: 'string',
                                description:
                                  'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                              },
                              length: {
                                type: 'integer',
                                description:
                                  'Number of bits to track for metrics starting from configured offset of corresponding header field',
                              },
                              offset: {
                                type: 'integer',
                                description: 'Offset in bits relative to start of corresponding header field',
                              },
                            },
                            required: ['name'],
                          },
                        },
                        value: {
                          type: 'integer',
                        },
                        values: {
                          type: 'array',
                          items: {
                            type: 'integer',
                          },
                        },
                      },
                      required: [],
                    },
                    next_extension_header: {
                      type: 'object',
                      description:
                        'It states the type of the next extension, or 0 if no next  extension exists.  This permits chaining several next extension headers.',
                      properties: {
                        choice: {
                          type: 'string',
                          enum: ['value', 'values', 'increment', 'decrement'],
                        },
                        decrement: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_next_extension_header_counter',
                        },
                        increment: {
                          $ref: '#/$defs/pattern_flow_gtp_extension_next_extension_header_counter',
                        },
                        metric_tags: {
                          type: 'array',
                          description:
                            'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          items: {
                            type: 'object',
                            description:
                              'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            properties: {
                              name: {
                                type: 'string',
                                description:
                                  'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                              },
                              length: {
                                type: 'integer',
                                description:
                                  'Number of bits to track for metrics starting from configured offset of corresponding header field',
                              },
                              offset: {
                                type: 'integer',
                                description: 'Offset in bits relative to start of corresponding header field',
                              },
                            },
                            required: ['name'],
                          },
                        },
                        value: {
                          type: 'integer',
                        },
                        values: {
                          type: 'array',
                          items: {
                            type: 'integer',
                          },
                        },
                      },
                      required: [],
                    },
                  },
                  required: [],
                },
              },
              message_length: {
                type: 'object',
                description:
                  'The length of the payload (the bytes following the mandatory 8-byte GTP header) in bytes that includes any optional fields',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_message_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_message_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              message_type: {
                type: 'object',
                description:
                  'The type of GTP message Different types of messages are defined in 3GPP TS 29.060 section 7.1',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_message_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_message_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              n_pdu_number: {
                type: 'object',
                description:
                  'N-PDU number. Exists if any of the e_flag, s_flag, or pn_flag bits are on.  Must be interpreted only if the pn_flag bit is on.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_n_pdu_number_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_n_pdu_number_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              next_extension_header_type: {
                type: 'object',
                description:
                  'Next extension header. Exists if any of the e_flag, s_flag, or pn_flag bits are on.  Must be interpreted only if the e_flag bit is on.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_next_extension_header_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_next_extension_header_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pn_flag: {
                type: 'object',
                description: 'N-PDU field present',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_pn_flag_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_pn_flag_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              protocol_type: {
                type: 'object',
                description: "Protocol type, GTP is 1, GTP' is 0",
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_protocol_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_protocol_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved: {
                type: 'object',
                description: 'Reserved field',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_reserved_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_reserved_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              s_flag: {
                type: 'object',
                description: 'Sequence number field present',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_s_flag_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_s_flag_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              squence_number: {
                type: 'object',
                description:
                  'Sequence number. Exists if any of the e_flag, s_flag, or pn_flag bits are on.  Must be interpreted only if the s_flag bit is on.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_squence_number_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_squence_number_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              teid: {
                type: 'object',
                description:
                  'Tunnel endpoint identifier (TEID) used to multiplex connections in the same GTP tunnel',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_teid_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_teid_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'GTPv1 version',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv1_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv1_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          gtpv2: {
            type: 'object',
            description: 'GTPv2 packet header',
            properties: {
              message_length: {
                type: 'object',
                description:
                  'A 16-bit field that indicates the length of the payload in bytes, excluding the mandatory GTP-c header (first 4 bytes). Includes the TEID and sequence_number if they are present.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_message_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_message_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              message_type: {
                type: 'object',
                description:
                  'An 8-bit field that indicates the type of GTP message. Different types of messages are defined in 3GPP TS 29.060 section 7.1',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_message_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_message_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              piggybacking_flag: {
                type: 'object',
                description:
                  'If piggybacking_flag is set to 1 then another GTP-C message with its own header shall be present at the end of the current message',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_piggybacking_flag_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_piggybacking_flag_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              sequence_number: {
                type: 'object',
                description: 'The sequence number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_sequence_number_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_sequence_number_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              spare1: {
                type: 'object',
                description: 'A 3-bit reserved field (must be 0).',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_spare1_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_spare1_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              spare2: {
                type: 'object',
                description: 'Reserved field',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_spare2_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_spare2_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              teid: {
                type: 'object',
                description:
                  'Tunnel endpoint identifier. A 32-bit (4-octet) field used to multiplex different connections in the same GTP tunnel. Is present only if the teid_flag is set.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_teid_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_teid_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              teid_flag: {
                type: 'object',
                description:
                  'If teid_flag is set to 1 then the TEID field will be present  between the message length and the sequence number. All messages except Echo and Echo reply require TEID to be present',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_teid_flag_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_teid_flag_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'Version number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_gtpv2_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_gtpv2_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          icmp: {
            type: 'object',
            description: 'ICMP packet header',
            properties: {
              choice: {
                type: 'string',
                enum: ['echo'],
              },
              echo: {
                type: 'object',
                description: 'Packet Header for ICMP echo request',
                properties: {
                  checksum: {
                    type: 'object',
                    description: 'ICMP checksum',
                    properties: {
                      choice: {
                        type: 'string',
                        description: 'The type of checksum',
                        enum: ['generated', 'custom'],
                      },
                      custom: {
                        type: 'integer',
                        description: 'A custom checksum value',
                      },
                      generated: {
                        type: 'string',
                        description: 'A system generated checksum value',
                        enum: ['good', 'bad'],
                      },
                    },
                    required: [],
                  },
                  code: {
                    type: 'object',
                    description: 'The ICMP subtype.  The default code for ICMP echo request and reply is 0.',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_code_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_code_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  identifier: {
                    type: 'object',
                    description: 'ICMP identifier',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_identifier_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_identifier_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  sequence_number: {
                    type: 'object',
                    description: 'ICMP sequence number',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_sequence_number_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_sequence_number_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  type: {
                    type: 'object',
                    description: 'The type of ICMP echo packet',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_type_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmp_echo_type_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          icmpv6: {
            type: 'object',
            description: 'ICMPv6 packet header',
            properties: {
              choice: {
                type: 'string',
                enum: ['echo'],
              },
              echo: {
                type: 'object',
                description: 'Packet Header for ICMPv6 Echo',
                properties: {
                  checksum: {
                    type: 'object',
                    description: 'ICMPv6 checksum',
                    properties: {
                      choice: {
                        type: 'string',
                        description: 'The type of checksum',
                        enum: ['generated', 'custom'],
                      },
                      custom: {
                        type: 'integer',
                        description: 'A custom checksum value',
                      },
                      generated: {
                        type: 'string',
                        description: 'A system generated checksum value',
                        enum: ['good', 'bad'],
                      },
                    },
                    required: [],
                  },
                  code: {
                    type: 'object',
                    description: 'ICMPv6 echo sub type',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_code_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_code_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  identifier: {
                    type: 'object',
                    description: 'ICMPv6 echo identifier',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_identifier_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_identifier_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  sequence_number: {
                    type: 'object',
                    description: 'ICMPv6 echo sequence number',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_sequence_number_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_sequence_number_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  type: {
                    type: 'object',
                    description: 'ICMPv6 echo type',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_type_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_icmpv6_echo_type_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          igmpv1: {
            type: 'object',
            description: 'IGMPv1 packet header',
            properties: {
              checksum: {
                type: 'object',
                description: 'Checksum',
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              group_address: {
                type: 'object',
                description: 'Group address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_igmpv1_group_address_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_igmpv1_group_address_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              type: {
                type: 'object',
                description: 'Type of message',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_igmpv1_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_igmpv1_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              unused: {
                type: 'object',
                description: 'Unused',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_igmpv1_unused_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_igmpv1_unused_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'Version number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_igmpv1_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_igmpv1_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          ipv4: {
            type: 'object',
            description: 'IPv4 packet header',
            properties: {
              dont_fragment: {
                type: 'object',
                description:
                  'Dont fragment flag If the dont_fragment flag is set and fragmentation is required to route the packet then the packet is dropped.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_dont_fragment_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_dont_fragment_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              dst: {
                type: 'object',
                description: 'Destination address',
                properties: {
                  auto: {
                    $ref: '#/$defs/flow_ipv4_auto',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'auto', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_dst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_dst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'ipv4 random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'string',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'string',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              fragment_offset: {
                type: 'object',
                description: 'Fragment offset',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_fragment_offset_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_fragment_offset_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              header_checksum: {
                type: 'object',
                description: 'Header checksum',
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              header_length: {
                type: 'object',
                description: 'Header length',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_header_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_header_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              identification: {
                type: 'object',
                description: 'Identification',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_identification_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_identification_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              more_fragments: {
                type: 'object',
                description: 'More fragments flag',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_more_fragments_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_more_fragments_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              options: {
                type: 'array',
                items: {
                  type: 'object',
                  description:
                    'IPv4 options are optional extensions for the IPv4 header that can be utilised to provide additional information about the IPv4 datagram.  It is encoded as a series of type, length and value attributes.  The IP header length MUST be increased to accommodate the extra bytes needed to encode the IP options. The length of the all options included to a IPv4 header should not exceed 40 bytes since IPv4 Header length (4 bits) can at max specify 15 4-word octets for a total of 60 bytes which includes 20 bytes needed for mandatory attributes of the IPv4 header. If the user adds multiples IPv4 options that exceeds 40 bytes and specify header length as "auto", implementation should throw error. Currently IP options supported are: 1. router_alert option allows devices to intercept packets not addressed to them directly as defined in RFC2113. 2. custom option is provided to configure user defined IP options as needed. ',
                  properties: {
                    choice: {
                      type: 'string',
                      enum: ['router_alert', 'custom'],
                    },
                    custom: {
                      type: 'object',
                      description: 'User defined IP options to be appended to the IPv4 header.',
                      properties: {
                        length: {
                          type: 'object',
                          description: 'Length for custom options.',
                          properties: {
                            auto: {
                              type: 'integer',
                              description:
                                'The OTG implementation can provide a system generated value for this property. If the OTG is unable to generate a value the default value must be used.',
                            },
                            choice: {
                              type: 'string',
                              description: 'auto or configured value.',
                              enum: ['auto', 'value'],
                            },
                            value: {
                              type: 'integer',
                            },
                          },
                          required: [],
                        },
                        type: {
                          type: 'object',
                          description: 'Type options for custom options.',
                          properties: {
                            copied_flag: {
                              type: 'object',
                              description:
                                'This flag indicates this option is copied to all fragments on fragmentations.',
                              properties: {
                                choice: {
                                  type: 'string',
                                  enum: ['value', 'values', 'increment', 'decrement'],
                                },
                                decrement: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_copied_flag_counter',
                                },
                                increment: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_copied_flag_counter',
                                },
                                value: {
                                  type: 'integer',
                                },
                                values: {
                                  type: 'array',
                                  items: {
                                    type: 'integer',
                                  },
                                },
                              },
                              required: [],
                            },
                            option_class: {
                              type: 'object',
                              description:
                                'Option class [Ref:https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1].',
                              properties: {
                                choice: {
                                  type: 'string',
                                  enum: ['value', 'values', 'increment', 'decrement'],
                                },
                                decrement: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_option_class_counter',
                                },
                                increment: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_option_class_counter',
                                },
                                value: {
                                  type: 'integer',
                                },
                                values: {
                                  type: 'array',
                                  items: {
                                    type: 'integer',
                                  },
                                },
                              },
                              required: [],
                            },
                            option_number: {
                              type: 'object',
                              description:
                                'Option Number [Ref:https://www.iana.org/assignments/ip-parameters/ip-parameters.xhtml#ip-parameters-1].',
                              properties: {
                                choice: {
                                  type: 'string',
                                  enum: ['value', 'values', 'increment', 'decrement'],
                                },
                                decrement: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_option_number_counter',
                                },
                                increment: {
                                  $ref: '#/$defs/pattern_flow_ipv4_options_custom_type_option_number_counter',
                                },
                                value: {
                                  type: 'integer',
                                },
                                values: {
                                  type: 'array',
                                  items: {
                                    type: 'integer',
                                  },
                                },
                              },
                              required: [],
                            },
                          },
                          required: [],
                        },
                        value: {
                          type: 'string',
                          description:
                            'Value of the option field should not excced 38 bytes since maximum 40 bytes can be added as options in IPv4 header. For type and length requires 2 bytes, hence maximum of 38 bytes are expected. Maximum length of this attribute is 76 (38 * 2 hex character per byte).',
                        },
                      },
                      required: [],
                    },
                  },
                  required: [],
                },
              },
              priority: {
                type: 'object',
                description: 'A container for ipv4 raw, tos, dscp ip priorities.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['raw', 'tos', 'dscp'],
                  },
                  dscp: {
                    type: 'object',
                    description: 'Differentiated services code point (DSCP) packet field.',
                    properties: {
                      ecn: {
                        type: 'object',
                        description: 'Explicit congestion notification',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_dscp_ecn_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_dscp_ecn_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      phb: {
                        type: 'object',
                        description: 'Per hop behavior',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_dscp_phb_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_dscp_phb_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                    },
                    required: [],
                  },
                  raw: {
                    type: 'object',
                    description: 'Raw priority',
                    properties: {
                      choice: {
                        type: 'string',
                        enum: ['value', 'values', 'increment', 'decrement'],
                      },
                      decrement: {
                        $ref: '#/$defs/pattern_flow_ipv4_priority_raw_counter',
                      },
                      increment: {
                        $ref: '#/$defs/pattern_flow_ipv4_priority_raw_counter',
                      },
                      metric_tags: {
                        type: 'array',
                        description:
                          'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                        items: {
                          type: 'object',
                          description:
                            'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                          properties: {
                            name: {
                              type: 'string',
                              description:
                                'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                            },
                            length: {
                              type: 'integer',
                              description:
                                'Number of bits to track for metrics starting from configured offset of corresponding header field',
                            },
                            offset: {
                              type: 'integer',
                              description: 'Offset in bits relative to start of corresponding header field',
                            },
                          },
                          required: ['name'],
                        },
                      },
                      value: {
                        type: 'integer',
                      },
                      values: {
                        type: 'array',
                        items: {
                          type: 'integer',
                        },
                      },
                    },
                    required: [],
                  },
                  tos: {
                    type: 'object',
                    description: 'Type of service (TOS) packet field.',
                    properties: {
                      delay: {
                        type: 'object',
                        description: 'Delay',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_delay_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_delay_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      monetary: {
                        type: 'object',
                        description: 'Monetary',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_monetary_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_monetary_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      precedence: {
                        type: 'object',
                        description: 'Precedence',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_precedence_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_precedence_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      reliability: {
                        type: 'object',
                        description: 'Reliability',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_reliability_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_reliability_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      throughput: {
                        type: 'object',
                        description: 'Throughput',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_throughput_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_throughput_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      unused: {
                        type: 'object',
                        description: 'Unused',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_unused_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_ipv4_tos_unused_counter',
                          },
                          metric_tags: {
                            type: 'array',
                            description:
                              'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                            items: {
                              type: 'object',
                              description:
                                'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                              properties: {
                                name: {
                                  type: 'string',
                                  description:
                                    'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                                },
                                length: {
                                  type: 'integer',
                                  description:
                                    'Number of bits to track for metrics starting from configured offset of corresponding header field',
                                },
                                offset: {
                                  type: 'integer',
                                  description:
                                    'Offset in bits relative to start of corresponding header field',
                                },
                              },
                              required: ['name'],
                            },
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                    },
                    required: [],
                  },
                },
                required: [],
              },
              protocol: {
                type: 'object',
                description: 'Protocol, default is 61 any host internal protocol',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_protocol_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_protocol_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved: {
                type: 'object',
                description: 'Reserved flag.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_reserved_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_reserved_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src: {
                type: 'object',
                description: 'Source address',
                properties: {
                  auto: {
                    $ref: '#/$defs/flow_ipv4_auto',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'auto', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_src_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_src_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'ipv4 random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'string',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'string',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              time_to_live: {
                type: 'object',
                description: 'Time to live',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_time_to_live_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_time_to_live_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              total_length: {
                type: 'object',
                description: 'Total length',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_total_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_total_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'Version',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv4_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv4_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          ipv6: {
            type: 'object',
            description: 'IPv6 packet header',
            properties: {
              dst: {
                type: 'object',
                description: 'Destination address',
                properties: {
                  auto: {
                    $ref: '#/$defs/flow_ipv6_auto',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'auto'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_dst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_dst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              flow_label: {
                type: 'object',
                description: 'Flow label',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_flow_label_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_flow_label_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'integer random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'integer',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'integer',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              hop_limit: {
                type: 'object',
                description: 'Hop limit',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_hop_limit_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_hop_limit_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              next_header: {
                type: 'object',
                description: 'Next header',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_next_header_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_next_header_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              payload_length: {
                type: 'object',
                description: 'Payload length',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_payload_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_payload_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src: {
                type: 'object',
                description: 'Source address',
                properties: {
                  auto: {
                    $ref: '#/$defs/flow_ipv6_auto',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'auto'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_src_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_src_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              traffic_class: {
                type: 'object',
                description: 'Traffic class',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_traffic_class_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_traffic_class_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'object',
                description: 'Version number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ipv6_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ipv6_version_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          macsec: {
            type: 'object',
            description: 'MACsec packet header.',
            properties: {
              choice: {
                type: 'string',
                description:
                  "Currently only auto choice is allowed. If choice is auto, MACsec header is autogenerated. If auto choice is selected, MACsec protocol must be configured in device; flow.tx_rx.choice must be of type 'device' and flow.tx_rx.device.tx_names[0] must be chosen to be an endpoint that is on or behind a MACSec enabled ethernet to be able to correctly auto-fill the fields of the MACsec header. If one of the conditions is not true, the implementation should return an error specifying the issue. A custom choice can be added in future to allow user to set specific MACsec header fields and/ or to generate flow.tx_rx.port type of traffic with MACSec header fields explicitly specified by the user.",
                enum: ['auto'],
              },
            },
            required: [],
          },
          mpls: {
            type: 'object',
            description:
              'MPLS packet header; When configuring multiple such headers, the count shall not exceed 20.',
            properties: {
              bottom_of_stack: {
                type: 'object',
                description: 'Bottom of stack',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_mpls_bottom_of_stack_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_mpls_bottom_of_stack_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              label: {
                type: 'object',
                description: 'Label of routers',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_mpls_label_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_mpls_label_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              time_to_live: {
                type: 'object',
                description: 'Time to live',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_mpls_time_to_live_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_mpls_time_to_live_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              traffic_class: {
                type: 'object',
                description: 'Traffic class',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_mpls_traffic_class_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_mpls_traffic_class_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          pfcpause: {
            type: 'object',
            description: 'IEEE 802.1Qbb PFC Pause packet header.',
            properties: {
              class_enable_vector: {
                type: 'object',
                description: 'Destination',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_class_enable_vector_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_class_enable_vector_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              control_op_code: {
                type: 'object',
                description: 'Control operation code',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_control_op_code_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_control_op_code_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              dst: {
                type: 'object',
                description: 'Destination MAC address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_dst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_dst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              ether_type: {
                type: 'object',
                description: 'Ethernet type',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_ether_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_ether_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_0: {
                type: 'object',
                description: 'Pause class 0',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class0_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class0_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_1: {
                type: 'object',
                description: 'Pause class 1',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class1_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class1_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_2: {
                type: 'object',
                description: 'Pause class 2',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class2_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class2_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_3: {
                type: 'object',
                description: 'Pause class 3',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class3_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class3_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_4: {
                type: 'object',
                description: 'Pause class 4',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class4_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class4_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_5: {
                type: 'object',
                description: 'Pause class 5',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class5_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class5_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_6: {
                type: 'object',
                description: 'Pause class 6',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class6_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class6_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              pause_class_7: {
                type: 'object',
                description: 'Pause class 7',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class7_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_pause_class7_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src: {
                type: 'object',
                description: 'Source MAC address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_src_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_pfc_pause_src_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          ppp: {
            type: 'object',
            description: 'PPP packet header',
            properties: {
              address: {
                type: 'object',
                description: 'PPP address',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ppp_address_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ppp_address_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              control: {
                type: 'object',
                description: 'PPP control',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ppp_control_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ppp_control_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              protocol_type: {
                type: 'object',
                description: 'PPP protocol type',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_ppp_protocol_type_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_ppp_protocol_type_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          rsvp: {
            type: 'object',
            description:
              'RSVP packet header as defined in RFC2205 and RFC3209. Currently only supported message type is "Path" with mandatory objects and sub-objects.',
            properties: {
              flag: {
                type: 'string',
                description: 'Flag, 0x01-0x08: Reserved.',
                enum: ['not_refresh_reduction_capable', 'refresh_reduction_capable'],
              },
              message_type: {
                type: 'object',
                description:
                  'An 8-bit number that identifies the function of the RSVP message. There are aound 20 message types defined in https://www.iana.org/assignments/rsvp-parameters/rsvp-parameters.xhtml#rsvp-parameters-2 . Among these presently supported is "Path"(value: 1) message type.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['path'],
                  },
                  path: {
                    type: 'object',
                    description:
                      '"Path" message requires the following list of objects in order as defined in https://www.rfc-editor.org/rfc/rfc3209.html#page-15: 1. SESSION 2. RSVP_HOP 3. TIME_VALUES 4. EXPLICIT_ROUTE [optional] 5. LABEL_REQUEST 6. SESSION_ATTRIBUTE [optional] 7. SENDER_TEMPLATE 8. SENDER_TSPEC 9. RECORD_ROUTE [optional]',
                    properties: {
                      objects: {
                        type: 'array',
                        description:
                          '"Path" message requires atleast SESSION, RSVP_HOP, TIME_VALUES, LABEL_REQUEST, SENDER_TEMPLATE and SENDER_TSPEC objects in order.',
                        items: {
                          type: 'object',
                          description:
                            "Every RSVP object encapsulated in an RSVP message consists of a 32-bit word header and the object's contents.",
                          properties: {
                            class_num: {
                              type: 'object',
                              description:
                                'The class number is used to identify the class of an object. Defined in https://www.iana.org/assignments/rsvp-parameters/rsvp-parameters.xhtml#rsvp-parameters-4 . Curently supported class numbers are for "Path" message type. "Path" message: Supported Class numbers and it\'s value: SESSION: 1, RSVP_HOP: 3, TIME_VALUES: 5, EXPLICIT_ROUTE: 20, LABEL_REQUEST: 19, SESSION_ATTRIBUTE: 207, SENDER_TEMPLATE: 11, SENDER_TSPEC: 12, RECORD_ROUTE: 21, Custom: User defined bytes based on class and c-types not supported in above options.',
                              properties: {
                                choice: {
                                  type: 'string',
                                  enum: [
                                    'session',
                                    'rsvp_hop',
                                    'time_values',
                                    'explicit_route',
                                    'label_request',
                                    'session_attribute',
                                    'sender_template',
                                    'sender_tspec',
                                    'record_route',
                                    'custom',
                                  ],
                                },
                                custom: {
                                  type: 'object',
                                  description: 'Custom packet header',
                                  properties: {
                                    bytes: {
                                      type: 'string',
                                      description:
                                        'A custom packet header defined as a string of hex bytes. The string MUST contain sequence of valid hex bytes. Spaces or colons can be part of the bytes but will be discarded. Value of the this field should not excced 65525 bytes since maximum 65528 bytes can be added as object-contents in RSVP header. For type and length requires 3 bytes, hence maximum of 65524 bytes are expected. Maximum length of this attribute is 131050 (65525 * 2 hex character per byte).',
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                    type: {
                                      type: 'object',
                                      description: 'User defined object type.',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['value', 'values', 'increment', 'decrement'],
                                        },
                                        decrement: {
                                          $ref: '#/$defs/pattern_flow_rsvp_path_objects_custom_type_counter',
                                        },
                                        increment: {
                                          $ref: '#/$defs/pattern_flow_rsvp_path_objects_custom_type_counter',
                                        },
                                        value: {
                                          type: 'integer',
                                        },
                                        values: {
                                          type: 'array',
                                          items: {
                                            type: 'integer',
                                          },
                                        },
                                      },
                                      required: [],
                                    },
                                  },
                                  required: [],
                                },
                                explicit_route: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for EXPLICIT_ROUTE class and c-type is Type 1 Explicit Route (1).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['type_1'],
                                        },
                                        type_1: {
                                          type: 'object',
                                          description:
                                            'Type1 Explicit Route has subobjects. Currently supported subobjects are IPv4 prefix and Autonomous system number.',
                                          properties: {
                                            subobjects: {
                                              type: 'array',
                                              items: {
                                                type: 'object',
                                                description: 'Type is specific to a subobject.',
                                                properties: {
                                                  type: {
                                                    type: 'object',
                                                    description:
                                                      'Currently supported subobjects are IPv4 address(1) and Autonomous system number(32).',
                                                    properties: {
                                                      as_number: {
                                                        type: 'object',
                                                        description:
                                                          'Class = EXPLICIT_ROUTE, Type1 ROUTE_RECORD C-Type = 1 Subobject: Autonomous system number, C-Type: 32',
                                                        properties: {
                                                          as_number: {
                                                            type: 'integer',
                                                            description:
                                                              "Autonomous System number to be set in the ERO sub-object that this LSP should traverse through. This field is applicable only if the value of 'type' is set to 'as_number'.",
                                                          },
                                                          l_bit: {
                                                            type: 'object',
                                                            description:
                                                              'The L bit is an attribute of the subobject. The L bit is set if the subobject represents a loose hop in the explicit route. If the bit is not set, the subobject represents a strict hop in the explicit route.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'value',
                                                                  'values',
                                                                  'increment',
                                                                  'decrement',
                                                                ],
                                                              },
                                                              decrement: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_as_number_l_bit_counter',
                                                              },
                                                              increment: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_as_number_l_bit_counter',
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'integer',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          length: {
                                                            type: 'object',
                                                            description:
                                                              'The Length contains the total length of the subobject in bytes,including L, Type and Length fields.   The Length MUST be atleast 4, and MUST be a multiple of 4.',
                                                            properties: {
                                                              auto: {
                                                                type: 'integer',
                                                                description:
                                                                  'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used. ',
                                                              },
                                                              choice: {
                                                                type: 'string',
                                                                description: 'auto or configured value.',
                                                                enum: ['auto', 'value'],
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                        },
                                                        required: [],
                                                      },
                                                      choice: {
                                                        type: 'string',
                                                        enum: ['ipv4_prefix', 'as_number'],
                                                      },
                                                      ipv4_prefix: {
                                                        type: 'object',
                                                        description:
                                                          'Class = EXPLICIT_ROUTE, Type1 ROUTE_RECORD C-Type = 1 Subobject: IPv4 Prefix, C-Type: 1',
                                                        properties: {
                                                          ipv4_address: {
                                                            type: 'object',
                                                            description:
                                                              'This IPv4 address is treated as a prefix based on the prefix length value below.  Bits beyond the prefix are ignored on receipt and SHOULD be set to zero on transmission.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'value',
                                                                  'values',
                                                                  'increment',
                                                                  'decrement',
                                                                ],
                                                              },
                                                              decrement: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_ipv4_address_counter',
                                                              },
                                                              increment: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_ipv4_address_counter',
                                                              },
                                                              value: {
                                                                type: 'string',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'string',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          l_bit: {
                                                            type: 'object',
                                                            description:
                                                              'The L bit is an attribute of the subobject. The L bit is set if the subobject represents a loose hop in the explicit route. If the bit is not set, the subobject represents a strict hop in the explicit route.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'value',
                                                                  'values',
                                                                  'increment',
                                                                  'decrement',
                                                                ],
                                                              },
                                                              decrement: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_l_bit_counter',
                                                              },
                                                              increment: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_l_bit_counter',
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'integer',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          length: {
                                                            type: 'object',
                                                            description:
                                                              'The Length contains the total length of the subobject in bytes,including L,Type and Length fields.   The Length MUST be atleast 4, and MUST be a multiple of 4.',
                                                            properties: {
                                                              auto: {
                                                                type: 'integer',
                                                                description:
                                                                  'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used. ',
                                                              },
                                                              choice: {
                                                                type: 'string',
                                                                description: 'auto or configured value.',
                                                                enum: ['auto', 'value'],
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          prefix: {
                                                            type: 'integer',
                                                            description:
                                                              'The prefix length of the IPv4 address.',
                                                          },
                                                        },
                                                        required: [],
                                                      },
                                                    },
                                                    required: [],
                                                  },
                                                },
                                                required: [],
                                              },
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                label_request: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for LABEL_REQUEST class. Currently supported c-type is Without Label Range (1).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['without_label_range'],
                                        },
                                        without_label_range: {
                                          type: 'object',
                                          description:
                                            'Class = LABEL_REQUEST, Without Label Range C-Type = 1',
                                          properties: {
                                            l3pid: {
                                              type: 'object',
                                              description:
                                                'An identifier of the layer 3 protocol using this path.  Standard Ethertype values are used e.g. The default value of 2048 ( 0x0800 ) represents Ethertype for IPv4.          ',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_label_request_without_label_range_l3pid_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_label_request_without_label_range_l3pid_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            reserved: {
                                              type: 'object',
                                              description:
                                                'This field is reserved.   It MUST be set to zero on transmission and MUST be ignored on receipt.              ',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_label_request_without_label_range_reserved_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_label_request_without_label_range_reserved_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                record_route: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for RECORD_ROUTE class. c-type is Type 1 Route Record (1).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['type_1'],
                                        },
                                        type_1: {
                                          type: 'object',
                                          description:
                                            'Type1 record route has list of subobjects. Currently supported subobjects are IPv4 address(1) and Label(3).',
                                          properties: {
                                            subobjects: {
                                              type: 'array',
                                              items: {
                                                type: 'object',
                                                description: 'Type is specific to a subobject.',
                                                properties: {
                                                  type: {
                                                    type: 'object',
                                                    description:
                                                      'Currently supported subobjects are IPv4 address(1) and Label(3).',
                                                    properties: {
                                                      choice: {
                                                        type: 'string',
                                                        enum: ['ipv4_address', 'label'],
                                                      },
                                                      ipv4_address: {
                                                        type: 'object',
                                                        description:
                                                          'Class = RECORD_ROUTE, Type1 ROUTE_RECORD C-Type = 1 Subobject: IPv4 Address, C-Type: 1',
                                                        properties: {
                                                          flags: {
                                                            type: 'object',
                                                            description:
                                                              '0x01  local_protection_available, 0x02  local_protection_in_use',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'local_protection_available',
                                                                  'local_protection_in_use',
                                                                ],
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          ipv4_address: {
                                                            type: 'object',
                                                            description:
                                                              'A 32-bit unicast, host address.  Any network-reachable interface address is allowed here. Illegal addresses, such as certain loopback addresses, SHOULD NOT be used.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'value',
                                                                  'values',
                                                                  'increment',
                                                                  'decrement',
                                                                ],
                                                              },
                                                              decrement: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_record_route_type1_ipv4_address_ipv4_address_counter',
                                                              },
                                                              increment: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_record_route_type1_ipv4_address_ipv4_address_counter',
                                                              },
                                                              value: {
                                                                type: 'string',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'string',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          length: {
                                                            $ref: '#/$defs/flow_rsvp_route_record_length',
                                                          },
                                                          prefix_length: {
                                                            type: 'object',
                                                            description: 'Prefix-length of IPv4 address.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: [
                                                                  'value',
                                                                  'values',
                                                                  'increment',
                                                                  'decrement',
                                                                ],
                                                              },
                                                              decrement: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_record_route_type1_ipv4_address_prefix_length_counter',
                                                              },
                                                              increment: {
                                                                $ref: '#/$defs/pattern_flow_rsvp_path_record_route_type1_ipv4_address_prefix_length_counter',
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'integer',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                        },
                                                        required: [],
                                                      },
                                                      label: {
                                                        type: 'object',
                                                        description:
                                                          'Class = RECORD_ROUTE, Type1 ROUTE_RECORD C-Type = 1 Subobject: Label, C-Type: 3',
                                                        properties: {
                                                          c_type: {
                                                            type: 'object',
                                                            description:
                                                              'The C-Type of the included Label Object. Copied from the Label object.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: ['value', 'values'],
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'integer',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          flags: {
                                                            type: 'object',
                                                            description:
                                                              '0x01 = Global label. This flag indicates that the label will be understood if received on any interface.',
                                                            properties: {
                                                              choice: {
                                                                type: 'string',
                                                                enum: ['value', 'values'],
                                                              },
                                                              value: {
                                                                type: 'integer',
                                                              },
                                                              values: {
                                                                type: 'array',
                                                                items: {
                                                                  type: 'integer',
                                                                },
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          label: {
                                                            type: 'object',
                                                            description:
                                                              'The contents of the Label Object. Copied from the Label Object.',
                                                            properties: {
                                                              as_hex: {
                                                                type: 'string',
                                                                description:
                                                                  'Value of the this field should not excced 4 bytes. Maximum length of this attribute is 8 (4 * 2 hex character per byte).',
                                                              },
                                                              as_integer: {
                                                                type: 'integer',
                                                              },
                                                              choice: {
                                                                type: 'string',
                                                                description: '32 bit integer or hex value.',
                                                                enum: ['as_integer', 'as_hex'],
                                                              },
                                                            },
                                                            required: [],
                                                          },
                                                          length: {
                                                            $ref: '#/$defs/flow_rsvp_route_record_length',
                                                          },
                                                        },
                                                        required: [],
                                                      },
                                                    },
                                                    required: [],
                                                  },
                                                },
                                                required: [],
                                              },
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                rsvp_hop: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for RSVP_HOP class. Currently supported c-type is IPv4 (1).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['ipv4'],
                                        },
                                        ipv4: {
                                          type: 'object',
                                          description: 'IPv4 RSVP_HOP object: Class = 3, C-Type = 1',
                                          properties: {
                                            ipv4_address: {
                                              type: 'object',
                                              description:
                                                'The IPv4 address of the interface through which the last RSVP-knowledgeable hop forwarded this message.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_rsvp_hop_ipv4_ipv4_address_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_rsvp_hop_ipv4_ipv4_address_counter',
                                                },
                                                value: {
                                                  type: 'string',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'string',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            logical_interface_handle: {
                                              type: 'object',
                                              description:
                                                'Logical Interface Handle (LIH) is used to distinguish logical outgoing interfaces. A node receiving an LIH in a Path message saves its value and returns it in the HOP objects of subsequent Resv messages sent to the node that originated the LIH. The LIH should be identically zero if there is no logical interface handle.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_rsvp_hop_ipv4_logical_interface_handle_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_rsvp_hop_ipv4_logical_interface_handle_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                sender_template: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for SENDER_TEMPLATE class. Currently supported c-type is LSP Tunnel IPv4 (7).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['lsp_tunnel_ipv4'],
                                        },
                                        lsp_tunnel_ipv4: {
                                          type: 'object',
                                          description: 'Class = SENDER_TEMPLATE, LSP_TUNNEL_IPv4 C-Type = 7',
                                          properties: {
                                            ipv4_tunnel_sender_address: {
                                              type: 'object',
                                              description: 'IPv4 address for a sender node.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_ipv4_tunnel_sender_address_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_ipv4_tunnel_sender_address_counter',
                                                },
                                                value: {
                                                  type: 'string',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'string',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            lsp_id: {
                                              type: 'object',
                                              description:
                                                'A 16-bit identifier used in the SENDER_TEMPLATE that can be changed to allow a sender to share resources with itself.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_lsp_id_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_lsp_id_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            reserved: {
                                              type: 'object',
                                              description: 'Reserved field, MUST be zero.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_reserved_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_reserved_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                sender_tspec: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for SENDER_TSPEC class. Currently supported c-type is int-serv (2).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['int_serv'],
                                        },
                                        int_serv: {
                                          type: 'object',
                                          description: 'int-serv SENDER_TSPEC object: Class = 12, C-Type = 2',
                                          properties: {
                                            length_of_service_data: {
                                              type: 'object',
                                              description:
                                                'Length of service data, 6 words not including per-service header.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_length_of_service_data_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_length_of_service_data_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            maximum_packet_size: {
                                              type: 'object',
                                              description:
                                                'The maximum packet size parameter should be set to the size of the largest packet the application might wish to generate. This value must, by definition, be equal to or larger than the value of The minimum policed unit.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_maximum_packet_size_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_maximum_packet_size_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            minimum_policed_unit: {
                                              type: 'object',
                                              description:
                                                'The minimum policed unit parameter should generally be set equal to the size of the smallest packet generated by the application.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_minimum_policed_unit_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_minimum_policed_unit_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            overall_length: {
                                              type: 'object',
                                              description: 'Overall length (7 words not including header).',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_overall_length_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_overall_length_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            parameter_127_flag: {
                                              type: 'object',
                                              description: 'Parameter 127 flags (none set)',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_flag_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_flag_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            parameter_127_length: {
                                              type: 'object',
                                              description:
                                                'Parameter 127 length, 5 words not including per-service header',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_length_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_length_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            parameter_id_token_bucket_tspec: {
                                              type: 'object',
                                              description: 'Parameter ID, parameter 127 (Token Bucket TSpec)',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter_id_token_bucket_tspec_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_parameter_id_token_bucket_tspec_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            peak_data_rate: {
                                              type: 'number',
                                              description:
                                                "The peak rate may be set to the sender's peak traffic generation rate (if known and controlled), the physical interface line rate (if known), or positive infinity (if no better value is available).",
                                            },
                                            reserved1: {
                                              type: 'object',
                                              description: 'Reserved.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_reserved1_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_reserved1_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            reserved2: {
                                              type: 'object',
                                              description: 'Reserved.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_reserved2_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_reserved2_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            service_header: {
                                              type: 'object',
                                              description:
                                                "Service header, service number - '1' (Generic information) if in a PATH message.",
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_service_header_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_service_header_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            token_bucket_rate: {
                                              type: 'number',
                                              description:
                                                "Token bucket rate is set to sender's view of its generated traffic.",
                                            },
                                            token_bucket_size: {
                                              type: 'number',
                                              description:
                                                "Token bucket size is set to sender's view of its generated traffic.",
                                            },
                                            version: {
                                              type: 'object',
                                              description: 'Message format version number.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_version_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_version_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            zero_bit: {
                                              type: 'object',
                                              description: 'MUST be 0.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_zero_bit_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_sender_tspec_int_serv_zero_bit_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                session: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'The body of an object corresponding to the class number and c-type. Currently supported c-type for SESSION object is LSP Tunnel IPv4 (7).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['lsp_tunnel_ipv4'],
                                        },
                                        lsp_tunnel_ipv4: {
                                          type: 'object',
                                          description: 'Class = SESSION, LSP_TUNNEL_IPv4 C-Type = 7.',
                                          properties: {
                                            extended_tunnel_id: {
                                              type: 'object',
                                              description:
                                                'A 32-bit identifier used in the SESSION that remains constant over the life of the tunnel. Normally set to all zeros. Ingress nodes that wish to narrow the scope of a SESSION to the ingress-egress pair may place their IPv4 address here as a globally unique identifier.',
                                              properties: {
                                                as_integer: {
                                                  type: 'object',
                                                  description: 'TBD',
                                                  properties: {
                                                    choice: {
                                                      type: 'string',
                                                      enum: ['value', 'values', 'increment', 'decrement'],
                                                    },
                                                    decrement: {
                                                      $ref: '#/$defs/pattern_flow_rsvp_path_session_ext_tunnel_id_as_integer_counter',
                                                    },
                                                    increment: {
                                                      $ref: '#/$defs/pattern_flow_rsvp_path_session_ext_tunnel_id_as_integer_counter',
                                                    },
                                                    value: {
                                                      type: 'integer',
                                                    },
                                                    values: {
                                                      type: 'array',
                                                      items: {
                                                        type: 'integer',
                                                      },
                                                    },
                                                  },
                                                  required: [],
                                                },
                                                as_ipv4: {
                                                  type: 'object',
                                                  description:
                                                    'IPv4 address of the ingress endpoint for the tunnel.',
                                                  properties: {
                                                    choice: {
                                                      type: 'string',
                                                      enum: ['value', 'values', 'increment', 'decrement'],
                                                    },
                                                    decrement: {
                                                      $ref: '#/$defs/pattern_flow_rsvp_path_session_ext_tunnel_id_as_ipv4_counter',
                                                    },
                                                    increment: {
                                                      $ref: '#/$defs/pattern_flow_rsvp_path_session_ext_tunnel_id_as_ipv4_counter',
                                                    },
                                                    value: {
                                                      type: 'string',
                                                    },
                                                    values: {
                                                      type: 'array',
                                                      items: {
                                                        type: 'string',
                                                      },
                                                    },
                                                  },
                                                  required: [],
                                                },
                                                choice: {
                                                  type: 'string',
                                                  description: '32 bit integer or IPv4 address.',
                                                  enum: ['as_integer', 'as_ipv4'],
                                                },
                                              },
                                              required: [],
                                            },
                                            ipv4_tunnel_end_point_address: {
                                              type: 'object',
                                              description: 'IPv4 address of the egress node for the tunnel.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_ipv4_tunnel_end_point_address_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_ipv4_tunnel_end_point_address_counter',
                                                },
                                                value: {
                                                  type: 'string',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'string',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            reserved: {
                                              type: 'object',
                                              description: 'Reserved field, MUST be zero.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_reserved_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_reserved_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                            tunnel_id: {
                                              type: 'object',
                                              description:
                                                'A 16-bit identifier used in the SESSION that remains constant over the life of the tunnel.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_tunnel_id_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_tunnel_id_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                session_attribute: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for SESSION_ATTRIBUTE class. Currently supported c-type is LSP_Tunnel_RA (1) and LSP_Tunnel (7).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['lsp_tunnel', 'lsp_tunnel_ra'],
                                        },
                                        lsp_tunnel: {
                                          type: 'object',
                                          description:
                                            'SESSION_ATTRIBUTE class = 207, LSP_TUNNEL_RA C-Type = 7, resource affinity information.',
                                          properties: {
                                            flags: {
                                              $ref: '#/$defs/flow_rsvp_lsp_tunnel_flag',
                                            },
                                            holding_priority: {
                                              type: 'integer',
                                              description:
                                                'The priority of the session with respect to holding resources,in the range of 0 to 7. The value 0 is the highest priority. The Setup Priority is used in deciding whether this session can preempt another session.',
                                            },
                                            name_length: {
                                              $ref: '#/$defs/flow_rsvp_session_attribute_name_length',
                                            },
                                            session_name: {
                                              type: 'string',
                                              description: 'A null padded string of characters.          ',
                                            },
                                            setup_priority: {
                                              type: 'integer',
                                              description:
                                                'The priority of the session with respect to taking resources,in the range of 0 to 7. The value 0 is the highest priority. The Setup Priority is used in deciding whether this session can preempt another session.',
                                            },
                                          },
                                          required: [],
                                        },
                                        lsp_tunnel_ra: {
                                          type: 'object',
                                          description:
                                            'SESSION_ATTRIBUTE class = 207, LSP_TUNNEL_RA C-Type = 1, it carries resource affinity information.',
                                          properties: {
                                            exclude_any: {
                                              type: 'string',
                                              description:
                                                "A 32-bit vector representing a set of attribute filters associated with a tunnel any of which renders a link unacceptable. A null set (all bits set to zero) doesn't render the link unacceptable. The most significant byte in the hex-string is the farthest  to the left in the byte sequence.  Leading zero bytes in the configured value may be omitted for brevity.           ",
                                            },
                                            flags: {
                                              $ref: '#/$defs/flow_rsvp_lsp_tunnel_flag',
                                            },
                                            holding_priority: {
                                              type: 'integer',
                                              description:
                                                'The priority of the session with respect to holding resources,in the range of 0 to 7. The value 0 is the highest priority. The Setup Priority is used in deciding whether this session can preempt another session.',
                                            },
                                            include_all: {
                                              type: 'string',
                                              description:
                                                'A 32-bit vector representing a set of attribute filters associated with a tunnel all of which must be present for a link to be acceptable. A null set (all bits set to zero) automatically passes. The most significant byte in the hex-string is the farthest to the left in the byte sequence.  Leading zero bytes in the configured value may be omitted for brevity.          ',
                                            },
                                            include_any: {
                                              type: 'string',
                                              description:
                                                'A 32-bit vector representing a set of attribute filters associated with a tunnel any of which renders a link acceptable. A null set (all bits set to zero) automatically passes. The most significant byte in the hex-string is the farthest  to the left in the byte sequence.  Leading zero bytes in the configured value may be omitted for brevity.     ',
                                            },
                                            name_length: {
                                              $ref: '#/$defs/flow_rsvp_session_attribute_name_length',
                                            },
                                            session_name: {
                                              type: 'string',
                                              description: 'A null padded string of characters.          ',
                                            },
                                            setup_priority: {
                                              type: 'integer',
                                              description:
                                                'The priority of the session with respect to taking resources,in the range of 0 to 7. The value 0 is the highest priority. The Setup Priority is used in deciding whether this session can preempt another session.',
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                                time_values: {
                                  type: 'object',
                                  description: 'C-Type is specific to a class num.',
                                  properties: {
                                    c_type: {
                                      type: 'object',
                                      description:
                                        'Object for TIME_VALUES class. Currently supported c-type is Type 1 Time Value (1).',
                                      properties: {
                                        choice: {
                                          type: 'string',
                                          enum: ['type_1'],
                                        },
                                        type_1: {
                                          type: 'object',
                                          description: 'TIME_VALUES Object: Class = 5, C-Type = 1',
                                          properties: {
                                            refresh_period_r: {
                                              type: 'object',
                                              description:
                                                'The refresh timeout period R used to generate this message;in milliseconds.',
                                              properties: {
                                                choice: {
                                                  type: 'string',
                                                  enum: ['value', 'values', 'increment', 'decrement'],
                                                },
                                                decrement: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_time_values_type1_refresh_period_r_counter',
                                                },
                                                increment: {
                                                  $ref: '#/$defs/pattern_flow_rsvp_path_time_values_type1_refresh_period_r_counter',
                                                },
                                                value: {
                                                  type: 'integer',
                                                },
                                                values: {
                                                  type: 'array',
                                                  items: {
                                                    type: 'integer',
                                                  },
                                                },
                                              },
                                              required: [],
                                            },
                                          },
                                          required: [],
                                        },
                                      },
                                      required: [],
                                    },
                                    length: {
                                      $ref: '#/$defs/flow_rsvp_object_length',
                                    },
                                  },
                                  required: [],
                                },
                              },
                              required: ['choice'],
                            },
                          },
                          required: [],
                        },
                      },
                    },
                    required: [],
                  },
                },
                required: [],
              },
              reserved: {
                type: 'object',
                description: 'Reserved ',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_rsvp_reserved_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_rsvp_reserved_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              rsvp_checksum: {
                type: 'object',
                description:
                  "The one's complement of the one's complement sum of the message, with the checksum field replaced by zero for the purpose of computing the checksum.   An all-zero value means that no checksum was transmitted.",
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              rsvp_length: {
                type: 'object',
                description:
                  'The sum of the lengths of the common header and all objects included in the message.',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    description: 'auto or configured value.',
                    enum: ['auto', 'value'],
                  },
                  value: {
                    type: 'integer',
                  },
                },
                required: [],
              },
              time_to_live: {
                type: 'object',
                description: 'The IP time-to-live(TTL) value with which the message was sent.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_rsvp_time_to_live_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_rsvp_time_to_live_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              version: {
                type: 'integer',
                description: 'RSVP Protocol Version.',
              },
            },
            required: [],
          },
          snmpv2c: {
            type: 'object',
            description: 'SNMPv2C packet header as defined in RFC1901 and RFC3416.',
            properties: {
              data: {
                type: 'object',
                description:
                  'This contains the body of the SNMPv2C message.\n\n- Encoding of subsequent fields follow ASN.1 specification.\n  Refer: http://www.itu.int/ITU-T/asn1/',
                properties: {
                  choice: {
                    type: 'string',
                    enum: [
                      'get_request',
                      'get_next_request',
                      'response',
                      'set_request',
                      'get_bulk_request',
                      'inform_request',
                      'snmpv2_trap',
                      'report',
                    ],
                  },
                  get_bulk_request: {
                    type: 'object',
                    description:
                      'The purpose of the GetBulkRequest-PDU is to request the transfer of a potentially large amount of data, including, but not limited to, the efficient and rapid retrieval of large tables.',
                    properties: {
                      max_repetitions: {
                        type: 'object',
                        description:
                          'A maximum of max_repetitions variable bindings are requested in the Response-PDU for each of the remaining variable bindings in the GetBulkRequest after the non_repeaters variable bindings.',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_snmpv2c_bulk_pdu_max_repetitions_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_snmpv2c_bulk_pdu_max_repetitions_counter',
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      non_repeaters: {
                        type: 'object',
                        description:
                          'One variable binding in the Response-PDU is requested for the first non_repeaters variable bindings in the GetBulkRequest.',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values'],
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      request_id: {
                        type: 'object',
                        description:
                          'Identifies a particular SNMP request. \nThis index is echoed back in the response from the SNMP agent, \nallowing the SNMP manager to match an incoming response to the appropriate request.\n\n- Encoding of this field follows ASN.1 X.690(section 8.3) specification.\n  Refer: http://www.itu.int/ITU-T/asn1/',
                        properties: {
                          choice: {
                            type: 'string',
                            enum: ['value', 'values', 'increment', 'decrement'],
                          },
                          decrement: {
                            $ref: '#/$defs/pattern_flow_snmpv2c_bulk_pdu_request_id_counter',
                          },
                          increment: {
                            $ref: '#/$defs/pattern_flow_snmpv2c_bulk_pdu_request_id_counter',
                          },
                          value: {
                            type: 'integer',
                          },
                          values: {
                            type: 'array',
                            items: {
                              type: 'integer',
                            },
                          },
                        },
                        required: [],
                      },
                      variable_bindings: {
                        type: 'array',
                        description: 'A Sequence of variable_bindings.',
                        items: {
                          $ref: '#/$defs/flow_snmpv2c_variable_binding',
                        },
                      },
                    },
                    required: [],
                  },
                  get_next_request: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  get_request: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  inform_request: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  report: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  response: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  set_request: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                  snmpv2_trap: {
                    $ref: '#/$defs/flow_snmpv2c_pdu',
                  },
                },
                required: ['choice'],
              },
              community: {
                type: 'string',
                description:
                  'It is an ASCII based octet string which identifies the SNMP community in which the sender and recipient of this message are located. It should match the read-only or read-write community string configured on the recipient for the PDU to be accepted.',
              },
              version: {
                type: 'object',
                description: 'Version',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_version_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_version_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: ['data'],
          },
          tcp: {
            type: 'object',
            description: 'TCP packet header',
            properties: {
              ack_num: {
                type: 'object',
                description: 'Acknowledgement number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ack_num_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ack_num_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              checksum: {
                type: 'object',
                description:
                  "The one's complement of the one's complement sum of all 16 bit words in header and text.  An all-zero value means that no checksum will be transmitted.   While computing the checksum, the checksum field itself is replaced with zeros.",
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              ctl_ack: {
                type: 'object',
                description: 'A value of 1 indicates that the ackknowledgment field is significant.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_ack_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_ack_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ctl_fin: {
                type: 'object',
                description: 'Last packet from the sender. ',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_fin_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_fin_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ctl_psh: {
                type: 'object',
                description: 'Asks to push the buffered data to the receiving application. ',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_psh_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_psh_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ctl_rst: {
                type: 'object',
                description: 'Reset the connection. ',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_rst_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_rst_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ctl_syn: {
                type: 'object',
                description: 'Synchronize sequenece numbers. ',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_syn_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_syn_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ctl_urg: {
                type: 'object',
                description: 'A value of 1 indicates that the urgent pointer field is significant.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_urg_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ctl_urg_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              data_offset: {
                type: 'object',
                description:
                  'The number of 32 bit words in the TCP header. This indicates where the data begins.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_data_offset_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_data_offset_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              dst_port: {
                type: 'object',
                description: 'Destination port',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_dst_port_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_dst_port_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'integer random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'integer',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'integer',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ecn_cwr: {
                type: 'object',
                description: 'Explicit congestion notification, congestion window reduced.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_cwr_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_cwr_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ecn_echo: {
                type: 'object',
                description:
                  'Explicit congestion notification, echo. 1 indicates the peer is ecn capable. 0 indicates that a packet with ipv4.ecn = 11 in the ip header was  received during normal transmission.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_echo_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_echo_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ecn_ns: {
                type: 'object',
                description: 'Explicit congestion notification, concealment protection.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_ns_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_ecn_ns_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              seq_num: {
                type: 'object',
                description: 'Sequence number',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_seq_num_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_seq_num_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src_port: {
                type: 'object',
                description: 'Source port',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_src_port_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_src_port_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'integer random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'integer',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'integer',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              window: {
                type: 'object',
                description: 'Tcp connection window.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_tcp_window_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_tcp_window_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          udp: {
            type: 'object',
            description: 'UDP packet header',
            properties: {
              checksum: {
                type: 'object',
                description: 'UDP checksum',
                properties: {
                  choice: {
                    type: 'string',
                    description: 'The type of checksum',
                    enum: ['generated', 'custom'],
                  },
                  custom: {
                    type: 'integer',
                    description: 'A custom checksum value',
                  },
                  generated: {
                    type: 'string',
                    description: 'A system generated checksum value',
                    enum: ['good', 'bad'],
                  },
                },
                required: [],
              },
              dst_port: {
                type: 'object',
                description: 'Destination port',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_udp_dst_port_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_udp_dst_port_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'integer random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'integer',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'integer',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              length: {
                type: 'object',
                description: 'Length',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_udp_length_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_udp_length_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              src_port: {
                type: 'object',
                description: 'Source port',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement', 'random'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_udp_src_port_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_udp_src_port_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  random: {
                    type: 'object',
                    description: 'integer random pattern',
                    properties: {
                      count: {
                        type: 'integer',
                        description:
                          'The total number of values to be generated by the random value generator.',
                      },
                      max: {
                        type: 'integer',
                        description: 'The maximum possible value generated by the random value generator.',
                      },
                      min: {
                        type: 'integer',
                        description: 'The minimum possible value generated by the random value generator.',
                      },
                      seed: {
                        type: 'integer',
                        description:
                          'The seed value is used to initialize the random number generator to a deterministic state. If the user provides a seed value of 0, the implementation will generate a sequence of non-deterministic random values. For any other seed value, the sequence of random numbers will be generated in a deterministic manner (specific to the implementation).',
                      },
                    },
                    required: [],
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          vlan: {
            type: 'object',
            description: 'VLAN packet header',
            properties: {
              id: {
                type: 'object',
                description: 'Vlan identifier',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vlan_id_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vlan_id_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              cfi: {
                type: 'object',
                description: 'Canonical format indicator or drop elegible indicator',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vlan_cfi_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vlan_cfi_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              priority: {
                type: 'object',
                description: 'Priority code point',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vlan_priority_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vlan_priority_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              tpid: {
                type: 'object',
                description: 'Protocol identifier',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vlan_tpid_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vlan_tpid_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
          vxlan: {
            type: 'object',
            description: 'VXLAN packet header',
            properties: {
              flags: {
                type: 'object',
                description:
                  'Flags field with a bit format of RRRRIRRR. The I flag MUST be set to 1 for a valid vxlan network id (VNI).   The other 7 bits (designated "R") are reserved fields and MUST be  set to zero on transmission and ignored on receipt.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vxlan_flags_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vxlan_flags_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved0: {
                type: 'object',
                description: 'Reserved field',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vxlan_reserved0_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vxlan_reserved0_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              reserved1: {
                type: 'object',
                description: 'Reserved field',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vxlan_reserved1_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vxlan_reserved1_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              vni: {
                type: 'object',
                description: 'VXLAN network id',
                properties: {
                  auto: {
                    type: 'integer',
                    description:
                      'The OTG implementation can provide a system generated\nvalue for this property. If the OTG is unable to generate a value\nthe default value must be used.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'auto', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_vxlan_vni_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_vxlan_vni_counter',
                  },
                  metric_tags: {
                    type: 'array',
                    description:
                      'One or more metric tags can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                    items: {
                      type: 'object',
                      description:
                        'Metric tag can be used to enable tracking portion of or all bits in a corresponding header field for metrics per each applicable value. These would appear as tagged metrics in corresponding flow metrics.',
                      properties: {
                        name: {
                          type: 'string',
                          description:
                            'Name used to identify the metrics associated with the values applicable for configured offset and length inside corresponding header field',
                        },
                        length: {
                          type: 'integer',
                          description:
                            'Number of bits to track for metrics starting from configured offset of corresponding header field',
                        },
                        offset: {
                          type: 'integer',
                          description: 'Offset in bits relative to start of corresponding header field',
                        },
                      },
                      required: ['name'],
                    },
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
        },
        required: [],
      },
      pattern_flow_arp_hardware_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_arp_hardware_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_arp_operation_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_arp_protocol_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_arp_protocol_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_arp_sender_hardware_addr_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_arp_sender_protocol_addr_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_arp_target_hardware_addr_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_arp_target_protocol_addr_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_dst_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_ether_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pfc_queue_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_src_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pause_control_op_code_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pause_dst_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pause_ether_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pause_src_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ethernet_pause_time_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gre_checksum_present_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gre_protocol_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gre_reserved0_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gre_reserved1_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gre_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_e_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtp_extension_contents_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtp_extension_extension_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtp_extension_next_extension_header_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_message_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_message_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_n_pdu_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_next_extension_header_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_pn_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_protocol_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_s_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_squence_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_teid_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv1_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_message_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_message_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_piggybacking_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_sequence_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_spare1_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_spare2_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_teid_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_teid_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_gtpv2_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmp_echo_code_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmp_echo_identifier_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmp_echo_sequence_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmp_echo_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmpv6_echo_code_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmpv6_echo_identifier_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmpv6_echo_sequence_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_icmpv6_echo_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_igmpv1_group_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_igmpv1_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_igmpv1_unused_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_igmpv1_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_dont_fragment_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_ipv4_auto: {
        type: 'object',
        description: 'The OTG implementation can provide a system generated, value for this property.',
        properties: {
          choice: {
            type: 'string',
            description:
              'The method to be used to provide the system generated value.\n\nThe dhcp option populates the field based on the dynamic IPv4 address that has been assigned to the DHCPv4 client by a DHCPv4 server.',
            enum: ['dhcp'],
          },
        },
        required: ['choice'],
      },
      pattern_flow_ipv4_dst_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_fragment_offset_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_header_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_identification_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_more_fragments_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_options_custom_type_copied_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_options_custom_type_option_class_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_options_custom_type_option_number_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_dscp_ecn_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_dscp_phb_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_priority_raw_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_delay_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_monetary_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_precedence_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_reliability_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_throughput_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_tos_unused_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_protocol_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_src_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_time_to_live_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_total_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv4_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_ipv6_auto: {
        type: 'object',
        description: 'The OTG implementation can provide a system generated, value for this property.',
        properties: {
          choice: {
            type: 'string',
            description:
              'The method to be used to provide the system generated value.\nThe dhcp option populates the field based on the dynamic IPv6 address that has been assigned to the DHCPv6 client \nby a DHCPv6 server.',
            enum: ['dhcp'],
          },
        },
        required: ['choice'],
      },
      pattern_flow_ipv6_dst_counter: {
        type: 'object',
        description: 'ipv6 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_flow_label_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_hop_limit_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_next_header_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_payload_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_src_counter: {
        type: 'object',
        description: 'ipv6 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_traffic_class_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ipv6_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_mpls_bottom_of_stack_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_mpls_label_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_mpls_time_to_live_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_mpls_traffic_class_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_class_enable_vector_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_control_op_code_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_dst_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_ether_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class0_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class1_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class2_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class3_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class4_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class5_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class6_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_pause_class7_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_pfc_pause_src_counter: {
        type: 'object',
        description: 'mac counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_ppp_address_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ppp_control_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_ppp_protocol_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_rsvp_object_length: {
        type: 'object',
        properties: {
          auto: {
            type: 'integer',
            description:
              'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used.',
          },
          choice: {
            type: 'string',
            description: 'auto or configured value.',
            enum: ['auto', 'value'],
          },
          value: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_objects_custom_type_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_explicit_route_type1_as_number_l_bit_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_ipv4_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_explicit_route_type1_ipv4_prefix_l_bit_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_label_request_without_label_range_l3pid_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_label_request_without_label_range_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_record_route_type1_ipv4_address_ipv4_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      flow_rsvp_route_record_length: {
        type: 'object',
        properties: {
          auto: {
            type: 'integer',
            description:
              'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used.',
          },
          choice: {
            type: 'string',
            description: 'auto or configured value.',
            enum: ['auto', 'value'],
          },
          value: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_record_route_type1_ipv4_address_prefix_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_rsvp_hop_ipv4_ipv4_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_rsvp_hop_ipv4_logical_interface_handle_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_ipv4_tunnel_sender_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_lsp_id_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_template_lsp_tunnel_ipv4_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_length_of_service_data_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_maximum_packet_size_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_minimum_policed_unit_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_overall_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_flag_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_parameter127_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_parameter_id_token_bucket_tspec_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_reserved1_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_reserved2_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_service_header_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_sender_tspec_int_serv_zero_bit_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_session_ext_tunnel_id_as_integer_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_session_ext_tunnel_id_as_ipv4_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_ipv4_tunnel_end_point_address_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_session_lsp_tunnel_ipv4_tunnel_id_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_rsvp_lsp_tunnel_flag: {
        type: 'object',
        properties: {
          choice: {
            type: 'string',
            enum: ['local_protection_desired', 'label_recording_desired', 'se_style_desired'],
          },
        },
        required: [],
      },
      flow_rsvp_session_attribute_name_length: {
        type: 'object',
        properties: {
          auto: {
            type: 'integer',
            description:
              'The OTG implementation will provide a system generated value for this property.  If the OTG implementation is unable to generate a value the default value must be used.',
          },
          choice: {
            type: 'string',
            description: 'auto or configured value.',
            enum: ['auto', 'value'],
          },
          value: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_path_time_values_type1_refresh_period_r_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_reserved_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_rsvp_time_to_live_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_bulk_pdu_max_repetitions_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_bulk_pdu_request_id_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_snmpv2c_variable_binding: {
        type: 'object',
        description:
          'A Sequence of two fields, an object_identifier and the value for/from that object_identifier.',
        properties: {
          object_identifier: {
            type: 'string',
            description:
              "The Object Identifier points to a particular parameter in the SNMP agent. \n- Encoding of this field follows RFC2578(section 3.5) and ASN.1 X.690(section 8.1.3.6) specification.\n  Refer: http://www.itu.int/ITU-T/asn1/\n- According to BER, the first two numbers of any OID (x.y) are encoded as one value using the formula (40*x)+y. \n  Example, the first two numbers of an SNMP OID 1.3... are encoded as 43 or 0x2B, because (40*1)+3 = 43. \n- After the first two numbers are encoded, the subsequent numbers in the OID are each encoded as a byte. \n- However, a special rule is required for large numbers because one byte can only represent a number from 0-127. \n- The rule for large numbers states that only the lower 7 bits in the byte are used for holding the value (0-127). \n- The highest order bit(8th) is used as a flag to indicate that this number spans more than one byte. Therefore, any number over 127 must be encoded using more than one byte. \n  - Example, the number 2680 in the OID '1.3.6.1.4.1.2680.1.2.7.3.2.0' cannot be encoded using a single byte. \n    According to this rule, the number 2680 must be encoded as 0x94 0x78. \n    Since the most significant bit is set in the first byte (0x94), it indicates that number spans to the next byte.\n    Since the most significant bit is not set in the next byte (0x78), it indicates that the number ends at the second byte.\n    The value is derived by appending 7 bits from each of the concatenated bytes i.e (0x14 *128^1) + (0x78 * 128^0) = 2680.",
          },
          value: {
            type: 'object',
            description: 'The value for the object_identifier as per RFC2578.',
            properties: {
              arbitrary_value: {
                type: 'string',
                description:
                  'It contains the hex bytes of the value to be sent.  As of now it is restricted to 10000 bytes.',
              },
              big_counter_value: {
                type: 'object',
                description: 'Big counter returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_big_counter_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_big_counter_value_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              choice: {
                type: 'string',
                enum: [
                  'no_value',
                  'integer_value',
                  'string_value',
                  'object_identifier_value',
                  'ip_address_value',
                  'counter_value',
                  'timeticks_value',
                  'arbitrary_value',
                  'big_counter_value',
                  'unsigned_integer_value',
                ],
              },
              counter_value: {
                type: 'object',
                description: 'Counter returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_counter_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_counter_value_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              integer_value: {
                type: 'object',
                description: 'Integer value returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_integer_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_integer_value_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              ip_address_value: {
                type: 'object',
                description: 'IPv4 address returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_ip_address_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_ip_address_value_counter',
                  },
                  value: {
                    type: 'string',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: [],
              },
              object_identifier_value: {
                type: 'string',
                description:
                  "The Object Identifier points to a particular parameter in the SNMP agent. \n- Encoding of this field follows RFC2578(section 3.5) and ASN.1 X.690(section 8.1.3.6) specification.\n  Refer: http://www.itu.int/ITU-T/asn1/\n- According to BER, the first two numbers of any OID (x.y) are encoded as one value using the formula (40*x)+y. \n  Example, the first two numbers of an SNMP OID 1.3... are encoded as 43 or 0x2B, because (40*1)+3 = 43. \n- After the first two numbers are encoded, the subsequent numbers in the OID are each encoded as a byte. \n- However, a special rule is required for large numbers because one byte can only represent a number from 0-127. \n- The rule for large numbers states that only the lower 7 bits in the byte are used for holding the value (0-127). \n- The highest order bit(8th) is used as a flag to indicate that this number spans more than one byte. Therefore, any number over 127 must be encoded using more than one byte. \n  - Example, the number 2680 in the OID '1.3.6.1.4.1.2680.1.2.7.3.2.0' cannot be encoded using a single byte. \n    According to this rule, the number 2680 must be encoded as 0x94 0x78. \n    Since the most significant bit is set in the first byte (0x94), it indicates that number spans to the next byte.\n    Since the most significant bit is not set in the next byte (0x78), it indicates that the number ends at the second byte.\n    The value is derived by appending 7 bits from each of the concatenated bytes i.e (0x14 *128^1) + (0x78 * 128^0) = 2680.",
              },
              string_value: {
                type: 'object',
                description: 'It contains the raw/ascii string value to be sent.',
                properties: {
                  ascii: {
                    type: 'string',
                    description:
                      'It contains the ASCII string to be sent.  As of now it is restricted to 10000 bytes.',
                  },
                  choice: {
                    type: 'string',
                    enum: ['ascii', 'raw'],
                  },
                  raw: {
                    type: 'string',
                    description:
                      'It contains the hex string to be sent.  As of now it is restricted to 10000 bytes.',
                  },
                },
                required: [],
              },
              timeticks_value: {
                type: 'object',
                description: 'Timeticks returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_timeticks_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_timeticks_value_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
              unsigned_integer_value: {
                type: 'object',
                description: 'Unsigned integer value returned for the requested OID.',
                properties: {
                  choice: {
                    type: 'string',
                    enum: ['value', 'values', 'increment', 'decrement'],
                  },
                  decrement: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_unsigned_integer_value_counter',
                  },
                  increment: {
                    $ref: '#/$defs/pattern_flow_snmpv2c_variable_binding_value_unsigned_integer_value_counter',
                  },
                  value: {
                    type: 'integer',
                  },
                  values: {
                    type: 'array',
                    items: {
                      type: 'integer',
                    },
                  },
                },
                required: [],
              },
            },
            required: [],
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_big_counter_value_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_counter_value_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_integer_value_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_ip_address_value_counter: {
        type: 'object',
        description: 'ipv4 counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'string',
          },
          step: {
            type: 'string',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_timeticks_value_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_variable_binding_value_unsigned_integer_value_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      flow_snmpv2c_pdu: {
        type: 'object',
        description: 'This contains the body of the SNMPv2C PDU.',
        properties: {
          error_index: {
            type: 'object',
            description:
              'When Error Status is non-zero,  this field contains a pointer that specifies which object generated the error.  Always zero in a request.',
            properties: {
              choice: {
                type: 'string',
                enum: ['value', 'values', 'increment', 'decrement'],
              },
              decrement: {
                $ref: '#/$defs/pattern_flow_snmpv2c_pdu_error_index_counter',
              },
              increment: {
                $ref: '#/$defs/pattern_flow_snmpv2c_pdu_error_index_counter',
              },
              value: {
                type: 'integer',
              },
              values: {
                type: 'array',
                items: {
                  type: 'integer',
                },
              },
            },
            required: [],
          },
          error_status: {
            type: 'string',
            description:
              'The SNMP agent places an error code in this field in the response message if an error occurred processing the request.',
            enum: [
              'no_error',
              'too_big',
              'no_such_name',
              'bad_value',
              'read_only',
              'gen_err',
              'no_access',
              'wrong_type',
              'wrong_length',
              'wrong_encoding',
              'wrong_value',
              'no_creation',
              'inconsistent_value',
              'resource_unavailable',
              'commit_failed',
              'undo_failed',
              'authorization_error',
              'not_writable',
              'inconsistent_name',
            ],
          },
          request_id: {
            type: 'object',
            description:
              'Identifies a particular SNMP request. \nThis index is echoed back in the response from the SNMP agent, \nallowing the SNMP manager to match an incoming response to the appropriate request.\n\n- Encoding of this field follows ASN.1 X.690(section 8.3) specification.\n  Refer: http://www.itu.int/ITU-T/asn1/',
            properties: {
              choice: {
                type: 'string',
                enum: ['value', 'values', 'increment', 'decrement'],
              },
              decrement: {
                $ref: '#/$defs/pattern_flow_snmpv2c_pdu_request_id_counter',
              },
              increment: {
                $ref: '#/$defs/pattern_flow_snmpv2c_pdu_request_id_counter',
              },
              value: {
                type: 'integer',
              },
              values: {
                type: 'array',
                items: {
                  type: 'integer',
                },
              },
            },
            required: [],
          },
          variable_bindings: {
            type: 'array',
            description: 'A Sequence of variable_bindings.',
            items: {
              $ref: '#/$defs/flow_snmpv2c_variable_binding',
            },
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_pdu_error_index_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_pdu_request_id_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_snmpv2c_version_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ack_num_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_ack_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_fin_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_psh_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_rst_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_syn_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ctl_urg_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_data_offset_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_dst_port_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ecn_cwr_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ecn_echo_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_ecn_ns_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_seq_num_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_src_port_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_tcp_window_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_udp_dst_port_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_udp_length_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_udp_src_port_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vlan_id_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vlan_cfi_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vlan_priority_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vlan_tpid_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vxlan_flags_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vxlan_reserved0_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vxlan_reserved1_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
      pattern_flow_vxlan_vni_counter: {
        type: 'object',
        description: 'integer counter pattern',
        properties: {
          count: {
            type: 'integer',
          },
          start: {
            type: 'integer',
          },
          step: {
            type: 'integer',
          },
        },
        required: [],
      },
    },
  },
};

export const handler = (client: Devknot, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.config.update(body);
};

export default { metadata, tool, handler };
