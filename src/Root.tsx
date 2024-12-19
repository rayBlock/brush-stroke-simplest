import { Composition, staticFile } from 'remotion';
import './style.css';
import { schema } from '../types';
import { BrushComposition } from './CompositionComponent';
import { NewComposition } from './NewComposition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="BrushComposition"
				component={BrushComposition}
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
				schema={schema}
				defaultProps={{
					logoSources: {
						fullLogo: staticFile("smashing-logo.svg"),
						fullLogoWhite: staticFile("smashing-logo-white.svg"),
						icon: staticFile("smashing-logo-icon.svg"),
						iconWhite: staticFile("smashing-logo-icon-white.svg"),
					},
					logoSize: 2,
					logoSizeEnd: 2.5,
					logoDelay: 0.6,
					fontSize: 70,
					backgroundColor: "#090c0b",
					images: [
						{
							offset: 0,
							type: 'A',
							url: "https://images.unsplash.com/photo-1573745851538-7e196a16c2d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							offset: -30,
							type: 'B',
							url: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?q=80&w=2934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							offset: -30,
							type: 'C',
							url: "https://images.unsplash.com/photo-1707496867164-e8f79e3657fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							offset: -30,
							type: 'B',
							url: "https://images.unsplash.com/photo-1567687311355-9280c6bc4b0d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							offset: -30,
							type: 'A',
							url: "https://images.unsplash.com/photo-1547937838-761272271ca6?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						},
						{
							offset: -40,
							type: 'C',
							url: "https://images.unsplash.com/photo-1571422657383-e21eeff747c2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

						}

					]
				}}
			/>
			<Composition
				id="NewComposition"
				component={NewComposition}
				durationInFrames={300}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					titleText: "My Title",
					titleColor: "#000000",
					logoColor1: "#FF0000",
					logoColor2: "#00FF00"
				}}
			/>
		</>
	);
};
