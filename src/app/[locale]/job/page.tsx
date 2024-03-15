"use client";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import StickyButton from "../components/StickyButton";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Job {
  category: string;
  design: string;
  type: string;
}

const Page: React.FC = () => {
  const job = useTranslations("Job");

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        console.log("Fetching jobs...");
        let response = await fetch("https://stage-fanashbeauty.netlify.app/api/jobs", {
          cache: "no-store",
        });
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobs(data.result || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Handle error gracefully
      }
    };

    getJobs();
  }, []);

  return (
    <div className="items-center">
      <Hero
        height={450}
        isVisible={false}
        path="/asset/img/hero_opening.png"
        title={job("jobTitle")}
      />
      <div className="flex justify-center flex-wrap">
        {jobs.map((item: Job, index: number) => (
          <div
            key={index}
            id="openings"
            className="container p-5 m-5 md:m-5 bg-white border rounded-xl md:w-[90%] mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between m-2">
              <div className="md:mr-5 mb-5 md:mb-0">
                <h3 className="inline-block px-2.5 py-1 text-2xl text-white font-medium bg-tertiary uppercase rounded-md mb-2 md:mb-4">
                  {/* {item.category} */}
                 {job("beautician")}
                </h3>
                <h1 className="text-2xl text-black font-heading mb-2.5 font-bold leading-snug">
                  {/* {item.design} */}
                  {job("amstelveennetherlands")}
                </h1>
                {/* <p>{item.type}</p> */}
                <h3 className="text-2xl text-black font-heading mb-2.5 font-bold leading-snug">
                {job("jobtype")}
                </h3>
                <h4 className="text-black mb-2.5 font-bold leading-snug">

                {job("jobdescription")}
                </h4>
                <p className="text-lg text-black mb-2.5">
                {job("jobdescriptioncontent")}
                </p>
                <h3 className="text-2xl text-black font-heading mb-2.5 font-bold leading-snug">
                {job("responsibilities")}
                </h3>
                <p className="text-lg text-black mb-2.5">
                {job("responsibilitiesdescription1")}
                  <br />
                  {job("responsibilitiesdescription2")}
                  <br />
                  {job("responsibilitiesdescription3")}
                  <br />
                  {job("responsibilitiesdescription4")}
                  <br />
                  {job("responsibilitiesdescription5")}
                  <br />
                  {job("responsibilitiesdescription6")}
                  <br />
                  {job("responsibilitiesdescription7")}
                  <br />
                  {job("responsibilitiesdescription8")}
                  <br />
                  {job("responsibilitiesdescription9")}
                  <br />
                </p>
                <h3 className="text-2xl text-black font-heading mb-2.5 font-bold leading-snug">
                {job("requirements")}
                </h3>
                <p className="text-lg text-black mb-2.5">
                {job("requirementsdescription1")}
                  <br />
                  {job("requirementsdescription2")}
                  <br />
                  {job("requirementsdescription3")}
                  <br />
                  {job("requirementsdescription4")}
                  <br />
                  {job("requirementsdescription5")}
                  <br />
                  {job("requirementsdescription6")}
                  <br />
                  {job("requirementsdescription7")}
                  <br />
                  {job("requirementsdescription8")}
                  <br />
                  {job("requirementsdescription9")}
                  <br />
                </p>
                <h3 className="text-2xl text-black font-heading mb-2.5 font-bold leading-snug">
                {job("benefits")}
                </h3>
                <p className="text-lg text-black mb-2.5">
                {job("requirementsdescription1")}
                  <br />
                  {job("requirementsdescription2")}
                  <br />
                  {job("requirementsdescription3")}
                  <br />
                  {job("requirementsdescription4")}
                  <br />
                  {job("requirementsdescription5")}
                  <br />
                  {job("requirementsdescription6")}
                  <br />
                </p>
                <p className="text-lg text-black mb-2.5">
                {job("requirementsdescription7")}
                </p>
                <h4 className="text-lg text-black mb-2.5">
                  <strong>Email:</strong>info@fanashbeauty.nl
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
