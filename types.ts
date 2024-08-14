import {PropsWithChildren} from 'react';
import {z} from 'zod';

export const TreansitionType = z.enum(['A', 'B', 'C']);
export const SequenceType = z.object({
	url: z.string(),
	type: TreansitionType,
	offset: z.number(),
});

export const InputImagesType = z.array(SequenceType);
export const schema = z.object({
	images: InputImagesType,
});

export type TransitionType = z.infer<typeof TreansitionType>;

export type SequenceType = z.infer<typeof SequenceType>;
export type SequenceComponentProps = PropsWithChildren & {
	type: TransitionType;
};
export type InputImagesType = z.infer<typeof InputImagesType>;
