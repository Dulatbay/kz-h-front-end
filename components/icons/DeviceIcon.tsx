import MobileSVG from "@/components/icons/MobileSVG";
import DesktopSVG from "@/components/icons/DesktopSVG";

export function DeviceIcon({device}: { device: string }) {
    if (device === "mobile") return <MobileSVG/>;
    else return <DesktopSVG/>;
}