import React, { useState, useEffect } from "react";
import HeroSection from "../HeroSection";
import About from "../About";
import Skills from "../Skills";
import Projects from "../Projects";
import Contact from "../Contact";
import Footer from "../Footer";
import Experience from "../Experience";
import Education from "../Education";
import ProjectDetails from "../ProjectDetails";
import styled from "styled-components";
import Navbar from "../Navbar";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;
const Home = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  console.log(openModal);
  return (
    <>
    <Navbar />
      <Body>
        <HeroSection />
        <Wrapper>
          <Skills />
          <Experience />
        </Wrapper>
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
        <Wrapper>
          <Education />
          <Contact />
        </Wrapper>
        <Footer />
        {openModal.state && (
          <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </Body>
    </>
  );
};

export default Home;
