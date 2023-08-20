import React from "react";
import {VideoCard,ChannelCard,PlaylistCard} from ".";


const CategoryFeed = ({ videos }) => {
    return (
        <div className="videos">
            {
                videos?.data?.map((video,idx) => (
                    <div className="video" key={idx}>
                        {video.type==="video" && <VideoCard video={video} />}
                        {video.type==="channel" && <ChannelCard channel={video} />}
                        {video.type==="playlist" && <PlaylistCard playlist={video} />}
                    </div>
                ))
            }
        </div>

    )
}
export default CategoryFeed;