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

    let reddit 
    let verge 
    let korben 

const urlAxios = ['http://www.reddit.com/.rss', 'https://www.theverge.com/google/rss/index.xml', 'https://9gag-rss.com/api/rss/get?code=9GAGHot&format=1']

const getRss = () => {
    
    return Axios.all(
        [
            Axios.get(urlAxios[0]),
            Axios.get(urlAxios[1]),
            Axios.get(urlAxios[2])
        ]
    ).then(Axios.spread( (url1, url2,url3) => {

        reddit = url1.data
        verge =  url2.data
        korben =  url3.data

        parseRss(reddit, verge, korben)
    })).catch( err => console.log(err))
}

const parseRss = (reddit, verge, korben) => {
    let arr = [reddit, verge, korben]
    for (let a of arr ) {
        parseString(a, (err, result ) => {
            console.log(result)
        })

    }
    // parseString(reddit, (err, result ) => {
    //     if (err) {
    //         throw err
    //     } else {
    //         console.log('res', result)
    //         return result
    //     }
        
    // })
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




app.get('/',  (req, res) => {
    getRss();
    //parseRss(res)
})



app.listen(PORT, () => {
    console.log(`Magic is Happend in ${PORT}` )
})
