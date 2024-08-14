import {
	AbsoluteFill,
	Easing,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useMemo} from 'react';
import {loadFont} from '@remotion/google-fonts/SofiaSansExtraCondensed';
import {TransitionA} from '../transitions/TransitionA';
import {TransitionB} from '../transitions/TransitionB';
import {TransitionC} from '../transitions/TransitionC';
import type {SequenceComponentProps} from '../../../types';

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

const lookup = {
	A: TransitionA,
	B: TransitionB,
	C: TransitionC,
};

export const SequenceComponent: React.FC<SequenceComponentProps> = (props) => {
	const {children, type} = props;
	const {durationInFrames} = useVideoConfig();
	const clipId = useMemo(() => String(random(null)), []);
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, durationInFrames], [0, 1]);
	const opacity = interpolate(progress, [0.8, 1], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const style: React.CSSProperties = useMemo(() => {
		return {
			opacity,
			clipPath: `url(#${clipId})`,
		};
	}, [clipId, opacity]);

	const Component = useMemo(() => lookup[type], [type]);

	return (
		<AbsoluteFill style={style}>
			{children}
			<AbsoluteFill>
				<Component clipId={clipId} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
