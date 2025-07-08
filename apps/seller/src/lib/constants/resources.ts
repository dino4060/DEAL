const RESOURCE_NAMES = ['auth', 'shops'] as const;

type TResourceUnion = typeof RESOURCE_NAMES[number];
type TResourceUppers = Uppercase<TResourceUnion>;
type TResourceVariants = {
  BASE: string;
  PUBLIC: string;
  PRIVATE: string;
};

export type TResources = Record<TResourceUppers, TResourceVariants>;

export const RESOURCES = RESOURCE_NAMES.reduce((acc, key) => {
  const upper = key.toUpperCase() as TResourceUppers;
  acc[upper] = {
    BASE: `/${key}`,
    PUBLIC: `/public/seller/${key}`,
    PRIVATE: `/seller/${key}`,
  };
  return acc;
}, {} as TResources);
