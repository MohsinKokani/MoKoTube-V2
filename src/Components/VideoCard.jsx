import { Link } from 'react-router-dom';
import { myImg } from ".";
import React from "react";
// import { uploadedTime } from '../utils/Formatter.js';

const VideoCard = ({ video, hideAuthor }) => {
    const addToHistory = () => {
        let watched = [];
        let localStorageVideos = localStorage.getItem("watchedVideos");
        if (localStorageVideos === null || localStorageVideos === "null") {
            watched.push(video);
            localStorage.setItem('watchedVideos', JSON.stringify(watched));
            return;
        }
        else {
            watched = JSON.parse(localStorageVideos);
        }

        let videoIndex = watched.findIndex(element => element.videoId === video.videoId);
        if (videoIndex !== -1) 
            watched.splice(videoIndex, 1);
        
        watched.push(video);
        localStorage.setItem('watchedVideos', JSON.stringify(watched));
    }
    return (

        <>
            <Link to={`/video/${video.videoId}`}>
                <div className="thumbnail" key={video.videoId} onClick={addToHistory}>
                    <img src={video?.thumbnail?.[0]?.url} alt="Thumbnail" />
                    <span className='timeStamp'>{video.lengthText}</span>
                </div>
            </Link>
            <div className="details">
                {
                    !hideAuthor &&
                    <div className="author">
                        <Link to={`/channel/${video?.channelId}`}>
                            <img src={video.channelThumbnail?.[0].url || myImg} alt="author" />
                        </Link>
                    </div>
                }
                <div className="title">
                    <h3>
                        {video.title}
                    </h3>
                    <Link to={`/channel/${video.channelId}`} style={{ textDecoration: "none" }}>
                        <b>
                            {video.channelTitle}
                        </b>
                    </Link>
                    <span>{ video.viewCount ? parseInt(video.viewCount).toLocaleString() + " views" : video.viewCountText} • {video.publishedTimeText || video.publishedText}</span>
                </div>
            </div>
        </>
    )
}
export default VideoCard;