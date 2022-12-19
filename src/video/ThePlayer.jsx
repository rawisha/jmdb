import React from 'react'
import './ThePlayer.css'
import ReactPlayer from 'react-player'
export default function ThePlayer({urlData}) {
 
  
  return (
    <div className='player-wrapper'>
        <ReactPlayer
        className="react-player"
        url={urlData}
        
        width="100%"
        height="100%"
        controls={true}
        playing={false}
        enableremovecontrols='true'
        />
    </div>
  )
}
