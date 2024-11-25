import {
  BarVisualizer,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";

export const AudioInputTile = ({
  trackRef,
}: {
  trackRef: TrackReferenceOrPlaceholder;
}) => {
  return (
    <div
      className={`flex flex-row gap-2 h-[60px] items-center justify-center rounded-sm microphone`}
    >
      <BarVisualizer
        trackRef={trackRef}
        className="h-full w-full"
        barCount={12}
        options={{ minHeight: 0 }}
      />
    </div>
  );
};
