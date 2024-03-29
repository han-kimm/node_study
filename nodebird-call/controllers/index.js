const axios = require('axios')

const URL = 'http://localhost:8002/v1'
axios.defaults.headers.origin = 'http://localhost:4000'

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt }
    })
  }
  catch (e) {
    if (e.response?.status === 419) {
      delete req.session.jwt;
      return request(req, api)
    }
    return e.response
  }
};

exports.getMyPosts = async (req, res, next) => {
  const result = await request(req, '/post/user')
  res.json(result?.data?.payload || result?.data)
}

exports.searchByTag = async (req, res, next) => {
  const result = await request(req, `/post/hashtag/${encodeURIComponent(req.params.hashtag)}`)
  res.json(result.data.payload)
}