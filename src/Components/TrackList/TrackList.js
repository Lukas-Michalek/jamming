import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {/* Basically what I will do is to take an array of all fetched data passed all the way down from App(that will receive data from API as an array of objects(having name, artist, album and id from becasue Spotify API stores them in this way) and are in form of state as this is the main component) which are passed to SearchResult Component(in form of props as this is child of main component app -> Also I need to check if data are passed correctly in DeV Tools -> Raeact -> Components) and these are sent to TrackList from SearchReslut in form of props. In Tracklist the array of objects will be transformed into individual Track compomenets using map() method. So basically each track will get its own component called Track => Creates Track componenet with atribute called track and each track id will be stored as key     */}

        {
         this.props.tracks.map((track) => {
          return < Track track={track} key={track.id} />
        })
        }
      </div>
    )
  }
}
