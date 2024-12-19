import {
	Easing,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useMemo} from 'react';
import {getBoundingBox, translatePath} from '@remotion/paths';
import {brushStroke1} from '../../../paths';

export const TransitionA = ({clipId}: {clipId: string}) => {
	const {width, height, durationInFrames} = useVideoConfig();
	const boundingBox = getBoundingBox(brushStroke1);
	const frame = useCurrentFrame();

	const progress = interpolate(frame, [0, durationInFrames * 0.5], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.4, 0, 0.2, 1),
	});

	const path = translatePath(
		brushStroke1,
		width / 2 - boundingBox.width / 2,
		height / 2 - boundingBox.height / 2,
	);
	const maskId1 = useMemo(() => String(random(null)), []);
	const pathId = useMemo(() => String(random(null)), []);

	// Create a double spiral effect
	const totalRotations = 3; // Reduced from 4 to 3 for faster completion
	const pointsPerRotation = 20; // Reduced from 28 to 20 for faster progression
	const totalPoints = totalRotations * pointsPerRotation;
	
	const spiralPoints = useMemo(() => {
		return Array.from({length: totalPoints}, (_, i) => {
			const angle = (i * 2 * Math.PI) / pointsPerRotation;
			const rotation = i / totalPoints;
			// Create two interleaved spirals
			const radius = interpolate(
				rotation,
				[0, 1],
				[120, 30], // Larger radius range for more coverage
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}
			);
			return {
				angle: angle + rotation * 2 * Math.PI * totalRotations,
				radius,
				index: i,
			};
		});
	}, []);

	return (
		<svg
			width="100%"
			height="100%"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<clipPath id={maskId1}>
					<use 
						href={`#${pathId}`} 
						transform={`translate(${(1 - progress) * width * 0.3}, 0)`}
					/>
				</clipPath>

				<clipPath id={clipId}>
					{spiralPoints.map(({angle, radius, index}) => {
						const progressThreshold = index / totalPoints;
						const elementProgress = interpolate(
							progress,
							[progressThreshold - 0.08, progressThreshold], // Changed from 0.15 to 0.08 for faster fade-in
							[0, 1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}
						);

						if (elementProgress === 0) return null;

						return (
							<use
								key={index}
								href={`#${pathId}`}
								transform={`
									translate(${Math.cos(angle) * radius}, 
											${Math.sin(angle) * radius})
									rotate(${(angle * 180) / Math.PI + 45}, ${width / 2}, ${height / 2})
									scale(${0.35 * elementProgress}, ${0.35 * elementProgress})
								`}
								opacity={elementProgress}
								clipPath={`url(#${maskId1})`}
							/>
						);
					})}
				</clipPath>
			</defs>

			<path id={pathId} d={path} />
		</svg>
	);
};
