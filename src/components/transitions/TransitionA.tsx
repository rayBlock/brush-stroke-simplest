import {
	Easing,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useMemo} from 'react';
import {translatePath} from '@remotion/paths';
import {brushStroke1} from '../../../paths';

export const TransitionA = ({clipId}: {clipId: string}) => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, durationInFrames / 2], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const path = translatePath(brushStroke1, 0, 0);
	const clipPath = translatePath(brushStroke1, 0, 0);
	const maskId1 = useMemo(() => String(random(null)), []);
	const maskId2 = useMemo(() => String(random(null)), []);
	const maskId3 = useMemo(() => String(random(null)), []);
	const maskId4 = useMemo(() => String(random(null)), []);

	const clipPathId = useMemo(() => String(random(null)), []);
	const pathId = useMemo(() => String(random(null)), []);

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

	const p3 = interpolate(1 - progress, [0.3, 0.8], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});

	const p4 = interpolate(progress, [0.5, 0.9], [-1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.cubic),
	});

	return (
		<svg
			width="100%"
			height="100%"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				{/* Masking path */}
				<clipPath id={maskId1}>
					<use href={`#${pathId}`} transform={`translate(${p1 * width}, 0) `} />
				</clipPath>
				<clipPath id={maskId2}>
					<use href={`#${pathId}`} transform={`translate(${p2 * width}, 0)`} />
				</clipPath>
				<clipPath id={maskId3}>
					<use
						href={`#${pathId}`}
						transform={`translate(${p3 * width}, 0) scale(1 , 1)`}
					/>
				</clipPath>
				<clipPath id={maskId4}>
					<use
						href={`#${clipPathId}`}
						transform={`translate(${p4 * width}, 0) scale(1 , 1)`}
					/>
				</clipPath>

				{/* Clipping path from shapes */}
				<clipPath id={clipId}>
					<use
						href={`#${pathId}`}
						transform={`translate(-300, 150) rotate(35, ${width / 2}, ${height / 2}) scale(1.9, 1.2)  `}
						clipPath={`url(#${maskId1})`}
					/>

					<use
						href={`#${pathId}`}
						transform={`translate(0, 300) rotate(-5, ${width / 2}, ${(height * 1.8) / 2}) scale(1.1, 1.2) `}
						clipPath={`url(#${maskId2})`}
					/>
					<use
						href={`#${pathId}`}
						transform={`translate(${-width / 3},0) rotate(-60, ${(width * 1.4) / 2}, ${(height * 1.2) / 2}) scale(1.5, 1.2) `}
						clipPath={`url(#${maskId3})`}
					/>

					<use
						href={`#${pathId}`}
						transform={`translate(${width / 3},0) rotate(-60, ${(width * 1.4) / 2}, ${(height * 1.2) / 2}) scale(1.5, 1.2) `}
						clipPath={`url(#${maskId4})`}
					/>
				</clipPath>
			</defs>
			<path id={clipPathId} d={clipPath} />
			<path id={pathId} d={path} />
		</svg>
	);
};
