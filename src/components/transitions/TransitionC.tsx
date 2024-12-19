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

export const TransitionC = ({clipId}: {clipId: string}) => {
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

	// Create a double-spiral effect with opposite rotations
	const totalRotations = 2.5;
	const pointsPerRotation = 22;
	const totalPoints = totalRotations * pointsPerRotation;
	
	const spiralPoints = useMemo(() => {
		return Array.from({length: totalPoints}, (_, i) => {
			const angle = (i * 2 * Math.PI) / pointsPerRotation;
			const rotation = i / totalPoints;
			// Create a spiral with varying radius
			const radius = interpolate(
				rotation,
				[0, 1],
				[130, 35], // Slightly larger radius for more dramatic effect
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
					easing: Easing.bezier(0.4, 0, 0.2, 1),
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
							[progressThreshold - 0.08, progressThreshold],
							[0, 1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
								easing: Easing.bezier(0.4, 0, 0.2, 1),
							}
						);

						if (elementProgress === 0) return null;

						// Create two brush strokes for each point with different rotations
						return (
							<>
								<use
									key={`${index}-1`}
									href={`#${pathId}`}
									transform={`
										translate(${Math.cos(angle) * radius}, 
												${Math.sin(angle) * radius})
										rotate(${(angle * 180) / Math.PI + 30}, ${width / 2}, ${height / 2})
										scale(${0.3 * elementProgress}, ${0.3 * elementProgress})
									`}
									opacity={elementProgress}
									clipPath={`url(#${maskId1})`}
								/>
								<use
									key={`${index}-2`}
									href={`#${pathId}`}
									transform={`
										translate(${Math.cos(-angle) * (radius * 0.7)}, 
												${Math.sin(-angle) * (radius * 0.7)})
										rotate(${(-angle * 180) / Math.PI - 30}, ${width / 2}, ${height / 2})
										scale(${0.25 * elementProgress}, ${0.25 * elementProgress})
									`}
									opacity={elementProgress}
									clipPath={`url(#${maskId1})`}
								/>
							</>
						);
					})}
				</clipPath>
			</defs>

			<path id={pathId} d={path} />
		</svg>
	);
};
