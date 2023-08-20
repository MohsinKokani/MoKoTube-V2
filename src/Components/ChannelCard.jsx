import { Link } from 'react-router-dom';
import { myImg } from '.';
const ChannelCard = ({ channel }) => (
    <Link to={`/channel/${channel?.channelId}`} style={{ textDecoration: 'none' }}>
        <div className="channel">
            <img
                src={`https:${channel.thumbnail?.[0].url}`}
                alt="Thumbnail"
                onError={(e) => { e.target.onError = null; e.target.src = myImg }}
            />

            <div className="title">
                <h3>
                    {channel.channelTitle}
                </h3>
            </div>
        </div>
    </Link>
)
export default ChannelCard;