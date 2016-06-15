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
    if(count==0){
    	var resData = {
    		result:'ok',
	        items:items
	    };
        var str = JSON.stringify(resData);
        callback(str);
    }else{
	    $('li[class=items]').each(function(i,e){
	       
	        var e_img = $(e).find('img')[2];
	        var e_a = $(e).find('a')[1];
	        var e_author = $(e).find('div')[4];
	        var e_visit = $(e).find('div')[5];
	        
	        var title = $(e_a).html();
	        var img = $(e_img).attr('data-kksrc');
	        if(!img){
	        	img = $(e_img).attr('src');
	        }
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
    
}

function parseSearchData(data,callback){
	parseUpdateData(data,callback);
}

/*parse the comic's details and catalogs*/
function parseComicDetails(data,callback){
	var $ = cheerio.load(data);
	var info = $('div[class=article-info]');
	var e_img = $(info).find('img')[0];
	var img = $(e_img).attr('src');
	var title = $('div[class=comic-name]').html();
	var author = $('div[class=author-nickname]').html();
	var desc = $(info).find('p')[0];
	desc = $(desc).html();
	var comment_num = $('span[class=comment-num]').html();
	var praise_num = $('span[class=praise-num]').html();
	var body = $('div[class=article-list]').find('tbody');
	var count = $(body).find('tr').toArray().length;
	var items = [count];
	var e_items = $(body).find('tr').each(function(i,e){
		var cover = $(e).find('img')[0];
		cover = $(cover).attr('src');
		var href = $(e).find('a')[1];
		var name = $(href).html();
		href = setting.getBaseUrl()+$(href).attr('href');
		var item = {
			name:name,
			cover:cover,
			href:href,
		};
		items[count-1-i] = item;
		if (i==count-1) {
			var resData = {
				result:'ok',
				title:title,
				author:author,
				img:img,
				desc:desc,
				comment_num:comment_num,
				praise_num:praise_num,
				items:items
			};
			var str = JSON.stringify(resData);
			callback(str);
		}
	});
}

/*parse the pics of the catalog*/
function parsePics(data,callback){
	var $ = cheerio.load(data);
	var count = $('img.kklazy').toArray().length;
	var items = [count];
	var meizi = $('img.kklazy').each(function(i,e){
    	var src = $(e).attr("data-kksrc");
	    items[i] = src;
	    if (i==count-1) {
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
exports.parseSearchData = parseSearchData;
exports.parseComicDetails = parseComicDetails;
exports.parsePics = parsePics;