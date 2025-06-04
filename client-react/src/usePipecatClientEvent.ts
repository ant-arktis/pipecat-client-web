/**
 * Copyright (c) 2024, Daily.
 *
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { RTVIEvent, RTVIEventHandler } from "@pipecat-ai/client-js";
import { useEffect } from "react";

import { usePipecatClient } from "./usePipecatClient";

export const usePipecatClientEvent = <E extends RTVIEvent>(
  event: E,
  handler: RTVIEventHandler<E>
) => {
  const client = usePipecatClient();

  useEffect(() => {
    if (!client) return;
    client.on(event, handler);
    return () => {
      client.off(event, handler);
    };
  }, [event, handler, client]);
};
