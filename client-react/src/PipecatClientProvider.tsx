/**
 * Copyright (c) 2024, Daily.
 *
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { PipecatClient } from "@pipecat-ai/client-js";
import { createStore } from "jotai";
import { Provider as JotaiProvider } from "jotai/react";
import React, { createContext } from "react";

export interface Props {
  client: PipecatClient;
  jotaiStore?: React.ComponentProps<typeof JotaiProvider>["store"];
}

const defaultStore = createStore();

export const PipecatClientContext = createContext<{ client?: PipecatClient }>(
  {}
);

export const PipecatClientProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, client, jotaiStore = defaultStore }) => {
  return (
    <JotaiProvider store={jotaiStore}>
      <PipecatClientContext.Provider value={{ client }}>
        {children}
      </PipecatClientContext.Provider>
    </JotaiProvider>
  );
};
PipecatClientContext.displayName = "PipecatClientContext";
