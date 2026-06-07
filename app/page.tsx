"use client"


import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Location from "@/components/location"
import Contact from "@/components/contact"
import GaleriaSection from "@/components/galeria-section"
import Footer from "@/components/footer"
import { useState } from "react";


export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <GaleriaSection />
      <Contact />
      <Location />
      <Footer />
    </>
  );
}
