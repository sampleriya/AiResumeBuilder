"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../components/HomeOne/Banner";
import Funfact from "../components/Common/Funfact";
import BuySell from "../components/HomeOne/BuySell";
import AccountCreate from "../components/Common/AccountCreate";
import Platform from "../components/HomeOne/Platform";
import FeedBack from "../components/HomeOne/FeedBack";
import Portfolio from "../components/Common/Portfolio";
import OurFeature from "../components/Common/OurFeature";
import AppDownload from "../components/Common/AppDownload";
import RegisterAreaTwo from "../components/Common/RegisterAreaTwo";

const Index = () => {
  return (
    <>
      <Banner />

      <div style={{ paddingTop: "10rem" }}>
        <OurFeature title="Our Features" />
      </div>
      <div style={{paddingBottom:"10rem"}}>
      <Funfact pt100="pt-100" />
        
      </div>

      <BuySell pt70="pt-70" />

      <AccountCreate title="Get started in Three Easy Steps" />

      <Platform />

      {/* <FeedBack /> */}

      {/* <Portfolio bgColor="bg-f9f9f9" />

      <AppDownload />

      <RegisterAreaTwo title="Start Trading on Novis" /> */}
    </>
  );
};

export default Index;
