import axios, {AxiosInstance} from 'axios';
import { YOUTUBE_API_URL, API_TYPES } from './constants';
import { ApiResponse } from './interfaces';

class VideoApi {
    apiResponse: ApiResponse = {}
    apiKey: string;
    http: AxiosInstance;

    constructor(apiKey: string) {
        if (VideoApi.instance) {
            throw new Error("singleton, you are unable to create more then one instance");
        }
        VideoApi.instance = this;
        this.apiKey = apiKey;
        this.init();
    }

    init = () => {
        this.http = axios.create({
            baseURL: YOUTUBE_API_URL + API_TYPES.VIDEOS,
            params: {
                key: this.apiKey
            }
        });
    }

    static instance: VideoApi;

    static getInstance = (apiKey?: string) => {
        if (VideoApi.instance) {
            return VideoApi.instance;
        }
        if (apiKey) {
            return new VideoApi(apiKey);
        }
        throw new Error("you must enter apikey in the first time");
    } 

     getVideoInformation = async (videoId: string) => {
        const result = await this.http.get('', {
            params: {
                part: 'snippet',
                id: videoId
            }
        });
        const {status, data, statusText} = result;

        this.apiResponse.status = status
        if (status !== 200) {
            this.apiResponse.errorMessage = statusText;
            return this.apiResponse;
        }
        this.apiResponse.response = data;
        return this.apiResponse;
    }
}

export default VideoApi;