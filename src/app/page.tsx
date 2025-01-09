"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const [microphoneAccess, setMicrophoneAccess] = useState<boolean>(false);

  useEffect(() => {
    let mediaStream: MediaStream;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaStream = stream;
        setMicrophoneAccess(true);
        return navigator.mediaDevices.enumerateDevices();
      })
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
        setAudioOutputDevices(audioDevices);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });

    const stopMicrophone = () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };

    const timer = setTimeout(stopMicrophone, 5000);

    return () => {
      clearTimeout(timer);
      stopMicrophone();
    };
  }, []);

  return (
    <div className="p-4">
      <h1>Available Media Devices</h1>
      {microphoneAccess ? (
        <ul className="flex flex-col gap-2">
          {audioOutputDevices.map((device, key) => (
            <li key={key}>
              {key + 1} kind: {device.kind} <br /> label: {device.label}
            </li>
          ))}
        </ul>
      ) : (
        <p>Microphone access is required to list audio devices.</p>
      )}
    </div>
  );
};

export default Home;
