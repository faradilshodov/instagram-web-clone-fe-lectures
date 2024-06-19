"use client";
// importing liblaries
import styled from "styled-components";

// importing containers
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfilePhotosGrid from "../components/PhotoGrid/ProfilePhotosGrid";
import ProfileStoriesGrid from "../components/ProfileStories/ProfileStoriesGrid";

// import all icons for navbar
import CompassIcon from "../../../public/icons/compass.svg";
import FilmIcon from "../../../public/icons/film.svg";
import HeartIcon from "../../../public/icons/heart.svg";
import HouseIcon from "../../../public/icons/house.svg";
import MagnifyingGlassIcon from "../../../public/icons/magnifyingglass.svg";
import MessageIcon from "../../../public/icons/message.svg";

const ProfileContainer = styled.div`
  padding-left: 73px;
  max-width: 935px;
  margin: 30px auto;

  @media (max-width: 480px) {
    padding-left: 40px;
  }
`;

export interface Icon {
  path: string;
  altText: string;
  width: number;
  height: number;
}

const iconWidth: number = 25;
const iconHeight: number = 25;

const navbarConfigItems: Icon[] = [
  {
    path: HouseIcon,
    altText: "Home",
    width: iconWidth,
    height: iconHeight,
  },
  {
    path: MagnifyingGlassIcon,
    altText: "Search",
    width: iconWidth,
    height: iconHeight,
  },
  {
    path: CompassIcon,
    altText: "Discover",
    width: iconWidth,
    height: iconHeight,
  },
  {
    path: FilmIcon,
    altText: "Reels",
    width: iconWidth,
    height: iconHeight,
  },
  {
    path: MessageIcon,
    altText: "Message",
    width: iconWidth,
    height: iconHeight,
  },
  {
    path: HeartIcon,
    altText: "Likes",
    width: iconWidth,
    height: iconHeight,
  },
];

export default function Profile() {
  return (
    <>
      {/* navigation bar */}
      <NavigationBar items={navbarConfigItems} />

      {/* profile container */}
      <ProfileContainer>
        {/* header  */}
        <ProfileHeader />
        {/* video stories */}
        <ProfileStoriesGrid />
        {/* photo grid */}
        <ProfilePhotosGrid />
      </ProfileContainer>
    </>
  );
}
