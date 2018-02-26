const express = require('express')
const Path = require('path')
var publicPath = Path.join(__dirname,'../public')

const app = express();


app.use(express.static(publicPath))

// app.get('/', function(req, res) {
//     res.sendFile(publicPath+'/index.html');
// });
app.listen(3000)

