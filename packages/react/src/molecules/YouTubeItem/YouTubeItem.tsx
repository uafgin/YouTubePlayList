import Image from '../../atoms/Image';
import React from "react";
import Padding from "../../atoms/Padding";
import Text from "../../atoms/Text";
import Margin from "../../atoms/Margin";

interface ImageDetails {
    url: string;
    width: number;
    height: number;
}

interface YouTubeItemProps {
    image: ImageDetails | undefined;
    title: string | undefined;
    channelTitle: string | undefined;
    videoId: string | undefined;
    onClick?: Function;
}

const YouTubeItem : React.FC<YouTubeItemProps> = ({image, title, channelTitle, videoId, onClick}) => {
    return <div className="dse-youtube-item" onClick={() => onClick && onClick(videoId)}>
        <div> 
            <Image src={image?.url} width={image?.width} height={image?.height} />
        </div>
        <Padding left={true} space='xxs'>
            <Margin top={true} space='xxs'>
                <Text data-testid='dseTitle' size='sm'>{title}</Text>    
            </Margin>
            <Margin cssClass="dse-youtube-item__channel-title" top={true} space='xs'>
                <Text data-testid='dseChannelTitle' size='xs'>{channelTitle}</Text> 
            </Margin>
        </Padding>
    </div>
}

export default YouTubeItem;