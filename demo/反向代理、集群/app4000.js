//使用express框架，get,post，链接服务器

//框架
var express = require('express');
var app = express();
//链接数据库模块
//var mysql = require("mysql");

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
app.use(express.static('static4000'));
// parse application/json 

//get请求.................................................................................
var allowCrossDomain = function(req, res, next) {
//  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//  res.header('Access-Control-Allow-Headers', 'Content-Type');
//  res.header('Access-Control-Allow-Credentials','true');
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
	console.log('localhost:4000')
	console.log(req.originalUrl)
	var obj = {
		data: 'test4000',
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
var server = app.listen(4000, function() {
	//测试
	//测试
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})