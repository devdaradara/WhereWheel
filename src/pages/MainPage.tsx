import React, { useState, useEffect } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import styled from "styled-components";
import OverCard from "../components/OverCard";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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
          style={{ width: "100%", height: "900px" }}
          level={3}
        >
          <MapMarker
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
          />
        </Map>
      )}

      {/* <OverCard
        line={2}
        stationNum={239}
        stationName="홍대입구"
        charger={2}
        lift={true}
        location="대합실"
        onClose={() => {}}
      /> */}
    </PageContainer>
  );
}

export default MainPage;
