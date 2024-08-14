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

export const TransitionB = ({clipId}: {clipId: string}) => {
	const {width, height, durationInFrames} = useVideoConfig();
	const boundingBox = getBoundingBox(brushStroke1);
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, durationInFrames / 2], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		// easing: Easing.out(Easing.cubic),
	});

	const p1 = interpolate(1 - progress, [0.1, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});

	const p2 = interpolate(progress, [0.1, 0.6], [-1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});

	const path = translatePath(
		brushStroke1,
		width / 2 - boundingBox.width / 2,
		height / 2 - boundingBox.height / 2,
	);
	const maskId1 = useMemo(() => String(random(null)), []);
	const maskId2 = useMemo(() => String(random(null)), []);
	const maskId3 = useMemo(() => String(random(null)), []);
	const pathId = useMemo(() => String(random(null)), []);

	return (
		<svg
			width="100%"
			height="100%"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<clipPath id={maskId1}>
					<use href={`#${pathId}`} transform={`translate(${p1 * width}, 0) `} />
				</clipPath>

				<clipPath id={maskId2}>
					<use href={`#${pathId}`} transform={`translate(${p2 * width}, 0)`} />
				</clipPath>

				<clipPath id={maskId3}>
					<use href={`#${pathId}`} transform={`translate(${p2 * width}, 0)`} />
				</clipPath>
				{/* Clipping path from shapes */}
				<clipPath id={clipId}>
					<use
						href={`#${pathId}`}
						transform={`translate(0,-300) rotate(0, ${width / 2}, ${height / 2}) scale(1, 1.4) `}
						clipPath={`url(#${maskId1})`}
					/>
					<use
						href={`#${pathId}`}
						transform={`translate(500,0) rotate(${90}, ${width / 2}, ${height / 2}) scale(1, 1.3) `}
						clipPath={`url(#${maskId2})`}
					/>

					<use
						href={`#${pathId}`}
						transform={`rotate(0, ${width / 2}, ${height / 2}) scale(1, 1.4) `}
						clipPath={`url(#${maskId3})`}
					/>
				</clipPath>
			</defs>

			<path id={pathId} d={path} />
		</svg>
	);
};
