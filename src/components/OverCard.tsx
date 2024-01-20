import React from "react";
import styled from "styled-components";
import LocationIcon from '../assets/icons/Location.png';
import ChargerIcon from '../assets/icons/Charger.png';
import WheelchairIcon from '../assets/icons/Wheelchair.png';
import { useNavigate } from "react-router-dom";
import One from "../assets/icons/lines/Circled 1.png";
import Two from "../assets/icons/lines/Circled 2.png";
import Three from "../assets/icons/lines/Circled 3.png";
import Four from "../assets/icons/lines/Circled 4.png";
import Five from "../assets/icons/lines/Circled 5.png";
import Six from "../assets/icons/lines/Circled 6.png";
import Seven from "../assets/icons/lines/Circled 7.png";
import Eight from "../assets/icons/lines/Circled 8.png";
import Nine from "../assets/icons/lines/Circled 9.png";

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

const lineIcons: { [key: number]: string } = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine,
};

const lineFilters: { [key: number]: string } = {
  1: 'invert(12%) sepia(65%) saturate(5436%) hue-rotate(202deg) brightness(93%) contrast(101%)',
  2: 'invert(33%) sepia(98%) saturate(2234%) hue-rotate(125deg) brightness(97%) contrast(105%)',
  3: 'invert(40%) sepia(95%) saturate(1995%) hue-rotate(359deg) brightness(100%) contrast(109%)',
  4: 'invert(62%) sepia(55%) saturate(6872%) hue-rotate(166deg) brightness(96%) contrast(104%)',
  5: 'invert(34%) sepia(11%) saturate(3820%) hue-rotate(237deg) brightness(89%) contrast(87%)',
  6: 'invert(21%) sepia(92%) saturate(781%) hue-rotate(346deg) brightness(92%) contrast(93%)',
  7: 'invert(39%) sepia(57%) saturate(479%) hue-rotate(25deg) brightness(91%) contrast(92%)',
  8: 'invert(22%) sepia(93%) saturate(7215%) hue-rotate(322deg) brightness(89%) contrast(109%)',
  9: 'invert(75%) sepia(6%) saturate(1004%) hue-rotate(10deg) brightness(85%) contrast(84%)',
};

const LineNumberContainer = styled.img<{ line: number }>`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  filter: ${props => lineFilters[props.line]};
`;

const TitleContainer = styled.div< {line: number} >`
  grid-column: span 2;
  font-size: 25px;
  font-family: "Pretendard-SemiBold";
  width: 80%;
  margin-bottom: 10px;
  color: ${props => lineColors[props.line] || '#313866'};
  display: flex;
  align-items: center;
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
          title === "운영수량" ? chargerIconCSS :
          title === "리프트여부" ? liftIconCSS :
          title === "설치위치" ? locationIconCSS :
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
        <TitleContainer line={line}>
          <LineNumberContainer src={lineIcons[line]} alt={`Line ${line}`} line={line} />
          {stationName}
        </TitleContainer>
        <ShotInform image={ChargerIcon} title="운영수량" content={`${charger}개`} />
        <ShotInform image={WheelchairIcon} title="리프트여부" content={lift ? "있음" : "없음"} />
        <ShotInform image={LocationIcon} title="설치위치" content={location} />
      </PageContainer>
      <ClosedButton onClick={handleClose}>X</ClosedButton>
    </AllContainer>
  );
}

export default OverCard;