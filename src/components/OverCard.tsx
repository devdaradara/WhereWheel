import React from "react";
import styled from "styled-components";
import LocationIcon from '../assets/icons/Location.png';
import ChargerIcon from '../assets/icons/Charger.png';
import WheelchairIcon from '../assets/icons/Wheelchair.png';
import { useNavigate } from "react-router-dom";

const AllContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  vertical-align: top;
  padding: 10px 0px 0px 20px;
`;

const ImageContainer = styled.div`
  width: 20px;
  height: 20px;
  marginRight: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageContainer = styled.div`
  width: 400px;
  height: 110px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto auto;
  margin: 13px 0px -12px 0px;
  background-color: #ffffff;
  border-radius: 15px;
`;

const lineColors: { [key: number]: string } = {
  1: '#00418B',
  2: '#00A433',
  3: '#FF5F00',
  4: '#009ED6',
  5: '#7E449D',
  6: '#7A3414',
  7: '#686E21',
  8: '#EB0072',
  9: '#A59E85',
};

const TitleContainer = styled.div< {line: number} >`
  grid-column: span 2;
  font-size: 25px;
  font-family: "Pretendard-SemiBold";
  width: 80%;
  margin-bottom: 10px;
  color: ${props => lineColors[props.line] || '#313866'};
`;

const ShortContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  align-items: center;
  margin-bottom: 10px;
`;

const ShortTitleContainer = styled.div`
  text-decoration: none;
  text-align: center;
  font-size: 20px;
  font-family: "Prentendard-ExtraLight";
  margin: 0px 5px;
`;

const ShortDetailContainer = styled.div`
  text-decoration: none;
  font-size: 20px;
  font-family: "Prentendard-ExtraLight";
`;

const ClosedButton = styled.button`
  width: 40px;
  height: 20px;
  color: #7c8bbe;
  font-size: 16px;
  font-family: "GmarketSans";
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
`;

type ShotInformProps = {
  image: string;
  title: string;
  content: string;
};

const chargerIconCSS = {
  width: "9px",
  height: "16px",
};

const liftIconCSS = {
  width: "20px",
  height: "20px",
};

const locationIconCSS = {
  width: "14px",
  height: "20px",
};

function ShotInform({ image, title, content }: ShotInformProps) {
  return (
    <ShortContainer>
      <ImageContainer>
        <img src={image} alt={title} style={
          title == "운영수량" ? chargerIconCSS :
          title == "리프트여부" ? liftIconCSS :
          title == "설치위치" ? locationIconCSS :
          undefined
        } />
      </ImageContainer>
      <ShortTitleContainer>{title}:</ShortTitleContainer>
      <ShortDetailContainer>{content}</ShortDetailContainer>
    </ShortContainer>
  );
}

type OverCardProps = {
  line: number;
  stationNum: number;
  stationName: string;
  charger: number; 
  lift?: boolean; 
  location: string;
  onClose: () => void;
};

function OverCard({ line, stationNum, stationName, charger, lift, onClose, location }: OverCardProps) {
  const navigate = useNavigate();
  const handleClose = () => {
    if (onClose) {
      onClose(); 
    }
  };

  return (
    <AllContainer>
      <PageContainer>
        <TitleContainer line={line}>{stationName}</TitleContainer>
        <ShotInform image={ChargerIcon} title="운영수량" content={`${charger}개`} />
        <ShotInform image={WheelchairIcon} title="리프트여부" content={lift ? "있음" : "없음"} />
        <ShotInform image={LocationIcon} title="설치위치" content={location} />
      </PageContainer>
      <ClosedButton onClick={handleClose}>X</ClosedButton>
    </AllContainer>
  );
}

export default OverCard;