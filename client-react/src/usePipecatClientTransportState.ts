/**
 * Copyright (c) 2024, Daily.
 *
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { RTVIEvent, TransportState } from "@pipecat-ai/client-js";
import { atom, useAtom } from "jotai";

import { usePipecatClientEvent } from "./usePipecatClientEvent";

const transportStateAtom = atom<TransportState>("disconnected");

export const usePipecatClientTransportState = () => {
  const [transportState, setTransportState] = useAtom(transportStateAtom);

  usePipecatClientEvent(RTVIEvent.TransportStateChanged, setTransportState);

  return transportState;
};
