"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StoriesGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 2fr 1fr;
  gap: 5px 40px;
  padding: 10px;

  p {
    text-align: center;
  }
`;

interface StoryThumbnailPropTypes {
  imageurl: string;
}

const StoryThumbnail = styled.div<StoryThumbnailPropTypes>`
  width: 77px;
  height: 77px;
  border-radius: 50%;
  background: url(${(props) => props.imageurl}) no-repeat center center;
  background-size: 150%;
  margin: auto;
  border: 2px solid rgba(153, 150, 172, 0.593);
  padding: 5px;
  cursor: pointer;
`;

interface Story {
  story_id: number;
  user_id: number;
  video_url: string;
  thumbnail_url: string;
  title: string;
}

const apiLinkStories: string =
  "https://jan24-jilhslxp5q-uc.a.run.app/api/stories";
export default function ProfileStoriesGrid() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response: Response = await fetch(apiLinkStories);

        if (!response.ok) {
          throw new Error("Error in retrieving stories");
        }

        const data = await response.json();

        setStories(data.result.rows);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <StoriesGrid>
        {stories.map((story) => (
          <>
            <StoryThumbnail imageurl={story.thumbnail_url} />
            <p>{story.title}</p>
          </>
        ))}
      </StoriesGrid>
    </>
  );
}
