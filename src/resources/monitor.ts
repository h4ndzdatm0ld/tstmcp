// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MonitorAPI from './monitor';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Monitor extends APIResource {
  capture(body: MonitorCaptureParams, options?: RequestOptions): APIPromise<Response> {
    return this._client.post('/monitor/capture', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'application/octet-stream' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  createMetrics(
    body: MonitorCreateMetricsParams,
    options?: RequestOptions,
  ): APIPromise<MonitorCreateMetricsResponse> {
    return this._client.post('/monitor/metrics', { body, ...options });
  }

  createStates(
    body: MonitorCreateStatesParams,
    options?: RequestOptions,
  ): APIPromise<MonitorCreateStatesResponse> {
    return this._client.post('/monitor/states', { body, ...options });
  }
}

/**
 * One bit value of ISIS Prefix attributes for the extended IPv4 and IPv6
 * reachability. https://www.rfc-editor.org/rfc/rfc7794.html.
 */
export interface IsisLspPrefixAttributes {
  /**
   * Node Flag (Bit 2). Set when the prefix identifies the advertising router, i.e.,
   * the prefix is a host prefix advertising a globally reachable address typically
   * associated with a loopback address.
   */
  n_flag?: boolean;

  /**
   * Readvertisement flag (Bit 1). Set when the prefix has been leaked from one level
   * to another (upwards or downwards).
   */
  r_flag?: boolean;

  /**
   * External prefix flag (Bit 0). Set if the prefix has been redistributed from
   * another protocol. This includes the case where multiple virtual routers are
   * supported and the source of the redistributed prefix is another IS-IS instance.
   */
  x_flag?: boolean;
}

/**
 * This contains the properties of IS-IS Prefix-SID and its attributes for the
 * extended Ipv4 and Ipv6 reachability. Refernce:
 * https://datatracker.ietf.org/doc/html/rfc8667#name-prefix-segment-identifier-p.
 */
export interface IsisLspPrefixSid {
  /**
   * The Isis may use various algorithms when calculating reachability to other nodes
   * or to prefixes attached to these nodes.
   */
  algorithm?: number;

  /**
   * Flags associated with Prefix Segment-ID.
   */
  flags?: IsisLspPrefixSid.Flags;

  /**
   * One or more SIDs/Indices are the SID/Label values associated with the IGP Prefix
   * segment attached to the specific IPv4 or IPv6 prefix.
   */
  sids?: Array<number>;
}

export namespace IsisLspPrefixSid {
  /**
   * Flags associated with Prefix Segment-ID.
   */
  export interface Flags {
    /**
     * Explicit-Null flag. When set, any upstream neighbor of the Prefix-SID originator
     * MUST replace the Prefix-SID with a Prefix-SID having an Explicit-NULL value (0
     * for IPv4 and 2 for IPv6) before forwarding the packet.
     */
    e_flag?: boolean;

    /**
     * Local flag. When set, the value/index carried by the Prefix-SID has local
     * significance.
     */
    l_flag?: boolean;

    /**
     * Node flag. When set, the Prefix-SID refers to the router identified by the
     * prefix. Typically, the N-Flag is set on Prefix-SIDs attached to a router
     * loopback address.
     */
    n_flag?: boolean;

    /**
     * Penultimate-Hop-Popping flag. When set, then the penultimate hop MUST NOT pop
     * the Prefix-SID before delivering the packet to the node that advertised the
     * Prefix-SID.
     */
    p_flag?: boolean;

    /**
     * Readvertisment flag. When set, the prefix to which this Prefix-SID is attached,
     * has been propagated by the router either from another level or from
     * redistribution.
     */
    r_flag?: boolean;

    /**
     * Value flag. When set, the Prefix-SID carries avalue (instead of an index).
     */
    v_flag?: boolean;
  }
}

/**
 * This group defines attributes of an IPv4 standard prefix.
 */
export interface IsisLspV4Prefix {
  /**
   * ISIS default metric value.
   */
  default_metric?: number;

  /**
   * An IPv4 unicast prefix reachable via the originator of this LSP.
   */
  ipv4_address?: string;

  /**
   * The origin of the advertised route-internal or external to the ISIS area.
   * Options include the following: Internal-for intra-area routes, through Level 1
   * LSPs. External-for inter-area routes redistributed within L1, through Level 1
   * LSPs.
   */
  origin_type?: 'internal' | 'external';

  /**
   * The length of the IPv4 prefix.
   */
  prefix_length?: number;

  /**
   * Up (0)-used when a prefix is initially advertised within the ISIS L3 hierarchy,
   * and for all other prefixes in L1 and L2 LSPs. (default) Down (1)-used when an
   * L1/L2 router advertises L2 prefixes in L1 LSPs. The prefixes are being
   * advertised from a higher level (L2) down to a lower level (L1).
   */
  redistribution_type?: 'up' | 'down';
}

/**
 * The container for latency metrics. The min/max/avg values are dependent on the
 * type of latency measurement mode that is configured. The container will be empty
 * if the latency has not been configured for the flow.
 */
export interface MetricLatency {
  /**
   * Average latency in nanoseconds
   */
  average_ns?: number;

  /**
   * Maximum latency in nanoseconds
   */
  maximum_ns?: number;

  /**
   * Minimum latency in nanoseconds
   */
  minimum_ns?: number;
}

/**
 * The container for timestamp metrics. The container will be empty if the
 * timestamp has not been configured for the flow.
 */
export interface MetricTimestamp {
  /**
   * First timestamp in nanoseconds
   */
  first_timestamp_ns?: number;

  /**
   * Last timestamp in nanoseconds
   */
  last_timestamp_ns?: number;
}

/**
 * Attributes in LSA Header.
 */
export interface Ospfv2LsaHeader {
  /**
   * The router ID (in the IPv4 format) of the router that originated the LSA.
   */
  advertising_router_id?: string;

  /**
   * The time since the LSA's generation in seconds.
   */
  age?: number;

  /**
   * LSA ID in the IPv4 format. The Link State ID for the specified LSA type.
   */
  lsa_id?: string;

  /**
   * The optional bits.
   */
  option_bits?: number;

  /**
   * Sequence number to detect old and duplicate LSAs. The greater the sequence
   * number the more recent the LSA.
   */
  sequence_number?: number;
}

/**
 * Attributes in LSA Header.
 */
export interface Ospfv3LsaHeader {
  /**
   * The router ID (in the IPv4 format) of the router that originated the LSA.
   */
  advertising_router_id?: string;

  /**
   * The time since the LSA's generation in seconds.
   */
  age?: number;

  /**
   * LSA ID in the IPv4 format. The Link State ID for the specified LSA type.
   */
  lsa_id?: string;

  /**
   * Sequence number to detect old and duplicate LSAs. The greater the sequence
   * number the more recent the LSA.
   */
  sequence_number?: number;
}

/**
 * This attribute identifies the autonomous systems through which routing
 * information carried in this UPDATE message has passed.
 */
export interface ResultBgpAsPath {
  /**
   * AS Path segments present in the received AS Path attribute.
   */
  segments?: Array<ResultBgpAsPath.Segment>;
}

export namespace ResultBgpAsPath {
  /**
   * Configuration for a single BGP AS path segment
   */
  export interface Segment {
    /**
     * The AS numbers in this AS path segment.
     */
    as_numbers?: Array<number>;

    /**
     * AS sequence is the most common type of AS_PATH, it contains the list of ASNs
     * starting with the most recent ASN being added read from left to right. The other
     * three AS_PATH types are used for Confederations - AS_SET is the type of AS_PATH
     * attribute that summarizes routes using using the aggregate-address command,
     * allowing AS_PATHs to be summarized in the update as well. - AS_CONFED_SEQ gives
     * the list of ASNs in the path starting with the most recent ASN to be added
     * reading left to right - AS_CONFED_SET will allow summarization of multiple AS
     * PATHs to be sent in BGP Updates.
     */
    type?: 'as_seq' | 'as_set' | 'as_confed_seq' | 'as_confed_set';
  }
}

/**
 * BGP communities provide additional capability for tagging routes and for
 * modifying BGP routing policy on upstream and downstream routers. BGP community
 * is a 32-bit number which is broken into 16-bit AS number and a 16-bit custom
 * value.
 */
export interface ResultBgpCommunity {
  /**
   * Last two octets of the community value.
   */
  as_custom?: number;

  /**
   * First two octets of 32 bit community AS number.
   */
  as_number?: number;

  /**
   * The type of community AS number. If community type is manual_as_number then
   * as_number and as_custom will be available.
   */
  type?:
    | 'manual_as_number'
    | 'no_export'
    | 'no_advertised'
    | 'no_export_subconfed'
    | 'llgr_stale'
    | 'no_llgr';
}

/**
 * Each received Extended Community attribute is available for retrieval in two
 * forms. Support of the 'raw' format in which all 8 bytes (16 hex characters) is
 * always present and available for use. In addition, if supported by the
 * implementation, the Extended Community attribute may also be retrieved in the
 * 'structured' format which is an optional field.
 */
export interface ResultExtendedCommunity {
  /**
   * The raw byte contents of the 8 bytes received in the Extended Community as 16
   * hex characters.
   */
  raw?: string;

  /**
   * The Extended Communities Attribute is a optional BGP attribute,defined in
   * RFC4360 with the Type Code 16. Community and Extended Communities attributes are
   * utilized to trigger routing decisions, such as acceptance, rejection,
   * preference, or redistribution. An extended community is an 8-bytes value. It is
   * divided into two main parts. The first 2 bytes of the community encode a type
   * and optonal sub-type field. The last 6 bytes (or 7 bytes for types without a
   * sub-type) carry a unique set of data in a format defined by the type and
   * optional sub-type field. Extended communities provide a larger range for
   * grouping or categorizing communities.
   */
  structured?: ResultExtendedCommunity.Structured;
}

export namespace ResultExtendedCommunity {
  /**
   * The Extended Communities Attribute is a optional BGP attribute,defined in
   * RFC4360 with the Type Code 16. Community and Extended Communities attributes are
   * utilized to trigger routing decisions, such as acceptance, rejection,
   * preference, or redistribution. An extended community is an 8-bytes value. It is
   * divided into two main parts. The first 2 bytes of the community encode a type
   * and optonal sub-type field. The last 6 bytes (or 7 bytes for types without a
   * sub-type) carry a unique set of data in a format defined by the type and
   * optional sub-type field. Extended communities provide a larger range for
   * grouping or categorizing communities.
   */
  export interface Structured {
    choice?:
      | 'transitive_2octet_as_type'
      | 'transitive_ipv4_address_type'
      | 'transitive_4octet_as_type'
      | 'transitive_opaque_type'
      | 'non_transitive_2octet_as_type';

    /**
     * The Non-Transitive Two-Octet AS-Specific Extended Community is sent as type
     * 0x40.
     */
    non_transitive_2octet_as_type?: Structured.NonTransitive2octetAsType;

    /**
     * The Transitive Two-Octet AS-Specific Extended Community is sent as type 0x00 .
     */
    transitive_2octet_as_type?: Structured.Transitive2octetAsType;

    /**
     * The Transitive Four-Octet AS-Specific Extended Community is sent as type 0x02.
     * It is defined in RFC 5668.
     */
    transitive_4octet_as_type?: Structured.Transitive4octetAsType;

    /**
     * The Transitive IPv4 Address Specific Extended Community is sent as type 0x01.
     */
    transitive_ipv4_address_type?: Structured.TransitiveIpv4AddressType;

    /**
     * The Transitive Opaque Extended Community is sent as type 0x03.
     */
    transitive_opaque_type?: Structured.TransitiveOpaqueType;
  }

  export namespace Structured {
    /**
     * The Non-Transitive Two-Octet AS-Specific Extended Community is sent as type
     * 0x40.
     */
    export interface NonTransitive2octetAsType {
      choice?: 'link_bandwidth_subtype';

      /**
       * The Link Bandwidth Extended Community attribute is defined in
       * draft-ietf-idr-link-bandwidth. It is sent with sub-type as 0x04.
       */
      link_bandwidth_subtype?: NonTransitive2octetAsType.LinkBandwidthSubtype;
    }

    export namespace NonTransitive2octetAsType {
      /**
       * The Link Bandwidth Extended Community attribute is defined in
       * draft-ietf-idr-link-bandwidth. It is sent with sub-type as 0x04.
       */
      export interface LinkBandwidthSubtype {
        /**
         * Bandwidth of the link in bytes per second. ( 1 Kbps is 1000 bytes per second and
         * 1 Mbps is 1000 Kbps per second )
         */
        bandwidth?: number;

        /**
         * The value of the Global Administrator subfield should represent the Autonomous
         * System of the router that attaches the Link Bandwidth Community. If four octet
         * AS numbering scheme is used, AS_TRANS (23456) should be used.
         */
        global_2byte_as?: number;
      }
    }

    /**
     * The Transitive Two-Octet AS-Specific Extended Community is sent as type 0x00 .
     */
    export interface Transitive2octetAsType {
      choice?: 'route_target_subtype' | 'route_origin_subtype';

      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP. It is sent with sub-type as 0x03 .
       */
      route_origin_subtype?: Transitive2octetAsType.RouteOriginSubtype;

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP Update message. It is sent
       * with sub-type as 0x02.
       */
      route_target_subtype?: Transitive2octetAsType.RouteTargetSubtype;
    }

    export namespace Transitive2octetAsType {
      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP. It is sent with sub-type as 0x03 .
       */
      export interface RouteOriginSubtype {
        /**
         * The two octet IANA assigned AS value assigned to the Autonomous System.
         */
        global_2byte_as?: number;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the Autonomous System number
         * carried in the Global Administrator sub-field has been assigned by an
         * appropriate authority.
         */
        local_4byte_admin?: number;
      }

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP Update message. It is sent
       * with sub-type as 0x02.
       */
      export interface RouteTargetSubtype {
        /**
         * The two octet IANA assigned AS value assigned to the Autonomous System.
         */
        global_2byte_as?: number;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the Autonomous System number
         * carried in the Global Administrator sub-field has been assigned by an
         * appropriate authority.
         */
        local_4byte_admin?: number;
      }
    }

    /**
     * The Transitive Four-Octet AS-Specific Extended Community is sent as type 0x02.
     * It is defined in RFC 5668.
     */
    export interface Transitive4octetAsType {
      choice?: 'route_target_subtype' | 'route_origin_subtype';

      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP. It is sent with sub-type as 0x03.
       */
      route_origin_subtype?: Transitive4octetAsType.RouteOriginSubtype;

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP. It is sent with sub-type
       * as 0x02
       */
      route_target_subtype?: Transitive4octetAsType.RouteTargetSubtype;
    }

    export namespace Transitive4octetAsType {
      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP. It is sent with sub-type as 0x03.
       */
      export interface RouteOriginSubtype {
        /**
         * The four octet IANA assigned AS value assigned to the Autonomous System.
         */
        global_4byte_as?: number;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the Autonomous System number
         * carried in the Global Administrator sub-field has been assigned by an
         * appropriate authority.
         */
        local_2byte_admin?: number;
      }

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP. It is sent with sub-type
       * as 0x02
       */
      export interface RouteTargetSubtype {
        /**
         * The four octet IANA assigned AS value assigned to the Autonomous System.
         */
        global_4byte_as?: number;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the Autonomous System number
         * carried in the Global Administrator sub-field has been assigned by an
         * appropriate authority.
         */
        local_2byte_admin?: number;
      }
    }

    /**
     * The Transitive IPv4 Address Specific Extended Community is sent as type 0x01.
     */
    export interface TransitiveIpv4AddressType {
      choice?: 'route_target_subtype' | 'route_origin_subtype';

      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP It is sent with sub-type as 0x03.
       */
      route_origin_subtype?: TransitiveIpv4AddressType.RouteOriginSubtype;

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP. It is sent with sub-type
       * as 0x02.
       */
      route_target_subtype?: TransitiveIpv4AddressType.RouteTargetSubtype;
    }

    export namespace TransitiveIpv4AddressType {
      /**
       * The Route Origin Community identifies one or more routers that inject a set of
       * routes (that carry this Community) into BGP It is sent with sub-type as 0x03.
       */
      export interface RouteOriginSubtype {
        /**
         * An IPv4 unicast address assigned by one of the Internet registries.
         */
        global_ipv4_admin?: string;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the IP address carried in the
         * Global Administrator sub-field has been assigned by an appropriate authority.
         */
        local_2byte_admin?: number;
      }

      /**
       * The Route Target Community identifies one or more routers that may receive a set
       * of routes (that carry this Community) carried by BGP. It is sent with sub-type
       * as 0x02.
       */
      export interface RouteTargetSubtype {
        /**
         * An IPv4 unicast address assigned by one of the Internet registries.
         */
        global_ipv4_admin?: string;

        /**
         * The Local Administrator sub-field contains a number from a numbering space that
         * is administered by the organization to which the IP address carried in the
         * Global Administrator sub-field has been assigned by an appropriate authority.
         */
        local_2byte_admin?: number;
      }
    }

    /**
     * The Transitive Opaque Extended Community is sent as type 0x03.
     */
    export interface TransitiveOpaqueType {
      choice?: 'color_subtype' | 'encapsulation_subtype';

      /**
       * The Color Community contains locally administrator defined 'color' value which
       * is used in conjunction with Encapsulation attribute to decide whether a data
       * packet can be transmitted on a certain tunnel or not. It is defined in RFC9012
       * and sent with sub-type as 0x0b.
       */
      color_subtype?: TransitiveOpaqueType.ColorSubtype;

      /**
       * This identifies the type of tunneling technology being signalled. It is defined
       * in RFC9012 and sent with sub-type as 0x0c.
       */
      encapsulation_subtype?: TransitiveOpaqueType.EncapsulationSubtype;
    }

    export namespace TransitiveOpaqueType {
      /**
       * The Color Community contains locally administrator defined 'color' value which
       * is used in conjunction with Encapsulation attribute to decide whether a data
       * packet can be transmitted on a certain tunnel or not. It is defined in RFC9012
       * and sent with sub-type as 0x0b.
       */
      export interface ColorSubtype {
        /**
         * The color value is user defined and configured locally and used to determine
         * whether a data packet can be transmitted on a certain tunnel or not in
         * conjunction with the Encapsulation attribute. It is defined in RFC9012.
         */
        color?: number;

        /**
         * Two octet flag values.
         */
        flags?: number;
      }

      /**
       * This identifies the type of tunneling technology being signalled. It is defined
       * in RFC9012 and sent with sub-type as 0x0c.
       */
      export interface EncapsulationSubtype {
        /**
         * Four bytes of reserved values. Normally set to 0 on transmit and ignored on
         * receive.
         */
        reserved?: number;

        /**
         * Identifies the type of tunneling technology being signalled. Initially defined
         * in RFC5512 and extended in RFC9012. Some of the important tunnel types include
         *
         * - 1 L2TPv3 over IP [RFC9012],
         * - 2 GRE [RFC9012],
         * - 7 IP in IP [RFC9012],
         * - 8 VXLAN Encapsulation [RFC8365],
         * - 9 NVGRE Encapsulation [RFC8365],
         * - 10 MPLS Encapsulation [RFC8365],
         * - 15 SR TE Policy Type [draft-ietf-idr-segment-routing-te-policy],
         * - 19 Geneve Encapsulation [RFC8926]
         */
        tunnel_type?: number;
      }
    }
  }
}

/**
 * Response containing chosen traffic generator metrics.
 */
export interface MonitorCreateMetricsResponse {
  bgpv4_metrics?: Array<MonitorCreateMetricsResponse.Bgpv4Metric>;

  bgpv6_metrics?: Array<MonitorCreateMetricsResponse.Bgpv6Metric>;

  choice?:
    | 'flow_metrics'
    | 'port_metrics'
    | 'bgpv4_metrics'
    | 'bgpv6_metrics'
    | 'isis_metrics'
    | 'lag_metrics'
    | 'lacp_metrics'
    | 'lldp_metrics'
    | 'rsvp_metrics'
    | 'dhcpv4_client'
    | 'dhcpv4_server'
    | 'dhcpv6_client'
    | 'dhcpv6_server'
    | 'ospfv2_metrics'
    | 'convergence_metrics'
    | 'macsec_metrics'
    | 'mka_metrics'
    | 'ospfv3_metrics'
    | 'rocev2_ipv4_per_peer_metrics'
    | 'rocev2_ipv6_per_peer_metrics'
    | 'rocev2_flow_per_qp_metrics'
    | 'egress_only_tracking_metrics';

  convergence_metrics?: Array<MonitorCreateMetricsResponse.ConvergenceMetric>;

  dhcpv4client_metrics?: Array<MonitorCreateMetricsResponse.Dhcpv4clientMetric>;

  dhcpv4server_metrics?: Array<MonitorCreateMetricsResponse.Dhcpv4serverMetric>;

  dhcpv6client_metrics?: Array<MonitorCreateMetricsResponse.Dhcpv6clientMetric>;

  dhcpv6server_metrics?: Array<MonitorCreateMetricsResponse.Dhcpv6serverMetric>;

  egress_only_tracking_metrics?: Array<MonitorCreateMetricsResponse.EgressOnlyTrackingMetric>;

  flow_metrics?: Array<MonitorCreateMetricsResponse.FlowMetric>;

  isis_metrics?: Array<MonitorCreateMetricsResponse.IsisMetric>;

  lacp_metrics?: Array<MonitorCreateMetricsResponse.LacpMetric>;

  lag_metrics?: Array<MonitorCreateMetricsResponse.LagMetric>;

  lldp_metrics?: Array<MonitorCreateMetricsResponse.LldpMetric>;

  macsec_metrics?: Array<MonitorCreateMetricsResponse.MacsecMetric>;

  mka_metrics?: Array<MonitorCreateMetricsResponse.MkaMetric>;

  ospfv2_metrics?: Array<MonitorCreateMetricsResponse.Ospfv2Metric>;

  ospfv3_metrics?: Array<MonitorCreateMetricsResponse.Ospfv3Metric>;

  port_metrics?: Array<MonitorCreateMetricsResponse.PortMetric>;

  rocev2_flow_per_qp_metrics?: Array<MonitorCreateMetricsResponse.Rocev2FlowPerQpMetric>;

  rocev2_ipv4_per_peer_metrics?: Array<MonitorCreateMetricsResponse.Rocev2Ipv4PerPeerMetric>;

  rocev2_ipv6_per_peer_metrics?: Array<MonitorCreateMetricsResponse.Rocev2Ipv6PerPeerMetric>;

  rsvp_metrics?: Array<MonitorCreateMetricsResponse.RsvpMetric>;
}

export namespace MonitorCreateMetricsResponse {
  /**
   * BGPv4 per peer statistics information.
   */
  export interface Bgpv4Metric {
    /**
     * Number of End-of-RIB markers received indicating the completion of the initial
     * routing update for a particular <AFI, SAFI> address family after the session is
     * established. For the IPv4 unicast address family, the End-of-RIB marker is an
     * UPDATE message with the minimum length. For any other address family, it is an
     * UPDATE message that contains only the MP_UNREACH_NLRI attribute with no
     * withdrawn routes for that <AFI, SAFI>.
     */
    end_of_rib_received?: number;

    /**
     * BGP peer FSM (Finite State Machine) state as Idle, Connect, Active, OpenSent,
     * OpenConfirm and Established. In all the states except Established the BGP
     * session is down. Idle refers to the Idle state of the FSM. Connect refers to the
     * state where the session is waiting for the underlying transport session to be
     * established. Active refers to the state where the session is awaiting for a
     * connection from the remote peer. OpenSent refers to the state where the session
     * is in the process of being established. The local system has sent an OPEN
     * message. OpenConfirm refers to the state where the session is in the process of
     * being established. The local system has sent and received an OPEN message and is
     * awaiting a NOTIFICATION or KEEPALIVE message from remote peer. Established
     * refers to the state where the BGP session with the peer is established.
     */
    fsm_state?: 'idle' | 'connect' | 'active' | 'opensent' | 'openconfirm' | 'established';

    /**
     * Number of Keepalive messages received.
     */
    keepalives_received?: number;

    /**
     * Number of Keepalive messages sent.
     */
    keepalives_sent?: number;

    /**
     * The name of a configured BGPv4 peer.
     */
    name?: string;

    /**
     * Number of Notification messages received.
     */
    notifications_received?: number;

    /**
     * Number of Notification messages sent.
     */
    notifications_sent?: number;

    /**
     * Number of Open messages received.
     */
    opens_received?: number;

    /**
     * Number of Open messages sent.
     */
    opens_sent?: number;

    /**
     * Number of route withdraws received.
     */
    route_withdraws_received?: number;

    /**
     * Number of route withdraws sent.
     */
    route_withdraws_sent?: number;

    /**
     * Number of routes advertised.
     */
    routes_advertised?: number;

    /**
     * Number of routes received.
     */
    routes_received?: number;

    /**
     * Number of times the session went from Up to Down state.
     */
    session_flap_count?: number;

    /**
     * Session state as up or down. Up refers to an Established state and Down refers
     * to any other state.
     */
    session_state?: 'up' | 'down';

    /**
     * Number of Update messages received.
     */
    updates_received?: number;

    /**
     * Number of Update messages sent.
     */
    updates_sent?: number;
  }

  /**
   * BGPv6 per peer statistics information.
   */
  export interface Bgpv6Metric {
    /**
     * Number of End-of-RIB markers received indicating the completion of the initial
     * routing update for a particular <AFI, SAFI> address family after the session is
     * established. For the IPv4 unicast address family, the End-of-RIB marker is an
     * UPDATE message with the minimum length. For any other address family, it is an
     * UPDATE message that contains only the MP_UNREACH_NLRI attribute with no
     * withdrawn routes for that <AFI, SAFI>.
     */
    end_of_rib_received?: number;

    /**
     * BGP peer FSM (Finite State Machine) state as Idle, Connect, Active, OpenSent,
     * OpenConfirm and Established. In all the states except Established the BGP
     * session is down. Idle refers to the Idle state of the FSM. Connect refers to the
     * state where the session is waiting for the underlying transport session to be
     * established. Active refers to the state where the session is awaiting for a
     * connection from the remote peer. OpenSent refers to the state where the session
     * is in the process of being established. The local system has sent an OPEN
     * message. OpenConfirm refers to the state where the session is in the process of
     * being established. The local system has sent and received an OPEN message and is
     * awaiting a NOTIFICATION or KEEPALIVE message from remote peer. Established
     * refers to the state where the BGP session with the peer is established.
     */
    fsm_state?: 'idle' | 'connect' | 'active' | 'opensent' | 'openconfirm' | 'established';

    /**
     * Number of Keepalive messages received.
     */
    keepalives_received?: number;

    /**
     * Number of Keepalive messages sent.
     */
    keepalives_sent?: number;

    /**
     * The name of a configured BGPv6 peer.
     */
    name?: string;

    /**
     * Number of Notification messages received.
     */
    notifications_received?: number;

    /**
     * Number of Notification messages sent.
     */
    notifications_sent?: number;

    /**
     * Number of Open messages received.
     */
    opens_received?: number;

    /**
     * Number of Open messages sent.
     */
    opens_sent?: number;

    /**
     * Number of route withdraws received.
     */
    route_withdraws_received?: number;

    /**
     * Number of route withdraws sent.
     */
    route_withdraws_sent?: number;

    /**
     * Number of routes advertised.
     */
    routes_advertised?: number;

    /**
     * Number of routes received.
     */
    routes_received?: number;

    /**
     * Number of times the session went from Up to Down state.
     */
    session_flap_count?: number;

    /**
     * Session state as up or down. Up refers to an Established state and Down refers
     * to any other state.
     */
    session_state?: 'up' | 'down';

    /**
     * Number of Update messages received.
     */
    updates_received?: number;

    /**
     * Number of Update messages sent.
     */
    updates_sent?: number;
  }

  /**
   * Under Review: Convergence metrics is currently under review for pending
   * exploration on use cases.
   *
   * The container for convergence metrics.
   */
  export interface ConvergenceMetric {
    /**
     * The total convergence time(microseconds), between the event that caused the
     * switchover until an acceptable amount of traffic was received at time Above
     * Threshold Timestamp, when the rate crosses above the configured
     * rx_rate_threshold.
     */
    control_plane_data_plane_convergence_us?: number;

    /**
     * The convergence time(microseconds) measured from the data plane perspective
     * only. It measures the time w.r.t. last start of the traffic of the affected flow
     * from Below Threshold Timestamp, when the rate on Test Port 2 crosses below the
     * Rx Threshold until an acceptable amount of traffic was received at time Above
     * Threshold Timestamp, when the rate crosses above the configured
     * rx_rate_threshold.
     */
    data_plane_convergence_us?: number;

    /**
     * The events that were used to determine the convergence analytics.
     */
    events?: Array<ConvergenceMetric.Event>;

    /**
     * The name of a flow.
     */
    name?: string;
  }

  export namespace ConvergenceMetric {
    /**
     * A container for an event that has occurred in the system affecting the
     * convergence time recorded for the flow.
     */
    export interface Event {
      /**
       * The timestamp(nanoseconds) of the starting event that triggers convergence.
       */
      begin_timestamp_ns?: number;

      /**
       * The timestamp(nanoseconds) of the end event that triggers convergence.
       */
      end_timestamp_ns?: number;

      /**
       * The source of the event. The source MUST be the value of one of the x-constraint
       * paths, which means the source MUST be a unique name in the configuration.
       *
       * x-constraint:
       *
       * - /components/schemas/Port/properties/name
       * - /components/schemas/Flow/properties/name
       * - /components/schemas/Device.Bgpv4Route/properties/name
       * - /components/schemas/Device.Bgpv6Route/properties/name
       */
      source?: string;

      /**
       * The type of control plane or data plane event that occurred.
       */
      type?:
        | 'link_down'
        | 'link_up'
        | 'route_withdraw'
        | 'route_advertise'
        | 'flow_rx_rate_above_threshold'
        | 'flow_rx_rate_below_threshold';
    }
  }

  /**
   * DHCPv4 per peer statistics information.
   */
  export interface Dhcpv4clientMetric {
    /**
     * Number of lease DHCPACK messages received.
     */
    acks_received?: number;

    /**
     * Number of DHCPDECLINE messages sent.
     */
    declines_sent?: number;

    /**
     * Number of DHCPDISCOVER messages sent.
     */
    discovers_sent?: number;

    /**
     * Number of negative lease DHCPNACK messages received.
     */
    nacks_received?: number;

    /**
     * The name of a configured DHCPv4 client.
     */
    name?: string;

    /**
     * Number of DHCPOFFER messages received.
     */
    offers_received?: number;

    /**
     * Number of DHCPRELEASE messages sent.
     */
    releases_sent?: number;

    /**
     * Number of DHCPREQUEST messages sent.
     */
    requests_sent?: number;
  }

  /**
   * DHCPv4 per peer statistics information.
   */
  export interface Dhcpv4serverMetric {
    /**
     * Number of lease DHCPACK messages sent.
     */
    acks_sent?: number;

    /**
     * Number of DHCPDECLINE messages received.
     */
    declines_received?: number;

    /**
     * Number of DHCPDISCOVER messages received.
     */
    discovers_received?: number;

    /**
     * Number of negative lease DHCPNACK messages sent.
     */
    nacks_sent?: number;

    /**
     * The name of a configured DHCPv4 Server.
     */
    name?: string;

    /**
     * Number of DHCPOFFER messages sent.
     */
    offers_sent?: number;

    /**
     * Number of DHCPRELEASE messages received.
     */
    releases_received?: number;

    /**
     * Number of DHCPOFFER messages received.
     */
    requests_received?: number;
  }

  /**
   * DHCPv6 per peer statistics information.
   */
  export interface Dhcpv6clientMetric {
    /**
     * Number of DHCPADVERTISE messages ignored.
     */
    advertisements_ignored?: number;

    /**
     * Number of DHCPADVERTISE messages received.
     */
    advertisements_received?: number;

    /**
     * Number of DHCP Inform requests sent.
     */
    information_requests_sent?: number;

    /**
     * Number of negative lease DHCPNACK messages received.
     */
    nacks_received?: number;

    /**
     * The name of a configured DHCPv6 client.
     */
    name?: string;

    /**
     * Number of rapid commit DHCP Reply messages received.
     */
    rapid_commit_replies_received?: number;

    /**
     * Number of rapid commit DHCPSOLICIT messages sent.
     */
    rapid_commit_solicits_sent?: number;

    /**
     * Number of DHCP rebind messages sent.
     */
    rebinds_sent?: number;

    /**
     * Number of DHCP Reconfigure messages received.
     */
    reconfigures_received?: number;

    /**
     * Number of DHCP Release messages sent.
     */
    releases_sent?: number;

    /**
     * Number of DHCP renew messages sent.
     */
    renews_sent?: number;

    /**
     * Number of DHCPOFFER messages received.
     */
    replies_received?: number;

    /**
     * Number of DHCPREQUEST messages sent.
     */
    requests_sent?: number;

    /**
     * Number of DHCPSOLICIT messages sent.
     */
    solicits_sent?: number;
  }

  /**
   * DHCPv6 per server statistics information.
   */
  export interface Dhcpv6serverMetric {
    /**
     * Number of DHCP Advertise messages sent.
     */
    advertisements_sent?: number;

    /**
     * Number of DHCP Confirm messages received.
     */
    confirms_received?: number;

    /**
     * Number of DHCP Decline messages received.
     */
    declines_received?: number;

    /**
     * Number of DHCP Information Request messages received.
     */
    information_requests_received?: number;

    /**
     * Number of naks sent for DHCPREQUEST messages.
     */
    nacks_sent?: number;

    /**
     * The name of a configured DHCPv6 Server.
     */
    name?: string;

    /**
     * Number of DHCP Rebind messages received.
     */
    rebinds_received?: number;

    /**
     * Number of DHCP Reconfigure messages sent.
     */
    reconfigures_sent?: number;

    /**
     * Number of DHCP Relay agent forward messages received.
     */
    relay_forwards_received?: number;

    /**
     * Number of DHCP reply messages sent to Relay agent.
     */
    relay_replies_sent?: number;

    /**
     * Number of DHCP Release messages received.
     */
    releases_received?: number;

    /**
     * Number of DHCP Renewal messages received.
     */
    renewals_received?: number;

    /**
     * Number of DHCP Reply messages sent.
     */
    replies_sent?: number;

    /**
     * Number of DHCPREQUEST messages received.
     */
    requests_received?: number;

    /**
     * Number of DHCPSOLICIT messages ignored.
     */
    solicits_ignored?: number;

    /**
     * Number of DHCPSOLICIT messages received.
     */
    solicits_received?: number;
  }

  /**
   * A container for egress-only-tracking metrics. The container is keyed by the
   * port_rx.
   */
  export interface EgressOnlyTrackingMetric {
    /**
     * The name of the receive port
     */
    port_rx?: string;

    /**
     * List of metrics corresponding to a set of values applicable for configured
     * metric tags in egress packet header fields. The container is keyed by list of
     * tag-value pairs.
     */
    tagged_metrics?: Array<EgressOnlyTrackingMetric.TaggedMetric>;
  }

  export namespace EgressOnlyTrackingMetric {
    /**
     * Metrics for each set of values applicable for configured metric tags in egress
     * packet header fields. The container is keyed by list of tag-value pairs.
     */
    export interface TaggedMetric {
      /**
       * The current total number of bytes received
       */
      bytes_rx?: number;

      /**
       * The current total number of valid frames received
       */
      frames_rx?: number;

      /**
       * The current rate of valid frames received
       */
      frames_rx_rate?: number;

      /**
       * The Layer 1 receive rate in bits per second.
       */
      rx_l1_rate_bps?: number;

      /**
       * The receive rate in bits per second.
       */
      rx_rate_bps?: number;

      /**
       * The receive rate in bytes per second.
       */
      rx_rate_bytes?: number;

      /**
       * The receive rate in Kilobits per second.
       */
      rx_rate_kbps?: number;

      /**
       * The receive rate in Megabits per second.
       */
      rx_rate_mbps?: number;

      /**
       * List of tag and value pairs
       */
      tags?: Array<TaggedMetric.Tag>;

      /**
       * The container for timestamp metrics. The container will be empty if the
       * timestamp has not been configured for the flow.
       */
      timestamps?: TaggedMetric.Timestamps;

      /**
       * The container for tx metrics. The container will be empty if the tx metrics has
       * not been configured.
       */
      tx_metrics?: TaggedMetric.TxMetrics;
    }

    export namespace TaggedMetric {
      export interface Tag {
        /**
         * Name of packet field metric tag
         */
        name?: string;

        /**
         * Value of packet field metric tag in hexadecimal format
         */
        value?: string;
      }

      /**
       * The container for timestamp metrics. The container will be empty if the
       * timestamp has not been configured for the flow.
       */
      export interface Timestamps {
        /**
         * First timestamp in nanoseconds
         */
        first_timestamp_ns?: number;

        /**
         * Last timestamp in nanoseconds
         */
        last_timestamp_ns?: number;
      }

      /**
       * The container for tx metrics. The container will be empty if the tx metrics has
       * not been configured.
       */
      export interface TxMetrics {
        /**
         * The current total number of bytes transmitted
         */
        bytes_tx?: number;

        /**
         * The current total number of frames transmitted
         */
        frames_tx?: number;

        /**
         * The current rate of frames transmitted
         */
        frames_tx_rate?: number;

        /**
         * The percentage of lost frames
         */
        loss?: number;

        /**
         * The name of the transmit port
         */
        port_tx?: string;

        /**
         * The Layer 1 transmission rate in bits per second.
         */
        tx_l1_rate_bps?: number;

        /**
         * The transmission rate in bits per second.
         */
        tx_rate_bps?: number;

        /**
         * The transmission rate in bytes per second.
         */
        tx_rate_bytes?: number;

        /**
         * The transmission rate in Kilobits per second.
         */
        tx_rate_kbps?: number;

        /**
         * The transmission rate in Megabits per second.
         */
        tx_rate_mbps?: number;
      }
    }
  }

  /**
   * A container for flow metrics. The container is keyed by the name, port_tx and
   * port_rx.
   */
  export interface FlowMetric {
    /**
     * The current total number of bytes received
     */
    bytes_rx?: number;

    /**
     * The current total number of bytes transmitted
     */
    bytes_tx?: number;

    /**
     * The current total number of valid frames received
     */
    frames_rx?: number;

    /**
     * The current rate of valid frames received
     */
    frames_rx_rate?: number;

    /**
     * The current total number of frames transmitted
     */
    frames_tx?: number;

    /**
     * The current rate of frames transmitted
     */
    frames_tx_rate?: number;

    /**
     * The container for latency metrics. The min/max/avg values are dependent on the
     * type of latency measurement mode that is configured. The container will be empty
     * if the latency has not been configured for the flow.
     */
    latency?: MonitorAPI.MetricLatency;

    /**
     * The percentage of lost frames
     */
    loss?: number;

    /**
     * The name of the flow
     */
    name?: string;

    /**
     * The name of the receive port
     */
    port_rx?: string;

    /**
     * The name of the transmit port
     */
    port_tx?: string;

    /**
     * The Layer 1 receive rate in bits per second.
     */
    rx_l1_rate_bps?: number;

    /**
     * The receive rate in bits per second.
     */
    rx_rate_bps?: number;

    /**
     * The receive rate in bytes per second.
     */
    rx_rate_bytes?: number;

    /**
     * The receive rate in Kilobits per second.
     */
    rx_rate_kbps?: number;

    /**
     * The receive rate in Megabits per second.
     */
    rx_rate_mbps?: number;

    /**
     * List of metrics corresponding to a set of values applicable for configured
     * metric tags in ingress or egress packet header fields of corresponding flow. The
     * container is keyed by list of tag-value pairs.
     */
    tagged_metrics?: Array<FlowMetric.TaggedMetric>;

    /**
     * The container for timestamp metrics. The container will be empty if the
     * timestamp has not been configured for the flow.
     */
    timestamps?: MonitorAPI.MetricTimestamp;

    /**
     * The transmit state of the flow.
     */
    transmit?: 'started' | 'stopped' | 'paused';

    /**
     * The Layer 1 transmission rate in bits per second.
     */
    tx_l1_rate_bps?: number;

    /**
     * The transmission rate in bits per second.
     */
    tx_rate_bps?: number;

    /**
     * The transmission rate in bytes per second.
     */
    tx_rate_bytes?: number;

    /**
     * The transmission rate in Kilobits per second.
     */
    tx_rate_kbps?: number;

    /**
     * The transmission rate in Megabits per second.
     */
    tx_rate_mbps?: number;
  }

  export namespace FlowMetric {
    /**
     * Metrics for each set of values applicable for configured metric tags in ingress
     * or egress packet header fields of corresponding flow. The container is keyed by
     * list of tag-value pairs.
     */
    export interface TaggedMetric {
      /**
       * The current total number of bytes received
       */
      bytes_rx?: number;

      /**
       * The current total number of bytes transmitted
       */
      bytes_tx?: number;

      /**
       * The current total number of valid frames received
       */
      frames_rx?: number;

      /**
       * The current rate of valid frames received
       */
      frames_rx_rate?: number;

      /**
       * The current total number of frames transmitted
       */
      frames_tx?: number;

      /**
       * The current rate of frames transmitted
       */
      frames_tx_rate?: number;

      /**
       * The container for latency metrics. The min/max/avg values are dependent on the
       * type of latency measurement mode that is configured. The container will be empty
       * if the latency has not been configured for the flow.
       */
      latency?: MonitorAPI.MetricLatency;

      /**
       * The percentage of lost frames
       */
      loss?: number;

      /**
       * The Layer 1 receive rate in bits per second.
       */
      rx_l1_rate_bps?: number;

      /**
       * The receive rate in bits per second.
       */
      rx_rate_bps?: number;

      /**
       * The receive rate in bytes per second.
       */
      rx_rate_bytes?: number;

      /**
       * The receive rate in Kilobits per second.
       */
      rx_rate_kbps?: number;

      /**
       * The receive rate in Megabits per second.
       */
      rx_rate_mbps?: number;

      /**
       * List of tag and value pairs
       */
      tags?: Array<TaggedMetric.Tag>;

      /**
       * The container for timestamp metrics. The container will be empty if the
       * timestamp has not been configured for the flow.
       */
      timestamps?: MonitorAPI.MetricTimestamp;

      /**
       * The Layer 1 transmission rate in bits per second.
       */
      tx_l1_rate_bps?: number;

      /**
       * The transmission rate in bits per second.
       */
      tx_rate_bps?: number;

      /**
       * The transmission rate in bytes per second.
       */
      tx_rate_bytes?: number;

      /**
       * The transmission rate in Kilobits per second.
       */
      tx_rate_kbps?: number;

      /**
       * The transmission rate in Megabits per second.
       */
      tx_rate_mbps?: number;
    }

    export namespace TaggedMetric {
      export interface Tag {
        /**
         * Name of packet field metric tag
         */
        name?: string;

        /**
         * A container for metric tag value
         */
        value?: Tag.Value;
      }

      export namespace Tag {
        /**
         * A container for metric tag value
         */
        export interface Value {
          /**
           * Available formats for metric tag value
           */
          choice?: 'hex' | 'str';

          /**
           * Value represented in hexadecimal format
           */
          hex?: string;

          /**
           * Value represented in string format
           */
          str?: string;
        }
      }
    }
  }

  /**
   * ISIS per router statistics information.
   */
  export interface IsisMetric {
    /**
     * Number of Level 1 Hello messages received.
     */
    l1_broadcast_hellos_received?: number;

    /**
     * Number of Level 1 Hello messages sent.
     */
    l1_broadcast_hellos_sent?: number;

    /**
     * Number of Level 1 (L1) Complete Sequence Number Packet (CSNPs) received.
     */
    l1_csnp_received?: number;

    /**
     * Number of Level 1 (L1) Complete Sequence Number Packet (CSNPs) sent.
     */
    l1_csnp_sent?: number;

    /**
     * Number of Link State Updates (LSPs) in the Level 1 LSP Databases.
     */
    l1_database_size?: number;

    /**
     * Number of Level 1 (L1) Link State Protocol Data Units (LSPs) received.
     */
    l1_lsp_received?: number;

    /**
     * Number of Level 1 (L1) Link State Protocol Data Units (LSPs) sent.
     */
    l1_lsp_sent?: number;

    /**
     * Number of Level 1 Point-to-Point(P2P) Hello messages received.
     */
    l1_point_to_point_hellos_received?: number;

    /**
     * Number of Level 1 Point-to-Point(P2P) Hello messages sent.
     */
    l1_point_to_point_hellos_sent?: number;

    /**
     * Number of Level 1 (L1) Complete Sequence Number Packet (PSNPs) received.
     */
    l1_psnp_received?: number;

    /**
     * Number of Level 1 (L1) Partial Sequence Number Packet (PSNPs) sent.
     */
    l1_psnp_sent?: number;

    /**
     * The number of Level 1 Sessions Flap.
     */
    l1_session_flap?: number;

    /**
     * The number of Level 1 (L1) sessions that are fully up.
     */
    l1_sessions_up?: number;

    /**
     * Number of Level 2 Hello messages received.
     */
    l2_broadcast_hellos_received?: number;

    /**
     * Number of Level 2 Hello messages sent.
     */
    l2_broadcast_hellos_sent?: number;

    /**
     * Number of Level 2 (L2) Complete Sequence Number Packet (CSNPs) received.
     */
    l2_csnp_received?: number;

    /**
     * Number of Level 2 (L2) Complete Sequence Number Packet (CSNPs) sent.
     */
    l2_csnp_sent?: number;

    /**
     * Number of Link State Updates (LSPs) in the Level 2 LSP Databases.
     */
    l2_database_size?: number;

    /**
     * Number of Level 2 (L2) Link State Protocol Data Units (LSPs) received.
     */
    l2_lsp_received?: number;

    /**
     * Number of Level 2 (L2) Link State Protocol Data Units (LSPs) sent.
     */
    l2_lsp_sent?: number;

    /**
     * Number of Level 2 Point-to-Point(P2P) Hello messages received.
     */
    l2_point_to_point_hellos_received?: number;

    /**
     * Number of Level 2 Point-to-Point(P2P) Hello messages sent.
     */
    l2_point_to_point_hellos_sent?: number;

    /**
     * Number of Level 2 (L2) Complete Sequence Number Packet (PSNPs) received.
     */
    l2_psnp_received?: number;

    /**
     * Number of Level 2 (L2) Partial Sequence Number Packet (PSNPs) sent.
     */
    l2_psnp_sent?: number;

    /**
     * The number of Level 2 Sessions Flap.
     */
    l2_session_flap?: number;

    /**
     * The number of Level 2 (L2) sessions that are fully up.
     */
    l2_sessions_up?: number;

    /**
     * The name of a configured ISIS router.
     */
    name?: string;
  }

  /**
   * LACP metrics (statistics) per LAG member.
   */
  export interface LacpMetric {
    /**
     * Indicates participant is active or passive.
     */
    activity?: 'active' | 'passive';

    /**
     * A true value indicates that the participant will allow the link to be used as
     * part of the aggregate. A false value indicates the link should be used as an
     * individual link.
     */
    aggregatable?: boolean;

    /**
     * If true, the participant is collecting incoming frames on the link, otherwise
     * false.
     */
    collecting?: boolean;

    /**
     * When true, the participant is distributing outgoing frames; when false,
     * distribution is disabled.
     */
    distributing?: boolean;

    /**
     * Number of LACPDUs received.
     */
    lacp_packets_rx?: number;

    /**
     * Number of LACPDUs transmitted.
     */
    lacp_packets_tx?: number;

    /**
     * Number of LACPDUs receive packet errors.
     */
    lacp_rx_errors?: number;

    /**
     * The name of a LAG member (port) configured with LACP.
     */
    lag_member_port_name?: string;

    /**
     * The name of a LAG (ports group) configured with LACP.
     */
    lag_name?: string;

    /**
     * Current operational value of the key for the aggregate interface.
     */
    oper_key?: number;

    /**
     * MAC address representing the protocol partner's interface system ID.
     */
    partner_id?: string;

    /**
     * Operational value of the protocol partner's key.
     */
    partner_key?: number;

    /**
     * Port number of the partner (remote) port for this member port.
     */
    partner_port_num?: number;

    /**
     * Port number of the local (actor) aggregation member.
     */
    port_num?: number;

    /**
     * Indicates whether the participant is in-sync or out-of-sync.
     */
    synchronization?: 'in_sync' | 'out_sync';

    /**
     * MAC address that defines the local system ID for the aggregate interface.
     */
    system_id?: string;

    /**
     * The timeout type (short or long) used by the participant.
     */
    timeout?: 'short' | 'long';
  }

  export interface LagMetric {
    /**
     * The current total number of valid bytes received.
     */
    bytes_rx?: number;

    /**
     * The current rate of bytes received.
     */
    bytes_rx_rate?: number;

    /**
     * The current total number of bytes transmitted.
     */
    bytes_tx?: number;

    /**
     * The current rate of bytes transmitted.
     */
    bytes_tx_rate?: number;

    /**
     * The current total number of valid frames received.
     */
    frames_rx?: number;

    /**
     * The current rate of valid frames received.
     */
    frames_rx_rate?: number;

    /**
     * The current total number of frames transmitted.
     */
    frames_tx?: number;

    /**
     * The current rate of frames transmitted.
     */
    frames_tx_rate?: number;

    /**
     * The number of LAG member ports up.
     */
    member_ports_up?: number;

    /**
     * The name of a configured LAG
     *
     * x-constraint:
     *
     * - /components/schemas/Lag/properties/name
     */
    name?: string;

    /**
     * The current operational state of the LAG. The state can be up or down. State
     * 'up' indicates member_ports_up >= min_links.
     */
    oper_status?: 'up' | 'down';
  }

  /**
   * LLDP per instance statistics information.
   */
  export interface LldpMetric {
    /**
     * Number of LLDP frames received that are discarded. This stat should be
     * incremented when one or more of the three mandatory TLVs at the beginning of the
     * LLDPDU is missing, out of order or contains an out of range information string
     * length. This stat should follow the validation rules in section 10.3.2 of IEEE
     * Std 802.1 AB-2005.
     */
    frames_discard?: number;

    /**
     * Number of LLDP frames received with packet errors. This stat should be
     * incremented based on statsFramesInErrorsTotal increment rule in section 10.3.2
     * of IEEE Std 802.1 AB-2005.
     */
    frames_error_rx?: number;

    /**
     * Number of LLDP frames received.
     */
    frames_rx?: number;

    /**
     * Number of LLDP frames transmitted.
     */
    frames_tx?: number;

    /**
     * The name of the configured LLDP instance.
     */
    name?: string;

    /**
     * Number of LLDP tlvs received that are discarded. If any TLV contains an error
     * condition specific for that particular TLV or if any TLV extends past the
     * physical end of the frame then these TLVs will be discarded.
     */
    tlvs_discard?: number;

    /**
     * Number of LLDP unknown tlvs received. If the OUI of the organizationlly specific
     * TLV and/or organizationally defined subtype are not recognized,or if TLV type
     * value is in the range of reserved TLV types then these TLVs will be considered
     * as unknown TLVs.
     */
    tlvs_unknown?: number;
  }

  /**
   * MACsec per secure entity(secY) statistics information.
   */
  export interface MacsecMetric {
    /**
     * InOctetsDecrypted, the number of received bytes decrypted.
     */
    in_octets_decrypted?: number;

    /**
     * InOctetsValidated, the number of received bytes validated.
     */
    in_octets_validated?: number;

    /**
     * The total number of received bad packets that failed atleast one validation
     * check.
     */
    in_pkts_bad?: number;

    /**
     * InPktsBadTag, the number of packets discarded due to bad tag/ICV.
     */
    in_pkts_bad_tag?: number;

    /**
     * InPktsInvalid, the number of packets received with invalid ICV.
     */
    in_pkts_invalid?: number;

    /**
     * InPktsLate, the number of packets discarded out of window.
     */
    in_pkts_late?: number;

    /**
     * InPktsNoSCI,the number of packets discarded due to unknown SCI.
     */
    in_pkts_no_sci?: number;

    /**
     * InPktsNotUsingSA, the number of packets discarded due to unused SA.
     */
    in_pkts_not_using_sa?: number;

    /**
     * InPktsNotValid, the number of packets discarded due to invalid ICV.
     */
    in_pkts_not_valid?: number;

    /**
     * InPktsOk, the number of valid packets received.
     */
    in_pkts_ok?: number;

    /**
     * InPktsUnknownSCI, the number of packets received with unknown SCI.
     */
    in_pkts_unknown_sci?: number;

    /**
     * InPktsUntagged, the number of non-MACsec packets received.
     */
    in_pkts_untagged?: number;

    /**
     * InPktsUnusedSA, the number of packets received with unused SA.
     */
    in_pkts_unused_sa?: number;

    /**
     * The name of a configured MACsec secure entity(secY).
     */
    name?: string;

    /**
     * OutOctetsEncrypted, the number of bytes transmitted as encrypted.
     */
    out_octets_encrypted?: number;

    /**
     * OutOctetsProtected, the number of bytes transmitted as protected.
     */
    out_octets_protected?: number;

    /**
     * OutPktsEncrypted, the number of encrypted packets transmitted.
     */
    out_pkts_encrypted?: number;

    /**
     * OutPktsProtected, the number of protected packets transmitted.
     */
    out_pkts_protected?: number;

    /**
     * Number of times the session went from Up to Down state.
     */
    session_flap_count?: number;

    /**
     * Session state as up or down. Up refers to an Established state and Down refers
     * to any other state.
     */
    session_state?: 'up' | 'down';
  }

  /**
   * MKA per peer statistics information.
   */
  export interface MkaMetric {
    /**
     * Number of MKA Protocol Data Unit(MKPDU) frames with ICV mismatch Rx.
     */
    icv_mismatch?: number;

    /**
     * Number of MKA latest key Rx peers.
     */
    latest_key_rx_peer_count?: number;

    /**
     * Number of MKA latest key Tx peers.
     */
    latest_key_tx_peer_count?: number;

    /**
     * Number of MKA live peers.
     */
    live_peer_count?: number;

    /**
     * Number of malformed MKA Protocol Data Unit(MKPDU) frames Rx.
     */
    malformed_mkpdu?: number;

    /**
     * Number of MKA protocol data unit(MKPDU) frames Rx.
     */
    mkpdu_rx?: number;

    /**
     * Number of MKA protocol data unit(MKPDU) frames Tx.
     */
    mkpdu_tx?: number;

    /**
     * The name of a configured MKA peer.
     */
    name?: string;

    /**
     * Number of MKA potential peers.
     */
    potential_peer_count?: number;

    /**
     * Number of times the session went from Up to Down state.
     */
    session_flap_count?: number;

    /**
     * Session state as up or down. Up refers to an Established state and Down refers
     * to any other state.
     */
    session_state?: 'up' | 'down';
  }

  /**
   * OSPFv2 per router statistics information.
   */
  export interface Ospfv2Metric {
    /**
     * The number of OSPFv2 Database Description (DBD) messages received.
     */
    dbd_received?: number;

    /**
     * The number of OSPFv2 Database Description (DBD) messages transmitted.
     */
    dbd_sent?: number;

    /**
     * The number of OSPFv2 sessions in down state.
     */
    down_state_count?: number;

    /**
     * The number of OSPFv2 External (Type 5) LSAs received.
     */
    external_lsa_received?: number;

    /**
     * The number of OSPFv2 External (Type 5) LSAs transmitted.
     */
    external_lsa_sent?: number;

    /**
     * The number of OSPFv2 sessions in up state.
     */
    full_state_count?: number;

    /**
     * The number of OSPFv2 Hello messages received.
     */
    hellos_received?: number;

    /**
     * The number of OSPFv2 Hello messages transmitted.
     */
    hellos_sent?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Acknowledgement messages received.
     */
    ls_ack_received?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Acknowledgement messages transmitted.
     */
    ls_ack_sent?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Request messages received.
     */
    ls_request_received?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Request messages transmitted.
     */
    ls_request_sent?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Update messages received.
     */
    ls_update_received?: number;

    /**
     * The number of OSPFv2 LinkState (LS) Update messages transmitted.
     */
    ls_update_sent?: number;

    /**
     * The total number of OSPFv2 LinkState Advertisement (LSA) acknowledge messages
     * received .
     */
    lsa_ack_received?: number;

    /**
     * The total number of OSPFv2 LinkState Advertisement (LSA) messages acknowledged.
     */
    lsa_ack_sent?: number;

    /**
     * The total number of OSPFv2 LinkState Advertisement (LSA) messages received.
     */
    lsa_received?: number;

    /**
     * The total number of OSPFv2 LinkState Advertisement (LSA) messages transmitted.
     */
    lsa_sent?: number;

    /**
     * The name of a configured OSPFv2 router.
     */
    name?: string;

    /**
     * The number of OSPFv2 Network (Type 2) LSAs transmitted.
     */
    network_lsa_received?: number;

    /**
     * The number of OSPFv2 Network (Type 2) LSAs transmitted.
     */
    network_lsa_sent?: number;

    /**
     * The number of OSPFv2 NSSA (Type 7) LSAs received.
     */
    nssa_lsa_received?: number;

    /**
     * The number of OSPFv2 NSSA (Type 7) LSAs transmitted.
     */
    nssa_lsa_sent?: number;

    /**
     * The number of OSPFv2 Opaque Area (Type 10) LSAs received.
     */
    opaque_area_received?: number;

    /**
     * The number of OSPF Opaque Area (Type 10) LSAs transmitted.
     */
    opaque_area_sent?: number;

    /**
     * The number of OSPFv2 Opaque Domain (Type 11) LSAs received.
     */
    opaque_domain_received?: number;

    /**
     * The number of OSPFv2 Opaque Domain (Type 11) LSAs transmitted.
     */
    opaque_domain_sent?: number;

    /**
     * The number of OSPFv2 Opaque Local (Type 9) LSAs received.
     */
    opaque_local_received?: number;

    /**
     * The number of OSPFv2 Opaque Local (Type 9) LSAs transmitted.
     */
    opaque_local_sent?: number;

    /**
     * The number of OSPFv2 Router (Type 1) LSAs received.
     */
    router_lsa_received?: number;

    /**
     * The number of OSPFv2 Router (Type 1) LSAs transmitted.
     */
    router_lsa_sent?: number;

    /**
     * The number of change of OSPFv2 sessions from up to down state.
     */
    sessions_flap?: number;

    /**
     * The number of OSPFv2 Summary IP (Type 3) LSA received.
     */
    summary_lsa_received?: number;

    /**
     * The number of OSPFv2 Summary IP (Type 3) LSAs transmitted.
     */
    summary_lsa_sent?: number;
  }

  /**
   * OSPFv3 per router statistics information.
   */
  export interface Ospfv3Metric {
    /**
     * The number of OSPFv3 Database Description (DBD) messages received.
     */
    dbd_received?: number;

    /**
     * The number of OSPFv3 Database Description (DBD) messages transmitted.
     */
    dbd_sent?: number;

    /**
     * The number of OSPFv3 sessions in down state.
     */
    down_state_count?: number;

    /**
     * The number of OSPFv3 External (Type 5) LSAs received.
     */
    external_lsa_received?: number;

    /**
     * The number of OSPFv3 External (Type 5) LSAs transmitted.
     */
    external_lsa_sent?: number;

    /**
     * The number of OSPFv3 sessions in up state.
     */
    full_state_count?: number;

    /**
     * The number of OSPFv3 Hello messages received.
     */
    hellos_received?: number;

    /**
     * The number of OSPFv3 Hello messages transmitted.
     */
    hellos_sent?: number;

    /**
     * The number of OSPFv3 Inter-Area-Prefix (Type 3) LSAs received.
     */
    inter_area_prefix_lsa_received?: number;

    /**
     * The number of OSPFv3 Inter-Area-Prefix (Type 3) LSAs transmitted.
     */
    inter_area_prefix_lsa_sent?: number;

    /**
     * The number of OSPFv3 Inter-Area-Router (Type 4) LSAs received.
     */
    inter_area_router_lsa_received?: number;

    /**
     * The number of OSPFv3 Inter-Area-Router (Type 4) LSAs transmitted.
     */
    inter_area_router_lsa_sent?: number;

    /**
     * The number of OSPFv3 Intra-Area-Prefix (Type 9) LSAs received.
     */
    intra_area_prefix_lsa_received?: number;

    /**
     * The number of OSPFv3 Intra-Area-Prefix (Type 9) LSAs transmitted.
     */
    intra_area_prefix_lsa_sent?: number;

    /**
     * The number of OSPFv3 Link (Type 8) LSAs received.
     */
    link_lsa_received?: number;

    /**
     * The number of OSPFv3 Link (Type 8) LSAs transmitted.
     */
    link_lsa_sent?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Acknowledgement messages received.
     */
    ls_ack_received?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Acknowledgement messages transmitted.
     */
    ls_ack_sent?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Request messages received.
     */
    ls_request_received?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Request messages transmitted.
     */
    ls_request_sent?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Update messages received.
     */
    ls_update_received?: number;

    /**
     * The number of OSPFv3 LinkState (LS) Update messages transmitted.
     */
    ls_update_sent?: number;

    /**
     * The total number of OSPFv3 LinkState Advertisement (LSA) messages received.
     */
    lsa_received?: number;

    /**
     * The total number of OSPFv3 LinkState Advertisement (LSA) messages transmitted.
     */
    lsa_sent?: number;

    /**
     * The name of a configured OSPFv3 router.
     */
    name?: string;

    /**
     * The number of OSPFv3 Network (Type 2) LSAs received.
     */
    network_lsa_received?: number;

    /**
     * The number of OSPFv3 Network (Type 2) LSAs transmitted.
     */
    network_lsa_sent?: number;

    /**
     * The number of OSPFv3 NSSA (Type 7) LSAs received.
     */
    nssa_lsa_received?: number;

    /**
     * The number of OSPFv3 NSSA (Type 7) LSAs transmitted.
     */
    nssa_lsa_sent?: number;

    /**
     * The number of OSPFv3 Router (Type 1) LSAs received.
     */
    router_lsa_received?: number;

    /**
     * The number of OSPFv3 Router (Type 1) LSAs transmitted.
     */
    router_lsa_sent?: number;

    /**
     * The number of change of OSPFv3 sessions from up to down state.
     */
    sessions_flap?: number;
  }

  export interface PortMetric {
    /**
     * The current total number of valid bytes received
     */
    bytes_rx?: number;

    /**
     * The current rate of bytes received
     */
    bytes_rx_rate?: number;

    /**
     * The current total number of bytes transmitted
     */
    bytes_tx?: number;

    /**
     * The current rate of bytes transmitted
     */
    bytes_tx_rate?: number;

    /**
     * The state of the test port capture infrastructure. The string can be started,
     * stopped or a custom error message.
     */
    capture?: 'started' | 'stopped';

    /**
     * The current total number of valid frames received
     */
    frames_rx?: number;

    /**
     * The current rate of valid frames received
     */
    frames_rx_rate?: number;

    /**
     * The current total number of frames transmitted
     */
    frames_tx?: number;

    /**
     * The current rate of frames transmitted
     */
    frames_tx_rate?: number;

    /**
     * The timestamp indicates the absolute time of the last link state change of the
     * test port (e.g., up-to-down transition).
     *
     * The value is the timestamp in nanoseconds relative to the Unix Epoch (Jan 1,
     * 1970 00:00:00 UTC).
     */
    last_change?: number;

    /**
     * The state of the test port link The string can be up, down or a custom error
     * message.
     */
    link?: 'up' | 'down';

    /**
     * The state of the connection to the test port location. The format should be the
     * configured port location along with any custom connection state message.
     */
    location?: string;

    /**
     * The name of a configured port
     *
     * x-constraint:
     *
     * - /components/schemas/Port/properties/name
     */
    name?: string;

    /**
     * The transmit state of the flow.
     */
    transmit?: 'started' | 'stopped';
  }

  /**
   * RoCEv2 Flow statistics information.
   */
  export interface Rocev2FlowPerQpMetric {
    /**
     * Current number of ACK received.
     */
    ack_rx?: number;

    /**
     * Current number of ACK transmitted.
     */
    ack_tx?: number;

    /**
     * Current average latency measured in ns.
     */
    avg_latency?: number;

    /**
     * Current number of CNP received.
     */
    cnp_rx?: number;

    /**
     * Current number of CNP transmitted.
     */
    cnp_tx?: number;

    /**
     * Current number of data frames re-transmitted.
     */
    data_frames_retransmitted?: number;

    /**
     * Current number of data frames received.
     */
    data_frames_rx?: number;

    /**
     * Current number of data frames transmitted.
     */
    data_frames_tx?: number;

    /**
     * Current rate at which data is received in Gbps.
     */
    data_rx_rate?: number;

    /**
     * Current rate at which data is transmitted in Gbps.
     */
    data_tx_rate?: number;

    /**
     * Current destination address.
     */
    dest_ipv4?: string;

    /**
     * Current destination QP number.
     */
    dest_qp?: number;

    /**
     * Current number of ECN-CE Recevied.
     */
    ecn_ce_rx?: number;

    /**
     * First Timestamp.
     */
    first_timestamp?: string;

    /**
     * Current flow comletion time in ms.
     */
    flow_completion_time?: number;

    /**
     * Flow Name.
     */
    flow_name?: string;

    /**
     * Current differnece between tx and rx data frames
     */
    frame_delta?: number;

    /**
     * Current number of frame sequence errors.
     */
    frame_sequence_error?: number;

    /**
     * Last Timestamp.
     */
    last_timestamp?: string;

    /**
     * Current maximum latency measured in ns.
     */
    max_latency?: number;

    /**
     * Current number of Message Complete received.
     */
    message_complete_rx?: number;

    /**
     * Current number of Message Fail count.
     */
    message_fail?: number;

    /**
     * Current number of Message transmitted.
     */
    message_tx?: number;

    /**
     * Current minimum latency measured in ns.
     */
    min_latency?: number;

    /**
     * Current number of NAK received.
     */
    nak_rx?: number;

    /**
     * Current number of NAK transmitted.
     */
    nak_tx?: number;

    /**
     * The name of the receive port
     */
    port_rx?: string;

    /**
     * The name of the transmit port
     */
    port_tx?: string;

    /**
     * Current number of bytes received.
     */
    rx_bytes?: number;

    /**
     * Current source address.
     */
    src_ipv4?: string;

    /**
     * Current source QP number.
     */
    src_qp?: number;

    /**
     * Current number of bytes transmitted.
     */
    tx_bytes?: number;
  }

  /**
   * RoCEv2 per peer statistics information.
   */
  export interface Rocev2Ipv4PerPeerMetric {
    /**
     * Number of REP Message Received.
     */
    connect_reply_rx?: number;

    /**
     * Number of REP Message Transmitted.
     */
    connect_reply_tx?: number;

    /**
     * Number of REQ Message Received.
     */
    connect_request_rx?: number;

    /**
     * Number of REQ Message Transmitted.
     */
    connect_request_tx?: number;

    /**
     * Number of DREP Message Received.
     */
    disconnect_reply_rx?: number;

    /**
     * Number of DREP Message Transmitted.
     */
    disconnect_reply_tx?: number;

    /**
     * Number of DREQ Message Received.
     */
    disconnect_request_rx?: number;

    /**
     * Number of DREQ Message Transmitted.
     */
    disconnect_request_tx?: number;

    /**
     * The name of a configured RoCEv2 peer.
     */
    name?: string;

    /**
     * Number of QPs configured on this port.
     */
    qp_configured?: number;

    /**
     * Number of QPs that have not come UP.
     */
    qp_down?: number;

    /**
     * Number of QPs that are in UP state.
     */
    qp_up?: number;

    /**
     * Number of RTU Message Received.
     */
    ready_rx?: number;

    /**
     * Number of RTU Message Transmitted.
     */
    ready_tx?: number;

    /**
     * Number of REJ Message Transmitted.
     */
    reject_tx?: number;

    /**
     * Number of Unknown Message Received.
     */
    unknown_msg_rx?: number;
  }

  /**
   * RoCEv2 per peer statistics information.
   */
  export interface Rocev2Ipv6PerPeerMetric {
    /**
     * Number of REP Message Received.
     */
    connect_reply_rx?: number;

    /**
     * Number of REP Message Transmitted.
     */
    connect_reply_tx?: number;

    /**
     * Number of REQ Message Received.
     */
    connect_request_rx?: number;

    /**
     * Number of REQ Message Transmitted.
     */
    connect_request_tx?: number;

    /**
     * Number of DREP Message Received.
     */
    disconnect_reply_rx?: number;

    /**
     * Number of DREP Message Transmitted.
     */
    disconnect_reply_tx?: number;

    /**
     * Number of DREQ Message Received.
     */
    disconnect_request_rx?: number;

    /**
     * Number of DREQ Message Transmitted.
     */
    disconnect_request_tx?: number;

    /**
     * The name of a configured RoCEv2 peer.
     */
    name?: string;

    /**
     * Number of QPs configured on this port.
     */
    qp_configured?: number;

    /**
     * Number of QPs that have not come UP.
     */
    qp_down?: number;

    /**
     * Number of QPs that are in UP state.
     */
    qp_up?: number;

    /**
     * Number of RTU Message Received.
     */
    ready_rx?: number;

    /**
     * Number of RTU Message Transmitted.
     */
    ready_tx?: number;

    /**
     * Number of REJ Message Transmitted.
     */
    reject_tx?: number;

    /**
     * Number of Unknown Message Received.
     */
    unknown_msg_rx?: number;
  }

  /**
   * RSVP-TE per router statistics information.
   */
  export interface RsvpMetric {
    /**
     * The number of Ack messages received by this RSVP router.
     */
    acks_rx?: number;

    /**
     * The number of Ack messages sent by this RSVP router.
     */
    acks_tx?: number;

    /**
     * The number of Bundle messages received by this RSVP router.
     */
    bundle_rx?: number;

    /**
     * The number of Bundle messages sent by this RSVP router.
     */
    bundle_tx?: number;

    /**
     * The number of egress point-to-point LSPs for which Path requests were
     * successfully processed and is currently up.
     */
    egress_p2p_lsps_up?: number;

    /**
     * The number of Hello messages received by this RSVP router.
     */
    hellos_rx?: number;

    /**
     * The number of Hello messages sent by this RSVP router.
     */
    hellos_tx?: number;

    /**
     * The number of ingress point-to-point LSPs configured or transiting through the
     * RSVP router which have been initated from the test port.
     */
    ingress_p2p_lsps_configured?: number;

    /**
     * The number of ingress point-to-point LSPs for which Resv has been received and
     * is currently up.
     */
    ingress_p2p_lsps_up?: number;

    /**
     * The number of times an LSP went from up to down state either because it timed
     * out while waiting for Refreshes or a PathTear or ResvTear message was received
     * which caused the LSP to flap.
     */
    lsp_flap_count?: number;

    /**
     * The number of Nack messages received by this RSVP router.
     */
    nacks_rx?: number;

    /**
     * The number of Nack messages sent by this RSVP router.
     */
    nacks_tx?: number;

    /**
     * The name of a configured RSVP router.
     */
    name?: string;

    /**
     * The number of Path Error messages received by this RSVP router.
     */
    path_errors_rx?: number;

    /**
     * The number of Path Error messages sent by this RSVP router.
     */
    path_errors_tx?: number;

    /**
     * The number of Path messages with Path Re-evaluation Request enabled sent by this
     * RSVP router.
     */
    path_reevaluation_request_tx?: number;

    /**
     * The number of successfully completed Make-Before-Break operations on LSPs on
     * this RSVP router.
     */
    path_reoptimizations?: number;

    /**
     * The number of Path Tear messages received by this RSVP router.
     */
    path_tears_rx?: number;

    /**
     * The number of Path Tear messages sent by this RSVP router.
     */
    path_tears_tx?: number;

    /**
     * The number of Path messages received by this RSVP router.
     */
    paths_rx?: number;

    /**
     * The number of Path messages sent by this RSVP router.
     */
    paths_tx?: number;

    /**
     * The number of ResvConf messages received by this RSVP router.
     */
    resv_conf_rx?: number;

    /**
     * The number of ResvConf messages sent by this RSVP router.
     */
    resv_conf_tx?: number;

    /**
     * The number of Resv Error messages received by this RSVP router.
     */
    resv_errors_rx?: number;

    /**
     * The number of Resv Error messages sent by this RSVP router.
     */
    resv_errors_tx?: number;

    /**
     * The number of Resv Tear messages received by this RSVP router.
     */
    resv_tears_rx?: number;

    /**
     * The number of Resv Tear messages sent by this RSVP router.
     */
    resv_tears_tx?: number;

    /**
     * The number of Resv messages received by this RSVP router.
     */
    resvs_rx?: number;

    /**
     * The number of Resv messages sent by this RSVP router.
     */
    resvs_tx?: number;

    /**
     * The number of SRefresh messages received by this RSVP router.
     */
    srefresh_rx?: number;

    /**
     * The number of SRefresh messages sent by this RSVP router.
     */
    srefresh_tx?: number;
  }
}

/**
 * Response containing chosen traffic generator states
 */
export interface MonitorCreateStatesResponse {
  bgp_prefixes?: Array<MonitorCreateStatesResponse.BgpPrefix>;

  choice?:
    | 'ipv4_neighbors'
    | 'ipv6_neighbors'
    | 'bgp_prefixes'
    | 'isis_lsps'
    | 'lldp_neighbors'
    | 'rsvp_lsps'
    | 'dhcpv4_interfaces'
    | 'dhcpv4_leases'
    | 'dhcpv6_interfaces'
    | 'dhcpv6_leases'
    | 'ospfv2_lsas'
    | 'ospfv3_lsas';

  dhcpv4_interfaces?: Array<MonitorCreateStatesResponse.Dhcpv4Interface>;

  dhcpv4_leases?: Array<MonitorCreateStatesResponse.Dhcpv4Lease>;

  dhcpv6_interfaces?: Array<MonitorCreateStatesResponse.Dhcpv6Interface>;

  dhcpv6_leases?: Array<MonitorCreateStatesResponse.Dhcpv6Lease>;

  ipv4_neighbors?: Array<MonitorCreateStatesResponse.Ipv4Neighbor>;

  ipv6_neighbors?: Array<MonitorCreateStatesResponse.Ipv6Neighbor>;

  isis_lsps?: Array<MonitorCreateStatesResponse.IsisLsp>;

  lldp_neighbors?: Array<MonitorCreateStatesResponse.LldpNeighbor>;

  ospfv2_lsas?: Array<MonitorCreateStatesResponse.Ospfv2Lsa>;

  ospfv3_lsas?: Array<MonitorCreateStatesResponse.Ospfv3Lsa>;

  rsvp_lsps?: Array<MonitorCreateStatesResponse.RsvpLsp>;
}

export namespace MonitorCreateStatesResponse {
  /**
   * BGP peer prefixes.
   */
  export interface BgpPrefix {
    /**
     * The name of a BGP peer.
     */
    bgp_peer_name?: string;

    ipv4_unicast_prefixes?: Array<BgpPrefix.Ipv4UnicastPrefix>;

    ipv6_unicast_prefixes?: Array<BgpPrefix.Ipv6UnicastPrefix>;
  }

  export namespace BgpPrefix {
    /**
     * IPv4 unicast prefix.
     */
    export interface Ipv4UnicastPrefix {
      /**
       * This attribute identifies the autonomous systems through which routing
       * information carried in this UPDATE message has passed.
       */
      as_path?: MonitorAPI.ResultBgpAsPath;

      /**
       * Optional community attributes.
       */
      communities?: Array<MonitorAPI.ResultBgpCommunity>;

      /**
       * Optional received Extended Community attributes. Each received Extended
       * Community attribute is available for retrieval in two forms. Support of the
       * 'raw' format in which all 8 bytes (16 hex characters) is always present and
       * available for use. In addition, if supported by the implementation, the Extended
       * Community attribute may also be retrieved in the 'structured' format which is an
       * optional field.
       */
      extended_communities?: Array<MonitorAPI.ResultExtendedCommunity>;

      /**
       * An IPv4 unicast address
       */
      ipv4_address?: string;

      /**
       * The IPv4 address of the egress interface.
       */
      ipv4_next_hop?: string;

      /**
       * The IPv6 address of the egress interface.
       */
      ipv6_next_hop?: string;

      /**
       * The local preference is a well-known attribute and the value is used for route
       * selection. The route with the highest local preference value is preferred.
       */
      local_preference?: number;

      /**
       * The multi exit discriminator (MED) is an optional non-transitive attribute and
       * the value is used for route selection. The route with the lowest MED value is
       * preferred.
       */
      multi_exit_discriminator?: number;

      /**
       * The origin of the prefix.
       */
      origin?: 'igp' | 'egp' | 'incomplete';

      /**
       * The path id.
       */
      path_id?: number;

      /**
       * The length of the prefix.
       */
      prefix_length?: number;
    }

    /**
     * IPv6 unicast prefix.
     */
    export interface Ipv6UnicastPrefix {
      /**
       * This attribute identifies the autonomous systems through which routing
       * information carried in this UPDATE message has passed.
       */
      as_path?: MonitorAPI.ResultBgpAsPath;

      /**
       * Optional community attributes.
       */
      communities?: Array<MonitorAPI.ResultBgpCommunity>;

      /**
       * Optional received Extended Community attributes. Each received Extended
       * Community attribute is available for retrieval in two forms. Support of the
       * 'raw' format in which all 8 bytes (16 hex characters) is always present and
       * available for use. In addition, if supported by the implementation, the Extended
       * Community attribute may also be retrieved in the 'structured' format which is an
       * optional field.
       */
      extended_communities?: Array<MonitorAPI.ResultExtendedCommunity>;

      /**
       * The IPv4 address of the egress interface.
       */
      ipv4_next_hop?: string;

      /**
       * An IPv6 unicast address
       */
      ipv6_address?: string;

      /**
       * The IPv6 address of the egress interface.
       */
      ipv6_next_hop?: string;

      /**
       * The local preference is a well-known attribute and the value is used for route
       * selection. The route with the highest local preference value is preferred.
       */
      local_preference?: number;

      /**
       * The multi exit discriminator (MED) is an optional non-transitive attribute and
       * the value is used for route selection. The route with the lowest MED value is
       * preferred.
       */
      multi_exit_discriminator?: number;

      /**
       * The origin of the prefix.
       */
      origin?: 'igp' | 'egp' | 'incomplete';

      /**
       * The path id.
       */
      path_id?: number;

      /**
       * The length of the prefix.
       */
      prefix_length?: number;
    }
  }

  /**
   * The IPv4 address associated with this DHCP Client session.
   */
  export interface Dhcpv4Interface {
    /**
     * The name of a DHCPv4 Client.
     */
    dhcp_client_name?: string;

    /**
     * The Gateway Ipv4 address associated with this DHCP Client session.
     */
    gateway_address?: string;

    /**
     * The IPv4 address associated with this DHCP Client session.
     */
    ipv4_address?: string;

    /**
     * The duration of the IPv4 address lease, in seconds.
     */
    lease_time?: number;

    /**
     * The length of the prefix.
     */
    prefix_length?: number;

    /**
     * Time in seconds until the DHCPv4 client starts rebinding.
     */
    rebind_time?: number;

    /**
     * Time in seconds until the DHCPv4 client starts renewing the lease.
     */
    renew_time?: number;
  }

  /**
   * Lease information of DHCP Server.
   */
  export interface Dhcpv4Lease {
    /**
     * The name of a DHCP Server.
     */
    dhcp_server_name?: string;

    leases?: Array<Dhcpv4Lease.Lease>;
  }

  export namespace Dhcpv4Lease {
    /**
     * IPv4 address lease state.
     */
    export interface Lease {
      /**
       * The IPv4 address associated with this lease.
       */
      address?: string;

      /**
       * The Circuit ID option found in the last request message.
       */
      circuit_id?: string;

      /**
       * The ID of the DHCPv4 client holding this lease.
       */
      client_id?: string;

      /**
       * The elapsed time in seconds since the address has been renewed.
       */
      preferred_time?: number;

      /**
       * Time in seconds until the DHCPv4 client starts rebinding.
       */
      rebind_time?: number;

      /**
       * The Remote ID option found in the last request message.
       */
      remote_id?: string;

      /**
       * Time in seconds until the DHCPv4 client starts renewing the lease.
       */
      renew_time?: number;

      /**
       * The time in seconds after which the IPv4 address lease will expire.
       */
      valid_time?: number;
    }
  }

  /**
   * The IPv6 address associated with this DHCP Client session.
   */
  export interface Dhcpv6Interface {
    /**
     * The name of a DHCPv6 Client.
     */
    dhcp_client_name?: string;

    /**
     * The IPv6 IATA/IANA addresses and gateways associated with this DHCP Client
     * session.
     */
    ia_addresses?: Array<Dhcpv6Interface.IaAddress>;

    /**
     * The IPv6 IAPD addresses and prefixes associated with this DHCP Client session.
     */
    iapd_addresses?: Array<Dhcpv6Interface.IapdAddress>;
  }

  export namespace Dhcpv6Interface {
    /**
     * The IPv6 IATA/IANA address and gateway associated with this DHCP Client session.
     */
    export interface IaAddress {
      /**
       * The address associated with this DHCPv6 Client session.
       */
      address?: string;

      /**
       * The Gateway address associated with this DHCPv6 Client session.
       */
      gateway?: string;

      /**
       * The duration of the IPv6 address lease, in seconds.
       */
      lease_time?: number;
    }

    /**
     * The IPv6 IAPD address and prefix length associated with this DHCP Client
     * session.
     */
    export interface IapdAddress {
      /**
       * The IAPD address associated with this DHCPv6 Client session.
       */
      address?: string;

      /**
       * The duration of the IPv6 address lease, in seconds.
       */
      lease_time?: number;

      /**
       * The prefix length of the IAPD address associated with this DHCPv6 Client
       * session.
       */
      prefix_length?: number;
    }
  }

  /**
   * Lease information of DHCP Server.
   */
  export interface Dhcpv6Lease {
    /**
     * The name of a DHCP Server.
     */
    dhcp_server_name?: string;

    leases?: Array<Dhcpv6Lease.Lease>;
  }

  export namespace Dhcpv6Lease {
    /**
     * IPv6 unicast prefix.
     */
    export interface Lease {
      /**
       * The IPv6 address associated with this lease.
       */
      address?: string;

      /**
       * The ID of the DHCPv6 client holding this lease.
       */
      client_id?: string;

      /**
       * The Interface ID option found in the last request message.
       */
      interface_id?: string;

      /**
       * The time in seconds, elapsed time since address has been renewed.
       */
      preferred_time?: number;

      /**
       * Time in seconds until the DHCPv6 client starts rebinding.
       */
      rebind_time?: number;

      /**
       * The Remote ID option found in the last request message.
       */
      remote_id?: string;

      /**
       * Time in seconds until the DHCPv6 client starts renewing the lease.
       */
      renew_time?: number;

      /**
       * The time in seconds, IP address lease will expire.
       */
      valid_time?: number;
    }
  }

  /**
   * IPv4 Neighbor state (ARP cache entry).
   */
  export interface Ipv4Neighbor {
    /**
     * The name of the Ethernet interface associated with the Neighbor state (ARP cache
     * entry).
     */
    ethernet_name: string;

    /**
     * The IPv4 address of the neighbor.
     */
    ipv4_address: string;

    /**
     * The link-layer address (MAC) of the neighbor.
     */
    link_layer_address?: string;
  }

  /**
   * IPv6 Neighbor state (NDISC cache entry).
   */
  export interface Ipv6Neighbor {
    /**
     * The name of the Ethernet interface associated with the Neighbor state (NDISC
     * cache entry).
     */
    ethernet_name: string;

    /**
     * The IPv6 address of the neighbor.
     */
    ipv6_address: string;

    /**
     * The link-layer address (MAC) of the neighbor.
     */
    link_layer_address?: string;
  }

  /**
   * The result of ISIS LSP information that are retrieved.
   */
  export interface IsisLsp {
    /**
     * The name of the ISIS Router.
     */
    isis_router_name?: string;

    /**
     * One or more LSPs that are learned by this ISIS router.
     */
    lsps?: Array<IsisLsp.Lsp>;
  }

  export namespace IsisLsp {
    /**
     * ISIS LSP.
     */
    export interface Lsp {
      /**
       * LSP ID in the format, e.g. '640000000001-00-00'. LSP ID consists of the System
       * ID of a neighbor, the Pseudonode ID, and the LSP number. The last two bytes
       * represent Pseudonode ID and LSP number respectively. A pseudonode is a logical
       * representation of the LAN which is generated by a Designated Intermediate System
       * (DIS) on a LAN segment. If one LSP exceeds the maximum LSP size then it is sent
       * in another LSP with the LSP number incremented by one. A router's learned LSP
       * gets refreshed by 'remaining_lifetime'. Then the sequence number is incremented
       * by 1.
       */
      lsp_id: string;

      /**
       * LSP Type-Block flags.
       */
      flags?: Lsp.Flags;

      /**
       * IS Type - bits 1 and 2 indicate the type of Intermediate System. 1 - ( i.e. bit
       * 1 set) Level 1 Intermediate system. 2 - Unused value. 3 - (i.e. bits 1 and 2
       * set) Level 2 Intermediate system.
       */
      is_type?: number;

      /**
       * Total length of the LSP.
       */
      pdu_length?: number;

      /**
       * Link State PDU type.
       */
      pdu_type?: 'level_1' | 'level_2';

      /**
       * Remaining lifetime in seconds before LSP expires.
       */
      remaining_lifetime?: number;

      /**
       * Sequence number of the LSP.
       */
      sequence_number?: number;

      /**
       * It refers to Link State PDU State TLVs container.
       */
      tlvs?: Lsp.Tlvs;
    }

    export namespace Lsp {
      /**
       * LSP Type-Block flags.
       */
      export interface Flags {
        /**
         * Default Metric - when set, the originator is attached to another area using the
         * referred metric.
         */
        attached_default?: boolean;

        /**
         * Delay Metric - when set, the originator is attached to another area using the
         * referred metric.
         */
        attached_delay?: boolean;

        /**
         * When set, the originator is attached to another area using the referred metric.
         */
        attached_error?: boolean;

        /**
         * When set, the originator is attached to another area using the referred metric.
         */
        attached_expense?: boolean;

        /**
         * Overload bit - when set, the originator is overloaded, and must be avoided in
         * path calculation.
         */
        overload?: boolean;

        /**
         * When set, the originator supports partition repair.
         */
        partition_repair?: boolean;
      }

      /**
       * It refers to Link State PDU State TLVs container.
       */
      export interface Tlvs {
        /**
         * Array of IPv4 Extended Reachability TLVs (type 135) present in this LSP.
         */
        extended_ipv4_reachability_tlvs?: Array<Tlvs.ExtendedIpv4ReachabilityTlv>;

        /**
         * Array of Extended IS-Reachability TLVs (type 22) present in this LSP.
         */
        extended_is_reachability_tlvs?: Array<Tlvs.ExtendedIsReachabilityTlv>;

        /**
         * Array of Hostname TLVs ( type 137) present in this LSP.
         */
        hostname_tlvs?: Array<Tlvs.HostnameTlv>;

        /**
         * Array of IPv4 External Reachability TLVs (type 130) present in this LSP.
         */
        ipv4_external_reachability_tlvs?: Array<Tlvs.Ipv4ExternalReachabilityTlv>;

        /**
         * Array of IPv4 Internal Reachability TLVs (type 128) present in this LSP.
         */
        ipv4_internal_reachability_tlvs?: Array<Tlvs.Ipv4InternalReachabilityTlv>;

        /**
         * Array of IPv6 Reachability TLVs (type 236) present in this LSP.
         */
        ipv6_reachability_tlvs?: Array<Tlvs.Ipv6ReachabilityTlv>;

        /**
         * Array of IS-Reachability TLVs (type 2) present in this LSP.
         */
        is_reachability_tlvs?: Array<Tlvs.IsReachabilityTlv>;

        /**
         * IS-IS Router Capabilities: TLV 242. This container defines Router Capabilities.
         */
        router_capabilities?: Array<Tlvs.RouterCapability>;
      }

      export namespace Tlvs {
        /**
         * This container defines list of IPv4 extended reachability information in one
         * Extended IPv4 External Reachability TLV. It is advertised when the 'wide metric'
         * is enabled.
         */
        export interface ExtendedIpv4ReachabilityTlv {
          /**
           * IPv4 prefix contained within extended reachability TLVs.
           */
          prefixes?: Array<ExtendedIpv4ReachabilityTlv.Prefix>;
        }

        export namespace ExtendedIpv4ReachabilityTlv {
          /**
           * This group defines attributes of an IPv4 standard prefix.
           */
          export interface Prefix {
            /**
             * An IPv4 unicast prefix reachable via the originator of this LSP.
             */
            ipv4_address?: string;

            /**
             * ISIS wide metric.
             */
            metric?: number;

            /**
             * Extended Prefix Attribute flags container sub-TLV is type 4.
             */
            prefix_attributes?: MonitorAPI.IsisLspPrefixAttributes;

            /**
             * The length of the IPv4 prefix.
             */
            prefix_length?: number;

            /**
             * Prefix Segment-ID list. IGP-Prefix Segment is an IGP segment attached to an IGP
             * prefix. An IGP-Prefix Segment is global (unless explicitly advertised otherwise)
             * within the SR/IGP domain.
             */
            prefix_sids?: Array<MonitorAPI.IsisLspPrefixSid>;

            /**
             * Up (0)-used when a prefix is initially advertised within the ISIS L3 hierarchy,
             * and for all other prefixes in L1 and L2 LSPs. (default) Down (1)-used when an
             * L1/L2 router advertises L2 prefixes in L1 LSPs. The prefixes are being
             * advertised from a higher level (L2) down to a lower level (L1).
             */
            redistribution_type?: 'up' | 'down';
          }
        }

        /**
         * This is list of ISIS neighbors and attributes in Extended-IS-Reachability TLV
         * (type 22).
         */
        export interface ExtendedIsReachabilityTlv {
          /**
           * This container describes IS neighbors.
           */
          neighbors?: Array<ExtendedIsReachabilityTlv.Neighbor>;
        }

        export namespace ExtendedIsReachabilityTlv {
          /**
           * This contains IS neighbors.
           */
          export interface Neighbor {
            /**
             * List of segment routing adjacency SIDs.
             */
            adjacency_sids?: Array<Neighbor.AdjacencySid>;

            /**
             * The System ID for this emulated ISIS router, e.g. "640100010000".
             */
            system_id?: string;
          }

          export namespace Neighbor {
            /**
             * This container defines segment routing adjacency SIDs.
             */
            export interface AdjacencySid {
              /**
               * Flags associated with Adjacency Segment-ID.
               */
              flags?: AdjacencySid.Flags;

              /**
               * One or more SID/Indices are the SID/Label values associated with the IGP
               * adjacency SID.
               */
              sids?: Array<number>;

              /**
               * Adjacency-SID type: Adjacency SIDs(31) or LAN adjacency SID (32).
               */
              type?: 'adj_sid' | 'lan_adj_sid';

              /**
               * The value represents the weight of the Adj-SID for the purpose of load
               * balancing.
               */
              weight?: number;
            }

            export namespace AdjacencySid {
              /**
               * Flags associated with Adjacency Segment-ID.
               */
              export interface Flags {
                /**
                 * The backup flag. If set, the Adj-SID is eligible for protection.
                 */
                b_flag?: boolean;

                /**
                 * The address family flag. If unset, then the Adj-SID refers to an adjacency with
                 * outgoing IPv4 encapsulation. If set then the Adj-SID refers to an adjacency with
                 * outgoing IPv6 encapsulation.
                 */
                f_flag?: boolean;

                /**
                 * The local flag. If set, then the value/index carried by the Adj-SID has local
                 * significance.
                 */
                l_flag?: boolean;

                /**
                 * The persistent flag. When set, the P-Flag indicates that the Adj-SID is
                 * persistently allocated, i.e., the Adj-SID value remains consistent across router
                 * restart and/or interface flap.
                 */
                p_flag?: boolean;

                /**
                 * The set flag. When set, the S-Flag indicates that the Adj-SID refers to a set of
                 * adjacencies (and therefore MAY be assigned to other adjacencies as well).
                 */
                s_flag?: boolean;

                /**
                 * The value flag. If set, then the Adj-SID carries a value.
                 */
                v_flag?: boolean;
              }
            }
          }
        }

        /**
         * It contains Hostname for the TLV 137.
         */
        export interface HostnameTlv {
          /**
           * Hostname for an ISIS router.
           */
          hostname?: string;
        }

        /**
         * This container defines list of IPv4 external reachability information in one
         * IPv4 external reachability TLV. This is advertised when the origin-type is set
         * 'external' in route range configurations.
         */
        export interface Ipv4ExternalReachabilityTlv {
          /**
           * Describes list of IPv4 prefixes in this TLV..
           */
          prefixes?: Array<MonitorAPI.IsisLspV4Prefix>;
        }

        /**
         * This container defines list of IPv4 internal reachability information in one
         * IPv4 internal reachability TLV. This is advertised when the origin-type is set
         * 'internal' in route range configurations.
         */
        export interface Ipv4InternalReachabilityTlv {
          /**
           * Describes list of IPv4 prefixes in this TLV.
           */
          prefixes?: Array<MonitorAPI.IsisLspV4Prefix>;
        }

        /**
         * It defines list of IPv6 extended reachability information in one IPv6
         * Reachability TLV.
         */
        export interface Ipv6ReachabilityTlv {
          /**
           * IPv6 prefix contained within reachability TLVs.
           */
          prefixes?: Array<Ipv6ReachabilityTlv.Prefix>;
        }

        export namespace Ipv6ReachabilityTlv {
          /**
           * It defines attributes of an IPv6 standard prefix.
           */
          export interface Prefix {
            /**
             * An IPv6 unicast prefix reachable via the originator of this LSP.
             */
            ipv6_address?: string;

            /**
             * ISIS wide metric.
             */
            metric?: number;

            /**
             * The origin of the advertised route-internal or external to the ISIS area.
             * Options include the following: Internal-for intra-area routes, through Level 1
             * LSPs. External-for inter-area routes redistributed within L1, through Level 1
             * LSPs.
             */
            origin_type?: 'internal' | 'external';

            /**
             * Extended Prefix Attribute flags container sub-TLV is type 4.
             */
            prefix_attributes?: MonitorAPI.IsisLspPrefixAttributes;

            /**
             * The length of the IPv6 prefix.
             */
            prefix_length?: number;

            /**
             * Prefix Segment-ID list. IGP-Prefix Segment is an IGP segment attached to an IGP
             * prefix. An IGP-Prefix Segment is global (unless explicitly advertised otherwise)
             * within the SR/IGP domain.
             */
            prefix_sids?: Array<MonitorAPI.IsisLspPrefixSid>;

            /**
             * Up (0)-used when a prefix is initially advertised within the ISIS L3 hierarchy,
             * and for all other prefixes in L1 and L2 LSPs. (default) Down (1)-used when an
             * L1/L2 router advertises L2 prefixes in L1 LSPs. The prefixes are being
             * advertised from a higher level (L2) down to a lower level (L1).
             */
            redistribution_type?: 'up' | 'down';
          }
        }

        /**
         * This container describes list of ISIS neighbors and attributes in
         * IS-Reachability TLV (type 2).
         */
        export interface IsReachabilityTlv {
          /**
           * This container describes Intermediate System (IS) neighbors.
           */
          neighbors?: Array<IsReachabilityTlv.Neighbor>;
        }

        export namespace IsReachabilityTlv {
          /**
           * This contains IS neighbors.
           */
          export interface Neighbor {
            /**
             * The System ID for this emulated ISIS router, e.g. "640100010000".
             */
            system_id?: string;
          }
        }

        /**
         * Container of IS-IS Router CAPABILITY TLV.
         */
        export interface RouterCapability {
          /**
           * This contains one or more SR-Algorithm.
           */
          algorithms?: Array<number>;

          /**
           * D bit (0x02): When the IS-IS Router CAPABILITY TLV is leaked from Level 2 (L2)
           * to Level 1 (L1), the D bit MUST be set. Otherwise, this bit MUST be clear. IS-IS
           * Router CAPABILITY TLVs with the D bit set MUST NOT be leaked from Level 1 to
           * Level 2. This is to prevent TLV looping.
           */
          d_bit?: 'down' | 'not_down';

          /**
           * Router CapabilityID in IPv4 address format.
           */
          router_cap_id?: string;

          /**
           * S bit (0x01): If the S bit is set(1), the IS-IS Router CAPABILITY TLV MUST be
           * flooded across the entire routing domain. If the S bit is not set(0), the TLV
           * MUST NOT be leaked between levels. This bit MUST NOT be altered during the TLV
           * leaking.
           */
          s_bit?: 'flood' | 'not_flood';

          /**
           * SR-Capabilities.
           */
          sr_capability?: RouterCapability.SrCapability;

          /**
           * This contains the list of SR Local Block (SRLB)
           */
          srlb_ranges?: Array<RouterCapability.SrlbRange>;
        }

        export namespace RouterCapability {
          /**
           * SR-Capabilities.
           */
          export interface SrCapability {
            /**
             * 1 octet of flags.
             */
            flags?: SrCapability.Flags;

            /**
             * This contains the list of SRGB.
             */
            srgb_ranges?: Array<SrCapability.SrgbRange>;
          }

          export namespace SrCapability {
            /**
             * 1 octet of flags.
             */
            export interface Flags {
              /**
               * I-Flag for the MPLS IPv4 Flag. If set, then the router is capable of processing
               * SR-MPLS-encapsulated IPv4 packets on all interfaces.
               */
              ipv4_mpls?: boolean;

              /**
               * V-Flag for the MPLS IPv6 Flag. If set, then the router is capable of processing
               * SR-MPLS-encapsulated IPv6 packets on all interfaces.
               */
              ipv6_mpls?: boolean;
            }

            /**
             * This contains the propeties of SRGB range. Reference:
             * https://datatracker.ietf.org/doc/html/rfc8667#section-3.1-7.1.1
             */
            export interface SrgbRange {
              /**
               * This represents the number of SID in a SRGB range.
               */
              range?: number;

              /**
               * The SID/Label sub-TLV contains the first value of the SRGB while the range
               * contains the number of SRGB elements.
               */
              starting_sid?: number;
            }
          }

          /**
           * This contains the propeties of SRLB. The SR Local Block (SRLB) sub-TLV contains
           * the range of labels the node has reserved for Local SIDs. Local SIDs are used,
           * e.g., for Adj-SIDs, and may also be allocated by components other than the IS-IS
           * protocol Reference:
           * https://datatracker.ietf.org/doc/html/rfc8667#name-sr-local-block-sub-tlv.
           */
          export interface SrlbRange {
            /**
             * This represents the number of SID in a SRGB range.
             */
            range?: number;

            /**
             * The SID/Label sub-TLV contains the first value of the SRGB while the range
             * contains the number of SRGB elements.
             */
            starting_sid?: number;
          }
        }
      }
    }
  }

  /**
   * LLDP neighbor information.
   */
  export interface LldpNeighbor {
    /**
     * Age since discovery in seconds.
     */
    age?: number;

    capabilities?: Array<LldpNeighbor.Capability>;

    /**
     * The Chassis ID is a mandatory TLV which identifies the chassis component of the
     * endpoint identifier associated with the transmitting LLDP agent.
     */
    chassis_id?: string;

    /**
     * This field identifies the format and source of the chassis identifier string. It
     * is an enumerator defined by the LldpChassisIdSubtype object from IEEE 802.1AB
     * MIB.
     */
    chassis_id_type?:
      | 'port_component'
      | 'network_address'
      | 'chassis_component'
      | 'mac_address'
      | 'interface_name'
      | 'local'
      | 'interface_alias';

    custom_tlvs?: Array<LldpNeighbor.CustomTlv>;

    /**
     * Seconds since last update received.
     */
    last_update?: number;

    /**
     * The name of the LLDP instance.
     */
    lldp_name?: string;

    /**
     * The Management Address is a mandatory TLV which identifies a network address
     * associated with the local LLDP agent, which can be used to reach the agent on
     * the port identified in the Port ID TLV.
     */
    management_address?: string;

    /**
     * The enumerated value for the network address type identified in this TLV. This
     * enumeration is defined in the 'Assigned Numbers' RFC [RFC3232] and the
     * ianaAddressFamilyNumbers object.
     */
    management_address_type?: string;

    /**
     * System generated identifier for the neighbor on the LLDP instance.
     */
    neighbor_id?: string;

    /**
     * The binary string containing the actual port identifier for the port which this
     * LLDP PDU was transmitted. The source and format of this field is defined by
     * PtopoPortId from RFC2922.
     */
    port_description?: string;

    /**
     * The Port ID is a mandatory TLV which identifies the port component of the
     * endpoint identifier associated with the transmitting LLDP agent. If the
     * specified port is an IEEE 802.3 Repeater port, then this TLV is optional.
     */
    port_id?: string;

    /**
     * This field identifies the format and source of the port identifier string. It is
     * an enumerator defined by the PtopoPortIdType object from RFC2922.
     */
    port_id_type?:
      | 'port_component'
      | 'network_address'
      | 'agent_circuit_id'
      | 'mac_address'
      | 'interface_name'
      | 'local'
      | 'interface_alias';

    /**
     * The system description field shall contain an alpha-numeric string that is the
     * textual description of the network entity. The system description should include
     * the full name and version identification of the system's hardware type, software
     * operating system, and networking software. If implementations support IETF RFC
     * 3418, the sysDescr object should be used for this field.
     */
    system_description?: string;

    /**
     * The system name field shall contain an alpha-numeric string that indicates the
     * system's administratively assigned name. The system name should be the system's
     * fully qualified domain name. If implementations support IETF RFC 3418, the
     * sysName object should be used for this field.
     */
    system_name?: string;

    /**
     * The time-to-live (TTL) in seconds is a mandatory TLV which indicates how long
     * information from the neighbor should be considered valid.
     */
    ttl?: number;
  }

  export namespace LldpNeighbor {
    /**
     * LLDP system capability advertised by the neighbor
     */
    export interface Capability {
      /**
       * Indicates whether the corresponding system capability is enabled on the
       * neighbor.
       */
      capability_enabled?: boolean;

      /**
       * Name of the system capability advertised by the neighbor. Capabilities are
       * represented in a bitmap that defines the primary functions of the system. The
       * capabilities are defined in IEEE 802.1AB.
       */
      capability_name?:
        | 'mac_bridge'
        | 'two_port_mac_relay'
        | 'repeater'
        | 'docsis_cable_device'
        | 's_vlan'
        | 'telephone'
        | 'other'
        | 'router'
        | 'c_vlan'
        | 'station_only'
        | 'wlan_access_point';
    }

    /**
     * Custom TLV received from a neighbor.Custom TLVs are organization specific TLVs
     * advertised with TLV type 127.
     */
    export interface CustomTlv {
      /**
       * The integer value identifying the type of information contained in the value
       * field.
       */
      custom_type?: number;

      /**
       * Contains information on the remaining bytes of the received
       * Organization-Specific TLV after the sub-type field. The value must be returned
       * in lowercase hexadecimal format.
       */
      information?: string;

      /**
       * The organizationally unique identifier field shall contain the organization's
       * OUI as defined in Clause 9 of IEEE Std 802. The high-order octet is 0 and the
       * low-order 3 octets are the SMI Network Management Private Enterprise Code of the
       * Vendor in network byte order, as defined in the 'Assigned Numbers' RFC
       * [RFC3232].
       */
      oui?: string;

      /**
       * The organizationally defined subtype field shall contain a unique subtype value
       * assigned by the defining organization.
       */
      oui_subtype?: number;
    }
  }

  /**
   * The result of OSPFv2 LSA information that are retrieved.
   */
  export interface Ospfv2Lsa {
    /**
     * OSPFv2 AS-External-LSA - Type 5.
     */
    external_as_lsas?: Array<Ospfv2Lsa.ExternalAsLsa>;

    /**
     * One or more OSPFv2 Network-LSA - Type 2.
     */
    network_lsas?: Array<Ospfv2Lsa.NetworkLsa>;

    /**
     * One or more OSPFv2 Network summary LSA - Type 3.
     */
    network_summary_lsas?: Array<Ospfv2Lsa.NetworkSummaryLsa>;

    /**
     * One or more OSPFv2 NSSA-LSA - Type 7.
     */
    nssa_lsas?: Array<Ospfv2Lsa.NssaLsa>;

    /**
     * One or more OSPFv2 Link-Scope Opaque-LSA - Type 9.
     */
    opaque_lsas?: Array<Ospfv2Lsa.OpaqueLsa>;

    /**
     * One or more OSPFv2 Router-LSA - Type 1.
     */
    router_lsas?: Array<Ospfv2Lsa.RouterLsa>;

    /**
     * The name of the OSPFv2 Router that learned the LSA information.
     */
    router_name?: string;

    /**
     * One or more OSPFv2 Autonomous System Boundary Router (ASBR) summary LSA -
     * Type 4.
     */
    summary_as_lsas?: Array<Ospfv2Lsa.SummaryAsLsa>;
  }

  export namespace Ospfv2Lsa {
    /**
     * Contents of OSPFv2 AS-External-LSA - Type 5. The value of the IPv4 prefix that
     * was received is present in header.lsa_id.
     */
    export interface ExternalAsLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;

      /**
       * The type of metric associated with the route range.
       */
      metric_type?: number;

      /**
       * The IPv4 address mask for the network.
       */
      network_mask?: string;
    }

    /**
     * Contents of the Network LSA.
     */
    export interface NetworkLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * Neighbor router ids that are described within the LSA.
       */
      neighbor_router_ids?: Array<string>;

      /**
       * The IPv4 address mask for the network.
       */
      network_mask?: string;
    }

    /**
     * Contents of the Network Summary LSA - Type 3. The value of the IPv4 prefix that
     * was received is present in header.lsa_id.
     */
    export interface NetworkSummaryLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;

      /**
       * The IPv4 address mask for the network.
       */
      network_mask?: string;
    }

    /**
     * Contents of OSPFv2 NSSA LSA - Type 7. The value of the IPv4 prefix that was
     * received is present in header.lsa_id.
     */
    export interface NssaLsa {
      /**
       * IPv4 Forwarding address.
       */
      forwarding_address?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;

      /**
       * The type of metric associated with the route range.
       */
      metric_type?: number;

      /**
       * The IPv4 address mask for the network.
       */
      network_mask?: string;
    }

    /**
     * Contents of OSPFv2 Opaque LSA - Type 7.
     */
    export interface OpaqueLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * The type of Opaque TE LSAs. The LSA type.
       */
      type?: 'local' | 'area' | 'domain';
    }

    /**
     * Contents of the router LSA.
     */
    export interface RouterLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * Links that are described within the LSA.
       */
      links?: Array<RouterLsa.Link>;
    }

    export namespace RouterLsa {
      /**
       * Generic attributes used to identify links within OSPFv2.
       */
      export interface Link {
        /**
         * The identifier for the link specified. The value of the link identifier is
         * dependent upon the type of the LSA.
         */
        id?: string;

        /**
         * The data associated with the link type. The value is dependent upon the subtype
         * of the LSA. When the connection is to a stub network it represents the mask; for
         * p2p connections that are unnumbered it represents the ifIndex value of the
         * router's interface; for all other connections it represents the local system's
         * IP address.
         */
        data?: string;

        /**
         * The data associated with the link type. The value is dependent upon the subtype
         * of the LSA. When the connection is to a stub network it represents the mask; for
         * p2p connections that are unnumbered it represents the ifIndex value of the
         * router's interface; for all other connections it represents the local system's
         * IP address.
         */
        metric?: number;

        /**
         * The data associated with the link type. The value is dependent upon the subtype
         * of the LSA. - point_to_point: The LSA represents a point-to-point connection to
         * another router. - transit: The LSA represents a connection to a transit
         * network. - stub: The LSA represents a connection to a stub network. - virtual:
         * The LSA represents a virtual link connection.
         */
        type?: 'point_to_point' | 'transit' | 'stub' | 'virtual';
      }
    }

    /**
     * Contents of OSPFv2 Autonomous System Boundary Router (ASBR) summary LSA -
     * Type 4.
     */
    export interface SummaryAsLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv2LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;

      /**
       * The IPv4 address mask for the network.
       */
      network_mask?: string;
    }
  }

  /**
   * The result of OSPFv3 LSA information that are retrieved.
   */
  export interface Ospfv3Lsa {
    /**
     * OSPFv3 AS-External LSA - Type 5.
     */
    external_as_lsas?: Array<Ospfv3Lsa.ExternalAsLsa>;

    /**
     * One or more OSPFv3 Inter-Area-Prefix LSA - Type 3.
     */
    inter_area_prefix_lsas?: Array<Ospfv3Lsa.InterAreaPrefixLsa>;

    /**
     * One or more OSPFv3 Inter-Area-Router LSA - Type 4.
     */
    inter_area_router_lsas?: Array<Ospfv3Lsa.InterAreaRouterLsa>;

    /**
     * One or more OSPFv3 Intra-Area-Prefix LSA - Type 9.
     */
    intra_area_prefix_lsas?: Array<Ospfv3Lsa.IntraAreaPrefixLsa>;

    /**
     * One or more OSPFv3 Link LSA - Type 8.
     */
    link_lsas?: Array<Ospfv3Lsa.LinkLsa>;

    /**
     * One or more OSPFv3 Network LSA - Type 2.
     */
    network_lsas?: Array<Ospfv3Lsa.NetworkLsa>;

    /**
     * One or more OSPFv3 NSSA LSA - Type 7.
     */
    nssa_lsas?: Array<Ospfv3Lsa.NssaLsa>;

    /**
     * One or more OSPFv3 Router LSA - Type 1.
     */
    router_lsas?: Array<Ospfv3Lsa.RouterLsa>;

    /**
     * The name of the OSPFv3 Router that learned the LSA information.
     */
    router_name?: string;
  }

  export namespace Ospfv3Lsa {
    /**
     * Contents of OSPFv3 AS-External-LSA - Type 5.
     */
    export interface ExternalAsLsa {
      /**
       * The first IPv6 address prefix to be advertised in the LSA.
       */
      address_prefix?: string;

      /**
       * The IPV6 address where traffic for the advertised destination is forwarded.
       */
      forwarding_address?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The cost metric value for the route to this destination router.
       */
      metric?: number;

      /**
       * The length of the IPv6 address prefix, in bits.
       */
      prefix_length?: number;

      /**
       * If non-zero, an LSA with this LS type is to be associated with this LSA.
       */
      referenced_ls_type?: number;

      /**
       * The optional field may be used to communicate additional information between AS
       * boundary routers.
       */
      route_tag?: string;
    }

    /**
     * Contents of the Inter-Area-Prefix LSA - Type 3.
     */
    export interface InterAreaPrefixLsa {
      /**
       * The prefix for Inter Area Prefix LSA Address.
       */
      address_prefix?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;

      /**
       * The prefix length for the IP address.
       */
      prefix_length?: number;
    }

    /**
     * Contents of OSPFv3 Inter-Area-Router LSA - Type 4.
     */
    export interface InterAreaRouterLsa {
      /**
       * The id of the destination router of LSA.
       */
      destination_router_id?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The cost of the summary route TOS level 0 and all unspecified levels.
       */
      metric?: number;
    }

    /**
     * Contents of OSPFv3 Intra-Area-Prefix LSA - Type 9.
     */
    export interface IntraAreaPrefixLsa {
      /**
       * The first IPv6 address prefix to be advertised in the LSA.
       */
      address_prefix?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The cost metric value for the route to this destination router.
       */
      metric?: number;

      /**
       * The length of the IPv6 address prefix, in bits.
       */
      prefix_length?: number;
    }

    /**
     * Contents of OSPFv3 Link LSA - Type 8.
     */
    export interface LinkLsa {
      /**
       * The first IPv6 address prefix to be advertised in the LSA.
       */
      address_prefix?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The IPV6 Link Local address for the originating router's interface attached to
       * this link.
       */
      link_local_address?: string;

      /**
       * The length of the IPv6 address prefix, in bits.
       */
      prefix_length?: number;
    }

    /**
     * Contents of the Network LSA.
     */
    export interface NetworkLsa {
      /**
       * Attached router ids that are described within the LSA.
       */
      attached_router_ids?: Array<string>;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;
    }

    /**
     * Contents of OSPFv3 NSSA LSA - Type 7.
     */
    export interface NssaLsa {
      /**
       * The first IPv6 address prefix to be advertised in the LSA.
       */
      address_prefix?: string;

      /**
       * The IPV6 address where traffic for the advertised destination is forwarded.
       */
      forwarding_address?: string;

      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * The cost metric value for the route to this destination router.
       */
      metric?: number;

      /**
       * The length of the IPv6 address prefix, in bits.
       */
      prefix_length?: number;

      /**
       * The optional field may be used to communicate additional information between AS
       * boundary routers.
       */
      route_tag?: string;
    }

    /**
     * Contents of the router LSA.
     */
    export interface RouterLsa {
      /**
       * Contents of the LSA header.
       */
      header?: MonitorAPI.Ospfv3LsaHeader;

      /**
       * Links that are described within the LSA.
       */
      links?: Array<RouterLsa.Link>;

      /**
       * Neighbor router id that is described within the LSA.
       */
      neighbor_router_id?: string;
    }

    export namespace RouterLsa {
      /**
       * Generic attributes used to identify links within OSPFv3.
       */
      export interface Link {
        /**
         * The data associated with the link type. The value is dependent upon the subtype
         * of the LSA. When the connection is to a stub network it represents the mask; for
         * p2p connections that are unnumbered it represents the ifIndex value of the
         * router's interface; for all other connections it represents the local system's
         * IP address.
         */
        metric?: number;

        /**
         * The data associated with the link type. The value is dependent upon the subtype
         * of the LSA. - point_to_point: The LSA represents a point-to-point connection to
         * another router. - transit: The LSA represents a connection to a transit
         * network. - stub: The LSA represents a connection to a stub network. - virtual:
         * The LSA represents a virtual link connection.
         */
        type?: 'point_to_point' | 'transit' | 'stub' | 'virtual';
      }
    }
  }

  /**
   * Discovered IPv4 Point-to-Point LSPs of a RSVP-TE router.
   */
  export interface RsvpLsp {
    /**
     * IPv4 Point-to-Point RSVP-TE Discovered LSPs.
     */
    ipv4_lsps?: Array<RsvpLsp.Ipv4Lsp>;

    /**
     * The name of the RSVP-TE Router.
     */
    rsvp_router_name?: string;
  }

  export namespace RsvpLsp {
    /**
     * IPv4 RSVP-TE Discovered LSPs.
     */
    export interface Ipv4Lsp {
      /**
       * The IPv4 destination address of RSVP session.
       */
      destination_address?: string;

      /**
       * It refers to RSVP ERO objects container.
       */
      eros?: Array<Ipv4Lsp.Ero>;

      /**
       * It refers to the RSVP LSP properties.
       */
      lsp?: Ipv4Lsp.Lsp;

      /**
       * It refers to RSVP RRO objects container.
       */
      rros?: Array<Ipv4Lsp.Rro>;

      /**
       * The origin IPv4 address of RSVP session.
       */
      source_address?: string;
    }

    export namespace Ipv4Lsp {
      /**
       * This contains the list of sub-objects included in the Explicit Route Object(ERO)
       * object send in the PATH message from the ingress. These sub-objects contain the
       * intermediate hops to be traversed by the LSP while being forwarded towards the
       * egress endpoint.
       */
      export interface Ero {
        /**
         * The autonomous system number indicated by the ERO. Specified only when the ERO
         * hop is an 2 or 4-byte AS number.
         */
        asn?: number;

        /**
         * The IPv4 prefix indicated by the ERO. Specified only when the ERO hop is an IPv4
         * prefix.
         */
        prefix?: string;

        /**
         * The type indicated by the ERO.
         */
        type?: 'ipv4' | 'ipv6' | 'asn' | 'asn4' | 'label' | 'unnumbered_interface';
      }

      /**
       * It refers to the RSVP LSP properties.
       */
      export interface Lsp {
        /**
         * The label received by RSVP-TE ingress.
         */
        label_in?: number;

        /**
         * The label assigned by RSVP-TE egress.
         */
        label_out?: number;

        /**
         * The reason for the last flap of this RSVP session.
         */
        last_flap_reason?: 'resv_tear' | 'path_tear' | 'path_timeout';

        /**
         * The lsp-id of RSVP session which acts as a differentiator for two lsps
         * originating from the same headend, commonly used to distinguish RSVP sessions
         * during make before break operations.
         */
        lsp_id?: number;

        /**
         * The value of RSVP-TE Session Name field of the Session Attribute object.
         */
        session_name?: string;

        /**
         * Operational state of the RSVP LSP.
         */
        session_status?: 'up' | 'down';

        /**
         * The tunnel id of RSVP session which acts as an identifier that remains constant
         * over the life of the tunnel.
         */
        tunnel_id?: number;

        /**
         * The tunnel UP time in milli seconds. If the tunnel is DOWN the UP time will be
         * zero.
         */
        up_time?: number;
      }

      /**
       * This contains the list of Record Route Object(RRO) objects associated with the
       * traffic engineering tunnel. The Record Route Object(RRO) is used in RSVP-TE to
       * record the route traversed by the LSP. The RRO might be present in both Path
       * message and Resv message, the RRO stores the IP addresses of the routers that
       * the traffic engineering tunnel traversed and also the label generated and
       * distributed by the routers. The RROs in the Resv message mirrors that of the
       * Path message, the only difference is that the RRO in a Resv message records the
       * path information in the reverse direction.
       */
      export interface Rro {
        /**
         * The IPv4 addresses of the routers that the traffic engineering tunnel traversed.
         */
        address?: string;

        /**
         * Label reported for RRO hop. When the Label_Recording flag is set in the Session
         * Attribute object, nodes doing route recording should include the Label Record
         * subobject containing the reported label.
         */
        reported_label?: number;
      }
    }
  }
}

export interface MonitorCaptureParams {
  /**
   * The name of a port a capture is started on.
   *
   * x-constraint:
   *
   * - /components/schemas/Port/properties/name
   */
  port_name: string;
}

export interface MonitorCreateMetricsParams {
  /**
   * The request to retrieve BGPv4 per peer metrics/statistics.
   */
  bgpv4?: MonitorCreateMetricsParams.Bgpv4;

  /**
   * The request to retrieve BGPv6 per peer metrics/statistics.
   */
  bgpv6?: MonitorCreateMetricsParams.Bgpv6;

  choice?:
    | 'port'
    | 'flow'
    | 'bgpv4'
    | 'bgpv6'
    | 'isis'
    | 'lag'
    | 'lacp'
    | 'lldp'
    | 'rsvp'
    | 'dhcpv4_client'
    | 'dhcpv4_server'
    | 'dhcpv6_client'
    | 'dhcpv6_server'
    | 'ospfv2'
    | 'convergence'
    | 'macsec'
    | 'mka'
    | 'ospfv3'
    | 'rocev2_ipv4'
    | 'rocev2_ipv6'
    | 'rocev2_flow'
    | 'egress_only_tracking';

  /**
   * Under Review: Convergence metrics is currently under review for pending
   * exploration on use cases.
   *
   * Container for requesting control-plane and data-plane convergence time metrics
   * for flows.
   */
  convergence?: MonitorCreateMetricsParams.Convergence;

  /**
   * The request to retrieve DHCPv4 per client metrics/statistics.
   */
  dhcpv4_client?: MonitorCreateMetricsParams.Dhcpv4Client;

  /**
   * The request to retrieve DHCPv4 per Server metrics/statistics.
   */
  dhcpv4_server?: MonitorCreateMetricsParams.Dhcpv4Server;

  /**
   * The request to retrieve DHCPv6 per client metrics/statistics.
   */
  dhcpv6_client?: MonitorCreateMetricsParams.Dhcpv6Client;

  /**
   * The request to retrieve DHCPv6 per Server metrics/statistics.
   */
  dhcpv6_server?: MonitorCreateMetricsParams.Dhcpv6Server;

  /**
   * The container for a egress only tracking metric request.
   */
  egress_only_tracking?: MonitorCreateMetricsParams.EgressOnlyTracking;

  /**
   * The container for a flow metric request.
   */
  flow?: MonitorCreateMetricsParams.Flow;

  /**
   * The request to retrieve ISIS per Router metrics/statistics.
   */
  isis?: MonitorCreateMetricsParams.Isis;

  /**
   * The request to retrieve LACP per LAG member metrics/statistics.
   */
  lacp?: MonitorCreateMetricsParams.Lacp;

  /**
   * The request to retrieve per LAG metrics/statistics.
   */
  lag?: MonitorCreateMetricsParams.Lag;

  /**
   * The request to retrieve LLDP per instance metrics/statistics.
   */
  lldp?: MonitorCreateMetricsParams.Lldp;

  /**
   * The request to retrieve MACsec per secure entity(secY) metrics/statistics.
   */
  macsec?: MonitorCreateMetricsParams.Macsec;

  /**
   * The request to retrieve MKA per peer metrics/statistics.
   */
  mka?: MonitorCreateMetricsParams.Mka;

  /**
   * The request to retrieve OSPFv2 per Router metrics/statistics.
   */
  ospfv2?: MonitorCreateMetricsParams.Ospfv2;

  /**
   * The request to retrieve OSPFv3 per router metrics/statistics.
   */
  ospfv3?: MonitorCreateMetricsParams.Ospfv3;

  /**
   * The port result request to the traffic generator
   */
  port?: MonitorCreateMetricsParams.Port;

  /**
   * Request to retrieve RoCEv2 FLow statistics.
   */
  rocev2_flow?: MonitorCreateMetricsParams.Rocev2Flow;

  /**
   * Request to retrieve RoCEv2 over IPv4 per peer metrics/statistics.
   */
  rocev2_ipv4?: MonitorCreateMetricsParams.Rocev2Ipv4;

  /**
   * Request to retrieve RoCEv2 over IPv6 per peer metrics/statistics.
   */
  rocev2_ipv6?: MonitorCreateMetricsParams.Rocev2Ipv6;

  /**
   * The request to retrieve RSVP-TE per Router metrics/statistics.
   */
  rsvp?: MonitorCreateMetricsParams.Rsvp;
}

export namespace MonitorCreateMetricsParams {
  /**
   * The request to retrieve BGPv4 per peer metrics/statistics.
   */
  export interface Bgpv4 {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the BGPv4 peer cannot be excluded.
     */
    column_names?: Array<
      | 'session_state'
      | 'session_flap_count'
      | 'routes_advertised'
      | 'routes_received'
      | 'route_withdraws_sent'
      | 'route_withdraws_received'
      | 'updates_sent'
      | 'updates_received'
      | 'opens_sent'
      | 'opens_received'
      | 'keepalives_sent'
      | 'keepalives_received'
      | 'notifications_sent'
      | 'notifications_received'
      | 'fsm_state'
      | 'end_of_rib_received'
    >;

    /**
     * The names of BGPv4 peers to return results for. An empty list will return
     * results for all BGPv4 peers.
     *
     * x-constraint:
     *
     * - /components/schemas/Bgp.V4peer/properties/name
     */
    peer_names?: Array<string>;
  }

  /**
   * The request to retrieve BGPv6 per peer metrics/statistics.
   */
  export interface Bgpv6 {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the BGPv6 peer cannot be excluded.
     */
    column_names?: Array<
      | 'session_state'
      | 'session_flap_count'
      | 'routes_advertised'
      | 'routes_received'
      | 'route_withdraws_sent'
      | 'route_withdraws_received'
      | 'updates_sent'
      | 'updates_received'
      | 'opens_sent'
      | 'opens_received'
      | 'keepalives_sent'
      | 'keepalives_received'
      | 'notifications_sent'
      | 'notifications_received'
      | 'fsm_state'
      | 'end_of_rib_received'
    >;

    /**
     * The names of BGPv6 peers to return results for. An empty list will return
     * results for all BGPv6 peers.
     *
     * x-constraint:
     *
     * - /components/schemas/Bgp.V6peer/properties/name
     */
    peer_names?: Array<string>;
  }

  /**
   * Under Review: Convergence metrics is currently under review for pending
   * exploration on use cases.
   *
   * Container for requesting control-plane and data-plane convergence time metrics
   * for flows.
   */
  export interface Convergence {
    /**
     * Convergence metrics will be retrieved for these flow names. If no flow names are
     * specified then convergence metrics for all flows will be returned.
     *
     * x-constraint:
     *
     * - /components/schemas/Flow/properties/name
     */
    flow_names?: Array<string>;
  }

  /**
   * The request to retrieve DHCPv4 per client metrics/statistics.
   */
  export interface Dhcpv4Client {
    /**
     * The names of DHCPv4 clients to return results for. An empty list will return
     * results for all DHCPv4 client.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv4client/properties/name
     */
    client_names?: Array<string>;

    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned. The name of the DHCPv4 client cannot
     * be excluded.
     */
    column_names?: Array<
      | 'discovers_sent'
      | 'offers_received'
      | 'requests_sent'
      | 'acks_received'
      | 'nacks_received'
      | 'releases_sent'
      | 'declines_sent'
    >;
  }

  /**
   * The request to retrieve DHCPv4 per Server metrics/statistics.
   */
  export interface Dhcpv4Server {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned. The name of the DHCPv4 server cannot
     * be excluded.
     */
    column_names?: Array<
      | 'discovers_received'
      | 'offers_sent'
      | 'requests_received'
      | 'acks_sent'
      | 'nacks_sent'
      | 'releases_received'
      | 'declines_received'
    >;

    /**
     * The names of DHCPv4 Servers to return results for. An empty list will return
     * results for all DHCPv4 Server.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv4Server/properties/name
     */
    server_names?: Array<string>;
  }

  /**
   * The request to retrieve DHCPv6 per client metrics/statistics.
   */
  export interface Dhcpv6Client {
    /**
     * The names of DHCPv6 clients to return results for. An empty list will return
     * results for all DHCPv6 client.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv6client/properties/name
     */
    client_names?: Array<string>;

    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the DHCPv6 client cannot be excluded.
     */
    column_names?: Array<
      | 'solicits_sent'
      | 'advertisements_received'
      | 'advertisements_ignored'
      | 'requests_sent'
      | 'nacks_received'
      | 'replies_received'
      | 'information_requests_sent'
      | 'renews_sent'
      | 'rebinds_sent'
      | 'releases_sent'
      | 'reconfigures_received'
      | 'rapid_commit_solicits_sent'
      | 'rapid_commit_replies_received'
    >;
  }

  /**
   * The request to retrieve DHCPv6 per Server metrics/statistics.
   */
  export interface Dhcpv6Server {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the DHCPv6 server cannot be excluded.
     */
    column_names?: Array<
      | 'solicits_received'
      | 'solicits_ignored'
      | 'advertisements_sent'
      | 'requests_received'
      | 'nacks_sent'
      | 'confirms_received'
      | 'renewals_received'
      | 'rebinds_received'
      | 'replies_sent'
      | 'releases_received'
      | 'declines_received'
      | 'information_requests_received'
      | 'relay_forwards_received'
      | 'relay_replies_sent'
      | 'reconfigures_sent'
    >;

    /**
     * The names of DHCPv6 Servers to return results for. An empty list will return
     * results for all DHCPv6 Server.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv6Server/properties/name
     */
    server_names?: Array<string>;
  }

  /**
   * The container for a egress only tracking metric request.
   */
  export interface EgressOnlyTracking {
    /**
     * Egress only tracking metrics will be retrieved for these port names. If no
     * port-names are provided, egress_only_tracking metrics will be returned for all
     * ports which have one or more egress_only_tracking enabled.
     *
     * x-constraint:
     *
     * - /components/schemas/EgressOnlyTracking/properties/port_name
     */
    port_names?: Array<string>;

    /**
     * Filter for tagged metrics
     */
    tagged_metrics?: EgressOnlyTracking.TaggedMetrics;
  }

  export namespace EgressOnlyTracking {
    /**
     * Filter for tagged metrics
     */
    export interface TaggedMetrics {
      /**
       * Controls inclusion/exclusion of tagged metrics where each underlying attribute
       * has zero value or absent value.
       */
      include_empty_metrics?: boolean;

      /**
       * The list of metric names that the returned result set will contain. If the list
       * is empty then all metrics will be returned. Note: tx_metrics is optional, it is
       * applicable where implementation is able to retrieve transmitter information. In
       * order to get Tx metrics, tx_metric must be added in metric_names and all
       * supported Tx metrics will be returned as listed in metric response.
       */
      metric_names?: Array<
        | 'frames_rx'
        | 'bytes_rx'
        | 'frames_rx_rate'
        | 'rx_l1_rate_bps'
        | 'rx_rate_bytes'
        | 'rx_rate_bps'
        | 'rx_rate_kbps'
        | 'rx_rate_mbps'
        | 'tx_metrics'
      >;
    }
  }

  /**
   * The container for a flow metric request.
   */
  export interface Flow {
    /**
     * Flow metrics will be retrieved for these flow names. If no flow names are
     * specified then all flows will be returned.
     *
     * x-constraint:
     *
     * - /components/schemas/Flow/properties/name
     */
    flow_names?: Array<string>;

    /**
     * The list of metric names that the returned result set will contain. If the list
     * is empty then all metrics will be returned.
     */
    metric_names?: Array<
      | 'transmit'
      | 'frames_tx'
      | 'frames_rx'
      | 'bytes_tx'
      | 'bytes_rx'
      | 'frames_tx_rate'
      | 'frames_rx_rate'
      | 'tx_l1_rate_bps'
      | 'rx_l1_rate_bps'
      | 'tx_rate_bytes'
      | 'rx_rate_bytes'
      | 'tx_rate_bps'
      | 'rx_rate_bps'
      | 'tx_rate_kbps'
      | 'rx_rate_kbps'
      | 'tx_rate_mbps'
      | 'rx_rate_mbps'
    >;

    /**
     * Filter for tagged metrics
     */
    tagged_metrics?: Flow.TaggedMetrics;
  }

  export namespace Flow {
    /**
     * Filter for tagged metrics
     */
    export interface TaggedMetrics {
      /**
       * List of filters to selectively fetch tagged metrics with certain tag and
       * corresponding value.
       */
      filters?: Array<TaggedMetrics.Filter>;

      /**
       * Controls inclusion/exclusion of tagged metrics when fetching flow metrics.
       */
      include?: boolean;

      /**
       * Controls inclusion/exclusion of tagged metrics where each underlying attributes
       * has zero value or absent value.
       */
      include_empty_metrics?: boolean;

      /**
       * The list of metric names that the returned result set will contain. If the list
       * is empty then all metrics will be returned.
       */
      metric_names?: Array<
        | 'frames_tx'
        | 'frames_rx'
        | 'bytes_tx'
        | 'bytes_rx'
        | 'frames_tx_rate'
        | 'frames_rx_rate'
        | 'tx_l1_rate_bps'
        | 'rx_l1_rate_bps'
        | 'tx_rate_bytes'
        | 'rx_rate_bytes'
        | 'tx_rate_bps'
        | 'rx_rate_bps'
        | 'tx_rate_kbps'
        | 'rx_rate_kbps'
        | 'tx_rate_mbps'
        | 'rx_rate_mbps'
      >;
    }

    export namespace TaggedMetrics {
      /**
       * A container for filtering ingress and/or egress metric tags. The Tx stats may
       * not be applicable in both the request and response filter.
       */
      export interface Filter {
        /**
         * A metric tag name that MUST exist in a flow packet or flow egress_packet
         * configuration
         */
        name?: string;

        /**
         * A list of filters that can be applied to the metric tag name. By default all
         * values will be included in the flow metric results.
         */
        values?: Array<string>;
      }
    }
  }

  /**
   * The request to retrieve ISIS per Router metrics/statistics.
   */
  export interface Isis {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the ISIS Router cannot be excluded.
     */
    column_names?: Array<
      | 'l1_sessions_up'
      | 'l1_session_flap'
      | 'l1_database_size'
      | 'l1_broadcast_hellos_sent'
      | 'l1_broadcast_hellos_received'
      | 'l1_point_to_point_hellos_sent'
      | 'l1_point_to_point_hellos_received'
      | 'l1_psnp_sent'
      | 'l1_psnp_received'
      | 'l1_csnp_sent'
      | 'l1_csnp_received'
      | 'l1_lsp_sent'
      | 'l1_lsp_received'
      | 'l2_sessions_up'
      | 'l2_session_flap'
      | 'l2_database_size'
      | 'l2_broadcast_hellos_sent'
      | 'l2_broadcast_hellos_received'
      | 'l2_point_to_point_hellos_sent'
      | 'l2_point_to_point_hellos_received'
      | 'l2_psnp_sent'
      | 'l2_psnp_received'
      | 'l2_csnp_sent'
      | 'l2_csnp_received'
      | 'l2_lsp_sent'
      | 'l2_lsp_received'
    >;

    /**
     * The names of ISIS Routers to return results for. An empty list will return
     * results for all ISIS router.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.IsisRouter/properties/name
     */
    router_names?: Array<string>;
  }

  /**
   * The request to retrieve LACP per LAG member metrics/statistics.
   */
  export interface Lacp {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned. The name of LAG and LAG member can
     * not be excluded.
     */
    column_names?: Array<
      | 'lacp_packets_rx'
      | 'lacp_packets_tx'
      | 'lacp_rx_errors'
      | 'activity'
      | 'timeout'
      | 'synchronization'
      | 'aggregatable'
      | 'collecting'
      | 'distributing'
      | 'system_id'
      | 'oper_key'
      | 'partner_id'
      | 'partner_key'
      | 'port_num'
      | 'partner_port_num'
    >;

    /**
     * The names of LAG members (ports) for which LACP metrics to be returned. An empty
     * list will return metrics for all LAG members.
     *
     * x-constraint:
     *
     * - /components/schemas/Port/properties/name
     */
    lag_member_port_names?: Array<string>;

    /**
     * The names of LAG (ports group) for which LACP metrics to be returned. An empty
     * list will return metrics for all LAGs.
     *
     * x-constraint:
     *
     * - /components/schemas/Lag/properties/name
     */
    lag_names?: Array<string>;
  }

  /**
   * The request to retrieve per LAG metrics/statistics.
   */
  export interface Lag {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned. The name of the LAG cannot be
     * excluded.
     */
    column_names?: Array<
      | 'oper_status'
      | 'member_ports_up'
      | 'frames_tx'
      | 'frames_rx'
      | 'bytes_tx'
      | 'bytes_rx'
      | 'frames_tx_rate'
      | 'frames_rx_rate'
      | 'bytes_tx_rate'
      | 'bytes_rx_rate'
    >;

    /**
     * The names of LAGs to return results for. An empty list will return results for
     * all LAGs.
     *
     * x-constraint:
     *
     * - /components/schemas/Lag/properties/name
     */
    lag_names?: Array<string>;
  }

  /**
   * The request to retrieve LLDP per instance metrics/statistics.
   */
  export interface Lldp {
    /**
     * The requested list of column names for the result set. If the list is empty then
     * metrics for all columns will be returned. The name of LLDP instance can not be
     * excluded.
     */
    column_names?: Array<
      'frames_rx' | 'frames_tx' | 'frames_error_rx' | 'frames_discard' | 'tlvs_discard' | 'tlvs_unknown'
    >;

    /**
     * The names of LLDP instances to return results for. An empty list will return
     * results for all LLDP instances.
     *
     * x-constraint:
     *
     * - /components/schemas/Lldp/properties/name
     */
    lldp_names?: Array<string>;
  }

  /**
   * The request to retrieve MACsec per secure entity(secY) metrics/statistics.
   */
  export interface Macsec {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the secure entity(secY) cannot be excluded.
     */
    column_names?: Array<
      | 'session_state'
      | 'session_flap_count'
      | 'out_pkts_protected'
      | 'out_pkts_encrypted'
      | 'in_pkts_ok'
      | 'in_pkts_bad'
      | 'in_pkts_bad_tag'
      | 'in_pkts_late'
      | 'in_pkts_no_sci'
      | 'in_pkts_not_using_sa'
      | 'in_pkts_not_valid'
      | 'in_pkts_unknown_sci'
      | 'in_pkts_unused_sa'
      | 'in_pkts_invalid'
      | 'in_pkts_untagged'
      | 'out_octets_protected'
      | 'out_octets_encrypted'
      | 'in_octets_validated'
      | 'in_octets_decrypted'
    >;

    /**
     * The names of secure entities(secYs) to return results for. An empty list will
     * return results for all secYs.
     *
     * x-constraint:
     *
     * - /components/schemas/Macsec/properties/name
     */
    secure_entity_names?: Array<string>;
  }

  /**
   * The request to retrieve MKA per peer metrics/statistics.
   */
  export interface Mka {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the peer cannot be excluded.
     */
    column_names?: Array<
      | 'session_state'
      | 'session_flap_count'
      | 'mkpdu_tx'
      | 'mkpdu_rx'
      | 'live_peer_count'
      | 'potential_peer_count'
      | 'latest_key_tx_peer_count'
      | 'latest_key_rx_peer_count'
      | 'malformed_mkpdu'
      | 'icv_mismatch'
    >;

    /**
     * The names of peers to return results for. An empty list will return results for
     * all peers.
     *
     * x-constraint:
     *
     * - /components/schemas/Mka/properties/name
     */
    peer_names?: Array<string>;
  }

  /**
   * The request to retrieve OSPFv2 per Router metrics/statistics.
   */
  export interface Ospfv2 {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the OSPFv2 Router cannot be excluded.
     */
    column_names?: Array<
      | 'full_state_count'
      | 'down_state_count'
      | 'sessions_flap'
      | 'hellos_sent'
      | 'hellos_received'
      | 'dbd_sent'
      | 'dbd_received'
      | 'ls_request_sent'
      | 'ls_request_received'
      | 'ls_update_sent'
      | 'ls_update_received'
      | 'ls_ack_sent'
      | 'ls_ack_received'
      | 'lsa_sent'
      | 'lsa_received'
      | 'lsa_ack_sent'
      | 'lsa_ack_received'
      | 'router_lsa_sent'
      | 'router_lsa_received'
      | 'network_lsa_sent'
      | 'network_lsa_received'
      | 'summary_lsa_sent'
      | 'summary_lsa_received'
      | 'external_lsa_sent'
      | 'external_lsa_received'
      | 'nssa_lsa_sent'
      | 'nssa_lsa_received'
      | 'opaque_local_sent'
      | 'opaque_local_received'
      | 'opaque_area_sent'
      | 'opaque_area_received'
      | 'opaque_domain_sent'
      | 'opaque_domain_received'
    >;

    /**
     * The names of OSPFv2 routers to return results for. An empty list will return
     * results for all OSPFv2 router.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Ospfv2/properties/name
     */
    router_names?: Array<string>;
  }

  /**
   * The request to retrieve OSPFv3 per router metrics/statistics.
   */
  export interface Ospfv3 {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned except for any result_groups. The
     * name of the OSPFv3 Router cannot be excluded.
     */
    column_names?: Array<
      | 'full_state_count'
      | 'down_state_count'
      | 'sessions_flap'
      | 'hellos_sent'
      | 'hellos_received'
      | 'dbd_sent'
      | 'dbd_received'
      | 'ls_request_sent'
      | 'ls_request_received'
      | 'ls_update_sent'
      | 'ls_update_received'
      | 'ls_ack_sent'
      | 'ls_ack_received'
      | 'lsa_sent'
      | 'lsa_received'
      | 'router_lsa_sent'
      | 'router_lsa_received'
      | 'network_lsa_sent'
      | 'network_lsa_received'
      | 'inter_area_prefix_lsa_sent'
      | 'inter_area_prefix_lsa_received'
      | 'inter_area_router_lsa_sent'
      | 'inter_area_router_lsa_received'
      | 'external_lsa_sent'
      | 'external_lsa_received'
      | 'nssa_lsa_sent'
      | 'nssa_lsa_received'
      | 'link_lsa_sent'
      | 'link_lsa_received'
      | 'intra_area_prefix_lsa_sent'
      | 'intra_area_prefix_lsa_received'
    >;

    /**
     * The names of OSPFv3 routers to return results for. An empty list will return
     * results for all OSPFv3 routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Ospfv3.RouterInstance/properties/name
     */
    router_names?: Array<string>;
  }

  /**
   * The port result request to the traffic generator
   */
  export interface Port {
    /**
     * The list of column names that the returned result set will contain. If the list
     * is empty then all columns will be returned. The name of the port cannot be
     * excluded.
     */
    column_names?: Array<
      | 'transmit'
      | 'location'
      | 'link'
      | 'capture'
      | 'frames_tx'
      | 'frames_rx'
      | 'bytes_tx'
      | 'bytes_rx'
      | 'frames_tx_rate'
      | 'frames_rx_rate'
      | 'bytes_tx_rate'
      | 'bytes_rx_rate'
      | 'last_change'
    >;

    /**
     * The names of objects to return results for. An empty list will return all port
     * row results.
     *
     * x-constraint:
     *
     * - /components/schemas/Port/properties/name
     */
    port_names?: Array<string>;
  }

  /**
   * Request to retrieve RoCEv2 FLow statistics.
   */
  export interface Rocev2Flow {
    /**
     * Fetch stats per QP
     */
    choice?: 'per_qp';

    /**
     * The names of RoCEv2 flows. An empty list will return results for all RoCEv2
     * flows.
     */
    per_qp?: Rocev2Flow.PerQp;
  }

  export namespace Rocev2Flow {
    /**
     * The names of RoCEv2 flows. An empty list will return results for all RoCEv2
     * flows.
     */
    export interface PerQp {
      /**
       * The list of column names that the returned result set will contain. If the list
       * is empty then all columns will be returned except for any result_groups. The
       * name of the Flow cannot be excluded.
       */
      column_names?: Array<
        | 'flow_name'
        | 'port_tx'
        | 'port_rx'
        | 'src_qp'
        | 'dest_qp'
        | 'src_ipv4'
        | 'dest_ipv4'
        | 'data_frames_tx'
        | 'data_frames_rx'
        | 'frame_delta'
        | 'data_frames_retransmitted'
        | 'frame_sequence_error'
        | 'tx_bytes'
        | 'rx_bytes'
        | 'data_tx_rate'
        | 'data_rx_rate'
        | 'message_tx'
        | 'message_complete_rx'
        | 'message_fail'
        | 'flow_completion_time'
        | 'avg_latency'
        | 'min_latency'
        | 'max_latency'
        | 'ecn_ce_rx'
        | 'cnp_tx'
        | 'cnp_rx'
        | 'ack_tx'
        | 'ack_rx'
        | 'nak_tx'
        | 'nak_rx'
        | 'first_timestamp'
        | 'last_timestamp'
      >;
    }
  }

  /**
   * Request to retrieve RoCEv2 over IPv4 per peer metrics/statistics.
   */
  export interface Rocev2Ipv4 {
    /**
     * Fetch stats per_peer
     */
    choice?: 'per_peer';

    /**
     * The names of RoCEv2 over IPv4 peers to return results for. An empty list will
     * return results for all RoCEv2 peers.
     */
    per_peer?: Rocev2Ipv4.PerPeer;
  }

  export namespace Rocev2Ipv4 {
    /**
     * The names of RoCEv2 over IPv4 peers to return results for. An empty list will
     * return results for all RoCEv2 peers.
     */
    export interface PerPeer {
      /**
       * The list of column names that the returned result set will contain. If the list
       * is empty then all columns will be returned except for any result_groups. The
       * name of the RoCEv2 peer cannot be excluded.
       */
      column_names?: Array<
        | 'qp_configured'
        | 'qp_up'
        | 'qp_down'
        | 'connect_request_tx'
        | 'connect_request_rx'
        | 'connect_reply_tx'
        | 'connect_reply_rx'
        | 'ready_tx'
        | 'ready_rx'
        | 'disconnect_request_tx'
        | 'disconnect_request_rx'
        | 'disconnect_reply_tx'
        | 'disconnect_reply_rx'
        | 'reject_tx'
        | 'reject_rx'
        | 'unknown_msg_rx'
      >;

      /**
       * The names of RoCEv2 over IPv4 peers to return results for. An empty list will
       * return results for all RoCEv2 peers.
       *
       * x-constraint:
       *
       * - /components/schemas/Rocev2.V4peer/properties/name
       */
      peer_names?: Array<string>;
    }
  }

  /**
   * Request to retrieve RoCEv2 over IPv6 per peer metrics/statistics.
   */
  export interface Rocev2Ipv6 {
    /**
     * Fetch stats per_peer
     */
    choice?: 'per_peer';

    /**
     * The names of RoCEv2 over IPv6 peers to return results for. An empty list will
     * return results for all RoCEv2 peers.
     */
    per_peer?: Rocev2Ipv6.PerPeer;
  }

  export namespace Rocev2Ipv6 {
    /**
     * The names of RoCEv2 over IPv6 peers to return results for. An empty list will
     * return results for all RoCEv2 peers.
     */
    export interface PerPeer {
      /**
       * The list of column names that the returned result set will contain. If the list
       * is empty then all columns will be returned except for any result_groups. The
       * name of the RoCEv2 peer cannot be excluded.
       */
      column_names?: Array<
        | 'qp_configured'
        | 'qp_up'
        | 'qp_down'
        | 'connect_request_tx'
        | 'connect_request_rx'
        | 'connect_reply_tx'
        | 'connect_reply_rx'
        | 'ready_tx'
        | 'ready_rx'
        | 'disconnect_request_tx'
        | 'disconnect_request_rx'
        | 'disconnect_reply_tx'
        | 'disconnect_reply_rx'
        | 'reject_tx'
        | 'reject_rx'
        | 'unknown_msg_rx'
      >;

      /**
       * The names of RoCEv2 over IPv6 peers to return results for. An empty list will
       * return results for all RoCEv2 peers.
       *
       * x-constraint:
       *
       * - /components/schemas/Rocev2.V6peer/properties/name
       */
      peer_names?: Array<string>;
    }
  }

  /**
   * The request to retrieve RSVP-TE per Router metrics/statistics.
   */
  export interface Rsvp {
    /**
     * The list of column names that the returned result set will contain. If the input
     * list is empty then all columns will be returned except for any result_groups.
     */
    column_names?: Array<
      | 'ingress_p2p_lsps_configured'
      | 'ingress_p2p_lsps_up'
      | 'egress_p2p_lsps_up'
      | 'lsp_flap_count'
      | 'paths_tx'
      | 'paths_rx'
      | 'resvs_tx'
      | 'resvs_rx'
      | 'path_tears_tx'
      | 'path_tears_rx'
      | 'resv_tears_tx'
      | 'resv_tears_rx'
      | 'path_errors_tx'
      | 'path_errors_rx'
      | 'resv_errors_tx'
      | 'resv_errors_rx'
      | 'resv_conf_tx'
      | 'resv_conf_rx'
      | 'hellos_tx'
      | 'hellos_rx'
      | 'acks_tx'
      | 'acks_rx'
      | 'nacks_tx'
      | 'nacks_rx'
      | 'srefresh_tx'
      | 'srefresh_rx'
      | 'bundle_tx'
      | 'bundle_rx'
      | 'path_reevaluation_request_tx'
      | 'path_reoptimizations'
    >;

    /**
     * The names of RSVP-TE Routers to return results for. An empty list as input will
     * return results for all RSVP-TE routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Rsvp/properties/name
     */
    router_names?: Array<string>;
  }
}

export interface MonitorCreateStatesParams {
  /**
   * The request to retrieve BGP peer prefix information.
   */
  bgp_prefixes?: MonitorCreateStatesParams.BgpPrefixes;

  choice?:
    | 'ipv4_neighbors'
    | 'ipv6_neighbors'
    | 'bgp_prefixes'
    | 'isis_lsps'
    | 'lldp_neighbors'
    | 'rsvp_lsps'
    | 'dhcpv4_interfaces'
    | 'dhcpv4_leases'
    | 'dhcpv6_interfaces'
    | 'dhcpv6_leases'
    | 'ospfv2_lsas'
    | 'ospfv3_lsas';

  /**
   * The request for assigned IPv4 address information associated with DHCP Client
   * sessions.
   */
  dhcpv4_interfaces?: MonitorCreateStatesParams.Dhcpv4Interfaces;

  /**
   * The request to retrieve DHCP Server host allocated status.
   */
  dhcpv4_leases?: MonitorCreateStatesParams.Dhcpv4Leases;

  /**
   * The request for assigned IPv6 address information associated with DHCP Client
   * sessions.
   */
  dhcpv6_interfaces?: MonitorCreateStatesParams.Dhcpv6Interfaces;

  /**
   * The request to retrieve DHCP Server host allocated status.
   */
  dhcpv6_leases?: MonitorCreateStatesParams.Dhcpv6Leases;

  /**
   * The request to retrieve IPv4 Neighbor state (ARP cache entries) of a network
   * interface(s).
   */
  ipv4_neighbors?: MonitorCreateStatesParams.Ipv4Neighbors;

  /**
   * The request to retrieve IPv6 Neighbor state (NDISC cache entries) of a network
   * interface(s).
   */
  ipv6_neighbors?: MonitorCreateStatesParams.Ipv6Neighbors;

  /**
   * The request to retrieve ISIS Link State PDU (LSP) information learned by the
   * router.
   */
  isis_lsps?: MonitorCreateStatesParams.IsisLsps;

  /**
   * The request to retrieve LLDP neighbor information for a given instance.
   */
  lldp_neighbors?: MonitorCreateStatesParams.LldpNeighbors;

  /**
   * The request to retrieve OSPFv2 Link State Advertisements (LSA) information
   * learned by the routers.
   */
  ospfv2_lsas?: MonitorCreateStatesParams.Ospfv2Lsas;

  /**
   * The request to retrieve OSPFv3 Link State Advertisements (LSA) information
   * learned by the routers.
   */
  ospfv3_lsas?: MonitorCreateStatesParams.Ospfv3Lsas;

  /**
   * The request to retrieve RSVP Label Switched Path (LSP) information learned by
   * the router.
   */
  rsvp_lsps?: MonitorCreateStatesParams.RsvpLsps;
}

export namespace MonitorCreateStatesParams {
  /**
   * The request to retrieve BGP peer prefix information.
   */
  export interface BgpPrefixes {
    /**
     * The names of BGP peers for which prefix information will be retrieved. If no
     * names are specified then the results will contain prefix information for all
     * configured BGP peers.
     *
     * x-constraint:
     *
     * - /components/schemas/Bgp.V4Peer/properties/name
     * - /components/schemas/Bgp.V6Peer/properties/name
     */
    bgp_peer_names?: Array<string>;

    /**
     * The IPv4 unicast results can be filtered by specifying additional prefix search
     * criteria. If the ipv4_unicast_filters property is missing or empty then all IPv4
     * prefixes will be returned.
     */
    ipv4_unicast_filters?: Array<BgpPrefixes.Ipv4UnicastFilter>;

    /**
     * The IPv6 unicast results can be filtered by specifying additional prefix search
     * criteria. If the ipv6_unicast_filters property is missing or empty then all IPv6
     * prefixes will be returned.
     */
    ipv6_unicast_filters?: Array<BgpPrefixes.Ipv6UnicastFilter>;

    /**
     * Specify which prefixes to return. If the list is empty or missing then all
     * prefixes will be returned.
     */
    prefix_filters?: Array<'ipv4_unicast' | 'ipv6_unicast'>;
  }

  export namespace BgpPrefixes {
    export interface Ipv4UnicastFilter {
      /**
       * The addresses to match. If the addresses property is missing or empty then all
       * addresses will match.
       */
      addresses?: Array<string>;

      /**
       * The origin to match. If the origin is missing then all origins will match.
       */
      origin?: 'igp' | 'egp' | 'incomplete';

      /**
       * The path id to match. If the path id is missing then all path ids will match.
       */
      path_id?: number;

      /**
       * The prefix length to match. If the prefix length is missing then all prefix
       * lengths will match.
       */
      prefix_length?: number;
    }

    export interface Ipv6UnicastFilter {
      /**
       * The addresses to match. If the addresses property is missing or empty then all
       * addresses will match.
       */
      addresses?: Array<string>;

      /**
       * The origin to match. If the origin is missing then all origins will match.
       */
      origin?: 'igp' | 'egp' | 'incomplete';

      /**
       * The path id to match. If the path id is missing then all path ids will match.
       */
      path_id?: number;

      /**
       * The prefix length to match. If the prefix length is missing then all prefix
       * lengths will match.
       */
      prefix_length?: number;
    }
  }

  /**
   * The request for assigned IPv4 address information associated with DHCP Client
   * sessions.
   */
  export interface Dhcpv4Interfaces {
    /**
     * The names of DHCPv4 client to return results for. An empty list will return
     * results for all DHCPv4 Client address information.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv4client/properties/name
     */
    dhcp_client_names?: Array<string>;
  }

  /**
   * The request to retrieve DHCP Server host allocated status.
   */
  export interface Dhcpv4Leases {
    /**
     * The names of DHCPv4 server to return results for. An empty list will return
     * results for all DHCPv4 servers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv4server/properties/name
     */
    dhcp_server_names?: Array<string>;
  }

  /**
   * The request for assigned IPv6 address information associated with DHCP Client
   * sessions.
   */
  export interface Dhcpv6Interfaces {
    /**
     * The names of DHCPv6 client to return results for. An empty list will return
     * results for all DHCPv6 Client address information.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv6client/properties/name
     */
    dhcp_client_names?: Array<string>;
  }

  /**
   * The request to retrieve DHCP Server host allocated status.
   */
  export interface Dhcpv6Leases {
    /**
     * The names of DHCPv6 server to return results for. An empty list will return
     * results for all DHCPv6 servers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Dhcpv6server/properties/name
     */
    dhcp_server_names?: Array<string>;
  }

  /**
   * The request to retrieve IPv4 Neighbor state (ARP cache entries) of a network
   * interface(s).
   */
  export interface Ipv4Neighbors {
    /**
     * The names of Ethernet interfaces for which Neighbor state (ARP cache entries)
     * will be retrieved. If no names are specified then the results will contain
     * Neighbor state (ARP cache entries) for all available Ethernet interfaces.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Ethernet/properties/name
     */
    ethernet_names?: Array<string>;
  }

  /**
   * The request to retrieve IPv6 Neighbor state (NDISC cache entries) of a network
   * interface(s).
   */
  export interface Ipv6Neighbors {
    /**
     * The names of Ethernet interfaces for which Neighbor state (NDISC cache entries)
     * will be retrieved. If no names are specified then the results will contain
     * Neighbor state (NDISC cache entries) for all available Ethernet interfaces.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Ethernet/properties/name
     */
    ethernet_names?: Array<string>;
  }

  /**
   * The request to retrieve ISIS Link State PDU (LSP) information learned by the
   * router.
   */
  export interface IsisLsps {
    /**
     * The names of ISIS routers for which learned information is requested. An empty
     * list will return results for all ISIS routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.IsisRouter/properties/name
     */
    isis_router_names?: Array<string>;
  }

  /**
   * The request to retrieve LLDP neighbor information for a given instance.
   */
  export interface LldpNeighbors {
    /**
     * The names of LLDP instances for which neighbor information will be retrieved. If
     * no names are specified then the results will contain neighbor information for
     * all configured LLDP instances.
     *
     * x-constraint:
     *
     * - /components/schemas/Lldp/properties/name
     */
    lldp_names?: Array<string>;

    /**
     * Specify the neighbors for which information will be returned. If empty or
     * missing then information for all neighbors will be returned.
     */
    neighbor_id_filters?: Array<string>;
  }

  /**
   * The request to retrieve OSPFv2 Link State Advertisements (LSA) information
   * learned by the routers.
   */
  export interface Ospfv2Lsas {
    /**
     * The names of OSPFv2 routers for which learned information is requested. An empty
     * list will return results for all OSPFv2 routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Ospfv2Router/properties/name
     */
    router_names?: Array<string>;
  }

  /**
   * The request to retrieve OSPFv3 Link State Advertisements (LSA) information
   * learned by the routers.
   */
  export interface Ospfv3Lsas {
    /**
     * The names of OSPFv3 routers for which learned information is requested. An empty
     * list will return results for all OSPFv3 routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Ospfv3.RouterInstance/properties/name
     */
    router_names?: Array<string>;
  }

  /**
   * The request to retrieve RSVP Label Switched Path (LSP) information learned by
   * the router.
   */
  export interface RsvpLsps {
    /**
     * The names of RSVP-TE routers for which learned information is requested. An
     * empty list will return results for all RSVP=TE routers.
     *
     * x-constraint:
     *
     * - /components/schemas/Device.Rsvp/properties/name
     */
    rsvp_router_names?: Array<string>;
  }
}

export declare namespace Monitor {
  export {
    type IsisLspPrefixAttributes as IsisLspPrefixAttributes,
    type IsisLspPrefixSid as IsisLspPrefixSid,
    type IsisLspV4Prefix as IsisLspV4Prefix,
    type MetricLatency as MetricLatency,
    type MetricTimestamp as MetricTimestamp,
    type Ospfv2LsaHeader as Ospfv2LsaHeader,
    type Ospfv3LsaHeader as Ospfv3LsaHeader,
    type ResultBgpAsPath as ResultBgpAsPath,
    type ResultBgpCommunity as ResultBgpCommunity,
    type ResultExtendedCommunity as ResultExtendedCommunity,
    type MonitorCreateMetricsResponse as MonitorCreateMetricsResponse,
    type MonitorCreateStatesResponse as MonitorCreateStatesResponse,
    type MonitorCaptureParams as MonitorCaptureParams,
    type MonitorCreateMetricsParams as MonitorCreateMetricsParams,
    type MonitorCreateStatesParams as MonitorCreateStatesParams,
  };
}
