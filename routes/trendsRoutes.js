const googleTrends = require('google-trends-api');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(keys.newsAPIKEY);

const requireLogin = require('../middleware/requireLogin');

const News = mongoose.model('news');

// const keys = require('../config/keys');

// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI(keys.newsAPIKEY);

module.exports = (app) => {
  let trends;

  //get news from mongodb
  app.post('/api/mongodb/get/news', requireLogin, async (req, res) => {
    const { geo, categories, trend_ids } = req.body;
    console.log(geo);
    console.log(categories);
    console.log(trend_ids);
    let news;
    if (trend_ids) {
      news = await News.find({
        // geo: geo,
        // category: categories,
        _id: { $in: trend_ids },
      });
    } else {
      news = await News.find({
        geo: geo,
        category: categories,
        // _id: { $in: trend_ids },
      });
    }
    console.log(news);
    res.json(news);
  });

  //save news to mongodb by categories and location and send back
  // ['all', 'e', 'b', 't', 'h', 's', 'm']
  app.post('/api/mongodb/save/news', requireLogin, async (req, res) => {
    const { geo, category } = req.body;

    googleTrends.realTimeTrends(
      {
        geo: geo,
        category: category,
      },
      async function (err, results) {
        if (err) {
          res.status(500).send('Server Error');
        } else {
          trends = JSON.parse(results).storySummaries.trendingStories;
          trends.map(async (trend) => {
            const existingNew = await News.findOne({
              id: trend.id,
            });
            if (existingNew) {
            } else {
              await new News({
                id: trend.id,
                imgUrl: trend.image.imgUrl,
                newsUrl: trend.image.newsUrl,
                source: trend.image.source,
                relatedNews: trend.articles,
                entityNames: trend.entityNames,
                category: category,
                geo: geo,
              }).save();
            }
          });

          res.json(
            await News.find({
              geo: geo,
              category: category,
            })
          );
        }
      }
    );
  });

  //get news from news api by params
  app.post('/api/news/get', requireLogin, (req, res) => {
    const { q, searchIn, category, language, country, page, pageSize } =
      req.body;

    //get news from newsapi by params
    newsapi.v2
      .topHeadlines(
        Object.fromEntries(
          Object.entries({
            q: q,
            searchIn: searchIn,
            // sources: 'bbc-news,the-verge',
            // domains: 'bbc.co.uk, techcrunch.com',
            // from: '2017-12-01',
            // to: '2017-12-12',
            language: 'en',
            sortBy: 'popularity',
            country: country,
            category: category,
            pageSize: pageSize,
            page: page,
          }).filter(([_, v]) => v != null)
        )
      )
      .then((data) => {
        // console.log(data);

        // console.log(data.articles);
        res.json(data.articles);
      });
  });
};
