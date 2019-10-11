// bring in our scrape script and makeDate acripts
var scrape = require ("../scripts/scrape");
var makeDate = require ("../scripts/date");

// bring in the headline and note mongoose models

var HeadLine = require("../models/HeadLines");

module.exports = {
    fetch: function (cb){
        scrape (function(data){
            var articles = data;
            for (var i = 0; i <articles.length; i++){
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            HeadLine.collection.insertMany(articles, {ordered:false}, function(err,docs){
                cb(err,docs);
            });
        });
    },
    delete: function (query,cb){
        HeadLine.remove(query,cb);
    },
    get: function (query,cb){
        HeadLine.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err,doc){
            cb(doc);
        });
    },
    update: function(query,cb) {
        HeadLine.update({_id: query._id},{
            $set:query

        }, {},cb);

    }

}