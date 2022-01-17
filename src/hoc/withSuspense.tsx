import React from "react";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<h1>Page loading...</h1>}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}
