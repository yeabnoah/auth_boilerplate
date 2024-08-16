import { Request, Response } from "express";
import os from "os";
import requestIp from "request-ip";
import deviceInfo from "../interface/deviceInfo";

const DeviceInformation = (IpAddress: string): deviceInfo => {
  var clientIp = IpAddress as string;

  if (clientIp === "::1") {
    clientIp = "127.0.0.1";
  }

  const deviceInfo: deviceInfo = {
    deviceOs: os.platform(),
    deviceIp: clientIp,
    userName: os.hostname(),
  };

  return deviceInfo as deviceInfo;
};

export default DeviceInformation;
