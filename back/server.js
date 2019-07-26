const express = require('express');
const app = express();
const Axios = require('axios');
const parseString = require('xml2js').parseString;
//const FeedParser = require('feedparser');

//const req = require('http://www.reddit.com/.rss');
//const feedparser = new FeedParser();



const PORT = 3003

let title = [];

const url ='https://www.theverge.com/google/rss/index.xml'

const getRss = () => {
    Axios.get(url).then( response => {
        parseString(response.data, (err, result) => {
                return result.feed.entry
            //.map(el => {
              //  return title.push(el.title)
               // console.log('title')
            //})
        })
    })
}


app.get('/', async (req, res) => {
    const response = await getRss();
    console.log('lol', response)
    res.send('hello word')
})



app.listen(PORT, () => {
    console.log(`Magic is Happend in ${PORT}` )
})
