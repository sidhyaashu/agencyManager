import React from "react";
import { Button } from "@/components/ui/button";



interface AiBlockProps {
  title: string;
  description: string;
  client: string;
  campaign: string;
}


const AiBlock: React.FC<AiBlockProps> = ({
  title,
  description,
  client,
  campaign,
}) => {
  return (
    <div className="flex flex-col justify-between h-full py-8">
      {/* Title & Description */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-green-800">
          {title}
        </h2>
        <span className="text-sm text-green-700">
          {description}
        </span>
      </div>

      {/* Client & Button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-sm text-gray-700">
          <span className="font-medium text-gray-900">{client}</span>
          <span className="text-gray-600">{campaign}</span>
        </div>

        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white rounded-md"
        >
          Optimize
        </Button>
      </div>
    </div>
  );
};

export default AiBlock;
