import React from "react";
import "./Track.css";

export class Track extends React.Component {

    constructor(props){
      super(props);

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this)
    }


    // Step 27 -> Button will show + if isRemoval is false and - if is Removal is True -> Note that I do not have to use isRemoval === true as JSX expects non False value

    // When clicked on + button addTrack method is called. Because state can be changed only from main componenet APP current track will be used as argument for addTrack method and if added or not into playlist depending on its ID

    renderAction(){
        if (this.props.isRemoval){
            return <button className = "Track-action" onClick={this.removeTrack}>-</button>
        }
        else{
            return <button className = "Track-action" onClick={this.addTrack}>+</button>

        }
    }

    addTrack(){
      this.props.onAdd(this.props.track);
    }

    removeTrack(){
      this.props.onRemove(this.props.track);

    }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
