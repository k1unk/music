import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import chartAlbums, {IAlbum} from "./store/chartAlbums";
import Album from "./Album";
import {Period} from "./store/chartUtils";
import InfiniteScroll from 'react-infinite-scroller';
import AlbumWithTracks from "./AlbumWithTracks";
import ChartHeader from "./ChartHeader";

const uuid = require('uuid');

const ChartAlbumsPage: FC = observer(() => {
    useEffect(() => {
        chartAlbums.reset()
        void chartAlbums.getTopAlbums(chartAlbums.selectedPeriod)
    }, [])

    let loadMore = () => {
        if (chartAlbums.albumsList.length !== 0)
            void chartAlbums.getMoreAlbums(chartAlbums.selectedPeriod)
    }

    let openAlbum = (album: IAlbum) => {
        void chartAlbums.openAlbum(album)
    }
    let [isSearchOpen, setIsSearchOpen] = useState(false)

    let changeSelectedPeriod = (period: Period) => {
        chartAlbums.setSelectedPeriod(period)
        chartAlbums.setOpenedAlbum(null)
        chartAlbums.setOpenedAlbumTrackList(null)

        if (period === Period.TopToday
            || period === Period.TopAllTime
            || period === Period.New) {
            setIsSearchOpen(false)
            void chartAlbums.getTopAlbums(period)
        }
        if (period === Period.Search) {
            setIsSearchOpen(true)
            chartAlbums.setAlbumsList([])
        }
    }

    let search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            chartAlbums.search()
        }
    }
    let setSearchValue = (searchValue: string) => {
        chartAlbums.setSearchValue(searchValue)
    }
    return (
        <div className="chart-albums-page">
            <div className="albums-previews">

                <ChartHeader
                    title="Best albums"
                    periods={[Period.New, Period.TopToday, Period.TopAllTime, Period.Search]}
                    selectedPeriod={chartAlbums.selectedPeriod}
                    changeSelectedPeriod={changeSelectedPeriod}
                    searchValue={chartAlbums.searchValue}
                    onChange={setSearchValue}
                    onKeyDown={search}
                    isSearchOpen={isSearchOpen}
                />

                {chartAlbums.albumsList.length
                    ?
                    <InfiniteScroll
                        loadMore={loadMore}
                        hasMore={true}
                        loader={<div key={0}> Loading ...</div>}
                        className="infinite-scroll"
                    >
                        <ul className="album-list">
                            {chartAlbums.albumsList.map((album: IAlbum) =>
                                <Album album={album} key={uuid.v4()} openAlbum={openAlbum}/>
                            )}
                        </ul>
                    </InfiniteScroll>
                    : null
                }
            </div>

            <div className="album-with-tracks-item-wrapper">
                <AlbumWithTracks/>
            </div>

        </div>
    );
})

export default ChartAlbumsPage;
