import { useState } from "react";
import { PlaylistCard } from ".";
import VideoCard from "./VideoCard";

const History = () => {
    const [watchedVideos, setWatchedVideos] = useState(JSON.parse(localStorage.getItem('watchedVideos')));
    if (watchedVideos === null || watchedVideos.length === 0) {
        return <h1 style={{ color: "#00da24", marginLeft: '15rem' }}>No videos in History</h1>
    }
    return (
        <>
            <button id="clear-btn" onClick={() => { localStorage.setItem('watchedVideos', null); setWatchedVideos([]) }}>Clear All <i className="fa-solid fa-trash"></i></button>
            <div className="videos">
                {
                    watchedVideos?.reverse()?.map((video, idx) => (
                        <div className="video" key={idx}>
                            {video.type === "video" && <VideoCard video={video} />}
                            {video.type === "playlist" && <PlaylistCard playlist={video} />}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default History;