// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import { Capabilities, CapabilityRetrieveVersionResponse } from './resources/capabilities';
import {
  BgpAddPath,
  BgpAdvanced,
  BgpAsPath,
  BgpAttributesFourByteAsPathSegment,
  BgpAttributesNextHop,
  BgpAttributesSegmentRoutingPolicySRv6SidEndpointBehaviorAndStructure,
  BgpAttributesSegmentRoutingPolicyTypeFlags,
  BgpAttributesSidMpls,
  BgpAttributesSidSrv6,
  BgpCMacIPRange,
  BgpCapability,
  BgpCommunity,
  BgpEthernetSegmentDfElection,
  BgpExtCommunity,
  BgpExtendedCommunity,
  BgpGracefulRestart,
  BgpIpv4SrPolicyNlriPrefix,
  BgpIpv6SrPolicyNlriPrefix,
  BgpLearnedInformationFilter,
  BgpNlriPrefixPathID,
  BgpOneIpv4NlriPrefix,
  BgpOneIpv6NlriPrefix,
  BgpOneTraditionalNlriPrefix,
  BgpRouteAdvanced,
  BgpRouteDistinguisher,
  BgpRouteTarget,
  BgpSrteBindingSubTlv,
  BgpSrteColorSubTlv,
  BgpSrteExplicitNullLabelPolicySubTlv,
  BgpSrtePolicyNameSubTlv,
  BgpSrtePolicyPrioritySubTlv,
  BgpSrtePreferenceSubTlv,
  BgpSrteRemoteEndpointSubTlv,
  BgpSrteSRv6SidEndpointBehaviorAndStructure,
  BgpSrteSegmentList,
  BgpSrteSrMplsSid,
  BgpSrteV4Policy,
  BgpSrteV6Policy,
  BgpUpdateReplay,
  BgpV4RouteRange,
  BgpV6RouteRange,
  CaptureField,
  Config,
  ConfigCreateParams,
  ConfigCreateResponse,
  ConfigResource,
  ConfigUpdateParams,
  ConfigUpdateResponse,
  DeviceDhcpv6clientIaTimeValue,
  DeviceVlan,
  Dhcpv6ClientOptionsIncludedMessages,
  Dhcpv6ClientOptionsLinkLayerAddress,
  Dhcpv6OptionsVendorSpecificOptions,
  Dhcpv6ServerIapdPoolInfo,
  Dhcpv6ServerOptionsIncludedMessages,
  Dhcpv6ServerPoolInfo,
  Flow,
  FlowDelay,
  FlowHeader,
  FlowIpv4Auto,
  FlowIpv6Auto,
  FlowRsvpLspTunnelFlag,
  FlowRsvpObjectLength,
  FlowRsvpRouteRecordLength,
  FlowRsvpSessionAttributeNameLength,
  FlowSnmpv2cPdu,
  FlowSnmpv2cVariableBinding,
  IsisAuthenticationBase,
  IsisInterfaceLevel,
  IsisSrPrefixSid,
  LinkStateTe,
  Ospfv2V4RrExtdPrefixFlags,
  PatternFlowArpHardwareLengthCounter,
  PatternFlowArpHardwareTypeCounter,
  PatternFlowArpOperationCounter,
  PatternFlowArpProtocolLengthCounter,
  PatternFlowArpProtocolTypeCounter,
  PatternFlowArpSenderHardwareAddrCounter,
  PatternFlowArpSenderProtocolAddrCounter,
  PatternFlowArpTargetHardwareAddrCounter,
  PatternFlowArpTargetProtocolAddrCounter,
  PatternFlowEthernetDstCounter,
  PatternFlowEthernetEtherTypeCounter,
  PatternFlowEthernetPauseControlOpCodeCounter,
  PatternFlowEthernetPauseDstCounter,
  PatternFlowEthernetPauseEtherTypeCounter,
  PatternFlowEthernetPauseSrcCounter,
  PatternFlowEthernetPauseTimeCounter,
  PatternFlowEthernetPfcQueueCounter,
  PatternFlowEthernetSrcCounter,
  PatternFlowGreChecksumPresentCounter,
  PatternFlowGreProtocolCounter,
  PatternFlowGreReserved0Counter,
  PatternFlowGreReserved1Counter,
  PatternFlowGreVersionCounter,
  PatternFlowGtpExtensionContentsCounter,
  PatternFlowGtpExtensionExtensionLengthCounter,
  PatternFlowGtpExtensionNextExtensionHeaderCounter,
  PatternFlowGtpv1EFlagCounter,
  PatternFlowGtpv1MessageLengthCounter,
  PatternFlowGtpv1MessageTypeCounter,
  PatternFlowGtpv1NPduNumberCounter,
  PatternFlowGtpv1NextExtensionHeaderTypeCounter,
  PatternFlowGtpv1PnFlagCounter,
  PatternFlowGtpv1ProtocolTypeCounter,
  PatternFlowGtpv1ReservedCounter,
  PatternFlowGtpv1SFlagCounter,
  PatternFlowGtpv1SquenceNumberCounter,
  PatternFlowGtpv1TeidCounter,
  PatternFlowGtpv1VersionCounter,
  PatternFlowGtpv2MessageLengthCounter,
  PatternFlowGtpv2MessageTypeCounter,
  PatternFlowGtpv2PiggybackingFlagCounter,
  PatternFlowGtpv2SequenceNumberCounter,
  PatternFlowGtpv2Spare1Counter,
  PatternFlowGtpv2Spare2Counter,
  PatternFlowGtpv2TeidCounter,
  PatternFlowGtpv2TeidFlagCounter,
  PatternFlowGtpv2VersionCounter,
  PatternFlowIcmpEchoCodeCounter,
  PatternFlowIcmpEchoIdentifierCounter,
  PatternFlowIcmpEchoSequenceNumberCounter,
  PatternFlowIcmpEchoTypeCounter,
  PatternFlowIcmpv6EchoCodeCounter,
  PatternFlowIcmpv6EchoIdentifierCounter,
  PatternFlowIcmpv6EchoSequenceNumberCounter,
  PatternFlowIcmpv6EchoTypeCounter,
  PatternFlowIgmpv1GroupAddressCounter,
  PatternFlowIgmpv1TypeCounter,
  PatternFlowIgmpv1UnusedCounter,
  PatternFlowIgmpv1VersionCounter,
  PatternFlowIpv4DontFragmentCounter,
  PatternFlowIpv4DscpEcnCounter,
  PatternFlowIpv4DscpPhbCounter,
  PatternFlowIpv4DstCounter,
  PatternFlowIpv4FragmentOffsetCounter,
  PatternFlowIpv4HeaderLengthCounter,
  PatternFlowIpv4IdentificationCounter,
  PatternFlowIpv4MoreFragmentsCounter,
  PatternFlowIpv4OptionsCustomTypeCopiedFlagCounter,
  PatternFlowIpv4OptionsCustomTypeOptionClassCounter,
  PatternFlowIpv4OptionsCustomTypeOptionNumberCounter,
  PatternFlowIpv4PriorityRawCounter,
  PatternFlowIpv4ProtocolCounter,
  PatternFlowIpv4ReservedCounter,
  PatternFlowIpv4SrcCounter,
  PatternFlowIpv4TimeToLiveCounter,
  PatternFlowIpv4TosDelayCounter,
  PatternFlowIpv4TosMonetaryCounter,
  PatternFlowIpv4TosPrecedenceCounter,
  PatternFlowIpv4TosReliabilityCounter,
  PatternFlowIpv4TosThroughputCounter,
  PatternFlowIpv4TosUnusedCounter,
  PatternFlowIpv4TotalLengthCounter,
  PatternFlowIpv4VersionCounter,
  PatternFlowIpv6DstCounter,
  PatternFlowIpv6FlowLabelCounter,
  PatternFlowIpv6HopLimitCounter,
  PatternFlowIpv6NextHeaderCounter,
  PatternFlowIpv6PayloadLengthCounter,
  PatternFlowIpv6SrcCounter,
  PatternFlowIpv6TrafficClassCounter,
  PatternFlowIpv6VersionCounter,
  PatternFlowMplsBottomOfStackCounter,
  PatternFlowMplsLabelCounter,
  PatternFlowMplsTimeToLiveCounter,
  PatternFlowMplsTrafficClassCounter,
  PatternFlowPfcPauseClassEnableVectorCounter,
  PatternFlowPfcPauseControlOpCodeCounter,
  PatternFlowPfcPauseDstCounter,
  PatternFlowPfcPauseEtherTypeCounter,
  PatternFlowPfcPausePauseClass0Counter,
  PatternFlowPfcPausePauseClass1Counter,
  PatternFlowPfcPausePauseClass2Counter,
  PatternFlowPfcPausePauseClass3Counter,
  PatternFlowPfcPausePauseClass4Counter,
  PatternFlowPfcPausePauseClass5Counter,
  PatternFlowPfcPausePauseClass6Counter,
  PatternFlowPfcPausePauseClass7Counter,
  PatternFlowPfcPauseSrcCounter,
  PatternFlowPppAddressCounter,
  PatternFlowPppControlCounter,
  PatternFlowPppProtocolTypeCounter,
  PatternFlowRsvpPathExplicitRouteType1AsNumberLBitCounter,
  PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixIpv4AddressCounter,
  PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixLBitCounter,
  PatternFlowRsvpPathLabelRequestWithoutLabelRangeL3pidCounter,
  PatternFlowRsvpPathLabelRequestWithoutLabelRangeReservedCounter,
  PatternFlowRsvpPathObjectsCustomTypeCounter,
  PatternFlowRsvpPathRecordRouteType1Ipv4AddressIpv4AddressCounter,
  PatternFlowRsvpPathRecordRouteType1Ipv4AddressPrefixLengthCounter,
  PatternFlowRsvpPathRsvpHopIpv4Ipv4AddressCounter,
  PatternFlowRsvpPathRsvpHopIpv4LogicalInterfaceHandleCounter,
  PatternFlowRsvpPathSenderTemplateLspTunnelIpv4Ipv4TunnelSenderAddressCounter,
  PatternFlowRsvpPathSenderTemplateLspTunnelIpv4LspIDCounter,
  PatternFlowRsvpPathSenderTemplateLspTunnelIpv4ReservedCounter,
  PatternFlowRsvpPathSenderTspecIntServLengthOfServiceDataCounter,
  PatternFlowRsvpPathSenderTspecIntServMaximumPacketSizeCounter,
  PatternFlowRsvpPathSenderTspecIntServMinimumPolicedUnitCounter,
  PatternFlowRsvpPathSenderTspecIntServOverallLengthCounter,
  PatternFlowRsvpPathSenderTspecIntServParameter127FlagCounter,
  PatternFlowRsvpPathSenderTspecIntServParameter127LengthCounter,
  PatternFlowRsvpPathSenderTspecIntServParameterIDTokenBucketTspecCounter,
  PatternFlowRsvpPathSenderTspecIntServReserved1Counter,
  PatternFlowRsvpPathSenderTspecIntServReserved2Counter,
  PatternFlowRsvpPathSenderTspecIntServServiceHeaderCounter,
  PatternFlowRsvpPathSenderTspecIntServVersionCounter,
  PatternFlowRsvpPathSenderTspecIntServZeroBitCounter,
  PatternFlowRsvpPathSessionExtTunnelIDAsIntegerCounter,
  PatternFlowRsvpPathSessionExtTunnelIDAsIpv4Counter,
  PatternFlowRsvpPathSessionLspTunnelIpv4Ipv4TunnelEndPointAddressCounter,
  PatternFlowRsvpPathSessionLspTunnelIpv4ReservedCounter,
  PatternFlowRsvpPathSessionLspTunnelIpv4TunnelIDCounter,
  PatternFlowRsvpPathTimeValuesType1RefreshPeriodRCounter,
  PatternFlowRsvpReservedCounter,
  PatternFlowRsvpTimeToLiveCounter,
  PatternFlowSnmpv2cBulkPduMaxRepetitionsCounter,
  PatternFlowSnmpv2cBulkPduRequestIDCounter,
  PatternFlowSnmpv2cPduErrorIndexCounter,
  PatternFlowSnmpv2cPduRequestIDCounter,
  PatternFlowSnmpv2cVariableBindingValueBigCounterValueCounter,
  PatternFlowSnmpv2cVariableBindingValueCounterValueCounter,
  PatternFlowSnmpv2cVariableBindingValueIPAddressValueCounter,
  PatternFlowSnmpv2cVariableBindingValueIntegerValueCounter,
  PatternFlowSnmpv2cVariableBindingValueTimeticksValueCounter,
  PatternFlowSnmpv2cVariableBindingValueUnsignedIntegerValueCounter,
  PatternFlowSnmpv2cVersionCounter,
  PatternFlowTcpAckNumCounter,
  PatternFlowTcpCtlAckCounter,
  PatternFlowTcpCtlFinCounter,
  PatternFlowTcpCtlPshCounter,
  PatternFlowTcpCtlRstCounter,
  PatternFlowTcpCtlSynCounter,
  PatternFlowTcpCtlUrgCounter,
  PatternFlowTcpDataOffsetCounter,
  PatternFlowTcpDstPortCounter,
  PatternFlowTcpEcnCwrCounter,
  PatternFlowTcpEcnEchoCounter,
  PatternFlowTcpEcnNsCounter,
  PatternFlowTcpSeqNumCounter,
  PatternFlowTcpSrcPortCounter,
  PatternFlowTcpWindowCounter,
  PatternFlowUdpDstPortCounter,
  PatternFlowUdpLengthCounter,
  PatternFlowUdpSrcPortCounter,
  PatternFlowVlanCfiCounter,
  PatternFlowVlanIDCounter,
  PatternFlowVlanPriorityCounter,
  PatternFlowVlanTpidCounter,
  PatternFlowVxlanFlagsCounter,
  PatternFlowVxlanReserved0Counter,
  PatternFlowVxlanReserved1Counter,
  PatternFlowVxlanVniCounter,
  Rocev2ImmediateData,
  Rocev2PriorityValue,
  Rocev2QPs,
  SecureEntityStaticKeySak,
  V4RouteAddress,
  V6RouteAddress,
  VxlanTunnelDestinationIPModeUnicastArpSuppressionCache,
} from './resources/config';
import {
  CeaseError,
  Control,
  ControlSetStateParams,
  ControlSetStateResponse,
  ControlTriggerActionParams,
  ControlTriggerActionResponse,
  CustomError,
  MessageHeaderError,
  OpenMessageError,
  UpdateMessageError,
} from './resources/control';
import {
  IsisLspPrefixAttributes,
  IsisLspPrefixSid,
  IsisLspV4Prefix,
  MetricLatency,
  MetricTimestamp,
  Monitor,
  MonitorCaptureParams,
  MonitorCreateMetricsParams,
  MonitorCreateMetricsResponse,
  MonitorCreateStatesParams,
  MonitorCreateStatesResponse,
  Ospfv2LsaHeader,
  Ospfv3LsaHeader,
  ResultBgpAsPath,
  ResultBgpCommunity,
  ResultExtendedCommunity,
} from './resources/monitor';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

export interface ClientOptions {
  /**
   * Defaults to process.env['DEVKNOT_API_KEY'].
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['DEVKNOT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;
  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['DEVKNOT_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Devknot API.
 */
export class Devknot {
  apiKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Devknot API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['DEVKNOT_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['DEVKNOT_BASE_URL'] ?? /] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('DEVKNOT_BASE_URL'),
    apiKey = readEnv('DEVKNOT_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `/`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? Devknot.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('DEVKNOT_LOG'), "process.env['DEVKNOT_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    return new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== '/';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    if (this.apiKey && values.get('authorization')) {
      return;
    }
    if (nulls.has('authorization')) {
      return;
    }

    throw new Error(
      'Could not resolve authentication method. Expected the apiKey to be set. Or for the "Authorization" headers to be explicitly omitted',
    );
  }

  protected authHeaders(opts: FinalRequestOptions): NullableHeaders | undefined {
    if (this.apiKey == null) {
      return undefined;
    }
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  /**
   * Basic re-implementation of `qs.stringify` for primitive types.
   */
  protected stringifyQuery(query: Record<string, unknown>): string {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        if (value === null) {
          return `${encodeURIComponent(key)}=`;
        }
        throw new Errors.DevknotError(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private shouldRetry(response: Response): boolean {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): { req: FinalizedRequestInit; url: string; timeout: number } {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Headers {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      body instanceof Blob ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
  }

  static Devknot = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static DevknotError = Errors.DevknotError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;

  config: API.ConfigResource = new API.ConfigResource(this);
  control: API.Control = new API.Control(this);
  monitor: API.Monitor = new API.Monitor(this);
  capabilities: API.Capabilities = new API.Capabilities(this);
}
Devknot.ConfigResource = ConfigResource;
Devknot.Control = Control;
Devknot.Monitor = Monitor;
Devknot.Capabilities = Capabilities;
export declare namespace Devknot {
  export type RequestOptions = Opts.RequestOptions;

  export {
    ConfigResource as ConfigResource,
    type BgpAddPath as BgpAddPath,
    type BgpAdvanced as BgpAdvanced,
    type BgpAsPath as BgpAsPath,
    type BgpAttributesFourByteAsPathSegment as BgpAttributesFourByteAsPathSegment,
    type BgpAttributesNextHop as BgpAttributesNextHop,
    type BgpAttributesSegmentRoutingPolicySRv6SidEndpointBehaviorAndStructure as BgpAttributesSegmentRoutingPolicySRv6SidEndpointBehaviorAndStructure,
    type BgpAttributesSegmentRoutingPolicyTypeFlags as BgpAttributesSegmentRoutingPolicyTypeFlags,
    type BgpAttributesSidMpls as BgpAttributesSidMpls,
    type BgpAttributesSidSrv6 as BgpAttributesSidSrv6,
    type BgpCMacIPRange as BgpCMacIPRange,
    type BgpCapability as BgpCapability,
    type BgpCommunity as BgpCommunity,
    type BgpEthernetSegmentDfElection as BgpEthernetSegmentDfElection,
    type BgpExtCommunity as BgpExtCommunity,
    type BgpExtendedCommunity as BgpExtendedCommunity,
    type BgpGracefulRestart as BgpGracefulRestart,
    type BgpIpv4SrPolicyNlriPrefix as BgpIpv4SrPolicyNlriPrefix,
    type BgpIpv6SrPolicyNlriPrefix as BgpIpv6SrPolicyNlriPrefix,
    type BgpLearnedInformationFilter as BgpLearnedInformationFilter,
    type BgpNlriPrefixPathID as BgpNlriPrefixPathID,
    type BgpOneIpv4NlriPrefix as BgpOneIpv4NlriPrefix,
    type BgpOneIpv6NlriPrefix as BgpOneIpv6NlriPrefix,
    type BgpOneTraditionalNlriPrefix as BgpOneTraditionalNlriPrefix,
    type BgpRouteAdvanced as BgpRouteAdvanced,
    type BgpRouteDistinguisher as BgpRouteDistinguisher,
    type BgpRouteTarget as BgpRouteTarget,
    type BgpSrteBindingSubTlv as BgpSrteBindingSubTlv,
    type BgpSrteColorSubTlv as BgpSrteColorSubTlv,
    type BgpSrteExplicitNullLabelPolicySubTlv as BgpSrteExplicitNullLabelPolicySubTlv,
    type BgpSrtePolicyNameSubTlv as BgpSrtePolicyNameSubTlv,
    type BgpSrtePolicyPrioritySubTlv as BgpSrtePolicyPrioritySubTlv,
    type BgpSrtePreferenceSubTlv as BgpSrtePreferenceSubTlv,
    type BgpSrteRemoteEndpointSubTlv as BgpSrteRemoteEndpointSubTlv,
    type BgpSrteSRv6SidEndpointBehaviorAndStructure as BgpSrteSRv6SidEndpointBehaviorAndStructure,
    type BgpSrteSegmentList as BgpSrteSegmentList,
    type BgpSrteSrMplsSid as BgpSrteSrMplsSid,
    type BgpSrteV4Policy as BgpSrteV4Policy,
    type BgpSrteV6Policy as BgpSrteV6Policy,
    type BgpUpdateReplay as BgpUpdateReplay,
    type BgpV4RouteRange as BgpV4RouteRange,
    type BgpV6RouteRange as BgpV6RouteRange,
    type CaptureField as CaptureField,
    type Config as Config,
    type DeviceDhcpv6clientIaTimeValue as DeviceDhcpv6clientIaTimeValue,
    type DeviceVlan as DeviceVlan,
    type Dhcpv6ClientOptionsIncludedMessages as Dhcpv6ClientOptionsIncludedMessages,
    type Dhcpv6ClientOptionsLinkLayerAddress as Dhcpv6ClientOptionsLinkLayerAddress,
    type Dhcpv6OptionsVendorSpecificOptions as Dhcpv6OptionsVendorSpecificOptions,
    type Dhcpv6ServerIapdPoolInfo as Dhcpv6ServerIapdPoolInfo,
    type Dhcpv6ServerOptionsIncludedMessages as Dhcpv6ServerOptionsIncludedMessages,
    type Dhcpv6ServerPoolInfo as Dhcpv6ServerPoolInfo,
    type Flow as Flow,
    type FlowDelay as FlowDelay,
    type FlowHeader as FlowHeader,
    type FlowIpv4Auto as FlowIpv4Auto,
    type FlowIpv6Auto as FlowIpv6Auto,
    type FlowRsvpLspTunnelFlag as FlowRsvpLspTunnelFlag,
    type FlowRsvpObjectLength as FlowRsvpObjectLength,
    type FlowRsvpRouteRecordLength as FlowRsvpRouteRecordLength,
    type FlowRsvpSessionAttributeNameLength as FlowRsvpSessionAttributeNameLength,
    type FlowSnmpv2cPdu as FlowSnmpv2cPdu,
    type FlowSnmpv2cVariableBinding as FlowSnmpv2cVariableBinding,
    type IsisAuthenticationBase as IsisAuthenticationBase,
    type IsisInterfaceLevel as IsisInterfaceLevel,
    type IsisSrPrefixSid as IsisSrPrefixSid,
    type LinkStateTe as LinkStateTe,
    type Ospfv2V4RrExtdPrefixFlags as Ospfv2V4RrExtdPrefixFlags,
    type PatternFlowArpHardwareLengthCounter as PatternFlowArpHardwareLengthCounter,
    type PatternFlowArpHardwareTypeCounter as PatternFlowArpHardwareTypeCounter,
    type PatternFlowArpOperationCounter as PatternFlowArpOperationCounter,
    type PatternFlowArpProtocolLengthCounter as PatternFlowArpProtocolLengthCounter,
    type PatternFlowArpProtocolTypeCounter as PatternFlowArpProtocolTypeCounter,
    type PatternFlowArpSenderHardwareAddrCounter as PatternFlowArpSenderHardwareAddrCounter,
    type PatternFlowArpSenderProtocolAddrCounter as PatternFlowArpSenderProtocolAddrCounter,
    type PatternFlowArpTargetHardwareAddrCounter as PatternFlowArpTargetHardwareAddrCounter,
    type PatternFlowArpTargetProtocolAddrCounter as PatternFlowArpTargetProtocolAddrCounter,
    type PatternFlowEthernetDstCounter as PatternFlowEthernetDstCounter,
    type PatternFlowEthernetEtherTypeCounter as PatternFlowEthernetEtherTypeCounter,
    type PatternFlowEthernetPauseControlOpCodeCounter as PatternFlowEthernetPauseControlOpCodeCounter,
    type PatternFlowEthernetPauseDstCounter as PatternFlowEthernetPauseDstCounter,
    type PatternFlowEthernetPauseEtherTypeCounter as PatternFlowEthernetPauseEtherTypeCounter,
    type PatternFlowEthernetPauseSrcCounter as PatternFlowEthernetPauseSrcCounter,
    type PatternFlowEthernetPauseTimeCounter as PatternFlowEthernetPauseTimeCounter,
    type PatternFlowEthernetPfcQueueCounter as PatternFlowEthernetPfcQueueCounter,
    type PatternFlowEthernetSrcCounter as PatternFlowEthernetSrcCounter,
    type PatternFlowGreChecksumPresentCounter as PatternFlowGreChecksumPresentCounter,
    type PatternFlowGreProtocolCounter as PatternFlowGreProtocolCounter,
    type PatternFlowGreReserved0Counter as PatternFlowGreReserved0Counter,
    type PatternFlowGreReserved1Counter as PatternFlowGreReserved1Counter,
    type PatternFlowGreVersionCounter as PatternFlowGreVersionCounter,
    type PatternFlowGtpExtensionContentsCounter as PatternFlowGtpExtensionContentsCounter,
    type PatternFlowGtpExtensionExtensionLengthCounter as PatternFlowGtpExtensionExtensionLengthCounter,
    type PatternFlowGtpExtensionNextExtensionHeaderCounter as PatternFlowGtpExtensionNextExtensionHeaderCounter,
    type PatternFlowGtpv1EFlagCounter as PatternFlowGtpv1EFlagCounter,
    type PatternFlowGtpv1MessageLengthCounter as PatternFlowGtpv1MessageLengthCounter,
    type PatternFlowGtpv1MessageTypeCounter as PatternFlowGtpv1MessageTypeCounter,
    type PatternFlowGtpv1NPduNumberCounter as PatternFlowGtpv1NPduNumberCounter,
    type PatternFlowGtpv1NextExtensionHeaderTypeCounter as PatternFlowGtpv1NextExtensionHeaderTypeCounter,
    type PatternFlowGtpv1PnFlagCounter as PatternFlowGtpv1PnFlagCounter,
    type PatternFlowGtpv1ProtocolTypeCounter as PatternFlowGtpv1ProtocolTypeCounter,
    type PatternFlowGtpv1ReservedCounter as PatternFlowGtpv1ReservedCounter,
    type PatternFlowGtpv1SFlagCounter as PatternFlowGtpv1SFlagCounter,
    type PatternFlowGtpv1SquenceNumberCounter as PatternFlowGtpv1SquenceNumberCounter,
    type PatternFlowGtpv1TeidCounter as PatternFlowGtpv1TeidCounter,
    type PatternFlowGtpv1VersionCounter as PatternFlowGtpv1VersionCounter,
    type PatternFlowGtpv2MessageLengthCounter as PatternFlowGtpv2MessageLengthCounter,
    type PatternFlowGtpv2MessageTypeCounter as PatternFlowGtpv2MessageTypeCounter,
    type PatternFlowGtpv2PiggybackingFlagCounter as PatternFlowGtpv2PiggybackingFlagCounter,
    type PatternFlowGtpv2SequenceNumberCounter as PatternFlowGtpv2SequenceNumberCounter,
    type PatternFlowGtpv2Spare1Counter as PatternFlowGtpv2Spare1Counter,
    type PatternFlowGtpv2Spare2Counter as PatternFlowGtpv2Spare2Counter,
    type PatternFlowGtpv2TeidCounter as PatternFlowGtpv2TeidCounter,
    type PatternFlowGtpv2TeidFlagCounter as PatternFlowGtpv2TeidFlagCounter,
    type PatternFlowGtpv2VersionCounter as PatternFlowGtpv2VersionCounter,
    type PatternFlowIcmpEchoCodeCounter as PatternFlowIcmpEchoCodeCounter,
    type PatternFlowIcmpEchoIdentifierCounter as PatternFlowIcmpEchoIdentifierCounter,
    type PatternFlowIcmpEchoSequenceNumberCounter as PatternFlowIcmpEchoSequenceNumberCounter,
    type PatternFlowIcmpEchoTypeCounter as PatternFlowIcmpEchoTypeCounter,
    type PatternFlowIcmpv6EchoCodeCounter as PatternFlowIcmpv6EchoCodeCounter,
    type PatternFlowIcmpv6EchoIdentifierCounter as PatternFlowIcmpv6EchoIdentifierCounter,
    type PatternFlowIcmpv6EchoSequenceNumberCounter as PatternFlowIcmpv6EchoSequenceNumberCounter,
    type PatternFlowIcmpv6EchoTypeCounter as PatternFlowIcmpv6EchoTypeCounter,
    type PatternFlowIgmpv1GroupAddressCounter as PatternFlowIgmpv1GroupAddressCounter,
    type PatternFlowIgmpv1TypeCounter as PatternFlowIgmpv1TypeCounter,
    type PatternFlowIgmpv1UnusedCounter as PatternFlowIgmpv1UnusedCounter,
    type PatternFlowIgmpv1VersionCounter as PatternFlowIgmpv1VersionCounter,
    type PatternFlowIpv4DontFragmentCounter as PatternFlowIpv4DontFragmentCounter,
    type PatternFlowIpv4DscpEcnCounter as PatternFlowIpv4DscpEcnCounter,
    type PatternFlowIpv4DscpPhbCounter as PatternFlowIpv4DscpPhbCounter,
    type PatternFlowIpv4DstCounter as PatternFlowIpv4DstCounter,
    type PatternFlowIpv4FragmentOffsetCounter as PatternFlowIpv4FragmentOffsetCounter,
    type PatternFlowIpv4HeaderLengthCounter as PatternFlowIpv4HeaderLengthCounter,
    type PatternFlowIpv4IdentificationCounter as PatternFlowIpv4IdentificationCounter,
    type PatternFlowIpv4MoreFragmentsCounter as PatternFlowIpv4MoreFragmentsCounter,
    type PatternFlowIpv4OptionsCustomTypeCopiedFlagCounter as PatternFlowIpv4OptionsCustomTypeCopiedFlagCounter,
    type PatternFlowIpv4OptionsCustomTypeOptionClassCounter as PatternFlowIpv4OptionsCustomTypeOptionClassCounter,
    type PatternFlowIpv4OptionsCustomTypeOptionNumberCounter as PatternFlowIpv4OptionsCustomTypeOptionNumberCounter,
    type PatternFlowIpv4PriorityRawCounter as PatternFlowIpv4PriorityRawCounter,
    type PatternFlowIpv4ProtocolCounter as PatternFlowIpv4ProtocolCounter,
    type PatternFlowIpv4ReservedCounter as PatternFlowIpv4ReservedCounter,
    type PatternFlowIpv4SrcCounter as PatternFlowIpv4SrcCounter,
    type PatternFlowIpv4TimeToLiveCounter as PatternFlowIpv4TimeToLiveCounter,
    type PatternFlowIpv4TosDelayCounter as PatternFlowIpv4TosDelayCounter,
    type PatternFlowIpv4TosMonetaryCounter as PatternFlowIpv4TosMonetaryCounter,
    type PatternFlowIpv4TosPrecedenceCounter as PatternFlowIpv4TosPrecedenceCounter,
    type PatternFlowIpv4TosReliabilityCounter as PatternFlowIpv4TosReliabilityCounter,
    type PatternFlowIpv4TosThroughputCounter as PatternFlowIpv4TosThroughputCounter,
    type PatternFlowIpv4TosUnusedCounter as PatternFlowIpv4TosUnusedCounter,
    type PatternFlowIpv4TotalLengthCounter as PatternFlowIpv4TotalLengthCounter,
    type PatternFlowIpv4VersionCounter as PatternFlowIpv4VersionCounter,
    type PatternFlowIpv6DstCounter as PatternFlowIpv6DstCounter,
    type PatternFlowIpv6FlowLabelCounter as PatternFlowIpv6FlowLabelCounter,
    type PatternFlowIpv6HopLimitCounter as PatternFlowIpv6HopLimitCounter,
    type PatternFlowIpv6NextHeaderCounter as PatternFlowIpv6NextHeaderCounter,
    type PatternFlowIpv6PayloadLengthCounter as PatternFlowIpv6PayloadLengthCounter,
    type PatternFlowIpv6SrcCounter as PatternFlowIpv6SrcCounter,
    type PatternFlowIpv6TrafficClassCounter as PatternFlowIpv6TrafficClassCounter,
    type PatternFlowIpv6VersionCounter as PatternFlowIpv6VersionCounter,
    type PatternFlowMplsBottomOfStackCounter as PatternFlowMplsBottomOfStackCounter,
    type PatternFlowMplsLabelCounter as PatternFlowMplsLabelCounter,
    type PatternFlowMplsTimeToLiveCounter as PatternFlowMplsTimeToLiveCounter,
    type PatternFlowMplsTrafficClassCounter as PatternFlowMplsTrafficClassCounter,
    type PatternFlowPfcPauseClassEnableVectorCounter as PatternFlowPfcPauseClassEnableVectorCounter,
    type PatternFlowPfcPauseControlOpCodeCounter as PatternFlowPfcPauseControlOpCodeCounter,
    type PatternFlowPfcPauseDstCounter as PatternFlowPfcPauseDstCounter,
    type PatternFlowPfcPauseEtherTypeCounter as PatternFlowPfcPauseEtherTypeCounter,
    type PatternFlowPfcPausePauseClass0Counter as PatternFlowPfcPausePauseClass0Counter,
    type PatternFlowPfcPausePauseClass1Counter as PatternFlowPfcPausePauseClass1Counter,
    type PatternFlowPfcPausePauseClass2Counter as PatternFlowPfcPausePauseClass2Counter,
    type PatternFlowPfcPausePauseClass3Counter as PatternFlowPfcPausePauseClass3Counter,
    type PatternFlowPfcPausePauseClass4Counter as PatternFlowPfcPausePauseClass4Counter,
    type PatternFlowPfcPausePauseClass5Counter as PatternFlowPfcPausePauseClass5Counter,
    type PatternFlowPfcPausePauseClass6Counter as PatternFlowPfcPausePauseClass6Counter,
    type PatternFlowPfcPausePauseClass7Counter as PatternFlowPfcPausePauseClass7Counter,
    type PatternFlowPfcPauseSrcCounter as PatternFlowPfcPauseSrcCounter,
    type PatternFlowPppAddressCounter as PatternFlowPppAddressCounter,
    type PatternFlowPppControlCounter as PatternFlowPppControlCounter,
    type PatternFlowPppProtocolTypeCounter as PatternFlowPppProtocolTypeCounter,
    type PatternFlowRsvpPathExplicitRouteType1AsNumberLBitCounter as PatternFlowRsvpPathExplicitRouteType1AsNumberLBitCounter,
    type PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixIpv4AddressCounter as PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixIpv4AddressCounter,
    type PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixLBitCounter as PatternFlowRsvpPathExplicitRouteType1Ipv4PrefixLBitCounter,
    type PatternFlowRsvpPathLabelRequestWithoutLabelRangeL3pidCounter as PatternFlowRsvpPathLabelRequestWithoutLabelRangeL3pidCounter,
    type PatternFlowRsvpPathLabelRequestWithoutLabelRangeReservedCounter as PatternFlowRsvpPathLabelRequestWithoutLabelRangeReservedCounter,
    type PatternFlowRsvpPathObjectsCustomTypeCounter as PatternFlowRsvpPathObjectsCustomTypeCounter,
    type PatternFlowRsvpPathRecordRouteType1Ipv4AddressIpv4AddressCounter as PatternFlowRsvpPathRecordRouteType1Ipv4AddressIpv4AddressCounter,
    type PatternFlowRsvpPathRecordRouteType1Ipv4AddressPrefixLengthCounter as PatternFlowRsvpPathRecordRouteType1Ipv4AddressPrefixLengthCounter,
    type PatternFlowRsvpPathRsvpHopIpv4Ipv4AddressCounter as PatternFlowRsvpPathRsvpHopIpv4Ipv4AddressCounter,
    type PatternFlowRsvpPathRsvpHopIpv4LogicalInterfaceHandleCounter as PatternFlowRsvpPathRsvpHopIpv4LogicalInterfaceHandleCounter,
    type PatternFlowRsvpPathSenderTemplateLspTunnelIpv4Ipv4TunnelSenderAddressCounter as PatternFlowRsvpPathSenderTemplateLspTunnelIpv4Ipv4TunnelSenderAddressCounter,
    type PatternFlowRsvpPathSenderTemplateLspTunnelIpv4LspIDCounter as PatternFlowRsvpPathSenderTemplateLspTunnelIpv4LspIDCounter,
    type PatternFlowRsvpPathSenderTemplateLspTunnelIpv4ReservedCounter as PatternFlowRsvpPathSenderTemplateLspTunnelIpv4ReservedCounter,
    type PatternFlowRsvpPathSenderTspecIntServLengthOfServiceDataCounter as PatternFlowRsvpPathSenderTspecIntServLengthOfServiceDataCounter,
    type PatternFlowRsvpPathSenderTspecIntServMaximumPacketSizeCounter as PatternFlowRsvpPathSenderTspecIntServMaximumPacketSizeCounter,
    type PatternFlowRsvpPathSenderTspecIntServMinimumPolicedUnitCounter as PatternFlowRsvpPathSenderTspecIntServMinimumPolicedUnitCounter,
    type PatternFlowRsvpPathSenderTspecIntServOverallLengthCounter as PatternFlowRsvpPathSenderTspecIntServOverallLengthCounter,
    type PatternFlowRsvpPathSenderTspecIntServParameterIDTokenBucketTspecCounter as PatternFlowRsvpPathSenderTspecIntServParameterIDTokenBucketTspecCounter,
    type PatternFlowRsvpPathSenderTspecIntServParameter127FlagCounter as PatternFlowRsvpPathSenderTspecIntServParameter127FlagCounter,
    type PatternFlowRsvpPathSenderTspecIntServParameter127LengthCounter as PatternFlowRsvpPathSenderTspecIntServParameter127LengthCounter,
    type PatternFlowRsvpPathSenderTspecIntServReserved1Counter as PatternFlowRsvpPathSenderTspecIntServReserved1Counter,
    type PatternFlowRsvpPathSenderTspecIntServReserved2Counter as PatternFlowRsvpPathSenderTspecIntServReserved2Counter,
    type PatternFlowRsvpPathSenderTspecIntServServiceHeaderCounter as PatternFlowRsvpPathSenderTspecIntServServiceHeaderCounter,
    type PatternFlowRsvpPathSenderTspecIntServVersionCounter as PatternFlowRsvpPathSenderTspecIntServVersionCounter,
    type PatternFlowRsvpPathSenderTspecIntServZeroBitCounter as PatternFlowRsvpPathSenderTspecIntServZeroBitCounter,
    type PatternFlowRsvpPathSessionExtTunnelIDAsIntegerCounter as PatternFlowRsvpPathSessionExtTunnelIDAsIntegerCounter,
    type PatternFlowRsvpPathSessionExtTunnelIDAsIpv4Counter as PatternFlowRsvpPathSessionExtTunnelIDAsIpv4Counter,
    type PatternFlowRsvpPathSessionLspTunnelIpv4Ipv4TunnelEndPointAddressCounter as PatternFlowRsvpPathSessionLspTunnelIpv4Ipv4TunnelEndPointAddressCounter,
    type PatternFlowRsvpPathSessionLspTunnelIpv4ReservedCounter as PatternFlowRsvpPathSessionLspTunnelIpv4ReservedCounter,
    type PatternFlowRsvpPathSessionLspTunnelIpv4TunnelIDCounter as PatternFlowRsvpPathSessionLspTunnelIpv4TunnelIDCounter,
    type PatternFlowRsvpPathTimeValuesType1RefreshPeriodRCounter as PatternFlowRsvpPathTimeValuesType1RefreshPeriodRCounter,
    type PatternFlowRsvpReservedCounter as PatternFlowRsvpReservedCounter,
    type PatternFlowRsvpTimeToLiveCounter as PatternFlowRsvpTimeToLiveCounter,
    type PatternFlowSnmpv2cBulkPduMaxRepetitionsCounter as PatternFlowSnmpv2cBulkPduMaxRepetitionsCounter,
    type PatternFlowSnmpv2cBulkPduRequestIDCounter as PatternFlowSnmpv2cBulkPduRequestIDCounter,
    type PatternFlowSnmpv2cPduErrorIndexCounter as PatternFlowSnmpv2cPduErrorIndexCounter,
    type PatternFlowSnmpv2cPduRequestIDCounter as PatternFlowSnmpv2cPduRequestIDCounter,
    type PatternFlowSnmpv2cVariableBindingValueBigCounterValueCounter as PatternFlowSnmpv2cVariableBindingValueBigCounterValueCounter,
    type PatternFlowSnmpv2cVariableBindingValueCounterValueCounter as PatternFlowSnmpv2cVariableBindingValueCounterValueCounter,
    type PatternFlowSnmpv2cVariableBindingValueIntegerValueCounter as PatternFlowSnmpv2cVariableBindingValueIntegerValueCounter,
    type PatternFlowSnmpv2cVariableBindingValueIPAddressValueCounter as PatternFlowSnmpv2cVariableBindingValueIPAddressValueCounter,
    type PatternFlowSnmpv2cVariableBindingValueTimeticksValueCounter as PatternFlowSnmpv2cVariableBindingValueTimeticksValueCounter,
    type PatternFlowSnmpv2cVariableBindingValueUnsignedIntegerValueCounter as PatternFlowSnmpv2cVariableBindingValueUnsignedIntegerValueCounter,
    type PatternFlowSnmpv2cVersionCounter as PatternFlowSnmpv2cVersionCounter,
    type PatternFlowTcpAckNumCounter as PatternFlowTcpAckNumCounter,
    type PatternFlowTcpCtlAckCounter as PatternFlowTcpCtlAckCounter,
    type PatternFlowTcpCtlFinCounter as PatternFlowTcpCtlFinCounter,
    type PatternFlowTcpCtlPshCounter as PatternFlowTcpCtlPshCounter,
    type PatternFlowTcpCtlRstCounter as PatternFlowTcpCtlRstCounter,
    type PatternFlowTcpCtlSynCounter as PatternFlowTcpCtlSynCounter,
    type PatternFlowTcpCtlUrgCounter as PatternFlowTcpCtlUrgCounter,
    type PatternFlowTcpDataOffsetCounter as PatternFlowTcpDataOffsetCounter,
    type PatternFlowTcpDstPortCounter as PatternFlowTcpDstPortCounter,
    type PatternFlowTcpEcnCwrCounter as PatternFlowTcpEcnCwrCounter,
    type PatternFlowTcpEcnEchoCounter as PatternFlowTcpEcnEchoCounter,
    type PatternFlowTcpEcnNsCounter as PatternFlowTcpEcnNsCounter,
    type PatternFlowTcpSeqNumCounter as PatternFlowTcpSeqNumCounter,
    type PatternFlowTcpSrcPortCounter as PatternFlowTcpSrcPortCounter,
    type PatternFlowTcpWindowCounter as PatternFlowTcpWindowCounter,
    type PatternFlowUdpDstPortCounter as PatternFlowUdpDstPortCounter,
    type PatternFlowUdpLengthCounter as PatternFlowUdpLengthCounter,
    type PatternFlowUdpSrcPortCounter as PatternFlowUdpSrcPortCounter,
    type PatternFlowVlanCfiCounter as PatternFlowVlanCfiCounter,
    type PatternFlowVlanIDCounter as PatternFlowVlanIDCounter,
    type PatternFlowVlanPriorityCounter as PatternFlowVlanPriorityCounter,
    type PatternFlowVlanTpidCounter as PatternFlowVlanTpidCounter,
    type PatternFlowVxlanFlagsCounter as PatternFlowVxlanFlagsCounter,
    type PatternFlowVxlanReserved0Counter as PatternFlowVxlanReserved0Counter,
    type PatternFlowVxlanReserved1Counter as PatternFlowVxlanReserved1Counter,
    type PatternFlowVxlanVniCounter as PatternFlowVxlanVniCounter,
    type Rocev2ImmediateData as Rocev2ImmediateData,
    type Rocev2PriorityValue as Rocev2PriorityValue,
    type Rocev2QPs as Rocev2QPs,
    type SecureEntityStaticKeySak as SecureEntityStaticKeySak,
    type V4RouteAddress as V4RouteAddress,
    type V6RouteAddress as V6RouteAddress,
    type VxlanTunnelDestinationIPModeUnicastArpSuppressionCache as VxlanTunnelDestinationIPModeUnicastArpSuppressionCache,
    type ConfigCreateResponse as ConfigCreateResponse,
    type ConfigUpdateResponse as ConfigUpdateResponse,
    type ConfigCreateParams as ConfigCreateParams,
    type ConfigUpdateParams as ConfigUpdateParams,
  };

  export {
    Control as Control,
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

  export {
    Monitor as Monitor,
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

  export {
    Capabilities as Capabilities,
    type CapabilityRetrieveVersionResponse as CapabilityRetrieveVersionResponse,
  };
}
