// Calls require methods
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys");

// Sets global variables
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");
var divider = "----------------------------------------------------------------------------------------------------";

// Generates spotify and twitter api keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Takes user inputted command and query and runs appropriate function
function runLiri(){
    if(command === "do-what-it-says"){
        doWhatItSays();
    } else if(command === "my-tweets"){
        myTweets();
    } else if(command === "spotify-this-song"){
        if (process.argv.length === 3){
            query = "Ace of Base";
        }
        spotifyThis();
    } else if(command === "movie-this"){
        if (process.argv.length === 3){
            query = "Mr. Nobody";
        }
        movieThis();
    } else {
        console.log(divider);
        console.log("\nERROR: Invalid Command.\n");
        console.log(divider);
    }
    addLog();
}

// Prints 20 most recent tweets
function myTweets(){
    var params = {screen_name: 'lpsassignment10'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            for (var i = 19; i > -1; i--) {
                console.log(divider);
                console.log("Tweet: \t\t" + tweets[i].text + "\nTimestamp: \t" + tweets[i].created_at);
                console.log(divider);
            }
        } else {
            console.log(error);
        }
    })
}

// Prints info about a song
function spotifyThis(){
    spotify.search({type: 'track', query: query}, function(err, data){
        if(!err){
        console.log(divider);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nPreview: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
        console.log(divider);
        } else {
            console.log(err)
        }
    })
};

// Prints info about a movie
function movieThis(){
    var movieSearch = "http://www.omdbapi.com/?apikey=trilogy&t=" + query;
    request(movieSearch, function(error, response, body){
        if(!error){
            console.log(divider);
            console.log("Title: " + JSON.parse(response.body).Title + "\nYear: " + JSON.parse(response.body).Year + "\nIMDB Rating: " + JSON.parse(response.body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(response.body).Ratings[1].Value + "\nCountry: " + JSON.parse(response.body).Country + "\nLanguage: " + JSON.parse(response.body).Language + "\nPlot: " + JSON.parse(response.body).Plot + "\nActors/Actresses: " + JSON.parse(response.body).Actors);
            console.log(divider);
        } else {
            console.log(error);
        }
    })
};

// Runs spotify-this-song function on pre-defined song in random.txt
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(!err){
            var dataArr = data.split(",");
            command = String(dataArr[0]);
            query = String(dataArr[1]);
            spotifyThis();
        } else{
            console.log(err);
        }
    })
};

// Adds commands and queries to log.txt
function addLog(){
    fs.appendFile("log.txt", divider + "\nCommand: " + command + "\nQuery: " + query + "\n" + divider + "\n", function(err, data){
        if(!err){
            console.log("Added to log.")
        } else{
            console.log(err);
        }
    })
}

runLiri();