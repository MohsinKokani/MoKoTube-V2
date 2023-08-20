
import React, { useEffect, useState } from "react";
import { Feed, Loader } from './';
let categories = [
    'Shorts',
    'Live',
    'Music',
    'Cricket',
    'News',
    'Comedy',
    'Science',
    'Gaming',
    'Stand up comedy',
    'Travel',
    'Cooking',
    'Meditation',
    'Technology',
    'Weather',
    'Sports',
    'Podcast',
    'Cartoons'
]

const HorizontalNav = ({ handleApiCall, handleScroll }) => {
    const [category, setCategory] = useState('%23');
    const [categoryVideos, setCategoryVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setCategoryVideos([]);
        handleApiCall(`search?query=${category}`, setCategoryVideos, setNextPageToken, setLoading);
        // eslint-disable-next-line
    }, [category]);
    useEffect(() => {
        document.querySelector('.searchField > input').value = '';
        const handleTrain = (e) => {
            const container = document.querySelector(".train");
            if (e.deltaY > 0)
                container.scrollLeft += 100;
            else
                container.scrollLeft -= 100;
            e.preventDefault();
        }
        //for horizontal scroll 
        const container = document.querySelector(".train");
        container.addEventListener("wheel", handleTrain);
        return () => {
            container.removeEventListener('wheel', handleTrain);
        }
    }, []);

    let reference = {
        lock: 1
    }
    const atScrollEnd = () => {
        if (
            (window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight >= 0.9 && reference.lock
        ) {
            reference.lock = 0;//close the lock
            setLoading(true);
            handleScroll(setCategoryVideos, setNextPageToken, `search?query=${category}&token=${nextPageToken}`, setLoading, reference);
        }
    }
    useEffect(() => {
        if (nextPageToken === undefined) {
            window.removeEventListener('scroll', atScrollEnd);
            return;
        }
        window.addEventListener('scroll', atScrollEnd);
        return () => {
            window.removeEventListener('scroll', atScrollEnd);
        }
        // eslint-disable-next-line
    }, [nextPageToken, category]);
    return (
        <>
            <div className="train">
                {
                    categories.map((element) =>
                        <div
                            key={element}
                            className="coach"
                            onClick={() => { setCategory(element) }}
                            style={{ background: element === category && "#fc1503" }}
                        >
                            {element}
                        </div>
                    )
                }
            </div>
            <Feed videos={categoryVideos} />
            <div className="bottomLoader">
                {
                    (loading) &&
                    <img src={Loader} alt="Loading" style={{ margin: 'auto', width: '10rem' }} />
                }
                {
                    (!loading && categoryVideos.length === 0) &&
                    <h2>No Videos Found</h2>
                }
            </div>
        </>
    )
}

export default HorizontalNav;