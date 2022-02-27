import React, { useState } from "react";
import SortableList from "../../atoms/SortableList";
import Input from "../../atoms/Input";
import Button from '../../atoms/Button';
import Margin from "../../atoms/Margin";
import Padding from "../../atoms/Padding";
import FlexContainer from "../../atoms/FlexContainer";
import YouTubeItem from "../YouTubeItem";
import { SortEnd } from "react-sortable-hoc";
import { VideoApi } from '@ds.e/services';
import { YOUTUBE_API_KEY, blocks } from '@ds.e/foundations';

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

interface YouTubeListProps {
    items: Map<string, YouTubeItemProps>;
    onVideoAdded?: Function;
    onVideoSelected?: Function;
    onSortEnded?: Function;
    width?: keyof typeof blocks;
    height?: keyof typeof blocks;
}

const YouTubeList: React.FC<YouTubeListProps> = ({items, onVideoAdded, onVideoSelected, onSortEnded, width = '4b', height = '10b'}) => {
    const className = `dse-dimention_height_${height} dse-dimention_width_${width}`;
    const apiInstance = VideoApi.getInstance(YOUTUBE_API_KEY);
    const [item, setItem] = useState('');

    const onSortEnd = ({oldIndex, newIndex}: SortEnd) => {
        if (!onSortEnded) return;
        let arrayList = Array.from(items.values());
        const splicedItem = arrayList.splice(oldIndex,1);
        arrayList = [...arrayList.slice(0, newIndex), ...splicedItem, ...arrayList.slice(newIndex)];
        onSortEnded(arrayList);
    }

    const onInputTextChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setItem(e.target.value);
    }

    const itemStructure = (value: YouTubeItemProps, DrugHandler: React.ComponentClass) => {
        return <li key={value.videoId}>
            <FlexContainer verticalCenter={true}>
                <DrugHandler />
                <YouTubeItem {...value} onClick={onVideoSelected} />
            </FlexContainer>
        </li>
    }

    const onAddVideo = async () => {
        const url = new URL(item);
        const videoId = new URLSearchParams(url.search).get('v') || '';
        if (items.get(videoId) || !onVideoAdded) {
            return;
        }

        const result = await apiInstance.getVideoInformation(videoId);
        const listItem: YouTubeItemProps = {
            image: result.response?.items[0].snippet.thumbnails.default,
            title: result.response?.items[0].snippet.localized.title,
            channelTitle:  result.response?.items[0].snippet.channelTitle,
            videoId: videoId
        }
        onVideoAdded(listItem);
        setItem('');
    }

    return <Padding cssClass={className} right={true} space='lg'>
        <div className="dse-youtube-list_inputs">
            <Margin cssClass="dse-youtube-list_input_width" right={true} space='xs'>
                <Input type='text' size='lg' placeHolder="youtube url" value={item} onChange={onInputTextChange} />
            </Margin>            
            <Button title="add" onClick={onAddVideo} fontSize='base' />
        </div>
        <Margin cssClass="dse-youtube-list_playlist-box" top={true} space='xs'>
            <SortableList items={Array.from(items.values())} itemStructure={itemStructure} sortableOptions={{ onSortEnd, useDragHandle:true, helperClass:"dse-youtube-list_dragplaceholder" }} />
        </Margin>
    </Padding>
}

export default YouTubeList;