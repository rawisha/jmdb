import React from "react";
import "./ThePlayer.css";
export default function ThePlayer({ urlData }) {
  return (
    <div className="player-wrapper">
      <video
        style={{
          position: "relative",
          left: 0,
          height: "100%",
          width: "100%",
        }}
        src={urlData}
        autoPlay
        controls={true}
      />
    </div>
  );
}
