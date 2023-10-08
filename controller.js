const lodash = require('lodash')
const data = require('./data')

exports.getResult = async (req, res, next) => {
  try {
    const result = await sendRequest()
    const rej = await result.json()
    if (rej.error) {
      throw new Error(rej.error)
    }
    const arr = rej.blogs
    console.log(arr)
    const num = lodash.size(arr)
    const topheading = lodash.maxBy(arr, function (e) {
      return e.title.length
    })
    const findPrivacy = lodash.filter(arr, function (obj) {
      console.log(obj.title.toLowerCase())
      return obj.title.toLowerCase().includes('privacy')
    })
    const groups = lodash.groupBy(arr, function (e) {
      return e.title
    })
    res.status(200).json({
      success: true,
      num,
      topheading,
      findPrivacy,
      groups,
    })
  } catch (e) {
    errHandle(e, res)
  }
}

exports.findRes = async (req, res, next) => {
  try {
    const result = await sendRequest()
    console.log('here')
    const keyword = req.query.keyword
    console.log(keyword)
    if (!keyword) {
      throw new Error('keyword not provided')
    }
    const rej = await result.json()
    if (rej.error) {
      throw new Error(rej.error)
    }
    const arr = rej.blogs
    const findKey = lodash.filter(arr, function (obj) {
      console.log(obj.title.toLowerCase())
      return obj.title.toLowerCase().includes(keyword.toLowerCase())
    })
    res.status(200).json({
      success: true,
      findKey,
    })
  } catch (e) {
    errHandle(e, res)
  }
}
function errHandle(e, res) {
  if (e.cause && e.cause.code == 'ENOTFOUND') {
    res.status(400).json({
      error: 'Internet is not available on server side',
    })
  } else if (e.message == 'invalid x-hasura-admin-secret/x-hasura-access-key') {
    res.status(400).json({
      error: 'Invalid secreat key ',
    })
  } else if (e.message == 'keyword not provided') {
    res.status(400).json({
      error: 'Keyword is not provided',
    })
  } else {
    res.status(400).json({
      error: 'Got Some error',
    })
  }
}

async function sendRequest() {
  return await fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-hasura-admin-secret': process.env.SECRET_KEY,
    },
  })
}
