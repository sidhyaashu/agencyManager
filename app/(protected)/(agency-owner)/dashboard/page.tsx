"use client"

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import AiBlock from "./_components/AiBlock";
import ClientTable from "./_components/ClientTable";

const AiSuggestionsPage = () => {
  const suggestions = [
    {
      title: "Bounce rate is rising by 5%",
      description: "Manage your leads quality",
      client: "Client 1",
      campaign: "Campaign 1",
    },
    {
      title: "Open rate dropped by 8%",
      description: "Try improving subject lines",
      client: "Client 2",
      campaign: "Campaign 3",
    },
    {
      title: "Reply rate improved by 10%",
      description: "Keep consistent message tone",
      client: "Client 3",
      campaign: "Campaign 5",
    },
    {
      title: "Delivery rate decreased by 3%",
      description: "Check your sending domains",
      client: "Client 4",
      campaign: "Campaign 2",
    },
    {
      title: "CTR increased by 7%",
      description: "Your optimization is working!",
      client: "Client 5",
      campaign: "Campaign 4",
    },
  ];

  return (
    <div className="p-4 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col p-4 gap-5 bg-green-200 rounded-xl">
        <div>
          <h3 className="text-xl font-semibold">AI Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Optimize your campaigns using AI insights
          </p>
        </div>

        {/* Carousel Section */}
        <Carousel>
          <CarouselContent>
            {suggestions.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-1">
                  <CardContent className="flex aspect-square items-center justify-center">
                    <AiBlock {...item} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <ClientTable/>
    </div>
  );
};

export default AiSuggestionsPage;
