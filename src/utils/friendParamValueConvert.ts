export const friendParamValueConvert = (params: string | null) => {
  return (params === "null" ? null : params === "true") as null | boolean;
};
