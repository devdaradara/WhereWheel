import React, { useState, useEffect } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import OverCard from './OverCard';

type EventMarkerContainerProps = {
  line: number;
  stationNum: number;
  stationName: string;
  charger: number;
  lift: boolean;
  location: string;
};

function getFormattedStationName(stationName: string): string {
  let cleanStationName = stationName.replace(/\(.*\)/, '').trim();
  if (!cleanStationName.endsWith('역')) {
    cleanStationName += '역';
  }
  return cleanStationName;
}

function EventMarker({
  line,
  stationNum,
  stationName,
  charger,
  lift,
  location,
}: EventMarkerContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const searchLocation = () => {
      if (window.kakao && window.kakao.maps) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        const formattedStationName = getFormattedStationName(stationName);

        geocoder.addressSearch(formattedStationName, function(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const latitude = parseFloat(result[0].y);
            const longitude = parseFloat(result[0].x);
            setMarkerPosition({ latitude, longitude });
          } else {
            console.error(`Geocoder failed: ${status}`);
          }
        });
      }
    };

    searchLocation();
  }, [stationName]);

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
      position={{ lat: markerPosition.latitude, lng: markerPosition.longitude }}
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
