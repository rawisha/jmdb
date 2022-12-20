import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/PlayerPage.css'
import ThePlayer from '../video/ThePlayer'
import Header from './Header'

function SeriesPage() {
    const location = useLocation()
    const {tvID} = location.state
    const {tvInfo} = location.state
    const vid = tvInfo.s1Video720 ||  tvInfo.s2Video720 || tvInfo.s3Video720 || tvInfo.s4Video720
    let defaultPlayUrl = process.env.REACT_APP_defaultplay + vid
    const [newData, setNewData] = useState([])
    const [playUrl, setPlayUrl] = useState(defaultPlayUrl)

    
    const [num,setNum] = useState(1)
    const url = `${process.env.REACT_APP_apitv}${tvID}&_limit=0`
    
    const tvData = Object.keys(newData)
    


    useEffect(() => {
        async function getShit() {
            const res = await fetch(url)
            const apiInfo = await res.json()
            
           setNewData(getSeasons(apiInfo))
           //setTvInfo(apiInfo)
        }
        getShit()
    },[])
    
    const getSeasons = (data) => {
        const newData = []
        data.map(rawData => {
            const season = 'Season ' + rawData.seasonNumber
            const domain = rawData.s1Domain || rawData.s2Domain || rawData.s3Domain || rawData.s4Domain
            const bucket = rawData.s1Bucket || rawData.s2Bucket || rawData.s3Bucket || rawData.s4Bucket
            const video720 = rawData.s1Video720 || rawData.s2Video720 || rawData.s3Video720 || rawData.s4Video720
            const video1080 = rawData.s1Video1080 || rawData.s2Video1080 || rawData.s3Video1080 || rawData.s4Video1080
            const video_url_720 = domain  + '/' + bucket + '/' + video720
            const video_url_1080 = domain  + '/' + bucket + '/' + video1080
            if ( ! (season in newData)) newData[season] = []
            const dataObject =  {
                episodeNumber: rawData.episodeNumber,
                episodeTitle: rawData.episodeTitle,
                airDate: rawData.release_date,
                overView: rawData.overview,
                video720: video_url_720,
                backdrop: rawData.backdrop,
                poster: rawData.poster,
                season: rawData.seasonNumber
            }

            if(rawData.s1Video1080 || rawData.s2Video1080 || rawData.s3Video1080){
                dataObject["video1080"] = video_url_1080
            }
            newData[season].push(dataObject)         
        })
        
        return newData
        
    }
    
    
    
   
  return (
    <>
    <Header />
    <div className='Player--container' style={{heigt:'100%'}}>
        
        <div className='player--wrapper'>
            <ThePlayer urlData={playUrl}/>
        </div>

        <div className='info--container'>
            <div className='infoText--container'>
                <h1>{tvInfo?.title}</h1>
                <div className='infoDetails--container'>
                    <p className='rating'>{tvInfo.vote_average}</p>
                    <p className='releaseTime'>{tvInfo.release_date}</p>
                    <p className='runTime'>123 min</p>
                </div>
                <div className='overview--container'>
                    <h3>{tvInfo.overview}</h3>
                </div>
                
            </div>
            <div className='Episode--Container'>
                    
                    <div className='EpisodeInfo-wrapper'>
                    
                    <div className='season--border'>
                    <ul className='ul--Container'>
                        {tvData?.map((season,index) => {
                            
                            return <li key={index} onClick={() => setNum(index + 1)}>{season}</li>
                        })}
                    </ul>
                    </div>

                    <div className='Episodes--wrapper'>
                        <ul className='season--border2'>
                            {newData['Season ' + num]?.map((data,index) => {
                                
                                return <li className='active' key={index} onClick={() => setPlayUrl(data.video720)}>{data.episodeNumber + '. ' + data.episodeTitle }</li>
                                //
                            })}
                        </ul>
                    </div>
                    
                    </div>
                </div>
        </div>
    </div>
    </>
    
  )
}

export default SeriesPage