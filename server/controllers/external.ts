export {};
const model = require('../models');

module.exports = {
  fetchPicture: async function (req: any, res: any) {
    try {
      let data = await model.fetchPicture(req.method, req.headers, req.body, req.query, req.params);
      res.status(200).json(data);
    } catch (err) {
      console.log(`Controller ${err}`);
      res.status(404).end()
    }
  }
}