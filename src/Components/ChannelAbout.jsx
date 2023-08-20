
const ChannelAbout = ({ channelPage }) => {
    if(channelPage===undefined) return;
    return (
        <>
            <div className="channelAbout">
                <div className="channelDescription">
                    <h4>Description</h4>
                    {channelPage.meta.description}
                </div>
                <div className="statistics">
                    <h6>
                        Stats
                    </h6>
                    <p>
                        Subscribers - {channelPage.meta.subscriberCount}
                    </p>
                    <p>
                        Available in {channelPage.meta.availableCountries.length} Countries
                    </p>
                </div>
            </div>
        </>
    )
}

export default ChannelAbout;