export const isOptionValid = (
  option: string,
  object: Record<string, unknown>
): option is keyof typeof object => option in object;
