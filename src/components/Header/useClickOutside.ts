import {useEffect} from "react";

export const useClickOutside = (ref: React.MutableRefObject<any>, handler: Function) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler(false)
            }
        }
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);
};
