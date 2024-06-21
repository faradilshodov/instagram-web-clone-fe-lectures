"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";

import ProfileStoriesModal from "./ProfileStoriesModal";

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

const StoryDeleteButton = styled.button`
  position: relative;
  z-index: 5;
  left: 70px;
  bottom: 18px;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border: 1px solid gray;

  &:hover {
    background-color: rgba(255, 0, 0, 0.7);
  }
`;

export interface Story {
  story_id: number;
  user_id: number;
  video_url: string;
  thumbnail_url: string;
  title: string;
}

interface ProfileStoriesGridPropTypes {
  triggerRender: boolean;
}

const apiLinkStories: string =
  "https://jan24-jilhslxp5q-uc.a.run.app/api/stories";
export default function ProfileStoriesGrid({
  triggerRender,
}: ProfileStoriesGridPropTypes) {
  const [stories, setStories] = useState<Story[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>();

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
  }, [triggerRender]);

  const deleteStory = async (storyId: number) => {
    try {
      const response: Response = await fetch(
        `https://jan24-jilhslxp5q-uc.a.run.app/api/stories/${storyId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting Posts");
      }

      setStories((currentStories) =>
        currentStories?.filter((story) => story.story_id !== storyId)
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const openModal = (story: Story) => {
    setIsModalOpen(true);

    const index = stories.findIndex((s) => s.story_id === story.story_id);

    if (index !== -1) {
      setCurrentStoryIndex(index);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const pathname = usePathname();

  return (
    <>
      <StoriesGrid>
        {stories.map((story) => (
          <>
            <StoryThumbnail
              imageurl={story.thumbnail_url}
              onClick={() => openModal(story)}
            >
              {pathname === "/admin" && (
                <StoryDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteStory(story.story_id);
                  }}
                >
                  X
                </StoryDeleteButton>
              )}
            </StoryThumbnail>

            <p>{story.title}</p>
          </>
        ))}
      </StoriesGrid>
      {isModalOpen && (
        <ProfileStoriesModal
          closeModal={closeModal}
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          setCurrentStoryIndex={setCurrentStoryIndex}
        />
      )}
    </>
  );
}
