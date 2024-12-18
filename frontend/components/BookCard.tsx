"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, Typography } from "@mui/material";

type BookProps = {
  title: string;
  author: string;
  imageUrl: string;
};

const BookCard = ({ title, author, imageUrl }: BookProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <Card>
      <div className="w-full h-48 relative">
        <Image
          src={`${backendUrl}${imageUrl}`}
          alt={title}
          width={150}
          height={200}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <CardContent className="text-center bg-white">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary" className="text-sm">
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
