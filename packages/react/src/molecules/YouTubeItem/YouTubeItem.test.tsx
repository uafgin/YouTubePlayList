import React from "react";
import YouTubeItem from "./YouTubeItem";
import { render } from '@testing-library/react';

const moch = {
    "image": {
        "url": "https://i.ytimg.com/vi/l0U7SxXHkPY/default.jpg",
        "width": 120,
        "height": 90
    },
    "title": "Future - Life Is Good (Official Music Video) ft. Drake",
    "channelTitle": "FutureVEVO",
    "videoId": "l0U7SxXHkPY"
};

test('check if props inserted correctly', () => {
    const { getByTestId, getAllByText} = render(<YouTubeItem {...moch} />);
    expect(getByTestId('dseImage').getAttribute('src')).toEqual(moch.image.url);
    expect(getByTestId('dseImage').getAttribute('width')).toEqual("120");
    expect(getByTestId('dseImage').getAttribute('height')).toEqual("90");
    
    expect(getAllByText(moch.title)[0].innerHTML).toEqual("Future - Life Is Good (Official Music Video) ft. Drake");
    expect(getAllByText(moch.channelTitle)[0].innerHTML).toEqual("FutureVEVO");
    
})