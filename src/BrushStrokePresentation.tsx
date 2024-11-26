import {getBoundingBox, translatePath} from '@remotion/paths';
import {brushStroke1} from '../paths';
import type {
	TransitionPresentation,
	TransitionPresentationComponentProps,
} from '@remotion/transitions';
import React, {useMemo, useState} from 'react';
import {AbsoluteFill, random} from 'remotion';

export type Props = {
	width: number;
	height: number;
	id: string;
};

// const paths = [brushStroke1];

const BrushStrokePresentation: React.FC<
	TransitionPresentationComponentProps<Props>
> = ({children, presentationDirection, presentationProgress, passedProps,}) => {
	const [clipId] = useState(() => String(random(null)));
	// const translatedPaths = paths.map((path) => {
	// 	const boundingBox = getBoundingBox(path);
	// 	const translatedPath = translatePath(
	// 		path,
	// 		passedProps.width / 2 - boundingBox.width / 2,
	// 		passedProps.height / 2 - boundingBox.height / 2,
	// 	);

	// 	return {
	// 		path: translatedPath,
	// 		id: passedProps.id,
	// 	};
	// });

	const progressInDirection =
		presentationDirection === 'entering'
			? 1 - presentationProgress
			: presentationProgress;
	const boundingBox = getBoundingBox(brushStroke1);

	const translatedPath = translatePath(
		brushStroke1,
		passedProps.width / 2 - boundingBox.width / 2,
		passedProps.height / 2 - boundingBox.height / 2,
	);

	const style: React.CSSProperties = useMemo(() => {
		return {
			width: '100%',
			height: '100%',
			maskImage: '',
			clipPath: `url(#${clipId})`,
		};
	}, [clipId]);

	const path =
		presentationDirection === 'entering' ? translatedPath : translatedPath;

	return (
		<AbsoluteFill>
			<AbsoluteFill style={style}>{children}</AbsoluteFill>
			<AbsoluteFill>
				<svg
					width="100%"
					height="100%"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<clipPath id="mask">
							<rect
								x="0"
								y="0"
								width={`${progressInDirection * 100}%`}
								height="100%"
								fill="black"
							/>
						</clipPath>
						<clipPath id={clipId}>
							<use
								href="#brush"
								transform={`translate(-500, 0) rotate(-65, ${passedProps.width / 2}, ${passedProps.height / 2}) `}
							/>
							<use
								href="#brush"
								transform={`rotate(35, ${passedProps.width / 2}, ${passedProps.height / 2}) scale(1, 1.3) `}
							/>
							<use
								href="#brush"
								transform={`rotate(0, ${passedProps.width / 2}, ${passedProps.height / 2}) scale(1, 1.3) `}
							/>
						</clipPath>
					</defs>
					<path id="brush" d={path} clipPath="url(#mask)" />
				</svg>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export const brushStroke = (props: Props): TransitionPresentation<Props> => {
	return {component: BrushStrokePresentation, props};
};
