import { useState, useEffect } from "react";
import {settings} from "../constants";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < settings.MOBILE_SCREEN_BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < settings.MOBILE_SCREEN_BREAKPOINT);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
} 