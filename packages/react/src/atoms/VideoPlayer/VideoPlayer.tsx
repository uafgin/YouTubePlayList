import React from "react";
import YouTube, { YouTubeProps } from 'react-youtube';


const VideoPlayer: React.FC<YouTubeProps> = (args) => {
    return <YouTube {...args} />
}
export default VideoPlayer;