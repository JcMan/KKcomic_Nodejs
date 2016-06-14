var cheerio = require('cheerio');
var setting = require('./setting.js');


/* decode the everyday updated comics*/
function parseUpdateData(data,callback){
	var $ = cheerio.load(data);  //cheerio decode data
    var div_list = $('div[class=list]').html();
    
    $ = cheerio.load(div_list);
    var items = $('ul[class=clearfix]');
    $ = cheerio.load($(items).html());
    var count = $('li[class=items]').toArray().length;
    var items =[];
    $('li[class=items]').each(function(i,e){
       
        var e_img = $(e).find('img')[2];
        var e_a = $(e).find('a')[1];
        var e_author = $(e).find('div')[4];
        var e_visit = $(e).find('div')[5];
        
        var title = $(e_a).html();
        var img = $(e_img).attr('data-kksrc');
        var href = setting.getBaseUrl()+$(e_a).attr('href');  
        var author = $(e_author).html();
        var visit = $(e_visit).html();

        var item = {
        	title:title,
            author:author,
            img:img,
            href:href,
            visit:visit
        };
        items[i] = item;
        if(i==count-1){
            var resData = {
            	result:'ok',
            	items:items
            };
            var str = JSON.stringify(resData);
            callback(str);
        }
    });
}


exports.parseUpdateData = parseUpdateData;