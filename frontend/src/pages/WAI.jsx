import React from "react";
import Hero from "../components/Hero"; 
import LatestCollections from "../components/LatestCollection";
import OutPolicy from "../components/OutPolicy";
import NewsletterBox from "../components/NewsletterBox"
import Banner from "../components/Banner";
import Testimonal from "../components/Testimonal";
import Image from "../components/Image";
const WAI = () => {
  return (
    <main>
      <Banner/>
      <Hero />
      <LatestCollections />
      <Testimonal/>
      <NewsletterBox/>
      <Image/>
      <OutPolicy/>
      
      
    </main>
  );
};

export default WAI;
