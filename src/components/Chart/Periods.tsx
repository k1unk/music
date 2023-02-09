import React, {FC, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Period} from "./store/chartUtils";

interface PeriodItemProps {
    period: Period,
    selectedPeriod: Period,
    changeSelectedPeriod: Function
}

const PeriodItem: FC<PeriodItemProps> =
    observer(({period, selectedPeriod, changeSelectedPeriod}) => {
        let [periodItemClassName, setPeriodItemClassName] = useState('item')
        useEffect(() => {
            if (selectedPeriod === period) setPeriodItemClassName('item item_selected')
            else setPeriodItemClassName('item')
        }, [selectedPeriod])

        let getPeriod = ()=>{
            if (period===Period.TopToday) return "Top Today"
            if (period===Period.TopAllTime) return "Top All Time"
            if (period===Period.New) return "New"
            if (period===Period.Search) return "Search"
        }
        return (
            <li className={periodItemClassName}
                onClick={()=>changeSelectedPeriod(period)}
            >
                {getPeriod()}
            </li>
        )
    })


interface PeriodsProps {
    periods: Period[],
    selectedPeriod: Period,
    changeSelectedPeriod: Function
}

const Periods: FC<PeriodsProps> =
    observer(({periods, selectedPeriod, changeSelectedPeriod}) => {
        return (
            <ul className="periods">
                {periods.map(period => {
                    return <PeriodItem key={period}
                                       period={period}
                                       selectedPeriod={selectedPeriod}
                                       changeSelectedPeriod={changeSelectedPeriod}
                    />
                })}
            </ul>
        );
    })

export default Periods;
