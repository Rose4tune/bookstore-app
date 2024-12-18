"use client";

import React from "react";
import { Pagination } from "@mui/material";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationComponent = ({ count, page, onChange }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-8">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
      />
    </div>
  );
};

export default PaginationComponent;
