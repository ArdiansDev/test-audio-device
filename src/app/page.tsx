"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    MediaDeviceInfo[]
  >([]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioDevices = devices.filter((device, index, self) => {
          return (
            device.deviceId !== "default" &&
            device.kind !== "videoinput" &&
            index ===
              self.findIndex((data) => data.deviceId === device.deviceId)
          );
        });
        // eslint-disable-next-line no-console
        console.log(audioDevices);
        return audioDevices;
      })
      .then(setAudioOutputDevices);
  }, []);

  return (
    <div className="p-4">
      <h1>Available Media Devices</h1>
      <ul className="flex flex-col gap-2">
        {audioOutputDevices.map((device, key) => (
          <li key={key}>
            {key + 1} kind:{device.kind} <br /> label: {device.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
