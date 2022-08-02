import React, { FC } from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

const Home: FC = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
    </div>
  );
};

export default Home;
