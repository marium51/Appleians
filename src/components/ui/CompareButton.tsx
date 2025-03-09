
import React from 'react';
import { Button } from '@/components/ui/button';
import { GitCompare } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CompareButton = () => {
  const { compareItems } = useCompare();
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/compare')}
            className="relative"
          >
            <GitCompare className="h-5 w-5" />
            {compareItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {compareItems.length}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compare Products</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
