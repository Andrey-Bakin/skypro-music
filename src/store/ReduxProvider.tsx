"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = setupStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
