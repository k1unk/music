import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import chartTracks from "./store/chartTracks";
import InfiniteScroll from 'react-infinite-scroller';
import {Period} from "./store/chartUtils";
import TrackList from "./TrackList";
import chartAlbums from "./store/chartAlbums";
import AlbumWithTracks from "./AlbumWithTracks";
import ChartHeader from "./ChartHeader";

const ChartTracksPage: FC = observer(() => {
    useEffect(() => {
        chartTracks.reset()
        chartAlbums.setOpenedAlbum(null)
        chartAlbums.setOpenedAlbumTrackList(null)
        void chartTracks.getTopTracks(chartTracks.selectedPeriod)
    }, [])

    let [isSearchOpen, setIsSearchOpen] = useState(false)
    let changeSelectedPeriod = (period: Period) => {
        chartTracks.setSelectedPeriod(period)
        chartAlbums.setOpenedAlbum(null)
        chartAlbums.setOpenedAlbumTrackList(null)
        if (period === Period.TopToday || period === Period.TopAllTime) {
            setIsSearchOpen(false)
            void chartTracks.getTopTracks(period)
        }
        if (period === Period.Search) {
            setIsSearchOpen(true)
            chartTracks.setTrackList([])
        }
    }

    let loadMore = () => {
        if (chartTracks.trackList.length !== 0) void chartTracks.getMoreTracks(chartTracks.selectedPeriod)
    }
    let search = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            chartTracks.search()
        }
    }
    let setSearchValue = (searchValue: string)=>{
        chartTracks.setSearchValue(searchValue)
    }
    return (
        <div className="chart-tracks-page">
            <div className="tracks">
                <ChartHeader
                    title="Popular tracks"
                    periods={[Period.TopToday, Period.TopAllTime, Period.Search]}
                    selectedPeriod={chartTracks.selectedPeriod}
                    changeSelectedPeriod={changeSelectedPeriod}
                    searchValue={chartTracks.searchValue}
                    onChange={setSearchValue}
                    onKeyDown={search}
                    isSearchOpen={isSearchOpen}
                />

                {chartTracks.trackList.length
                    ? <InfiniteScroll
                        loadMore={loadMore}
                        hasMore={true}
                        loader={<div key={0}> Loading ...</div>}
                    >
                        <TrackList trackList={chartTracks.trackList}/>
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

export default ChartTracksPage;
