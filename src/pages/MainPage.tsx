import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import OverCard from "../components/OverCard";
import EventMarker from "../components/EventMarker";
import { mapData } from "../assets/data/mapData.js";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const [location, setLocation] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });
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
          {mapData[0].data.map((station, index) => (
            <EventMarker
              key={index}
              line={station.호선}
              stationNum={station["고유역번호(외부역코드)"]}
              stationName={station.역명}
              charger={station.충전기수}
              lift={true}
              markLocation={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              location={station.설치위치}
            />
          ))}
        </Map>
      )}
    </PageContainer>
  );
}

export default MainPage;
