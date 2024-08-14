import {Composition} from 'remotion';
import {SeriesComponent} from './CompositionComponent';
import {DURATION_IN_FRAMES, images} from './constants';
import './style.css';
import {schema} from '../types';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={SeriesComponent}
				durationInFrames={DURATION_IN_FRAMES}
				fps={30}
				width={1280}
				height={720}
				schema={schema}
				defaultProps={{
					images,
				}}
			/>
		</>
	);
};
