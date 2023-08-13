import React from 'react'
import NewDashboard from '../components/MainComponents/NewDashboard'

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: "New Dashboard",
    description: "This is the new dashboard",
    type: "website"
    },
  };
}

const page = () => {
  return (
    <NewDashboard />
  )
}

export default page