import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Searchbar from "@/components/ui/Searchbar";

const Explore = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-0.5">
      <h1>Explore ideas</h1>
      <Searchbar />
      <Tabs defaultValue="all">
        <TabsList className="aero w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="affirmations">Texts</TabsTrigger>
          <TabsTrigger value="visuals">Visuals</TabsTrigger>
          <TabsTrigger value="soulscapes">
            <span className="text-accent">Soulscapes</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
