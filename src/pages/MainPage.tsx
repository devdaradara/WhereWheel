import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import OverCard from "../components/OverCard";
import EventMarker from "../components/EventMarker";

type StationType = {
  호선: number;
  고유역번호: number;
  역명: string;
  충전기수: number;
  설치위치: string;
};

type ApiResponse = {
  page: number;
  perPage: number;
  totalCount: number;
  currentCount: number;
  matchCount: number;
  data: StationType[];
};

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
  const [stationData, setStationData] = useState<StationType[]>([]);
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response: GeolocationPosition) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
    setLoaded(true);
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.error("Error getting location", error);
    setLoaded(true);
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WHEELCHAIR_CHARGER_KEY;
    const apiUrl = `http://api.odcloud.kr/api/15085994/v1/uddi:7a307ef7-00b6-4d5e-a70f-eb429a85365a?page=1&perPage=115&serviceKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setStationData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <PageContainer>
      {loaded && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "100%", height: "600px" }}
          level={3}
        >
          {stationData &&
            stationData.map((station, index) => (
              <EventMarker
                key={index}
                line={station.호선}
                stationNum={station.고유역번호}
                stationName={station.역명}
                charger={station.충전기수}
                lift={true}
                location={station.설치위치}
              />
            ))}
        </Map>
      )}
    </PageContainer>
  );
}

export default MainPage;
