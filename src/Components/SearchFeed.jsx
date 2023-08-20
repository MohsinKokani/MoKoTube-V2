import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Feed, Loader } from '.';
const SearchFeed = ({ handleApiCall, handleScroll }) => {
    const { searchedTerm } = useParams();
    const [searchedVideos, setSearchedVideo] = useState([]);
    const [searcedVideoToken, setSearchedVideoToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showFilters, setShowFilters] = useState(false);
    const [type, setType] = useState('All');
    const [duration, setDuration] = useState('Any');
    const [features, setFeatures] = useState('All');
    const [uploadDate, setUploadDate] = useState('Anytime');
    const [sortBy, setSortBy] = useState('relevance');

    const searchFieldInput = document.querySelector('.searchField input');
    if (searchFieldInput !== null) {
        searchFieldInput.value = searchedTerm;
    }

    useEffect(() => {
        setLoading(true);
        setSearchedVideo([])
        handleApiCall(`search?query=${searchedTerm}`, setSearchedVideo, setSearchedVideoToken, setLoading);
        // eslint-disable-next-line
    }, [searchedTerm]);

    let reference = {
        lock: 1
    }
    const atScrollEnd = () => {
        //lock variable is a LOCK to prevent race condition. (hapens when user hits bottom twice before it loads)
        if (
            (window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight >= 0.9 &&
            reference.lock
        ) {
            reference.lock = 0;//close the lock
            setLoading(true);
            handleScroll(setSearchedVideo, setSearchedVideoToken, `search?query=${searchedTerm}&token=${searcedVideoToken}`, setLoading, reference);
        }
    }

    useEffect(() => {
        if (searcedVideoToken === '') {
            window.removeEventListener('scroll', atScrollEnd);
            return;
        }
        window.addEventListener('scroll', atScrollEnd);
        return () => {
            window.removeEventListener('scroll', atScrollEnd);
        }
        // eslint-disable-next-line
    }, [searcedVideoToken, searchedTerm]);
    const applyFilters = () => {
        setSearchedVideo({})
        setLoading(true)
        let query = "";
        query += type === 'All' ? '' : `&type=${type}`;
        query += duration === 'Any' ? '' : `&duration=${duration}`;
        query += features === 'All' ? '' : `&features=${features}`;
        query += uploadDate === 'Anytime' ? '' : `&upload_date=${uploadDate}`;
        query += `&sort_by=${sortBy}`;
        handleApiCall(`search?query=${searchedTerm}${query}`, setSearchedVideo, setSearchedVideoToken, setLoading);
        setShowFilters(false);
    }
    return (
        <>
            {
                showFilters &&
                <>
                    <div className="overlay"></div>
                    <div className='filterContainer'>
                        <i className="fa-solid fa-xmark top_right"
                            style={{ fontSize: '2rem', right: '2rem', top: '2rem' }}
                            onClick={() => setShowFilters(false)}></i>
                        <div className="sortBy-btn">
                            Type : &nbsp;
                            &nbsp; {type} ▼
                            <div className="options top_right">
                                <p onClick={() => setType('All')}>All</p>
                                <p onClick={() => setType('video')}>Video</p>
                                <p onClick={() => setType('channel')}>Channel</p>
                                <p onClick={() => setType('playlist')}>Playlist</p>
                                <p onClick={() => setType('movie')}>Movie</p>
                                <p onClick={() => setType('show')}>Show</p>
                            </div>
                        </div>
                        <div className="sortBy-btn">
                            Duration : &nbsp;
                            &nbsp; {duration} ▼
                            <div className="options top_right">
                                <p onClick={() => setDuration('Any')}>Any</p>
                                <p onClick={() => setDuration('short')}>Short</p>
                                <p onClick={() => setDuration('medium')}>Medium</p>
                                <p onClick={() => setDuration('long')}>Long</p>
                            </div>
                        </div>
                        <div className="sortBy-btn">
                            Features : &nbsp;
                            &nbsp; {features} ▼
                            <div className="options top_right">
                                <p onClick={() => setFeatures('All')}>All</p>
                                <p onClick={() => setFeatures('HD')}>HD</p>
                                <p onClick={() => setFeatures('subtitles')}>subtitles</p>
                                <p onClick={() => setFeatures('CCommons')}>CCommons</p>
                                <p onClick={() => setFeatures('3D')}>3D</p>
                                <p onClick={() => setFeatures('Live')}>Live</p>
                                <p onClick={() => setFeatures('Purchased')}>Purchased</p>
                                <p onClick={() => setFeatures('4K')}>4K</p>
                                <p onClick={() => setFeatures('360')}>360</p>
                                <p onClick={() => setFeatures('Location')}>Location</p>
                                <p onClick={() => setFeatures('HDR')}>HDR</p>
                                <p onClick={() => setFeatures('VR180')}>VR180</p>
                            </div>
                        </div>
                        <div className="sortBy-btn">
                            Upload Date: : &nbsp;
                            &nbsp; {uploadDate} ▼
                            <div className="options top_right">
                                <p onClick={() => setUploadDate('Anytime')}>Anytime</p>
                                <p onClick={() => setUploadDate('hour')}>Hour</p>
                                <p onClick={() => setUploadDate('today')}>Today</p>
                                <p onClick={() => setUploadDate('week')}>Week</p>
                                <p onClick={() => setUploadDate('month')}>Month</p>
                                <p onClick={() => setUploadDate('year')}>Year</p>
                            </div>
                        </div>
                        <div className="sortBy-btn">
                            Sort By : &nbsp;
                            &nbsp; {sortBy} ▼
                            <div className="options top_right">
                                <p onClick={() => setSortBy('relevance')}>Relevance</p>
                                <p onClick={() => setSortBy('rating')}>rating</p>
                                <p onClick={() => setSortBy('date')}>Date</p>
                                <p onClick={() => setSortBy('views')}>Views</p>
                            </div>
                        </div>
                        <button className="applyFilter-btn" onClick={() => { applyFilters() }}>Apply</button>

                    </div>
                </>
            }
            <div className="sortBy-btn" onClick={() => setShowFilters(true)}>
                <i className="fa-solid fa-arrow-down-wide-short">&nbsp; Set Filters ▼ </i>
            </div>
            <Feed videos={searchedVideos} />
            <div className="bottomLoader">
                {
                    (loading) &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
                {
                    (!loading && searchedVideos.data?.length === 0) &&
                    <h2>No Videos Found</h2>
                }
            </div>
        </>
    )
}
export default SearchFeed;