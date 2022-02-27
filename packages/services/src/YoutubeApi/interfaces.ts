export interface ImageDetails {
    url: string;
    width: number;
    height: number;
}

export interface Thumbnails {
    default: ImageDetails;
    medium: ImageDetails;
    high: ImageDetails;
    standard: ImageDetails;
    maxres: ImageDetails;
}

export interface Localized {
    title: string;
    description: string;
}

export interface Snippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: Localized;
}

export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface YoutubeResponse {
    kind: string;
    etag: string;
    items: Item[];
    pageInfo: PageInfo;
}

export interface ApiResponse {
    status?: number;
    errorMessage?: string;
    response?: YoutubeResponse;
}