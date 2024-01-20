import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import OverCard from "../components/OverCard";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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

const EventMarkerContainer = ({
  line,
  stationNum,
  stationName,
  charger,
  lift,
  markLocation,
  location,
}: EventMarkerContainerProps) => {
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

  // Return JSX
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
};

function MainPage() {
  const [location, setLocation] = useState({ latitude: 37.5665, longitude: 126.9780 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response: any) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
    setLoaded(true); 
  };

  const errorHandler = (error: any) => {
    console.error("Error getting location", error);
    setLoaded(true);
  };

  return (
    <PageContainer>
      {loaded && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "100%", height: "600px" }}
          level={3}
        >
          <EventMarkerContainer 
            line={2}
            stationNum={239}
            stationName="홍대입구"
            charger={2}
            lift={true}
            markLocation={{ latitude: location.latitude, longitude: location.longitude }}
            location="대합실"
          />
        </Map>
      )}
    </PageContainer>
  );
}

export default MainPage;
