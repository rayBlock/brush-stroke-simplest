import React from 'react';
import {brushStroke1} from '../paths';

interface BrushProps {
  width: number;
  height: number;
  color: string;
}

export const Brush: React.FC<BrushProps> = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 1200 400">
      <path d={brushStroke1} fill={color} />
    </svg>
  );
}; 