import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Header = ({ children }: any) => {
  return (
    <Wrap>
      <div className="flex">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:text-gray-500">RGT 문고</h1>
        </Link>
        {children}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 0 2rem;

  & > div {
    display: flex;
    justify-content: space-between;
    max-width: 75rem;
    padding: 1.5625rem 0;
    margin: 0 auto;
  }

  @media (min-width: 1200px) {
    .inner {
      padding: 0;
    }
  }
`;

export default Header;
