import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { Feed, Loader } from '.';
import { formatedTime, uploadedTime } from "../utils/Formatter.js";

const VideoDetails = ({ handleApiCall, handleScroll }) => {
    const { id } = useParams();
    const [relatedVideos, setRelatedvideos] = useState([]);
    const [videoDetails, setVideoDetails] = useState({});
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    
    useEffect(() => {
        // Scroll to top when video ID changes
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        setLoading(true)
        setRelatedvideos([]);
        handleApiCall(`video?id=${id}`
            , setVideoDetails
            , undefined
            , setLoading);
        handleApiCall(`related?id=${id}`
            , setRelatedvideos
            , setNextPageToken
            , setLoading);
        // eslint-disable-next-line
    }, [id])
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
            handleScroll(setRelatedvideos, setNextPageToken, `related?id=${id}&token=${nextPageToken}`, setLoading, reference);
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
    if (videoDetails === undefined) return;
    return (
        <>
            <div className="container">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                </iframe>
            </div>
            {
                !loading &&
                Object.keys(videoDetails).length === 0 &&
                <h2>Unable to Load Video Details</h2>
            }
            {
                videoDetails.id &&
                <div className="moreDetails">
                    <h5>{videoDetails?.title}</h5>
                    <p>
                        <Link to={`/channel/${videoDetails?.channelId}`} className="handleLongName">
                            {videoDetails?.channelTitle}
                        </Link> •&nbsp;
                        {parseInt(videoDetails?.viewCount).toLocaleString()} views •&nbsp;
                        {uploadedTime(videoDetails?.uploadDate)} ago &nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                        <span>
                            {
                                videoDetails.isLive &&
                                <>Live</>
                            }
                            {
                                formatedTime(videoDetails.lengthSeconds) || ''
                            }
                        </span>
                        {
                            videoDetails.description &&
                            <button id="description-btn" onClick={() => { setShowDescription(!showDescription) }}>
                                Description <span style={{ transform: showDescription ? 'rotate(180deg)' : '' }}>🔻</span>
                            </button>
                        }
                    </p>
                    <pre className="description-box" style={{ display: showDescription ? 'block' : 'none' }}>
                        {videoDetails.description}
                    </pre>
                </div>
            }
            <Feed videos={relatedVideos} />
            <div className="bottomLoader">
                {
                    (loading) &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
                {
                    (!loading && relatedVideos.length === 0) &&
                    <h2>No Videos Foun</h2>
                }
            </div>
        </>
    )
}


export default VideoDetails;