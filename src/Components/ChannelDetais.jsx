import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Loader, ChannelAbout, VideoCard } from '.';
const ChannelDetails = ({ handleApiCall, handleScroll }) => {
    const { id } = useParams();
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setloading] = useState(false);
    const [channelPage, setChannelPage] = useState({});
    const [channelVideos, setChannelVideos] = useState({});
    const [showSection, setShowSection] = useState('Videos');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        setloading(true);
        handleApiCall(`channel?id=${id}`, setChannelPage, undefined, setloading);
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setloading(true);
        setChannelVideos({})
        handleApiCall(`channel?id=${id}&sort_by=${sortBy}`, setChannelVideos, undefined, setloading);
        // eslint-disable-next-line
    }, [sortBy])

    let reference = {
        lock: 1
    }
    const atScrollEnd = () => {
        if (
            showSection === "Videos" && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 15 &&
            reference.lock
        ) {
            reference.lock = 0;//close the lock
            setloading(true);
            handleScroll(setChannelPage, setNextPageToken, `channel?id=${id}&token=${nextPageToken}&sort_by=${sortBy}`, setloading, reference)
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
    }, [nextPageToken, showSection]);

    if (Object.keys(channelPage).length === 0 || !channelPage.meta) {
        return (
            <div className="bottomLoader">
                <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
            </div>
        );
    }
    return (
        <>
            <div className="channelBanner"
                style={{ background: `url(${channelPage?.meta?.image.banner?.[1].url})` }}
            >
            </div>
            <div className="channelDetailHeader">
                <div className="channelImage"
                    style={{ backgroundImage: `url(${channelPage?.meta.thumbnail?.[2].url})` }}
                >
                </div>
                <div className="moreDetails">
                    <h5 style={{ overflowWrap: 'unset', overflow: 'auto' }}>
                        {channelPage?.meta.title}
                    </h5>
                    <p>
                        <strong className='handleLongName'>{channelPage?.meta.title}</strong>
                        &nbsp;&nbsp;&nbsp;
                        <strong>{channelPage.meta.subscriberCount} subscribers</strong>
                    </p>
                    <p>
                        {channelPage?.meta.description.slice(0, 55)}...&nbsp;&nbsp;
                        <i className="fa-solid fa-angle-right" onClick={() => { setShowSection("About") }}></i>
                    </p>
                </div>
            </div>
            <div className="train">
                <div
                    className="coach"
                    onClick={() => { setShowSection("Videos") }}
                    style={{ background: showSection === "Videos" && "#fc1503" }}
                >
                    Videos
                </div>
                <div
                    className="coach"
                    onClick={() => { setShowSection("About") }}
                    style={{ background: showSection === "About" && "#fc1503" }}
                >
                    About
                </div>
            </div>
            {
                showSection === "Videos" &&
                <>
                    <div className="sortBy-btn">
                        <i className="fa-solid fa-arrow-down-wide-short">&nbsp; {sortBy} ▼ </i>
                        <div className="options">
                            <p onClick={() => setSortBy('popular')}>Most Popular</p>
                            <p onClick={() => setSortBy('oldest')}>Oldest</p>
                            <p onClick={() => setSortBy('newest')}>Newest</p>
                        </div>
                    </div>
                    <div className="videos">
                        {
                            channelVideos?.data?.map((video, idx) => (
                                <div className="video" key={idx}>
                                    <VideoCard video={video} hideAuthor={true} />
                                </div>
                            ))
                        }
                    </div>
                </>
            }
            {
                showSection === "About" &&
                <ChannelAbout channelPage={channelPage} />
            }
            <div className="bottomLoader">
                {
                    showSection === "Videos" && loading &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
            </div>
        </>
    )
}
export default ChannelDetails;