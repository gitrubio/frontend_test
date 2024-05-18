export const totalPage = (totalItems: number, limit: number): number => {
	return Math.ceil(totalItems/limit);
};