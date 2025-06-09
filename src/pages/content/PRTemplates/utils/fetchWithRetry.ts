/**
 * 일시적인 네트워크 오류나 GitHub API의 불안정한 응답 ( 404) 상황을 대비해
 * fetch 요청을 한 번 재시도할 수 있도록 하는 유틸 함수.
 *
 * - GitHub compare 페이지처럼 SPA 환경에서 레포가 변경된 직후 API가 404를 일시적으로 응답할 수 있음
 * - 이런 상황에서 사용자가 기능이 "없다"고 인식하는 것을 방지하기 위해 재시도 로직 추가
 * - 기본적으로 1회 재시도하며, 필요 시 `retries` 인자를 조정하여 횟수 증가 가능
 */
export const fetchWithRetry = async (url: string, options: RequestInit, retries = 1): Promise<Response | null> => {
  try {
    // fetch 요청 실행
    const res = await fetch(url, options);

    // 응답이 실패 상태이고 재시도 가능할 경우 (ex: 404, 500 등)
    if (!res.ok && retries > 0) {
      console.warn(`[fetchPRTemplates] ${url} 첫 요청 실패 (${res.status}), 재시도`);

      // 잠시 대기 후 재귀적으로 재시도
      await new Promise(resolve => setTimeout(resolve, 300));
      return fetchWithRetry(url, options, retries - 1);
    }

    // 성공 또는 재시도 없이 반환
    return res;
  } catch (e) {
    // 네트워크 단절 등 예외 상황 로깅 및 null 반환
    console.warn(`[fetchPRTemplates] ${url} 요청 실패`, e);
    return null;
  }
};
