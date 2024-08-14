import {InputImagesType} from '../types';

export const DURATION_IN_FRAMES = 30 * 10;

const importAll = (context: __WebpackModuleApi.RequireContext) => {
	return context.keys().map(context) as string[];
};
const imports = importAll(
	require.context('./images', false, /\.(png|jpe?g|svg)$/),
);

export const images: InputImagesType = [
	{
		url: imports[0],
		type: 'A',
		offset: 0,
	},
	{
		url: imports[1],
		type: 'B',
		offset: -30,
	},
	{
		url: imports[2],
		type: 'A',
		offset: -40,
	},
	{
		url: imports[3],
		type: 'C',
		offset: -40,
	},
	{
		url: imports[4],
		type: 'A',
		offset: -40,
	},
];
