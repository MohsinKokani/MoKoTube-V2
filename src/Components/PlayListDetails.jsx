import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Loader, myImg, nullImg } from ".";


const PlayListDetails = ({ handleApiCall, handleScroll }) => {
    const { id } = useParams();
    const [playlistVideos, setPlayListVideos] = useState([]);
    const [curIdx, setCurIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [nextPageToken, setNextPageToken] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        handleApiCall(`playlist?id=${id}`, setPlayListVideos, setNextPageToken, setLoading);
        // eslint-disable-next-line
    }, [id]);

    let reference = {
        lock: 1
    }
    const atScrollEnd = () => {
        //lock variable is a LOCK to prevent race condition. (hapens when user hits bottom twice before it loads)
        if (
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 15 &&
            reference.lock
        ) {
            reference.lock = 0;//close the lock
            setLoading(true);
            handleScroll(setPlayListVideos, setNextPageToken, `playlist?id=${id}&token=${nextPageToken}`, setLoading, reference);
        }
    }

    useEffect(() => {
        if (nextPageToken === '') {
            window.removeEventListener('scroll', atScrollEnd);
            return;
        }
        window.addEventListener('scroll', atScrollEnd);
        return () => {
            window.removeEventListener('scroll', atScrollEnd);
        }
        // eslint-disable-next-line
    }, [nextPageToken]);

    if (Object.keys(playlistVideos).length === 0 || playlistVideos?.data?.length === 0) {
        return (
            <div className="bottomLoader">
                <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
            </div>
        );
    }
    return (
        <>
            <div className="container">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${playlistVideos.data?.[curIdx]?.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                </iframe>
            </div>
            <div className="details moreDetails">
                <div className="author">
                    <Link to={`/channel/${playlistVideos.meta?.channelId}`}>
                        <img src={playlistVideos.meta.avatar?.[0].url || myImg} alt="author" />
                    </Link>
                </div>
                <div className="title">
                    <h5>{playlistVideos.data?.[curIdx]?.title}</h5>
                    <p style={{ paddingBottom: '1rem' }}>
                        <Link to={`/channel/${playlistVideos.data?.[curIdx].videoOwnerChannelId}`} className="handleLongName">
                            {playlistVideos.data?.[curIdx].videoOwnerChannelTitle}
                        </Link> •&nbsp;
                        <>{playlistVideos.data?.[curIdx].videoInfo}</>&nbsp;
                    </p>
                    <p>
                        <span>{playlistVideos.data?.[curIdx].lengthText}</span>
                        {
                            playlistVideos.meta?.description &&
                            <button id="description-btn" onClick={() => { setShowDescription(!showDescription) }}>
                                Description <span style={{ transform: showDescription ? 'rotate(180deg)' : '' }}>🔻</span>
                            </button>
                        }
                    </p>
                    <pre className="description-box" style={{ display: showDescription ? 'block' : 'none' }}>
                        {playlistVideos.meta?.description}
                    </pre>
                </div>
            </div>
            <div className="playlist-controls">
                <i
                    onClick={(curIdx === 0) ? () => { } : () => { setCurIdx(curIdx - 1) }}
                    style={{ opacity: (curIdx === 0) ? '0.2' : '1' }}
                    className="fa-solid fa-backward-step">
                </i>
                &nbsp; {curIdx + 1} &nbsp;
                <i
                    onClick=
                    {
                        (curIdx === playlistVideos.data.length - 1) ?
                            () => { } : () => { setCurIdx(curIdx + 1) }
                    }
                    style={{ opacity: (curIdx === playlistVideos.data.length - 1) ? '0.2' : '1' }}
                    className="fa-solid fa-forward-step"></i>
            </div>
            {
                playlistVideos.data.map((video, idx) => {
                    return (
                        <div
                            className="singlePlaylistVideo"
                            key={idx}
                            onClick={() => { setCurIdx(idx) }}
                            style={{ border: idx === curIdx && '2px solid royalblue' }}
                        >
                            <img src={video.thumbnail?.[0].url || nullImg} alt="thumb" />
                            <div className="moreDetails" style={{ width: '72%' }}>
                                <h5>{video.title}</h5>

                                <p style={{ paddingBottom: '1rem' }}>
                                    {video.videoOwnerChannelTitle} • {video.videoInfo}&nbsp;&nbsp;&nbsp;&nbsp;
                                </p>
                            </div>
                        </div>

                    )
                })
            }
            <div className="bottomLoader">
                {
                    (loading) &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
                {
                    (!loading && playlistVideos.length === 0) &&
                    <h2>No Videos Found</h2>
                }
            </div>
        </>
    )
}
export default PlayListDetails