import { ComponentType, ReactElement, Suspense } from 'react';

/*
 * TODO: 고차 컴포넌트 제거 @tobi-ouo
 */
export default function withSuspense<T extends Record<string, unknown>>(
  Component: ComponentType<T>,
  SuspenseComponent: ReactElement,
) {
  return function WithSuspense(props: T) {
    return (
      <Suspense fallback={SuspenseComponent}>
        <Component {...props} />
      </Suspense>
    );
  };
}
