import React, {FC, KeyboardEventHandler} from "react";
import {observer} from "mobx-react-lite";
import {ReactComponent as SearchIcon} from "../Header/assets/search.svg";

interface SearchInputProps {
    searchValue: string,
    onChange: Function,
    onKeyDown: KeyboardEventHandler<HTMLInputElement>
}

const SearchInput: FC<SearchInputProps> = observer(
    ({searchValue,onChange, onKeyDown}) => {
        return (
            <div className="search-input">
                <input
                    type=" text"
                    value={searchValue}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <SearchIcon/>
            </div>
        );
    })

export default SearchInput;
