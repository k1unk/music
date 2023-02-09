import React, {useState} from "react";
import {observer} from "mobx-react-lite";

const imgErrorUrl = 'https://sun9-79.userapi.com/impf/qmIj6RBWZ2ImWn8UaSZZcasddab4rzmyIwBdPQ/-' +
    'qbEglBeVIk.jpg?size=300x0&quality=90&sign=ec9b583a5a1eae3879cba43dbefc5489'

interface AlbumImageProps {
    src: string
}

const AlbumImage = observer(({src}: AlbumImageProps) => {
    let [imgError, setImgError] = useState(false)
    let onImgError = () => {
        setImgError(true)
        console.warn("If Error 403 on images, please use VPN")
    }

    return (
        <>
            <img src={src} alt="" onError={onImgError}
                 style={imgError ? {display: 'none'} : {}}
            />
            {imgError && <img src={imgErrorUrl} alt=""/>}
        </>
    );
})

export default AlbumImage;
