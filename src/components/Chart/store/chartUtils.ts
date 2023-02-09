import axios from "axios";

export enum Period {
    TopToday = "TopToday",
    TopAllTime = "TopAllTime",
    New = "New",
    Search = "Search"
}

export enum ChartType {
    Tracks = "Tracks",
    Albums = "Albums",
    Album = "Album",
    AlbumImages = "AlbumImages",
    AlbumTracks = "AlbumTracks",
    Artists = "Artists",
    SearchTracks = "SearchTracks" ,
    SearchAlbums = "SearchAlbums"
}

let createUrl = (chartType: ChartType, selectedPeriod: Period, page: number, albumsIds?: string) => {
    const API_KEY = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    let main = ''
    let range = ''
    let limitOffset = ''
    if (chartType === ChartType.Tracks) {
        if (selectedPeriod === Period.TopToday) {
            main = '/v2.0/tracks/top'
            limitOffset = `&limit=20&offset=${(page - 1) * 20}`
        }
        if (selectedPeriod === Period.TopAllTime) {
            main = '/v2.2/tracks/top'
            range = '&range=life'
            limitOffset = `&limit=20&offset=${(page - 1) * 20}`
        }
    }
    if (chartType === ChartType.Albums) {
        if (selectedPeriod === Period.New) {
            main = '/v2.2/albums/new'
            limitOffset = `&limit=20&offset=${(page - 1) * 20}`
        }
        if (selectedPeriod === Period.TopToday) {
            main = '/v2.0/albums/top'
            range = '&range=day'
            limitOffset = `&limit=20&offset=${(page - 1) * 20}`
        }
        if (selectedPeriod === Period.TopAllTime) {
            main = '/v2.2/albums/top'
            range = '&range=life'
            limitOffset = `&limit=20&offset=${(page - 1) * 20}`
        }
    }
    if (chartType === ChartType.AlbumImages) {
        main = `/v2.2/albums/${albumsIds}/images`
    }
    if (chartType === ChartType.AlbumTracks) {
        main = `/v2.2/albums/${albumsIds}/tracks`
    }
    if (chartType === ChartType.Album) {
        main = `/v2.2/albums/${albumsIds}`
    }
    if (chartType === ChartType.SearchTracks) {
        main = `/v2.2/search`
        range = `&query=${albumsIds}&type=track`
    }
    if (chartType === ChartType.SearchAlbums) {
        main = `/v2.2/search`
        range = `&query=${albumsIds}&type=album`
    }

    return `https://api.napster.com${main}?apikey=${API_KEY}${range}${limitOffset}`
}

export let chartUtils = {
    getImage: (images: any, size: number, albumId: string) => {
        for (let i = 0; i < images.length; i++) {
            let item = images[i]
            if (item.contentId === albumId && item.width === size) return item.url
        }
        return ''
    },

    getTopTracks: async (period: Period, page: number) => {
        let response = await axios.get(createUrl(ChartType.Tracks, period, page))
        let topTracks = response.data.tracks

        let albumsIds = ''
        topTracks.map((track: any, index: number) => {
            albumsIds += track.albumId
            if (index !== topTracks.length - 1) albumsIds += ','
        })

        let imagesResponse = await axios.get(createUrl(ChartType.AlbumImages, period, page, albumsIds))

        return [topTracks, imagesResponse.data.images]
    },

    getTopAlbums: async (period: Period, page: number) => {
        let response = await axios.get(createUrl(ChartType.Albums, period, page))
        let topAlbums = response.data.albums

        let albumsIds = ''
        topAlbums.map((album: any, index: number) => {
            albumsIds += album.id
            if (index !== topAlbums.length - 1) albumsIds += ','
        })

        let imagesResponse = await axios.get(createUrl(ChartType.AlbumImages, period, page, albumsIds))
        return [topAlbums, imagesResponse.data.images]
    },

    getAlbumTracks: async (albumId: string) => {
        let response = await axios.get(createUrl(ChartType.AlbumTracks, Period.New, -1, albumId))
        return response.data.tracks
    },

    getAlbumById: async (albumId: string) => {
        let response = await axios.get(createUrl(ChartType.Album, Period.New, -1, albumId))

        let imagesResponse = await axios.get(createUrl(ChartType.AlbumImages, Period.New, -1, albumId))

        return [response.data.albums[0], imagesResponse.data.images]
    },

    searchTracks: async (searchValue: string) => {
        let response = await axios.get(createUrl(ChartType.SearchTracks, Period.Search, -1, searchValue))
        let tracks = response.data.search.data.tracks

        let albumsIds = ''
        tracks.map((track: any, index: number) => {
            albumsIds += track.albumId
            if (index !== tracks.length - 1) albumsIds += ','
        })

        let imagesResponse = await axios.get(createUrl(ChartType.AlbumImages, Period.Search, -1, albumsIds))

        return [tracks, imagesResponse.data.images]
    },
    searchAlbums: async (searchValue: string) => {
        let response = await axios.get(createUrl(ChartType.SearchAlbums, Period.Search, -1, searchValue))

        let albums = response.data.search.data.albums

        let albumsIds = ''
        albums.map((album: any, index: number) => {
            albumsIds += album.id
            if (index !== albums.length - 1) albumsIds += ','
        })

        let imagesResponse = await axios.get(createUrl(ChartType.AlbumImages, Period.Search, -1, albumsIds))

        return [albums, imagesResponse.data.images]
    }
}
