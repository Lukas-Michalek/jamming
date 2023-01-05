import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

import Spotify from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name2", artist: "artist2", album: "album2", id: 2 },
        { name: "name3", artist: "artist3", album: "album3", id: 3},
      ],

      playlistName: "My Playlist",

      playlistTracks: [
        { name: "playlistName1", artist: "playlistArtist1", album: "playlistAlbum1", id: 10 },
        { name: "playlistName2", artist: "playlistArtist2", album: "playlistAlbum2", id: 20 },
        { name: "playlistName3", artist: "playlistArtist3", album: "playlistAlbum3", id: 30 },
      ],

      trackURIs: []


    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // addTrack() method takes a track object(with properties of name, artist, album, id), then it will use the ID property to check if the track is in the playlist track state and if the ID is new we will add the song(push) at the end of playlist and then we will set a new state of plaList


  addTrack(track){

   // To make things easier I am going to create a variable 'tracks' with value of array of objects(songs) that are currently in playlist so I can compare them

   let tracks = this.state.playlistTracks;

    // for comparing I will use find() method which basicaly says: if track ID is already in tracks array(it will basically go through all of the objects of tracks array and compare ID`s which is better way than to use for loop) and find() will return true or false. If the ID is found do nothing and return straightaway, if not push that track to the end of playlist and the new playlist state be ser(basically the old array that was playlist will get replaced with new playlist array with that track in it)

    if (tracks.find((savedTrack) => savedTrack.id === track.id)){
      return;
    }

    // So the track will be pushed into tracks array (Remember that is exact copy of actual this.state.playlisTrack)
    tracks.push(track);


    // and so, the playlistTracks will be replaced with the copy that containsthe track that was not there before
    this.setState({ playlistTracks : tracks});
  }



  removeTrack(track){
    
    let tracks = this.state.playlistTracks;

    // So basically it will will take each track id and compare it against one specific ID(id of track we want to filter out of the array). If these two id`s are different then it will be added into array of tracks(note that I could chose to make a new array lets say newTracks but this also works) if they will be the same this particular item will be skipped and thus filtered out.

    // Each item for which condition of function inside filter function is false, that item will be filtered out 
    tracks = tracks.filter((currentTrack) => {
      return currentTrack.id !== track.id;
    });

    this.setState({ playlistTracks: tracks});

  }


  // Method for updating Playlist name according to User`s input
  updatePlaylistName(name){
  
    this.setState({ playlistName : name});
  }

  // After clicking Save to Spotify button in Playlist componenet savePlaylist through props onSave is called. Method then goes through all the track that are currently added in Playlist and takes their URIs which are stored in trackURIs array
  
  savePlaylist(){

    alert("This method works");

    const tracks = this.state.playlistTracks;
    
    // Note that I am using here one liner shortcut(therfore I do not neet return keyword) saying: Go through all tracks and return track.uri. I could also use: const trackURIs = tracks.map((track) => {return track.uri})

    const trackURIs = tracks.map((track) => track.uri)

    this.setState({trackURIs: trackURIs });
  }


  search(term){
   
    // After changing the input in SearchBar Component(something typying in) that term will be sent all the way to main app. search() then connect to spitify API with the term. And this.state.searchResults will now be set to the value result from our Spotify searches promise 


    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults})
    })
    
  }


  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar 
                onSearch={this.search}
          />

          <div className="App-playlist">
            <SearchResults 
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}
           />

            <Playlist 
                playlistName={this.state.playlistName} 
                tracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Another way of exporting would be using => export defualt App
