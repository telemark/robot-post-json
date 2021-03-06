'use strict'

const axios = require('axios')
const config = require('../../config')
const generateSystemJwt = require('../generate-system-jwt')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-data', data._id, 'start'])
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()

    logger('info', ['post-data', data._id, 'url', config.SERVICE_URL])

    try {
      const result = await axios.post(config.SERVICE_URL, data.payload)
      logger('info', ['post-data', data._id, 'finished'])
      data.response = result.data
    } catch (error) {
      logger('error', ['post-data', data._id, error])
      data.retry = true
      data.errors.push(error)
    }

    resolve(data)
  })
}
