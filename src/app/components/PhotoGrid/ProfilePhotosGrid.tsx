"use client";

// importing libraries
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;

`;

const PhotoItem = styled.div`
  position: relative;
  padding-bottom: 100%;
`;

interface PostObject {
  post_id: number;
  user_id: number;
  media_url: string;
  caption: string;
}

const apiLinkPosts: string = "https://jan24-jilhslxp5q-uc.a.run.app/api/posts";
export default function ProfilePhotosGrid() {
  const [posts, setPosts] = useState<PostObject[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: Response = await fetch(apiLinkPosts);

        if (!response.ok) {
          throw new Error("Error fetching posts");
        }

        const data = await response.json();
        // console.log(data.posts);

        setPosts(data.posts);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchPosts();
  });

  return (
    <>
      <GridContainer>
        {/* photoItem div*/}
        {posts?.map((postObject: PostObject) => (
          <PhotoItem key={postObject.post_id}>
            <Image
              src={postObject.media_url}
              alt="Post Photo"
              fill
              objectFit="cover"
            />
          </PhotoItem>
        ))}
        {/* image */}
      </GridContainer>
    </>
  );
}
