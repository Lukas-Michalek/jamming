import React from "react";
import "./Track.css";

export class Track extends React.Component {

    // Step 27 -> Button will show + if isRemoval is false and - if is Removal is True -> Note that I do not have to use isRemoval === true as JSX expects non False value
    renderAction(){
        if (this.props.isRemoval){
            return <button className = "Track-action">-</button>
        }
        else{
            return <button className = "Track-action"></button>

        }
    }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <button className="Track-action">
          {/* {this.renderAction()} */}
        </button>
      </div>
    );
  }
}
