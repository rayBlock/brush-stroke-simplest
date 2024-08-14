import {AbsoluteFill, Img} from 'remotion';
import {z} from 'zod';
import {DURATION_IN_FRAMES} from './constants';
import {cn} from './lib/utils';
import {Series} from 'remotion';
import {OutroSequenceComponent} from './components/sequences/OutroSequenceComponent';
import {SequenceComponent} from './components/sequences/SequenceComponent';
import {schema} from '../types';

export const SeriesComponent: React.FC<z.infer<typeof schema>> = ({images}) => {
	const sceneDurationInFrames = Math.floor(DURATION_IN_FRAMES / images.length);
	return (
		<AbsoluteFill className="bg-[#000000] items-center justify-center">
			<Series>
				{images.map(({url, type, offset}, index) => (
					<Series.Sequence
						key={url}
						offset={offset}
						durationInFrames={sceneDurationInFrames}
					>
						<SequenceComponent key={url} type={type}>
							<Img
								src={url}
								className={cn(
									`w-full h-full object-cover absolute top-0 left-0 filter`,
									index % 2 === 0
										? 'hue-rotate-[170deg] saturate-50 contrast-200'
										: 'saturate-0',
								)}
							/>
						</SequenceComponent>
					</Series.Sequence>
				))}

				<Series.Sequence
					durationInFrames={sceneDurationInFrames * 2}
					offset={-30}
				>
					<OutroSequenceComponent />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
