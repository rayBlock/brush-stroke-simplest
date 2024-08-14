import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useMemo} from 'react';
import {
	evolvePath,
	getBoundingBox,
	getLength,
	getPointAtLength,
	translatePath,
} from '@remotion/paths';
import {brushStroke1} from '../../../paths';
import {calculateXY, cn, font} from '../../lib/utils';
import logo from '../../assets/logo.png';

export const OutroSequenceComponent: React.FC<{}> = (props) => {
	const clipId = useMemo(() => String(random(null)), []);
	const pathId = useMemo(() => String(random(null)), []);
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.in(Easing.quad),
	});
	const boundingBox = getBoundingBox(brushStroke1);

	// const scaleX = 0.9,
	// 	scaleY = 2.4;
	const logoBrush1 = calculateXY(-30, 1 - progress, boundingBox.width);
	const logoBrush2 = calculateXY(-30, progress, boundingBox.width);

	const path = translatePath(brushStroke1, -width / 2, -boundingBox.height / 2);
	const style: React.CSSProperties = useMemo(() => {
		return {
			clipPath: `url(#${clipId})`,
		};
	}, [clipId]);

	const logoPath1 =
		'M73.7892 9.12595C69.3501 1.20478 61.8262 17.7197 60.2461 21.1572C56.9356 28.6299 55.2305 35.5788 53.5 43.5C51.5438 41.4076 48.5048 36.8913 47 34.5C46 32.5 44.178 33.3348 45.2582 35.5C44.2048 33.7065 44 31 40.4582 28.8541C31.3543 28.0321 23.7209 43.6536 25 51.5C28.5029 62.7044 40 53 42.8659 47.9845C42.5649 50.8241 42.5649 54.7847 45.424 56.1298C48.5 57 49.8631 54.9342 51.8194 52.9913C50.6908 64.7236 49.2612 76.9042 53.1737 88.4123C54.9794 94.9884 61.3747 96.6324 62.0519 88.5618C62.9547 78.5482 60.4719 68.7589 57.4623 59.3431C56.6347 56.6529 55.5 54.5 54.6886 51.7956C54.6886 48 55.6585 50.6972 57.0861 52.244C58.7413 54.0375 64.309 59.3431 66.5 59.5C65 57.5 64.5348 56.8771 64.309 56.6529C61.9014 53.6638 59.0423 50.8989 56.4842 47.9845C61.6757 40.5117 66.7167 32.3663 70.1777 23.7726C71.6825 19.3637 74.8425 13.7591 73.7892 9.12595ZM43.3926 40.8853C41.7373 45.4437 39.7811 48.956 35.9439 52.0945C26.1502 60.1051 25.1428 47.741 28.6457 41.8568C33.16 32.4411 42.7154 24.0715 43.3926 40.8853ZM52.5 49C51.2962 50.7187 49.5314 53.3274 47.5 54C45.8447 54.4484 45.3488 53.2902 45.0478 51.7956C44.145 46.8636 45.725 42.0063 46.4021 37.2237C48.0574 40.3622 50.119 42.8614 52 46C52.3762 46.822 53.0267 48.1033 52.5 49ZM55.1299 56.1298C58.3652 65.9192 60.5471 76.1569 59.6442 86.3947C58.7413 95.362 55.8823 88.8607 54.7537 84.3023C52.4213 74.2887 53 63.5 54.227 53.8133C54.528 54.5606 54.9042 55.6067 55.1299 56.1298ZM71.4568 11.1436C69.8767 21.755 62.0519 36.7006 55.4308 45.0701C56.7851 38.0457 58.7413 31.2454 61.45 24.5946C61.6757 23.2495 71.6072 3.52135 71.4568 11.1436Z';
	const logoPath1Length = getLength(logoPath1);

	const point1 = getPointAtLength(logoPath1, progress * logoPath1Length);

	const evolution = evolvePath(1 - progress, logoPath1);

	return (
		<AbsoluteFill className="items-center justify-center relative ">
			<AbsoluteFill className="flex flex-col items-center justify-center ">
				<AbsoluteFill className="flex flex-col items-center justify-center select-none space-y-24">
					<div className="relative  flex items-center justify-center">
						<Img
							className="w-1/2 h-auto select-none pointer-events-none"
							src={logo}
							style={style}
						/>
						{/* <svg
							className="absolute"
							width="100%"
							height="100%"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								id={pathId}
								d={path}
								fill="#000000"
								transform={`translate(${logoBrush1.x}, ${logoBrush1.y})  rotate(-30, ${width / 2}, ${height / 2})  scale(${scaleX}, ${scaleY}) `}
							/>
							<path
								id={pathId}
								d={path}
								fill="#000000"
								transform={`translate(${logoBrush2.x}, ${logoBrush2.y})  rotate(-30, ${width / 2}, ${height / 2})  scale(${scaleX}, ${scaleY}) `}
							/>
						</svg> */}
					</div>

					<div
						className={cn(
							'text-4xl uppercase text-center font-medium tracking-widest',
						)}
						style={{
							fontFamily: font.fontFamily,
						}}
					>
						<span className="text-[#085ea7]">Different People One</span>
						<span className="text-[#90dbe3]">&nbsp;Community</span>
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
