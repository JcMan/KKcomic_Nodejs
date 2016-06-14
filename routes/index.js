var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var KKparse = require('../models/parse.js');
var router = express.Router();
var baseUrl = 'http://www.kuaikanmanhua.com';
/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', { title: 'Express'});
});

/* Get the everyday updated comics*/
router.get('/update/:pos',function(req,res,next){
	var pos = req.params.pos;
	var reqUrl = baseUrl+'/?pos='+pos;
    if (pos>6||pos<0){
        errorRes(res);
    }else{
        request(reqUrl, function (error, response, body){
            if (!error && response.statusCode == 200){
                var resData = KKparse.parseUpdateData(body,function(str){
                    resWrite(res,str);
                });
            }else{
                errorRes(res);
            }
        });
    }
});

/*Get search result*/
router.get('/search/:keyword',function(req,res,next){
    var keyword = req.params.keyword;
    var reqUrl = baseUrl+'/';
    request.post({url:reqUrl, form: {keyword:keyword}}, function(err,response,body){
        if (!err && response.statusCode == 200){
            var resData = KKparse.parseSearchData(body,function(str){
                resWrite(res,str);
            });
        }else{
            errorRes(res);
        }
    });
});

/*write res data*/
function resWrite(res,data){
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(data);
}

/*if error */
function errorRes(res){
    var items = [];
    var resData = {
        result:'error',
        itmes:items
    };
    var str = JSON.stringify(resData);
    resWrite(res,str);
}
module.exports = router;
