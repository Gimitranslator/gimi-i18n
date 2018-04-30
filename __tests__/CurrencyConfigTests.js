
import {getCurrencyConfig} from '../lib/CurrencyConfig'
var fs = require('fs')
var configs = []
var allConfigs = []
jest.disableAutomock()

expect.extend({
  toHaveSameLength (received: *, argument: *, location: *): * {
    const pass = Object.keys(getCurrencyConfig(received)).length === argument
    if (pass)
      return {
        message: () => (`expected ${received} not to be divisible by ${argument}`),
        pass: true
      }
    else
      return {
        message: () => (`expect all config to have the same amount of keys ${location.x} and ${location.y} ?`),
        pass: false
      }
  }
})

let getAllConfigFiles = (): Array<Object> => {
  configs = fs.existsSync('./config/') ? fs.readdirSync('./config/') : fs.readdirSync('./src/i18n/config/')
  configs.forEach(file => {
    file = file.split('config_')[1]
    if (file && file.indexOf('.json') !== -1) {
      file = file.split('.json')[0]
      allConfigs.push(file)
    }
  })
  return allConfigs
}

describe('Config', () => {
  it('it should be able to get config ', () => {
    allConfigs.forEach((currencyCode) => expect(getCurrencyConfig(currencyCode)).toBeDefined())
  })

  it('all supported configs should have same number of keys', () => {
    allConfigs.forEach((x) =>
      allConfigs.forEach(y =>
        Object.keys(getCurrencyConfig(x)).forEach(xKey =>
          Object.keys(getCurrencyConfig(y)).forEach(yKey => expect(getCurrencyConfig(x)[yKey]).not.toEqual(undefined, `Have you configured ${yKey} on currecy ${x}?`))
        )
      )
    )
  })

  it('all configs should have same number of keys', () => {
    getAllConfigFiles()
    allConfigs.forEach((x) => {
      allConfigs.forEach((y) => {
        expect(Object.keys(getCurrencyConfig(x)).length).toHaveSameLength(Object.keys(getCurrencyConfig(y)).length, {x, y})
      })
    })
  })
})
