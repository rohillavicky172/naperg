import { User, userClass } from '../user/User.type'

export interface AuthDeviceNode {
  node: AuthDevice
}

export interface AuthDevice {
  id: string
  createdAt: Date
  lastLogin: Date
  deviceToken: string
  country: string
  region: string
  eu: string
  city: string
  userAgent: string
  ip: string
  language: string
  timeZone: string
  timeZoneOffset: string
  browserName: string
  browserEngine: string
  browserVersion1a: string
  browserVersion1b: string
  browserLanguage: string
  browserPlatform: string
  browserOnline: boolean
  javaEnabled: boolean
  isDeleted: boolean
  dataCookiesEnabled: boolean
  isVerified: boolean
  sizeScreenW: string
  sizeScreenH: string
  sizeInW: string
  sizeInH: string
  sizeAvailW: string
  sizeAvailH: string
  scrColorDepth: string
  scrPixelDepth: string

  friendlyBrowserName: string
  friendlyBrowserVersion: string
  friendlyBrowserMajor: string
  friendlyEngineName: string
  friendlyEngineVersion: string
  friendlyOsName: string
  friendlyOsVersion: string
  friendlyDeviceVendor: string
  friendlyDeviceModel: string
  friendlyDeviceType: string
  friendlyCpuArchitecture: string
  user: User
}

export const authDeviceClass: AuthDevice = {
  id: '',
  user: userClass,
  createdAt: new Date(),
  lastLogin: new Date(),
  deviceToken: '',
  country: '',
  region: '',
  eu: '',
  city: '',
  userAgent: '',
  ip: '',
  language: '',
  timeZone: '',
  timeZoneOffset: '',
  browserName: '',
  browserEngine: '',
  browserVersion1a: '',
  browserVersion1b: '',
  browserLanguage: '',
  browserPlatform: '',
  browserOnline: true,
  javaEnabled: true,
  isDeleted: true,
  dataCookiesEnabled: true,
  isVerified: true,
  sizeScreenW: '',
  sizeScreenH: '',
  sizeInW: '',
  sizeInH: '',
  sizeAvailW: '',
  sizeAvailH: '',
  scrColorDepth: '',
  scrPixelDepth: '',

  friendlyBrowserName: '',
  friendlyBrowserVersion: '',
  friendlyBrowserMajor: '',
  friendlyEngineName: '',
  friendlyEngineVersion: '',
  friendlyOsName: '',
  friendlyOsVersion: '',
  friendlyDeviceVendor: '',
  friendlyDeviceModel: '',
  friendlyDeviceType: '',
  friendlyCpuArchitecture: '',
}
