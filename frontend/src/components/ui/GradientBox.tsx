import React, { forwardRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { TaskPriority } from '../../types/Task';
import { getGradient } from '../../utils/styles';

interface GradientBoxProps extends BoxProps {
  gradientType: 'header' | 'todo' | 'inProgress' | 'done' | 'priority';
  priorityLevel?: TaskPriority;
}

export const GradientBox = forwardRef<HTMLDivElement, GradientBoxProps>(({ 
  gradientType, 
  priorityLevel = 'low',
  children, 
  ...props 
}, ref) => {
  const gradient = getGradient(gradientType, priorityLevel);
  
  return (
    <Box 
      ref={ref}
      bgGradient={gradient}
      borderRadius="xl"
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{ boxShadow: "lg" }}
      {...props}
    >
      {children}
    </Box>
  );
});
