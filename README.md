# liri_bot
A terminal/bash api interface for Twitter, Spotify, and movie data.

All commands and queries are stored in the "log.txt" file.

Commands:
  my-tweets: Prints 20 most recent tweets by screen name to the console
    eg: $ node liri my-tweets
   
  spotify-this-song: Prints artist, song name, a link to a sample clip, and album info from Spotify to the console.
    eg: $ node liri spotify-this-song Bold As Love
    
  movie-this: Prints title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, and actor info from OMDB to the console.
    eg: $ node liri movie-this Step Brothers
    
  do-what-it-says: Runs spotify-this-song on a song specified in the "random.txt" file. 
    eg: $ node liri do-what-it-says
