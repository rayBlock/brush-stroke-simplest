import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { useMemo } from 'react';
import {
	getBoundingBox,
	translatePath,
} from '@remotion/paths';
import { brushStroke1 } from '../../../paths';
import { calculateXY, cn, font } from '../../lib/utils';

export const OutroSequenceComponent: React.FC<{
	logo: string,
	logoSize: number,
	logoSizeEnd: number
	logoDelay: number,
}> = ({ logo,
	logoDelay,
	logoSize,
	logoSizeEnd
}) => {
		const clipId = useMemo(() => String(random(null)), []);
		const pathId = useMemo(() => String(random(null)), []);
		const { width, height, durationInFrames } = useVideoConfig();


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
		const logoScale = interpolate(
			frame, [logoDelay, 30], [logoSize, logoSizeEnd],
			{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
		)

		const path = translatePath(brushStroke1, -width / 2, -boundingBox.height / 2);
		const style: React.CSSProperties = useMemo(() => {
			return {
				clipPath: `url(#${clipId})`,
				transform: `scale(${logoScale})`,
			};
		}, [clipId, logoScale]);

		// const point1 = getPointAtLength(logoPath1, progress * logoPath1Length);

		// const evolution = evolvePath(1 - progress, logoPath1);

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
							<svg
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
									transform={`translate(${logoBrush1.x}, ${logoBrush1.y})  rotate(-30, ${width / 2}, ${height / 2})  scale(${progress}, ${progress}) `}
								/>
								<path
									id={pathId}
									d={path}
									fill="#000000"
									transform={`translate(${logoBrush2.x}, ${logoBrush2.y})  rotate(-30, ${width / 2}, ${height / 2})  scale(${progress}, ${progress}) `}
								/>
							</svg>
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
