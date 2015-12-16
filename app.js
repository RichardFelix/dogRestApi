var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    dogApi = require('./dogApi');

//app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

app.use(dogApi.bodyParser.urlencoded({ extended: false }));
app.use(dogApi.methodOverride("_method"));
app.use(express.static(__dirname + '/'));

app.get('/', function(req,res){
    res.redirect('/api');
});

app.get('/api/new', function(req, res){
    res.render('create');
});

app.post('/api', dogApi.newDog ); 
app.put('/api/:id', dogApi.put );
app.get('/api', dogApi.findAll );
app.get('/api/:id', dogApi.findOne );
app.get('/api/:id/edit', dogApi.edit );
app.delete('/api/:id', dogApi.deleteDog );

app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(port, function(){
   console.log(`Server running on port ${ port }`); 
});
