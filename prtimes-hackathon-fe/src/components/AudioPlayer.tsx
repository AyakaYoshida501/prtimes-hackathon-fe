"use client";

import React, { useState } from "react";

type Props = {
  url: string;
  title?: string;
};

export function AudioPlayer({ url, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="space-y-2">
      <Slider
        value={[played]}
        onValueChange={onSeek}
        max={1}
        step={0.001}
        className="flex-1"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
