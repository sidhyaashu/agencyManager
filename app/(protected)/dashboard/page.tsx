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
import { Button } from "@/components/ui/button";

const suggestions = [
  { title: "Bounce rate is rising by 5%", description: "Manage your leads quality", client: "Client 1", campaign: "Campaign 1" },
  { title: "Open rate dropped by 8%", description: "Try improving subject lines", client: "Client 2", campaign: "Campaign 3" },
  { title: "Reply rate improved by 10%", description: "Keep consistent message tone", client: "Client 3", campaign: "Campaign 5" },
  { title: "Delivery rate decreased by 3%", description: "Check your sending domains", client: "Client 4", campaign: "Campaign 2" },
];

const AgencyDashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* NEW: Prominent header for visual hierarchy */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
          <p className="text-muted-foreground mt-1">A bird's-eye view of all client activity.</p>
        </div>
        <Button>Map New Client</Button>
      </div>
      
      {/* AI Suggestions Section */}
      <div className="flex flex-col p-6 gap-5 bg-blue-50 border border-blue-100 rounded-xl">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Suggestions</h3>
          <p className="text-sm text-muted-foreground">
            Optimize your campaigns using AI insights
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {suggestions.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-1 bg-white">
                  <CardContent className="flex aspect-[4/3] items-center justify-center">
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

      {/* Client Table Section */}
      <ClientTable/>
    </div>
  );
};

export default AgencyDashboardPage;