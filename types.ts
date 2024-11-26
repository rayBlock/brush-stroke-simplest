import {zColor} from '@remotion/zod-types';
import {PropsWithChildren} from 'react';
import {z} from 'zod';

export const TypeTr = z.enum(['A', 'B', 'C']);

export const schema = z.object({
	logoSources: z.object({
		fullLogo: z.string(),
		fullLogoWhite: z.string(),
		icon: z.string(),
		iconWhite: z.string(),
	}),
	logoSize: z.number().step(0.1),
	logoSizeEnd: z.number().step(0.1),
	logoDelay: z.number().step(0.1),
	fontSize: z.number(),
	backgroundColor: zColor(),
	images: z.array(
		z.object({
			url: z.string(),
			type: TypeTr,
			offset: z.number(),
		}),
	),
});

export type SequenceComponentProps = PropsWithChildren & {
	type: z.infer<typeof TypeTr>;
};
