export type UpdateProps<T extends Object> = { id: string, values: Partial<T> };

export type WithId<T extends Object> = { _id: string } & T;
