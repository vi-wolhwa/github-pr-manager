/** Api url에서 ':param'을 대체한 url을 반환하는 함수 */
export const getApiUrl = (template: string, params: Record<string, string | number>): string => {
  return template.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Api url의 필수 파라미터가 누락되었습니다. (${key})`);
    }

    return encodeURIComponent(String(value));
  });
};
