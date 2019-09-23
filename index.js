var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var https = require('https');


let uaArr = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:59.0) Gecko/20100101 Firefox/59.0',
    'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
]

function random(){
    return parseInt(Math.random() * 6 + 0,10);
}

const translate = async(target, tl = 'en', sl = 'auto', opt) => {

    let data = Object.assign({  
            client: 'gtx',  
            dt: 't',
            ie: 'UTF-8',
            oe: 'UTF-8'
        }, opt, {tl: tl, sl: sl, q: target}); 
      
    let content = qs.stringify(data);  
    //https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=en&q=重复周期
    let ua = uaArr[random()] || uaArr[1];
    let options = {  
        hostname: 'translate.googleapis.com',  
        path: '/translate_a/single?' + content,  
        method: 'GET',
        headers:{
            userAgent: ua
        }
    };  
     
    return new Promise((resolve, reject) => {
       let req = https.request(options, function (res) {  
            res.on('data', function (chunk) { 
                let str = chunk.toString();
                try{
                    let obj = JSON.parse(str);
                    let result = obj[0][0][0];
                    resolve(result)
                }catch(e){
                    reject(e)
                }
            });  
        });  
          
        req.on('error', function (e) {  
            reject('problem with request: ' + e.message);  
        });  
          
        req.end(); 
    })
}

module.exports = translate;