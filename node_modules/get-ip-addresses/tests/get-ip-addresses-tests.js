'use strict';

import expect from 'expect';
import os from 'os';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

describe('get ip addresses', () => {
  let spy;
  let getIpAddresses;

  beforeEach(() => {
    spy = sinon.spy(os, 'networkInterfaces');
    getIpAddresses = proxyquire('../src/get-ip-addresses', {'os': os}).default;
    spy.reset();
  });

  afterEach(() => {
    spy.restore();
  });

  it('works on my machine', () => {
    // Arrange

    // Act
    const addresses = getIpAddresses();

    // Assert
    expect(addresses.length).toNotEqual(0);
  });

  it('should not refresh if no parameters are given', () => {
    // Arrange

    // Act
    const addresses = getIpAddresses();

    // Assert
    expect(spy.called).toBeFalsy();
  });

  it('should not refresh if parameter is false', () => {
    // Arrange

    // Act
    const addresses = getIpAddresses(false);

    // Assert
    expect(spy.called).toBeFalsy();
  });

  it('should not refresh if parameter is true', () => {
    // Arrange

    // Act
    const addresses = getIpAddresses(true);

    // Assert
    expect(spy.called).toBeTruthy();
  });
})