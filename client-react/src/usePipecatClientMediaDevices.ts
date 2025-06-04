import { RTVIEvent } from "@pipecat-ai/client-js";
import { atom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useEffect } from "react";

import { usePipecatClient } from "./usePipecatClient";
import { usePipecatClientEvent } from "./usePipecatClientEvent";

type OptionalMediaDeviceInfo = MediaDeviceInfo | Record<string, never>;

const availableMicsAtom = atom<MediaDeviceInfo[]>([]);
const availableCamsAtom = atom<MediaDeviceInfo[]>([]);
const availableSpeakersAtom = atom<MediaDeviceInfo[]>([]);
const selectedMicAtom = atom<OptionalMediaDeviceInfo>({});
const selectedCamAtom = atom<OptionalMediaDeviceInfo>({});
const selectedSpeakerAtom = atom<OptionalMediaDeviceInfo>({});

export const usePipecatClientMediaDevices = () => {
  const client = usePipecatClient();

  const availableCams = useAtomValue(availableCamsAtom);
  const availableMics = useAtomValue(availableMicsAtom);
  const availableSpeakers = useAtomValue(availableSpeakersAtom);
  const selectedCam = useAtomValue(selectedCamAtom);
  const selectedMic = useAtomValue(selectedMicAtom);
  const selectedSpeaker = useAtomValue(selectedSpeakerAtom);

  const initDevices = useAtomCallback(
    useCallback(
      async (_get, set) => {
        if (!client) return;

        const availableCams = await client.getAllCams();
        const availableMics = await client.getAllMics();
        const availableSpeakers = await client.getAllSpeakers();

        set(availableCamsAtom, availableCams);
        set(availableMicsAtom, availableMics);
        set(availableSpeakersAtom, availableSpeakers);

        set(selectedCamAtom, client.selectedCam);
        set(selectedMicAtom, client.selectedMic);
        set(selectedSpeakerAtom, client.selectedSpeaker);
      },
      [client]
    )
  );

  useEffect(() => {
    initDevices();
  }, [initDevices]);

  usePipecatClientEvent(
    RTVIEvent.AvailableCamsUpdated,
    useAtomCallback(
      useCallback((_get, set, cams) => {
        set(availableCamsAtom, cams);
      }, [])
    )
  );
  usePipecatClientEvent(
    RTVIEvent.AvailableMicsUpdated,
    useAtomCallback(
      useCallback((_get, set, mics) => {
        set(availableMicsAtom, mics);
      }, [])
    )
  );
  usePipecatClientEvent(
    RTVIEvent.AvailableSpeakersUpdated,
    useAtomCallback(
      useCallback((_get, set, speakers) => {
        set(availableSpeakersAtom, speakers);
      }, [])
    )
  );
  usePipecatClientEvent(
    RTVIEvent.CamUpdated,
    useAtomCallback(
      useCallback((_get, set, cam) => {
        set(selectedCamAtom, cam);
      }, [])
    )
  );
  usePipecatClientEvent(
    RTVIEvent.MicUpdated,
    useAtomCallback(
      useCallback((_get, set, mic) => {
        set(selectedMicAtom, mic);
      }, [])
    )
  );
  usePipecatClientEvent(
    RTVIEvent.SpeakerUpdated,
    useAtomCallback(
      useCallback((_get, set, speaker) => {
        set(selectedSpeakerAtom, speaker);
      }, [])
    )
  );

  const updateCam = useCallback(
    (id: string) => {
      client?.updateCam(id);
    },
    [client]
  );
  const updateMic = useCallback(
    (id: string) => {
      client?.updateMic(id);
    },
    [client]
  );
  const updateSpeaker = useCallback(
    (id: string) => {
      client?.updateSpeaker(id);
    },
    [client]
  );

  return {
    availableCams,
    availableMics,
    availableSpeakers,
    selectedCam,
    selectedMic,
    selectedSpeaker,
    updateCam,
    updateMic,
    updateSpeaker,
  };
};
