"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function App() {
  const canvasRef = useRef();
  //   const [width, setWidth] = useState(1200);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      // width: width*2,
      // height: width*2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.15, 0.4, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [19.076, 72.8777], size: 0.05 }, // Mumbai
        { location: [28.6139, 77.209], size: 0.08 }, // New Delhi
        { location: [13.0827, 80.2707], size: 0.04 }, // Chennai
        { location: [22.5726, 88.3639], size: 0.04 }, // Kolkata
        { location: [12.9716, 77.5946], size: 0.04 }, // Bengaluru
        { location: [34.0522, -118.2437], size: 0.1 }, // Los Angeles
        { location: [41.8781, -87.6298], size: 0.08 }, // Chicago
        { location: [29.7604, -95.3698], size: 0.08 }, // Houston
        { location: [47.6062, -122.3321], size: 0.06 }, // Seattle
        { location: [25.7617, -80.1918], size: 0.05 }, // Miami
        { location: [51.5074, -0.1278], size: 0.1 }, // London, UK
        { location: [48.8566, 2.3522], size: 0.08 }, // Paris, France
        { location: [52.52, 13.405], size: 0.08 }, // Berlin, Germany
        { location: [41.9028, 12.4964], size: 0.05 }, // Rome, Italy
        { location: [40.4168, -3.7038], size: 0.05 }, // Madrid, Spain
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* <AnimatePresence> */}
      {
        <div
          // key="globe-modal"
          // initial={{ scale: 0 }}
          // animate={{ scale: 1 }}
          // exit={{ scale: 0 }}
          className="group absolute left-0 right-0 z-10 mx-auto max-w-sm rounded-lg border border-gray-700 bg-gray-900 bg-opacity-90 px-5 py-4 shadow-md backdrop-blur-md sm:py-7"
        >
          <p className="text-center text-md text-gray-200 sm:text-base">
            {/* This map shows the last 20 people who made Blocs to share their knowledge. */}
            This map shows the last 20 people who joined the waitlist for Bloc.
          </p>
          <Link href={"https://nsbxei0ai38.typeform.com/to/fd3UK76K"}>
            <div className="flex justify-center font-medium text-sm">
              <div
                className="my-4  rounded-full sm:py-2 py-2 w-fit sm:px-6 px-4
                            flex flex-row items-center bg-[#28A1FF] cursor-pointer"
              >
                <div className="sm:font-medium text-base text-gray-900">
                  {" "}
                  Join the waitlist{" "}
                </div>
              </div>
            </div>
          </Link>
        </div>
      }
      {/* </AnimatePresence> */}
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
