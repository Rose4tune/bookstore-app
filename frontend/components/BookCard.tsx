"use client";

import React from "react";
import styled from "styled-components";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type BookProps = {
  title: string;
  author: string;
  imageUrl: string;
};

const BookCard = ({ title, author, imageUrl }: BookProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <StyledCard>
      <StyledCardMedia image={`${backendUrl}${imageUrl}`} title={title} />
      <CardContent>
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  max-height: 17.5rem;

  p {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 12.5rem;
  object-fit: cover;
`;

export default BookCard;
