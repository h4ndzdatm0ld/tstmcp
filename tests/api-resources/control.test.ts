// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Devknot from 'devknot';

const client = new Devknot({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource control', () => {
  // skipped: tests are disabled for the time being
  test.skip('setState: only required params', async () => {
    const responsePromise = client.control.setState({ choice: 'port' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('setState: required and optional params', async () => {
    const response = await client.control.setState({
      choice: 'port',
      port: {
        choice: 'link',
        capture: { state: 'start', port_names: ['string'] },
        link: { state: 'up', port_names: ['string'] },
      },
      protocol: {
        choice: 'all',
        all: { state: 'start' },
        bgp: { choice: 'peers', peers: { state: 'up', peer_names: ['string'] } },
        isis: { choice: 'routers', routers: { state: 'up', router_names: ['string'] } },
        lacp: {
          choice: 'admin',
          admin: { state: 'up', lag_member_names: ['string'] },
          member_ports: { state: 'up', lag_member_names: ['string'] },
        },
        ospfv2: { choice: 'routers', routers: { state: 'up', router_names: ['string'] } },
        ospfv3: { choice: 'routers', routers: { state: 'up', router_names: ['string'] } },
        rocev2: { choice: 'peers', peers: { state: 'up', peer_names: ['string'] } },
        route: { state: 'withdraw', names: ['string'] },
      },
      traffic: { choice: 'flow_transmit', flow_transmit: { state: 'start', flow_names: ['string'] } },
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('triggerAction: only required params', async () => {
    const responsePromise = client.control.triggerAction({ choice: 'protocol' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('triggerAction: required and optional params', async () => {
    const response = await client.control.triggerAction({
      choice: 'protocol',
      protocol: {
        choice: 'ipv4',
        bgp: {
          choice: 'notification',
          initiate_graceful_restart: {
            notification: {
              cease: { subcode: 'max_number_prefix_reached_code6_subcode1' },
              choice: 'cease',
              custom: { code: 0, subcode: 0 },
              finite_state_machine_error: {},
              hold_timer_expired: {},
              message_header_error: { subcode: 'connection_not_synchronized_code1_subcode1' },
              open_message_error: { subcode: 'unsupported_version_number_code2_subcode1' },
              update_message_error: { subcode: 'malformed_attrib_list_code3_subcode1' },
            },
            peer_names: ['string'],
            restart_delay: 3600,
          },
          notification: {
            cease: { subcode: 'max_number_prefix_reached_code6_subcode1' },
            choice: 'cease',
            custom: { code: 0, subcode: 0 },
            finite_state_machine_error: {},
            hold_timer_expired: {},
            message_header_error: { subcode: 'connection_not_synchronized_code1_subcode1' },
            names: ['string'],
            open_message_error: { subcode: 'unsupported_version_number_code2_subcode1' },
            update_message_error: { subcode: 'malformed_attrib_list_code3_subcode1' },
          },
        },
        ipv4: { choice: 'ping', ping: { requests: [{ dst_ip: 'dst_ip', src_name: 'src_name' }] } },
        ipv6: { choice: 'ping', ping: { requests: [{ dst_ip: 'dst_ip', src_name: 'src_name' }] } },
      },
    });
  });
});
