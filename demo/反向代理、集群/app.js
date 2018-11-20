//使用express框架，get,post，链接服务器

//框架
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
//链接数据库模块
//var mysql = require("mysql");
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));
//连接服务器配置.......................................................................
function createConnection() {
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'lefengwang'
	});
	return connection;
}

//设置静态文件 app.js根目录下寻找public文件夹作为静态文件夹
//pulic文件夹要自己创建，在下面设置路径,放在里面的html文件...带后缀的文件，就可以通过该服务器访问这些文件。
app.use(express.static('static8000'));
//app.use(express.static(path.join(__dirname, 'LS/dist'),{maxAge:1000*60*60}));//maxAge设置静态资源缓存时间
// parse application/json 

//get请求.................................................................................
var allowCrossDomain = function(req, res, next) {
	res.header('Cache-Control','public,max-age=0');//public表示缓存时间内，表示浏览器其他地方访问这个资源也允许使用这个缓存资源(使用from disk cache)。max-age=600表示600秒内重复请求该资源直接在浏览器缓存中读取，不向服务器发送请求
//	res.header('Expires','Sat, 07 Oct 2019 07:39:42 GMT');//GMT（格林尼治时间）时刻,在这个时间前都使用浏览器缓存(rom disk cache),超过则重新向浏览器请求，进行Etag、Last-Modified 的304缓存验证
//  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');//没什么用
//  res.header('Access-Control-Allow-Headers', 'Pragma,Cache-Control,Authorization,Content-Type,abc');//跨域情况下允许设置的请求头
//  res.header('Access-Control-Allow-Credentials','true');//与前端设置withCredentials配套使用，跨域时，是否附带cookies信息
    next();
};
app.use(allowCrossDomain);

//测试
app.get('/api/test', function(req, res) {
	//  解决跨域
//	res.append("Access-Control-Allow-Origin", "http://localhost:8080")
//	res.append("Access-Control-Allow-Credentials", "true")

	//解决跨域
//	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  res.header("X-Powered-By",' 3.2.1')
	//然后请求的很快的时候才能正常关闭链接、
	//引入插入模块	
	console.log('localhost:8000')
	console.log(req.originalUrl)
	var obj = {
		data: 'test8000',
		status: 1001
	}
	res.send(JSON.stringify(obj));
})
//普通post请求
app.post('/api/home', function(req, res) {
	console.log(req.originalUrl)
	console.log(req.body)
	var obj = {
		data: req.body,
		status: 1001
	}
	res.send(JSON.stringify(obj));
})




//监听该端口..............................................................................
var server = app.listen(8000, function() {
	//测试
	//测试
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})