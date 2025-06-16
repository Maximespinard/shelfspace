/**
 * Blurs the clicked button to prevent focus styling from persisting.
 */
export const blurThen = (e?: React.MouseEvent<HTMLElement>) => {
  e?.currentTarget?.blur();
};
