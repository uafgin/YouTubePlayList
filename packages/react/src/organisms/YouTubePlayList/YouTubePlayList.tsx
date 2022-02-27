import React, { useState, useEffect } from "react";
import { ServiceApi } from '@ds.e/services';
import VideoPlayer from "../../atoms/VideoPlayer";
import Padding from "../../atoms/Padding";
import FlexContainer from "../../atoms/FlexContainer";
import YouTubeList from "../../molecules/YouTubeList";
import openSocket from 'socket.io-client';

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

const YouTubePlayList = () => {
    const serviceApi = ServiceApi.getInstance();
    const [playListObject, setPlayListObject] = useState({
        playList: new Map(),
        currentPlaying: ''
    });
    
    const onVideoPush = (data: YouTubeItemProps) => {
        setPlayListObject(prevState => {
            const clonedList = new Map(prevState.playList);
            clonedList.set(data.videoId, data);
            return {
                playList: clonedList,
                currentPlaying: prevState.currentPlaying
            };
        })
    }

    useEffect(() => {
        const socket = openSocket('http://localhost:3001');
        socket.on('list', data => {
            if (data.action === 'addVideo') {
                onVideoPush(data.list);
            }
        });
        (async () => {
            const result = await serviceApi.getAllListItems();
            if (!result) return;
            setPlayListObject({
                playList: result,
                currentPlaying: result.keys().next().value
            });
        })();
    }, []);

    const onVideoAdded = (item: YouTubeItemProps) => {
        console.log(item);
        serviceApi.addItem(item);
        setPlayListObject(prevState => {
            const clonedList = new Map(prevState.playList);
            clonedList.set(item.videoId, item);
            return {
                playList: clonedList,
                currentPlaying: prevState.currentPlaying ? prevState.currentPlaying : clonedList.keys().next().value
            }
        });
    }

    const onVideoEnded = () => {
        setPlayListObject(prevState => {
            const clonedList = new Map(prevState.playList);
            clonedList.delete(prevState.currentPlaying);
            return {
                playList: clonedList,
                currentPlaying: clonedList.keys().next().value
            }
        });
    }

    const onVideoSelected = (id:string) => setPlayListObject(prevState => ({ playList: prevState.playList, currentPlaying: id }));

    const onSortEnded = (arrayList:Array<YouTubeItemProps>) => {
        setPlayListObject(prevState => {
            const clonedList = arrayList.reduce((a: any,b: any) => {
                a = a || {};
                a[b.videoId] = b;
                return a;
            }, {});
            return {
                playList: new Map(Object.entries(clonedList)),
                currentPlaying: prevState.currentPlaying
            };
        });

    }

    return <div className="dse-youtube-playlist-container"> 
        <Padding cssClass="dse-dimention-inheritance" space='xxxl'>
            <FlexContainer width='10b' height='8b'>
                <YouTubeList items={playListObject.playList} onVideoAdded={onVideoAdded} onVideoSelected={onVideoSelected} onSortEnded={onSortEnded} />
                <VideoPlayer containerClassName='dse-videoplayer-container' videoId={playListObject.currentPlaying} opts={ { playerVars: { autoplay: 1 }, height:'100%', width:'100%' }} onEnd={onVideoEnded} />
            </FlexContainer>
        </Padding>
    </div>
}

export default YouTubePlayList;