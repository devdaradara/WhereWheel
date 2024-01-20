import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import OverCard from "./OverCard";

type EventMarkerContainerProps = {
  line: number,
  stationNum: number,
  stationName: string,
  charger: number,
  lift: boolean,
  markLocation: {
    latitude: number,
    longitude: number,
  },
  location: string,
};

function EventMarker({
  line,
  stationNum,
  stationName,
  charger,
  lift,
  markLocation,
  location,
}: EventMarkerContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMarkerClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMarkerMouseOver = () => {
    if (!isClicked) {
      setIsVisible(true);
    }
  };

  const handleMarkerMouseOut = () => {
    if (!isClicked) {
      setIsVisible(false);
    }
  };

  return (
    <MapMarker
      position={{ lat: markLocation.latitude, lng: markLocation.longitude }}
      onClick={handleMarkerClick}
      onMouseOver={handleMarkerMouseOver}
      onMouseOut={handleMarkerMouseOut}
    >
      {isVisible && (
        <OverCard
          line={line}
          stationNum={stationNum}
          stationName={stationName}
          charger={charger}
          lift={lift}
          location={location}
          onClose={() => setIsVisible(false)}
        />
      )}
    </MapMarker>
  );
}

export default EventMarker;