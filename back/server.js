const express = require('express');
const cors =  require('cors');
const app = express();
const Axios = require('axios');
const parseString = require('xml2js').parseString;

app.use(cors());

//const FeedParser = require('feedparser');

//const req = require('http://www.reddit.com/.rss');
//const feedparser = new FeedParser();


const PORT = 3003

let title = [];

const urlAxios = ['http://www.reddit.com/.rss', 'https://www.theverge.com/google/rss/index.xml', 'https://korben.info/feed']

const getRss = (res) => {
    return Axios.all(
        [
            Axios.get(urlAxios[0]),
            Axios.get(urlAxios[1]),
            Axios.get(urlAxios[2])
        ]
    ).then(Axios.spread((url1, url2,url3) => {
        parseString(url2.data, (err, result) => {
            console.log(result)
        })
        
    }))
}


//rssJson()
//const url ='https://www.theverge.com/google/rss/index.xml'

// const getRss = (res) => {
//     return Axios.get(url).then( response => {
//         parseString(response.data, (err, result) => {
//             //console.log('res')
//                 return res.status(200).send(result.feed.entry)
//             //.map(el => {
//               //  return title.push(el.title)
//                // console.log('title')
//             //})
//         })
//     })
// }




app.get('/', async (req, res) => {

    //console.log(res)
    getRss(res);
    
    //const response = await getRss();
    //console.log('lol', response)
    //res.send('hello word')
})



app.listen(PORT, () => {
    console.log(`Magic is Happend in ${PORT}` )
})
