var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    dogApi = require('./dogApi');

app.set('view engine', 'jade');

app.use(dogApi.bodyParser.urlencoded({ extended: false }));
app.use(dogApi.methodOverride("_method"));

app.get('/', function(req,res){
    res.redirect('/api');
});

app.get('/api/new', function(req, res){
    res.render('create');
});

app.post('/api', dogApi.newDog );
app.put('/api/:id', dogApi.put );
app.delete('/api/:id', dogApi.deleteDog );
app.get('/api', dogApi.find );
app.get('/api/:id/edit', dogApi.edit );

app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(port, function(){
   console.log(`Server running on port ${ port }`); 
});
