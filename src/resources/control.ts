// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ControlAPI from './control';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Control extends APIResource {
  /**
   * Sets the operational state of configured resources.
   */
  setState(body: ControlSetStateParams, options?: RequestOptions): APIPromise<ControlSetStateResponse> {
    return this._client.post('/control/state', { body, ...options });
  }

  /**
   * Triggers actions against configured resources.
   */
  triggerAction(
    body: ControlTriggerActionParams,
    options?: RequestOptions,
  ): APIPromise<ControlTriggerActionResponse> {
    return this._client.post('/control/action', { body, ...options });
  }
}

/**
 * In the absence of any fatal errors, a BGP peer can close its BGP connection by
 * sending the NOTIFICATION message with the Error Code Cease. The
 * 'hard_reset_code6_subcode9' subcode for Cease Notification can be used to signal
 * a hard reset that will indicate that Graceful Restart cannot be performed, even
 * when Notification extensions to Graceful Restart procedure is supported.
 */
export interface CeaseError {
  /**
   * The Error Subcode to be sent to the peer in the Cease NOTIFICATION.
   */
  subcode?:
    | 'max_number_prefix_reached_code6_subcode1'
    | 'admin_shutdown_code6_subcode2'
    | 'peer_deleted_code6_subcode3'
    | 'admin_reset_code6_subcode4'
    | 'connection_reject_code6_subcode5'
    | 'other_config_changes_code6_subcode6'
    | 'connection_collision_resolution_code6_subcode7'
    | 'out_of_resources_code6_subcode8'
    | 'bfd_session_down_code6_subcode10'
    | 'hard_reset_code6_subcode9';
}

/**
 * A BGP peer can send NOTIFICATION message with user defined Error Code and Error
 * Subcode.
 */
export interface CustomError {
  /**
   * The Error code to be sent in the NOTIFICATION message to peer.
   */
  code?: number;

  /**
   * The Error Subcode to be sent in the NOTIFICATION message to peer.
   */
  subcode?: number;
}

/**
 * All errors detected while processing the Message Header are indicated by sending
 * the NOTIFICATION message with the Error Code-Message Header Error. The Error
 * Subcode elaborates on the specific nature of the error.
 */
export interface MessageHeaderError {
  /**
   * The Error Subcode indicates the specific type of error encountered during
   * Message Header processing.
   */
  subcode?:
    | 'connection_not_synchronized_code1_subcode1'
    | 'bad_message_length_code1_subcode2'
    | 'bad_message_type_code1_subcode3';
}

/**
 * All errors detected while processing the OPEN message are indicated by sending
 * the NOTIFICATION message with the Error Code-Open Message Error. The Error
 * Subcode elaborates on the specific nature of the error.
 */
export interface OpenMessageError {
  /**
   * The Error Subcode indicates the specific type of error encountered during OPEN
   * message processing.
   */
  subcode?:
    | 'unsupported_version_number_code2_subcode1'
    | 'error_peer_as_code2_subcode2'
    | 'error_bgp_id_code2_subcode3'
    | 'unsupported_optional_parameter_code2_subcode4'
    | 'auth_failed_code2_subcode5'
    | 'unsupported_hold_time_code2_subcode6'
    | 'unsupported_capability_code2_subcode7';
}

/**
 * All errors detected while processing the UPDATE message are indicated by sending
 * the NOTIFICATION message with the Error Code-Update Message Error. The Error
 * Subcode elaborates on the specific nature of the error.
 */
export interface UpdateMessageError {
  /**
   * The Error Subcode, the specific type of error encountered during UPDATE
   * processing.
   */
  subcode?:
    | 'malformed_attrib_list_code3_subcode1'
    | 'unrecognized_wellknown_attrib_code3_subcode2'
    | 'wellknown_attrib_missing_code3_subcode3'
    | 'attrib_flags_error_code3_subcode4'
    | 'attrib_length_error_code3_subcode5'
    | 'invalid_origin_attrib_code3_subcode6'
    | 'as_routing_loop_code3_subcode7'
    | 'invalid_nhop_attrib_code3_subcode8'
    | 'error_optional_attrib_code3_subcode9'
    | 'invalid_network_field_code3_subcode10'
    | 'abnormal_aspath_code3_subcode11';
}

/**
 * A list of warnings that have occurred while executing the request.
 */
export interface ControlSetStateResponse {
  /**
   * A list of any system specific warnings that have occurred while executing the
   * request.
   */
  warnings?: Array<string>;
}

/**
 * Response for action triggered against configured resources along with warnings.
 */
export interface ControlTriggerActionResponse {
  /**
   * Response for action triggered against configured resources.
   */
  response?: ControlTriggerActionResponse.Response;

  /**
   * List of warnings generated while triggering specified action
   */
  warnings?: Array<string>;
}

export namespace ControlTriggerActionResponse {
  /**
   * Response for action triggered against configured resources.
   */
  export interface Response {
    choice: 'protocol';

    /**
     * Response for actions associated with protocols on configured resources.
     */
    protocol?: Response.Protocol;
  }

  export namespace Response {
    /**
     * Response for actions associated with protocols on configured resources.
     */
    export interface Protocol {
      choice: 'ipv4' | 'ipv6';

      /**
       * Response for actions associated with IPv4 on configured resources.
       */
      ipv4?: Protocol.Ipv4;

      /**
       * Response for actions associated with IPv6 on configured resources.
       */
      ipv6?: Protocol.Ipv6;
    }

    export namespace Protocol {
      /**
       * Response for actions associated with IPv4 on configured resources.
       */
      export interface Ipv4 {
        choice: 'ping';

        /**
         * Response for ping initiated between multiple source and destination pairs.
         */
        ping?: Ipv4.Ping;
      }

      export namespace Ipv4 {
        /**
         * Response for ping initiated between multiple source and destination pairs.
         */
        export interface Ping {
          /**
           * List of responses for IPv4 ping responses.
           */
          responses?: Array<Ping.Response>;
        }

        export namespace Ping {
          /**
           * Response for ping initiated between a single source and destination pair.
           */
          export interface Response {
            /**
             * Destination IPv4 address used for ping.
             */
            dst_ip: string;

            /**
             * Result of the ping request.
             */
            result: 'succeeded' | 'failed';

            /**
             * Name of source IPv4 interface used for ping.
             *
             * x-constraint:
             *
             * - /components/schemas/Device.Ipv4/properties/name
             */
            src_name: string;
          }
        }
      }

      /**
       * Response for actions associated with IPv6 on configured resources.
       */
      export interface Ipv6 {
        choice: 'ping';

        /**
         * Response for ping initiated between multiple source and destination pairs.
         */
        ping?: Ipv6.Ping;
      }

      export namespace Ipv6 {
        /**
         * Response for ping initiated between multiple source and destination pairs.
         */
        export interface Ping {
          /**
           * List of responses for IPv6 ping responses.
           */
          responses?: Array<Ping.Response>;
        }

        export namespace Ping {
          /**
           * Response for ping initiated between a single source and destination pair.
           */
          export interface Response {
            /**
             * Destination IPv6 address used for ping.
             */
            dst_ip: string;

            /**
             * Result of the ping request.
             */
            result: 'succeeded' | 'failed';

            /**
             * Name of source IPv6 interface used for ping.
             *
             * x-constraint:
             *
             * - /components/schemas/Device.Ipv6/properties/name
             */
            src_name: string;
          }
        }
      }
    }
  }
}

export interface ControlSetStateParams {
  choice: 'port' | 'protocol' | 'traffic';

  /**
   * States associated with configured ports.
   */
  port?: ControlSetStateParams.Port;

  /**
   * States associated with protocols on configured resources.
   */
  protocol?: ControlSetStateParams.Protocol;

  /**
   * States associated with configured flows
   */
  traffic?: ControlSetStateParams.Traffic;
}

export namespace ControlSetStateParams {
  /**
   * States associated with configured ports.
   */
  export interface Port {
    choice: 'link' | 'capture';

    /**
     * Sets the capture state of configured ports
     */
    capture?: Port.Capture;

    /**
     * Sets the link of configured ports.
     */
    link?: Port.Link;
  }

  export namespace Port {
    /**
     * Sets the capture state of configured ports
     */
    export interface Capture {
      /**
       * The capture state.
       */
      state: 'start' | 'stop';

      /**
       * The names of ports to which the capture state will be applied to. If the list of
       * port_names is empty or null the state will be applied to all configured ports.
       * If the list is not empty any port that is not included in the list of port_names
       * MUST be ignored and not included in the state change.
       *
       * x-constraint:
       *
       * - /components/schemas/Port/properties/name
       */
      port_names?: Array<string>;
    }

    /**
     * Sets the link of configured ports.
     */
    export interface Link {
      /**
       * The link state.
       */
      state: 'up' | 'down';

      /**
       * The names of target ports. An empty or null list will target all ports.
       *
       * x-constraint:
       *
       * - /components/schemas/Port/properties/name
       */
      port_names?: Array<string>;
    }
  }

  /**
   * States associated with protocols on configured resources.
   */
  export interface Protocol {
    choice: 'all' | 'route' | 'lacp' | 'bgp' | 'isis' | 'ospfv2' | 'ospfv3';

    /**
     * Sets all configured protocols to `start` or `stop` state. Setting protocol state
     * to `start` shall be a no-op if preceding `set_config` API call was made with
     * `config.options.protocol_options.auto_start_all` set to `true` or if all the
     * configured protocols are already started.
     */
    all?: Protocol.All;

    /**
     * Sets state of configured BGP peers.
     */
    bgp?: Protocol.Bgp;

    /**
     * Sets state of configured ISIS routers.
     */
    isis?: Protocol.Isis;

    /**
     * Sets state of configured LACP
     */
    lacp?: Protocol.Lacp;

    /**
     * Sets state of configured OSPFv2 routers.
     */
    ospfv2?: Protocol.Ospfv2;

    /**
     * Sets state of configured OSPFv3 routers.
     */
    ospfv3?: Protocol.Ospfv3;

    /**
     * Sets state of configured RoCEv2 peers.
     */
    rocev2?: Protocol.Rocev2;

    /**
     * Sets the state of configured routes
     */
    route?: Protocol.Route;
  }

  export namespace Protocol {
    /**
     * Sets all configured protocols to `start` or `stop` state. Setting protocol state
     * to `start` shall be a no-op if preceding `set_config` API call was made with
     * `config.options.protocol_options.auto_start_all` set to `true` or if all the
     * configured protocols are already started.
     */
    export interface All {
      /**
       * Protocol states
       */
      state: 'start' | 'stop';
    }

    /**
     * Sets state of configured BGP peers.
     */
    export interface Bgp {
      choice: 'peers';

      /**
       * Sets state of configured BGP peers.
       */
      peers?: Bgp.Peers;
    }

    export namespace Bgp {
      /**
       * Sets state of configured BGP peers.
       */
      export interface Peers {
        /**
         * The desired state of BGP peer. If the desired state is 'up', underlying IP
         * interface(s) would be brought up automatically (if not already up), would
         * attempt to bring up the BGP session(s) and advertise route(s), if configured. If
         * the desired state is 'down', BGP session(s) would be brought down.
         */
        state: 'up' | 'down';

        /**
         * The names of BGP peers for which the state has to be applied. An empty or null
         * list will control all BGP peers.
         *
         * x-constraint:
         *
         * - /components/schemas/Bgp.V4Peer/properties/name
         * - /components/schemas/Bgp.V6Peer/properties/name
         */
        peer_names?: Array<string>;
      }
    }

    /**
     * Sets state of configured ISIS routers.
     */
    export interface Isis {
      choice: 'routers';

      /**
       * Sets state of configured ISIS routers.
       */
      routers?: Isis.Routers;
    }

    export namespace Isis {
      /**
       * Sets state of configured ISIS routers.
       */
      export interface Routers {
        /**
         * The desired state of ISIS router. If the desired state is 'up', would attempt to
         * bring up the ISIS session(s) with respective peer(s) and advertise route(s), if
         * configured. If the desired state is 'down', would bring down ISIS session(s)
         * with respective peer(s).
         */
        state: 'up' | 'down';

        /**
         * The names of ISIS routers for which the state has to be applied. An empty or
         * null list will control all ISIS routers.
         *
         * x-constraint:
         *
         * - /components/schemas/Device.IsisRouter/properties/name
         */
        router_names?: Array<string>;
      }
    }

    /**
     * Sets state of configured LACP
     */
    export interface Lacp {
      choice: 'admin' | 'member_ports';

      /**
       * Sets admin state of LACP configured on LAG members
       */
      admin?: Lacp.Admin;

      /**
       * Sets state of LACP member ports configured on LAG.
       */
      member_ports?: Lacp.MemberPorts;
    }

    export namespace Lacp {
      /**
       * Sets admin state of LACP configured on LAG members
       */
      export interface Admin {
        /**
         * The LACP Member admin state. 'up' will send LACPDUs with 'sync' flag set on
         * selected member ports. 'down' will send LACPDUs with 'sync' flag unset on
         * selected member ports.
         */
        state: 'up' | 'down';

        /**
         * The names of LAG members (ports) for which the state has to be applied. An empty
         * or null list will control all LAG members.
         *
         * x-constraint:
         *
         * - /components/schemas/Port/properties/name
         */
        lag_member_names?: Array<string>;
      }

      /**
       * Sets state of LACP member ports configured on LAG.
       */
      export interface MemberPorts {
        /**
         * The desired LACP member port state.
         */
        state: 'up' | 'down';

        /**
         * The names of LAG members (ports) for which the state has to be applied. An empty
         * or null list will control all LAG members.
         *
         * x-constraint:
         *
         * - /components/schemas/Port/properties/name
         */
        lag_member_names?: Array<string>;
      }
    }

    /**
     * Sets state of configured OSPFv2 routers.
     */
    export interface Ospfv2 {
      choice: 'routers';

      /**
       * Sets state of configured OSPFv2 routers.
       */
      routers?: Ospfv2.Routers;
    }

    export namespace Ospfv2 {
      /**
       * Sets state of configured OSPFv2 routers.
       */
      export interface Routers {
        /**
         * The desired state of OSPFv2 router. If the desired state is 'up', would attempt
         * to bring up the OSPFv2 session(s) with respective peer(s) and advertise
         * route(s), if configured. If the desired state is 'down', would bring down OSPFv2
         * session(s) with respective peer(s).
         */
        state: 'up' | 'down';

        /**
         * The names of OSPFv2 routers for which the state has to be applied. An empty or
         * null list will control all OSPFv2 routers.
         *
         * x-constraint:
         *
         * - /components/schemas/Device.Ospfv2/properties/name
         */
        router_names?: Array<string>;
      }
    }

    /**
     * Sets state of configured OSPFv3 routers.
     */
    export interface Ospfv3 {
      choice: 'routers';

      /**
       * Sets state of configured OSPFv3 routers.
       */
      routers?: Ospfv3.Routers;
    }

    export namespace Ospfv3 {
      /**
       * Sets state of configured OSPFv3 routers.
       */
      export interface Routers {
        /**
         * The desired state of OSPFv3 router. If the desired state is 'up', would attempt
         * to bring up the OSPFv3 session(s) with respective peer(s) and advertise
         * route(s), if configured. If the desired state is 'down', would bring down OSPFv3
         * session(s) with respective peer(s).
         */
        state: 'up' | 'down';

        /**
         * The names of OSPFv3 routers for which the state has to be applied. An empty or
         * null list will control all OSPFv3 routers.
         *
         * x-constraint:
         *
         * - /components/schemas/Ospfv3.RouterInstance/properties/name
         */
        router_names?: Array<string>;
      }
    }

    /**
     * Sets state of configured RoCEv2 peers.
     */
    export interface Rocev2 {
      choice: 'peers';

      /**
       * Sets state of configured RoCEv2 peers.
       */
      peers?: Rocev2.Peers;
    }

    export namespace Rocev2 {
      /**
       * Sets state of configured RoCEv2 peers.
       */
      export interface Peers {
        /**
         * The desired state of RoCEv2 peer. If the desired state is 'up', underlying IP
         * interface(s) would be brought up automatically (if not already up), would
         * attempt to bring up the RoCEv2 session(s). If the desired state is 'down',
         * RoCEv2 session(s) would be brought down.
         */
        state: 'up' | 'down';

        /**
         * The names of RoCEv2 peers for which the state has to be applied. An empty or
         * null list will control all RoCEv2 peers.
         *
         * x-constraint:
         *
         * - /components/schemas/Rocev2.V4Peer/properties/name
         * - /components/schemas/Rocev2.V6Peer/properties/name
         */
        peer_names?: Array<string>;
      }
    }

    /**
     * Sets the state of configured routes
     */
    export interface Route {
      /**
       * Route states
       */
      state: 'withdraw' | 'advertise';

      /**
       * The names of device route objects to control. If no names are specified then all
       * route objects that match the x-constraint will be affected.
       *
       * x-constraint:
       *
       * - /components/schemas/Bgp.V4RouteRange/properties/name
       * - /components/schemas/Bgp.V6RouteRange/properties/name
       * - /components/schemas/Isis.V4RouteRange/properties/name
       * - /components/schemas/Isis.V6RouteRange/properties/name
       * - /components/schemas/Ospfv2.V4RouteRange/properties/name
       * - /components/schemas/Ospfv3.V6RouteRange/properties/name
       */
      names?: Array<string>;
    }
  }

  /**
   * States associated with configured flows
   */
  export interface Traffic {
    choice: 'flow_transmit';

    /**
     * Provides state control of flow transmission.
     */
    flow_transmit?: Traffic.FlowTransmit;
  }

  export namespace Traffic {
    /**
     * Provides state control of flow transmission.
     */
    export interface FlowTransmit {
      /**
       * The transmit state. If the value of the state property is 'start' then all flows
       * defined by the 'flow_names' property will be started and the metric counters
       * MUST be cleared prior to starting the flow(s). If the value of the state
       * property is 'stop' then all flows defined by the 'flow_names' property will be
       * stopped and the metric counters MUST NOT be cleared. If the value of the state
       * property is 'pause' then all flows defined by the 'flow_names' property will be
       * paused and the metric counters MUST NOT be cleared. If the value of the state
       * property is 'resume' then any paused flows defined by the 'flow_names' property
       * will start transmit at the point at which they were paused. Any flow that is
       * stopped will start transmit at the beginning of the flow. The flow(s) MUST NOT
       * have their metric counters cleared.
       */
      state: 'start' | 'stop' | 'pause' | 'resume';

      /**
       * The names of flows to which the transmit state will be applied to. If the list
       * of flow_names is empty or null the state will be applied to all configured
       * flows. If the list is not empty any flow that is not included in the list of
       * flow_names MUST be ignored and not included in the state change.
       *
       * x-constraint:
       *
       * - /components/schemas/Flow/properties/name
       */
      flow_names?: Array<string>;
    }
  }
}

export interface ControlTriggerActionParams {
  choice: 'protocol';

  /**
   * Actions associated with protocols on configured resources.
   */
  protocol?: ControlTriggerActionParams.Protocol;
}

export namespace ControlTriggerActionParams {
  /**
   * Actions associated with protocols on configured resources.
   */
  export interface Protocol {
    choice: 'ipv4' | 'ipv6' | 'bgp';

    /**
     * Actions associated with BGP on configured resources.
     */
    bgp?: Protocol.Bgp;

    /**
     * Actions associated with IPv4 on configured resources.
     */
    ipv4?: Protocol.Ipv4;

    /**
     * Actions associated with IPv6 on configured resources.
     */
    ipv6?: Protocol.Ipv6;
  }

  export namespace Protocol {
    /**
     * Actions associated with BGP on configured resources.
     */
    export interface Bgp {
      choice: 'notification' | 'initiate_graceful_restart';

      /**
       * Initiates BGP Graceful Restart process for the selected BGP peers. If no name is
       * specified then Graceful Restart will be sent to all configured BGP peers. To
       * emulate scenarios where a peer sends a Notification and stops the session, an
       * optional Notification object is included. If the remote peer and the local peer
       * are both configured to perform Graceful Restart for Notification triggered
       * session , this will result in Graceful Restart scenario to be triggered as per
       * RFC8538.
       */
      initiate_graceful_restart?: Bgp.InitiateGracefulRestart;

      /**
       * A NOTIFICATION message is sent when an error is detected with the BGP session,
       * such as hold timer expiring, misconfigured AS number or a BGP session reset is
       * requested. This causes the BGP connection to close. Send explicit NOTIFICATIONs
       * for list of specified BGP peers. If a user wants to send custom Error Code and
       * Error Subcode the custom object should be configured. A user can send IANA
       * defined BGP NOTIFICATIONs according to
       * https://www.iana.org/assignments/bgp-parameters/bgp-parameters.xhtml.
       */
      notification?: Bgp.Notification;
    }

    export namespace Bgp {
      /**
       * Initiates BGP Graceful Restart process for the selected BGP peers. If no name is
       * specified then Graceful Restart will be sent to all configured BGP peers. To
       * emulate scenarios where a peer sends a Notification and stops the session, an
       * optional Notification object is included. If the remote peer and the local peer
       * are both configured to perform Graceful Restart for Notification triggered
       * session , this will result in Graceful Restart scenario to be triggered as per
       * RFC8538.
       */
      export interface InitiateGracefulRestart {
        /**
         * Send a Notification to the peer as per configured parameters when initially
         * bringing down a session as per configured parameters.
         */
        notification?: InitiateGracefulRestart.Notification;

        /**
         * The names of device BGP peers objects to control.
         *
         * x-constraint:
         *
         * - /components/schemas/Bgp.V4Peer/properties/name
         * - /components/schemas/Bgp.V6Peer/properties/name
         */
        peer_names?: Array<string>;

        /**
         * Duration (in seconds) after which selected BGP peers will initiate Graceful
         * restart by sending the Open Message with Restart State bit set in the Graceful
         * Restart capability.
         */
        restart_delay?: number;
      }

      export namespace InitiateGracefulRestart {
        /**
         * Send a Notification to the peer as per configured parameters when initially
         * bringing down a session as per configured parameters.
         */
        export interface Notification {
          /**
           * In the absence of any fatal errors, a BGP peer can close its BGP connection by
           * sending the NOTIFICATION message with the Error Code Cease. The
           * 'hard_reset_code6_subcode9' subcode for Cease Notification can be used to signal
           * a hard reset that will indicate that Graceful Restart cannot be performed, even
           * when Notification extensions to Graceful Restart procedure is supported.
           */
          cease?: ControlAPI.CeaseError;

          /**
           * Each BGP NOTIFICATION message includes an Error Code field indicating what type
           * of problem occurred. For certain Error Codes, an Error Subcode field provides
           * additional details about the specific nature of the problem. The choice value
           * will provide the Error Code used in NOTIFICATION message. The Subcode can be set
           * for each of the corresponding errors except for Hold Timer Expired error and BGP
           * Finite State Machine error. In both of these cases Subcode 0 will be sent. If a
           * user wants to use non zero Sub Code then custom choice can be used.
           */
          choice?:
            | 'cease'
            | 'message_header_error'
            | 'open_message_error'
            | 'update_message_error'
            | 'hold_timer_expired'
            | 'finite_state_machine_error'
            | 'custom';

          /**
           * A BGP peer can send NOTIFICATION message with user defined Error Code and Error
           * Subcode.
           */
          custom?: ControlAPI.CustomError;

          /**
           * Any error detected by the BGP Finite State Machine (e.g., receipt of an
           * unexpected event) is indicated by sending the NOTIFICATION message with the
           * Error Code-Finite State Machine Error(Error Code 5). The Sub Code used is 0. If
           * a user wants to use non zero Sub Code then CustomError can be used.
           */
          finite_state_machine_error?: unknown;

          /**
           * If a system does not receive successive KEEPALIVE, UPDATE, and/or NOTIFICATION
           * messages within the period specified in the Hold Time field of the OPEN message,
           * then the NOTIFICATION message with the Hold Timer Expired Error Code(Error
           * Code 4) is sent and the BGP connection is closed. The Sub Code used is 0. If a
           * user wants to use non zero Sub Code then CustomError can be used.
           */
          hold_timer_expired?: unknown;

          /**
           * All errors detected while processing the Message Header are indicated by sending
           * the NOTIFICATION message with the Error Code-Message Header Error. The Error
           * Subcode elaborates on the specific nature of the error.
           */
          message_header_error?: ControlAPI.MessageHeaderError;

          /**
           * All errors detected while processing the OPEN message are indicated by sending
           * the NOTIFICATION message with the Error Code-Open Message Error. The Error
           * Subcode elaborates on the specific nature of the error.
           */
          open_message_error?: ControlAPI.OpenMessageError;

          /**
           * All errors detected while processing the UPDATE message are indicated by sending
           * the NOTIFICATION message with the Error Code-Update Message Error. The Error
           * Subcode elaborates on the specific nature of the error.
           */
          update_message_error?: ControlAPI.UpdateMessageError;
        }
      }

      /**
       * A NOTIFICATION message is sent when an error is detected with the BGP session,
       * such as hold timer expiring, misconfigured AS number or a BGP session reset is
       * requested. This causes the BGP connection to close. Send explicit NOTIFICATIONs
       * for list of specified BGP peers. If a user wants to send custom Error Code and
       * Error Subcode the custom object should be configured. A user can send IANA
       * defined BGP NOTIFICATIONs according to
       * https://www.iana.org/assignments/bgp-parameters/bgp-parameters.xhtml.
       */
      export interface Notification {
        /**
         * In the absence of any fatal errors, a BGP peer can close its BGP connection by
         * sending the NOTIFICATION message with the Error Code Cease. The
         * 'hard_reset_code6_subcode9' subcode for Cease Notification can be used to signal
         * a hard reset that will indicate that Graceful Restart cannot be performed, even
         * when Notification extensions to Graceful Restart procedure is supported.
         */
        cease?: ControlAPI.CeaseError;

        /**
         * Each BGP NOTIFICATION message includes an Error Code field indicating what type
         * of problem occurred. For certain Error Codes, an Error Subcode field provides
         * additional details about the specific nature of the problem. The choice value
         * will provide the Error Code used in NOTIFICATION message. The Subcode can be set
         * for each of the corresponding errors except for Hold Timer Expired error and BGP
         * Finite State Machine error. In both of these cases Subcode 0 will be sent. If a
         * user wants to use non zero Sub Code then custom choice can be used.
         */
        choice?:
          | 'cease'
          | 'message_header_error'
          | 'open_message_error'
          | 'update_message_error'
          | 'hold_timer_expired'
          | 'finite_state_machine_error'
          | 'custom';

        /**
         * A BGP peer can send NOTIFICATION message with user defined Error Code and Error
         * Subcode.
         */
        custom?: ControlAPI.CustomError;

        /**
         * Any error detected by the BGP Finite State Machine (e.g., receipt of an
         * unexpected event) is indicated by sending the NOTIFICATION message with the
         * Error Code-Finite State Machine Error(Error Code 5). The Sub Code used is 0. If
         * a user wants to use non zero Sub Code then CustomError can be used.
         */
        finite_state_machine_error?: unknown;

        /**
         * If a system does not receive successive KEEPALIVE, UPDATE, and/or NOTIFICATION
         * messages within the period specified in the Hold Time field of the OPEN message,
         * then the NOTIFICATION message with the Hold Timer Expired Error Code(Error
         * Code 4) is sent and the BGP connection is closed. The Sub Code used is 0. If a
         * user wants to use non zero Sub Code then CustomError can be used.
         */
        hold_timer_expired?: unknown;

        /**
         * All errors detected while processing the Message Header are indicated by sending
         * the NOTIFICATION message with the Error Code-Message Header Error. The Error
         * Subcode elaborates on the specific nature of the error.
         */
        message_header_error?: ControlAPI.MessageHeaderError;

        /**
         * The names of BGP Peers to send NOTIFICATION to. If no name is specified then
         * NOTIFICATION will be sent to all configured BGP peers.
         *
         * x-constraint:
         *
         * - /components/schemas/Bgp.V4Peer/properties/name
         * - /components/schemas/Bgp.V6Peer/properties/name
         */
        names?: Array<string>;

        /**
         * All errors detected while processing the OPEN message are indicated by sending
         * the NOTIFICATION message with the Error Code-Open Message Error. The Error
         * Subcode elaborates on the specific nature of the error.
         */
        open_message_error?: ControlAPI.OpenMessageError;

        /**
         * All errors detected while processing the UPDATE message are indicated by sending
         * the NOTIFICATION message with the Error Code-Update Message Error. The Error
         * Subcode elaborates on the specific nature of the error.
         */
        update_message_error?: ControlAPI.UpdateMessageError;
      }
    }

    /**
     * Actions associated with IPv4 on configured resources.
     */
    export interface Ipv4 {
      choice: 'ping';

      /**
       * Request for initiating ping between multiple source and destination pairs.
       */
      ping?: Ipv4.Ping;
    }

    export namespace Ipv4 {
      /**
       * Request for initiating ping between multiple source and destination pairs.
       */
      export interface Ping {
        /**
         * List of IPv4 ping requests.
         */
        requests?: Array<Ping.Request>;
      }

      export namespace Ping {
        /**
         * Under Review: Most ping request parameters are still TBD.
         *
         * Request for initiating ping between a single source and destination pair. For
         * ping request, 1 IPv4 ICMP Echo Request shall be sent and wait for ping response
         * to either succeed or time out. The API wait timeout for each request shall be
         * 300ms.
         */
        export interface Request {
          /**
           * Destination IPv4 address to ping.
           */
          dst_ip?: string;

          /**
           * Name of source IPv4 interface to be used.
           *
           * x-constraint:
           *
           * - /components/schemas/Device.Ipv4/properties/name
           */
          src_name?: string;
        }
      }
    }

    /**
     * Actions associated with IPv6 on configured resources.
     */
    export interface Ipv6 {
      choice: 'ping';

      /**
       * Request for initiating ping between multiple source and destination pairs.
       */
      ping?: Ipv6.Ping;
    }

    export namespace Ipv6 {
      /**
       * Request for initiating ping between multiple source and destination pairs.
       */
      export interface Ping {
        /**
         * List of IPv6 ping requests.
         */
        requests?: Array<Ping.Request>;
      }

      export namespace Ping {
        /**
         * Under Review: Most ping request parameters are still TBD.
         *
         * Request for initiating ping between a single source and destination pair. For
         * ping request, 1 IPv6 ICMP Echo Request shall be sent and wait for ping response
         * to either succeed or time out. The API wait timeout for each request shall be
         * 300ms.
         */
        export interface Request {
          /**
           * Destination IPv6 address to ping.
           */
          dst_ip?: string;

          /**
           * Name of source IPv6 interface to be used.
           *
           * x-constraint:
           *
           * - /components/schemas/Device.Ipv6/properties/name
           */
          src_name?: string;
        }
      }
    }
  }
}

export declare namespace Control {
  export {
    type CeaseError as CeaseError,
    type CustomError as CustomError,
    type MessageHeaderError as MessageHeaderError,
    type OpenMessageError as OpenMessageError,
    type UpdateMessageError as UpdateMessageError,
    type ControlSetStateResponse as ControlSetStateResponse,
    type ControlTriggerActionResponse as ControlTriggerActionResponse,
    type ControlSetStateParams as ControlSetStateParams,
    type ControlTriggerActionParams as ControlTriggerActionParams,
  };
}
