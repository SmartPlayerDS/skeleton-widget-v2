export interface MediaFile {
    id: number
    name: string
    src: string
    type: string
    folderId?: number | string
    [key: string]: any
}

export interface MediaFileData extends MediaFile {
    data: any
}

export const convertMediaDateToMediaFile = (mediaFilesData: MediaFileData[]): MediaFile[] => {
    return mediaFilesData.map(mediaFileData => ({
        id: mediaFileData.id,
        name: mediaFileData.name,
        src: mediaFileData.src,
        type: mediaFileData.type,
    }))
}