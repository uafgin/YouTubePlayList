import axios, {AxiosInstance} from 'axios';
import {SERVICE_API_URL} from './constants';

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

class ServiceApi {
    http: AxiosInstance;
    static instance: ServiceApi;
    constructor() {
        if (ServiceApi.instance) {
            throw new Error('instance already exists');
        }
        ServiceApi.instance = this;
        this.init();
    }

    init = () => {
        this.http = axios.create({
            baseURL: SERVICE_API_URL
        });
    }

    addItem = async (item: YouTubeItemProps) => await this.http.post('/playlist/list', item);

    getAllListItems = async () => {
        const result = await this.http.get('/playlist/list');
        if (result.status !== 200) {
            throw new Error(result.data);
        }
        if (result.data.totalItems === 0) {
            return null;
        }
        const parsedResult = result.data.lists.reduce((a: any,b: any) => {
            a = a || {};
            a[b.videoId] = b;
            return a;
        }, {});

        return new Map(Object.entries(parsedResult));
    }

    static getInstance = () => {
        if (ServiceApi.instance) {
            return ServiceApi.instance;
        }
        return new ServiceApi();
    } 

}

export default ServiceApi;