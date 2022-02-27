import React from "react";

interface ImageProps {
    src: string | undefined;
    height?: number | undefined;
    width?: number | undefined;
    onError?: Function
}

const Image: React.FC<ImageProps> = ({src, height, width, onError}) => {
    return <img data-testid='dseImage' src={src} width={width} height={height} onError={e => onError && onError(e)} />
}

export default Image;