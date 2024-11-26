import { AbsoluteFill, Img, useVideoConfig } from 'remotion';
import { Series } from 'remotion';
import { OutroSequenceComponent } from './components/sequences/OutroSequenceComponent';
import { SequenceComponent } from './components/sequences/SequenceComponent';
import { schema } from '../types';
import { z } from 'zod';

export const BrushComposition: React.FC<z.infer<typeof schema>> = ({ images, backgroundColor,
	 // fontSize, 
	 logoSize, logoSizeEnd, logoDelay, 
	logoSources
}) => {

	const { durationInFrames } = useVideoConfig();

	const sceneDurationInFrames = Math.floor(durationInFrames / images.length);

	return (
		<AbsoluteFill style={{
			background: backgroundColor,
			alignItems: 'center',
			justifyContent: 'center',
		}} >
			<Series>
				{images.map(({ url, type, offset }, index) => (


					<Series.Sequence
						key={url}
						offset={offset}
						durationInFrames={sceneDurationInFrames}
					>
						<SequenceComponent key={url} type={type}>
							<Img
								src={url}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									position: 'absolute',
									filter: index % 2 === 0 ? `
								      hue-rotate(170deg) saturate(50%) contrast(200%)	`  
									: `saturate(0)`,
								}}
					
							/>
						</SequenceComponent>
					</Series.Sequence>
				))}

				<Series.Sequence
					durationInFrames={sceneDurationInFrames * 2}
					offset={-5}
				>
					<OutroSequenceComponent logo={logoSources.fullLogoWhite}
					logoDelay={logoDelay}
					logoSize={logoSize}
					logoSizeEnd={logoSizeEnd} />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
