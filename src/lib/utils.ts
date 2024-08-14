import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {loadFont} from '@remotion/google-fonts/SofiaSansExtraCondensed';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const radToDeg = (rad: number) => rad * (180 / Math.PI);

export function calculateXY(
	angleB: number,
	progress: number,
	totalDistance: number,
) {
	const radians = (angleB * Math.PI) / 180; // Convert angle to radians
	const distanceTraveled = progress * totalDistance;
	const x = distanceTraveled * Math.cos(radians);
	const y = distanceTraveled * Math.sin(radians);
	return {x, y};
}

export const font = loadFont();
