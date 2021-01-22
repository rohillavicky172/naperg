import { User } from './user/User.type'
import { AUTH_DEVICE } from '../config/config'

import { URL_SERVER_MEDIA } from '../config/config'
import { bankStatesCA, bankStatesUS, bankCountries } from './addresse/BankAddress'

// var parse = require('date-fns/parse')
import { format, subDays, setHours, setSeconds, setMinutes } from 'date-fns'
// import {  } from 'date-fns'

// var subDays = require('date-fns/subDays')
// var format = require('date-fns/format')
// var setHours = require('date-fns/setHours')
// var setSeconds = require('date-fns/setSeconds')
// var setMinutes = require('date-fns/setMinutes')
// var addSeconds = require('date-fns/add_seconds')
// var subMilliseconds = require('date-fns/sub_milliseconds')

const utils = {
  isJsonString: (str: string) => {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  },

  twoDigits(number: number) {
    return ('0' + number).slice(-2)
  },
  getSubscriptionName: (productName: string, last4: string, firstName: string, lastName: string): string => {
    return `
      ${productName.split(' ').join('').toLocaleLowerCase()}-x${last4}-${firstName
      .split(' ')
      .join('')
      .toLocaleLowerCase()}-${lastName.split(' ').join('').toLocaleLowerCase()}`
  },
  getPlaidVerificationStatus: (verificationStatus: string): string => {
    if (verificationStatus === '') return '1. and 2. Instant Auth/Match'
    if (verificationStatus === 'pending_automatic_verification') return '3. Automated Micro-D: pending_automatic_verification'
    if (verificationStatus === 'automatic_verification') return '3. Automated Micro-D: automatic_verification'
    if (verificationStatus === 'pending_manual_verification') return '4. Same Day Micro-D: pending_manual_verification'
    if (verificationStatus === 'manually_verified') return '4. Same Day Micro-D: manually_verified'
    return verificationStatus
  },

  isURL(str: string) {
    var regexp = /^\S*$/
    return Boolean(regexp.test(str))
    // var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    // if (!regex.test(str)) {
    //   return false
    // } else {
    //   return true
    // }
    // var pattern = new RegExp(
    //   '^(https?:\\/\\/)?' + // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~=+]*)*' + // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    //     '(\\#[-a-z\\d_]*)?$',
    //   'i'
    // ) // fragment locator

    // const isPatternValid = pattern.test(str)
    // let httpValide = false

    // // if (str.substring(0, 7) === 'http://' || str.substring(0, 8) === 'https://') {
    // //   httpValide = true
    // // }

    // return isPatternValid

    // try {
    //   new URL(str)
    //   return true
    // } catch (_) {
    //   return false
    // }
  },
  getLabelState(countryCode: string, stateCode: string) {
    if (countryCode === 'US') {
      let stateObj = bankStatesUS.find((el) => el.code === stateCode)
      if (stateObj) {
        return stateObj.label
      } else {
        return stateCode
      }
    } else if (countryCode === 'CA') {
      let stateObj = bankStatesCA.find((el) => el.code === stateCode)
      if (stateObj) {
        return stateObj.label
      } else {
        return stateCode
      }
    } else {
      return stateCode
    }
  },

  getAuthDevice(email: string) {
    const authDeviceString = localStorage.getItem(AUTH_DEVICE + '|' + email)
    let deviceToken
    if (authDeviceString) {
      const authDevice = JSON.parse(authDeviceString ? authDeviceString : '{}')
      deviceToken = authDevice.deviceToken
    }

    return {
      deviceToken,
      timeOpened: new Date(),
      timeZoneOffset: new Date().getTimezoneOffset() / 60,
      timeZone: this.getUserTimeZone(),
      pageon: window.location.pathname,
      referrer: document.referrer,
      previousSites: window.history.length,
      browserName: navigator.appName,
      browserEngine: navigator.product,
      browserVersion1a: navigator.appVersion,
      browserVersion1b: navigator.userAgent,
      browserLanguage: navigator.language,
      browserOnline: navigator.onLine,
      browserPlatform: navigator.platform,
      javaEnabled: navigator.javaEnabled(),
      dataCookiesEnabled: navigator.cookieEnabled,
      // dataCookies1: document.cookie,
      // dataCookies2: decodeURIComponent(document.cookie.split(';')),
      // dataStorage: localStorage,
      sizeScreenW: window.screen.width,
      sizeScreenH: window.screen.height,
      sizeDocW: (window.document as any).width,
      sizeDocH: (window.document as any).height,
      sizeInW: window.innerWidth,
      sizeInH: window.innerHeight,
      sizeAvailW: window.screen.availWidth,
      sizeAvailH: window.screen.availHeight,
      scrColorDepth: window.screen.colorDepth,
      scrPixelDepth: window.screen.pixelDepth,
    }
  },

  getNameOrEmail(user: User, type: string) {
    // console.log('user getNameOrEmail')
    // console.log(user)
    if (type === 'firstName') {
      if (!user.firstName) {
        return user.email
      }
      return `${user.firstName}`
    }
    if (!user.firstName && !user.lastName) {
      return user.email
    }
    return `${user.firstName} ${user.lastName}`
  },

  getLabelCountry(countryCode: string) {
    let countryObj = bankCountries.find((el) => el.code === countryCode)
    if (countryObj) {
      return countryObj.label
    } else {
      return countryCode
    }
  },

  padZerros: (element: number, size: number) => {
    var s = String(element)
    while (s.length < (size || 2)) {
      s = '0' + s
    }
    return s
  },
  getUrlFileMedia(urlFile: string) {
    if (!urlFile) {
      return ''
    }
    if (urlFile.substring(0, 4) === 'http') {
      return urlFile
    } else {
      return URL_SERVER_MEDIA + '/' + urlFile
    }
  },
  getUniversalLink(link: string) {
    if (!link) {
      return link
    }
    if (link.substring(0, 4) === 'http') {
      return link
    } else {
      return 'http://' + link
    }
  },
  // isInCurrentSubscription: (subscription: Subscription) => {
  //   return (
  //     subscription.status === 'ACTIVE_TRIAL' ||
  //     subscription.status === 'ACTIVE_TRIAL_NOT_MONTHLY' ||
  //     subscription.status === 'ACTIVE_OFF_CYCLE' ||
  //     subscription.status === 'ACTIVE_REGULAR' ||
  //     subscription.status === 'ACTIVE_REGULAR_NOT_MONTHLY' ||
  //     subscription.status === 'PENDING_SIGNUP' ||
  //     subscription.status === 'PENDING_PAYMENT_REGULAR' ||
  //     subscription.status === 'PENDING_PAYMENT_OFF_CYCLE'
  //   )
  // },
  mappingTypeInvoice: (typeInvoice: string): string => {
    if (typeInvoice === 'VIRTUAL_CARD') return `Purchase`
    if (typeInvoice === 'RECURING_PLATFORM_FEES') return `NachoNacho Usage Fee`
    if (typeInvoice === 'RECURING_PLATFORM_FEES_TRIAL') return `Trial NachoNacho Usage Fee`
    if (typeInvoice === 'TOP_UP') return `Topup`
    if (typeInvoice === 'AUTO_TOP_UP') return `Auto topup`
    if (typeInvoice === 'REFUND') return `Refund`
    if (typeInvoice === 'REFUND_CASH_OUT') return `Cashout`
    if (typeInvoice === 'PLATFORM_FEES') return `Platform Fees`
    if (typeInvoice === 'PHYSICAL_CARD_FEES') return `Physical NachoCard Fees`
    if (typeInvoice === 'SELLER_REVSHARE') return `Seller revshare`

    return typeInvoice
  },

  mappingCashbackStatus: (cashbackStatus: string): string => {
    if (cashbackStatus === 'AVAILABLE') return 'Available'
    if (cashbackStatus === 'PENDING') return 'Pending'
    return cashbackStatus
  },
  mappingStatusInvoice: (statusInvoice: string): string => {
    if (statusInvoice === 'SUCCESSFUL') return `Successful`
    if (statusInvoice === 'ERROR_PAYMENT') return `Payment error`
    if (statusInvoice === 'PENDING') return `Approved`
    if (statusInvoice === 'ERROR') return `Error`
    if (statusInvoice === 'DUE') return `Due`
    if (statusInvoice === 'PAID') return `Paid`
    return statusInvoice
  },
  mappingStatusIssuedCard: (status: string) => {
    if (status === 'canceled') {
      return `Canceled`
    }
    if (status === 'inactive') {
      return `Suspended`
    }
    if (status === 'active') {
      return `Active`
    }
  },

  genderSwitch: (gender: string) =>
    ({
      male: 'Male',
      female: 'Female',
    }[gender]),
  typeInvoiceSwitch: (type: string) =>
    ({
      OFF_CYCLE: 'Off Cycle',
      TRIAL: 'Trialing',
      REGULAR: 'Regular',
      REGULAR_NOT_MONTHLY: 'Regular',
      SINGLE_INVOICE: 'Single Invoice',
    }[type]),
  languageSwitch: (language: string) =>
    ({
      en: 'English',
      fr: 'French',
    }[language]),
  dateFormated(date: Date, formatString: string = 'MMM dd, yyyy') {
    return format(new Date(date), formatString)
  },
  priceFormated(priceToFormat: number, currency: string) {
    if (priceToFormat !== null) {
      if (priceToFormat >= 0) {
        if (currency === 'usd') {
          return (
            '$' +
            priceToFormat
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          )
        } else if (currency === 'eur') {
          return (
            priceToFormat
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '‎€'
          )
        } else {
          return (
            priceToFormat
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
          )
        }
      } else {
        if (currency === 'usd') {
          return (
            '-$' +
            (priceToFormat * -1)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          )
        } else if (currency === 'eur') {
          return (
            '-' +
            (priceToFormat * -1)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '‎€'
          )
        } else {
          return (
            '-' +
            (priceToFormat * -1)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            currency
          )
        }
      }
    }
    return '0'
  },
  percentageFormated(percentage: number) {
    return (percentage * 100).toFixed(2).toString() + '%'
  },
  smallIdFormat(smallId: number) {
    return this.padZerros(smallId, 12)
      .toString()
      .replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
  },
  numberCardFormat(numberCard: string) {
    return (
      numberCard.substring(0, 4) +
      ' ' +
      numberCard.substring(4, 8) +
      ' ' +
      numberCard.substring(8, 12) +
      ' ' +
      numberCard.substring(12, 16)
    )
    // return this.padZerros(smallId, 12)
    //   .toString()
    //   .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
  },

  getUserTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'America/Los_Angeles'
  },
  // isBatchInvoice(invoice: Invoice) {
  //   const isNotBacthInvoice = (invoice.type === 'OFF_CYCLE' || invoice.type === 'TRIAL')
  //   return !isNotBacthInvoice
  // },
  // addSeconds(date: Date, seconds: number) {
  //   return addSeconds(date, seconds)
  // },
  makeid(nbChar: number) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_'
    for (var i = 0; i < nbChar; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  },
  // getAugmentedSignupLink(link: string, subscription: string) {
  // getAugmentedSignupLink(subscription: Subscription, testMode: boolean) {
  //   // console.log(subscription.variation.signupLinkTest, subscription.variation.signupLink)
  //   let link = testMode ? subscription.variation.signupLinkTest : subscription.variation.signupLink

  //   let hasQuestionMark = link.includes('?')
  //   let firstChar = '?'
  //   if (hasQuestionMark) {
  //     firstChar = '&'
  //   }
  //   return link + firstChar + 'source=NachoNacho&subscription_id=' + subscription.id
  // },
  // mappingTablePaymentFrequencyToNbMonths(variation: Variation) {
  //   let nbMonths
  //   if (variation.paymentFrequency === 'YEAR') {
  //     nbMonths = 12
  //   }
  //   if (variation.paymentFrequency === 'SIX_MONTH') {
  //     nbMonths = 6
  //   }
  //   if (variation.paymentFrequency === 'THREE_MONTH') {
  //     nbMonths = 3
  //   }
  //   if (variation.paymentFrequency === 'TWO_MONTH') {
  //     nbMonths = 2
  //   }
  //   if (variation.paymentFrequency === 'MONTH') {
  //     nbMonths = 1
  //   }
  //   return nbMonths
  // },
  removeTime(dateTime: Date) {
    return setSeconds(setMinutes(setHours(new Date(dateTime), 0), 0), 0)
  },
  substractDays(date, days) {
    return subDays(date, days)
  },
  // subsctract1Milisecond(date) {
  //   return subMilliseconds(date, 1)
  // }
}

export default utils
