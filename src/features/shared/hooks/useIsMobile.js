import { useState, useEffect } from "react";
import { APP_SETTINGS } from "@config/appSettings";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < APP_SETTINGS.MOBILE_SCREEN_BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < APP_SETTINGS.MOBILE_SCREEN_BREAKPOINT);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
} 