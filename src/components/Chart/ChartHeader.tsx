import React, {FC, KeyboardEventHandler} from "react";
import {observer} from "mobx-react-lite";
import {ReactComponent as SearchIcon} from "../Header/assets/search.svg";

import {Period} from "./store/chartUtils";
import Periods from "./Periods";

interface ChartHeaderProps {
    title: string,
    periods: Period[],
    selectedPeriod: Period,
    changeSelectedPeriod: Function,
    searchValue: string,
    onChange: Function,
    onKeyDown: KeyboardEventHandler<HTMLInputElement>,
    isSearchOpen: boolean
}

const ChartHeader: FC<ChartHeaderProps> = observer((
    {
        title, periods, selectedPeriod,
        changeSelectedPeriod, searchValue,
        onChange, onKeyDown, isSearchOpen
    }
) => {
    return (
        <div className="chart-header">
            <div className="header">
                <div className="title">{title}</div>
                <Periods
                    periods={periods}
                    selectedPeriod={selectedPeriod}
                    changeSelectedPeriod={changeSelectedPeriod}
                />
            </div>
            {isSearchOpen && <div className="search">
                <input
                    type=" text"
                    value={searchValue}
                    onChange={(e)=>onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <SearchIcon/>
            </div>}
        </div>
    );
})

export default ChartHeader;
