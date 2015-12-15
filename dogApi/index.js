var mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/dogs');

var dogsSchema = mongoose.Schema({
    name: String,
    breed: String,
    age: Number
});

var Dog = mongoose.model('Dog', dogsSchema);

var find = function(req, res){               
    if(Object.keys(req.query).length === 0 ){
        Dog.find( {}, function(err,users){ 
                if(err)
                    throw err;
                else
                    res.render('list', { users: users } );
            });
    }else if(Object.keys(req.query).length === 1 ) {
        Dog.find(
            { _id: req.query.id }
        )
        .exec(function(err, user){
            if(err)
                res.send('No Id Found in DB'); 
            else
                res.send(user);
        });       
        
    }
};

var newDog =  function(req,res){    
    var doggie = Dog({
        name: req.body.name,
        breed: req.body.breed,
        age:  req.body.age
    });

    doggie.save(function(err){
        if(err)
            throw err;
        else
            res.redirect('/api');
    }); 
};

var edit = function(req, res){
    Dog.findById( req.params.id, function(err,user){ 
        if(err)
            res.redirect('/');
        else
            res.render('edit', { user: user} ); 
    });
    
};

var put = function(req, res){
    Dog.findByIdAndUpdate( req.params.id, {
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age
        }, 
        function(err,user){
            if(err) 
                res.send('Not a valid ID');
            else    
                res.redirect('/api');
        }
    );
};

var deleteDog = function(req, res){  
    Dog.remove({ _id: req.params.id},
     function(err, user){
        if(err)
            res.send("Dog Id Not Found");
        else
            res.redirect('/api');
    });
};

module.exports ={
    mongoose, 
    bodyParser, 
    methodOverride,
    find,
    newDog,
    edit,
    put,
    deleteDog
}

