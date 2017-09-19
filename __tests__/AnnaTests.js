import {translationHelpTemplate, translateFrom, translationTravisHelper} from '../utils/src/AnnaHelper'

jest.unmock('../utils/src/AnnaHelper') // we need thos in order to run "jest" from gimi project

describe('AnnaHelper', () => {
  it('it should not have chaned translation helper template ', () => {
    expect(translationHelpTemplate).toEqual('PLZ_TRANSLATE')
  })

  it('it should translate from en instead of sv', () => {
    expect(translateFrom).toEqual('en.json')
  })

  xit('it should not have ANNA in en or sv', () => {
    var annaError = []
    var textStringsTypes = ['server', 'templates', 'client', 'gimi-web', 'share-image-generator']
    var languageCodesHolder = ['en', 'sv']
    var textStrings = {}
    textStringsTypes.forEach(textStringsType => {
      textStrings[textStringsType] = {}
    })
    textStringsTypes.forEach(textStringsType => {
      languageCodesHolder.forEach(lang => {
        try {
          textStrings[textStringsType][lang] = require(`../text_strings/${textStringsType}/${lang}`)
        } catch (e) { expect(`Cant parse ${textStringsType}/${lang} ${e.message}`).toEqual('') }
      })
    })

    textStringsTypes.forEach(textStringsType => {
      languageCodesHolder.forEach(languageCode => {
        var lang = textStrings[textStringsType][languageCode]
        var keys = Object.keys(lang)
        keys.forEach(key => {
          if (languageCode) {
            if (lang[key].includes(translationTravisHelper)) {
              annaError.push({code: languageCode, textId: key})
            }
          }
        })
      })
    })
    expect(annaError).toEqual([])
  })
})
