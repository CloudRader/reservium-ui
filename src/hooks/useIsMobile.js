import { useState, useEffect } from "react";
import Constants from "../constants/Constants";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < Constants.MOBILE_SCREEN_BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < Constants.MOBILE_SCREEN_BREAKPOINT);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
} 