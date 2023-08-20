
import { Link } from "react-router-dom";
import { myImg } from ".";
const PlaylistCard = ({ playlist }) => {
    const addToHistory = () => {
        let watched = [];
        let localStorageVideos = localStorage.getItem("watchedVideos");
        if (localStorageVideos === null || localStorageVideos === "null") {
            watched.push(playlist);
            localStorage.setItem('watchedVideos', JSON.stringify(watched));
            return;
        }
        else {
            watched = JSON.parse(localStorageVideos);
        }
        let isUnique = true;
        watched.forEach((element) => {
            if (element.playlistId === playlist.playlistId) isUnique = false;
        })
        if (!isUnique) return;
        watched.push(playlist);
        localStorage.setItem('watchedVideos', JSON.stringify(watched));
    }
    return (
        <>
            <Link to={`/playlist/${playlist.playlistId}`}>
                <div className="thumbnail" key={playlist.playlistId} onClick={addToHistory}>
                    <img src={playlist.thumbnail?.[0].url} alt="playlist" />
                    <div className="overlay-playlist-icon">
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                </div>
            </Link>
            <div className="details">
                <div className="author">
                    <Link to={`/channel/${playlist.channelId}`}>
                        <img src={playlist.channelThumbnail?.[0].url || myImg} alt="auth" />
                    </Link>
                </div>
                <div className="title">
                    <h3>
                        Playlist - {playlist.title}
                    </h3>
                    <Link to={`/channel/${playlist.channelId}`} style={{ textDecoration: "none" }}>
                        <b>
                            {playlist.channelTitle}
                        </b>
                    </Link>
                    <span> {playlist.videoCount} videos</span>
                </div>
            </div>
        </>
    )
}
export default PlaylistCard;