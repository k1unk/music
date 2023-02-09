import React, {ChangeEvent, FC, useEffect} from "react";
import app, {Theme} from "../App/store/app";
import {observer} from "mobx-react-lite";

interface ToggleButtonProps {
    firstValue: string,
    secondValue: string,
    id: string,
    onChange: Function,
    checked: boolean
}

const ToggleButton: FC<ToggleButtonProps> = observer(
    ({firstValue, secondValue, id, onChange, checked}) => {
        return (
            <div className="toggle-button-wrapper">
                <span>{firstValue}</span>
                <label className="toggle-button" htmlFor={id}>
                    <input
                        type="checkbox"
                        id={id}
                        onChange={(e) => onChange(e)}
                        checked={checked}
                    />
                    <div className="slider round"></div>
                </label>
                <span>{secondValue}</span>
            </div>
        );
    })

export default ToggleButton;
