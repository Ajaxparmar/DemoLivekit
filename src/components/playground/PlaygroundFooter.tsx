import { Button } from "@/components/button/Button";
import { LoadingSVG } from "@/components/button/LoadingSVG";
import { useConfig } from "@/hooks/useConfig";
import { ConnectionState } from "livekit-client";
import { ReactNode } from "react";
import {
  BarVisualizer,
  TrackReferenceOrPlaceholder,
} from "@livekit/components-react";

type PlaygroundFooterProps = {
  logo?: ReactNode;
  title?: ReactNode;
  githubLink?: string;
  height: number;
  accentColor: string;
  connectionState: ConnectionState;
  onConnectClicked: () => void;
  trackRef?: TrackReferenceOrPlaceholder; // Add trackRef prop for the mic track
};

export const PlaygroundFoooter = ({
  logo,
  githubLink,
  accentColor,
  height,
  onConnectClicked,
  connectionState,
  trackRef,
}: PlaygroundFooterProps) => {
  const { config } = useConfig();

  return (
    <div
      className={`flex pt-4 text-${accentColor}-500 justify-between items-center shrink-0`}
      style={{
        height: height + "px",
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translate(-50%, 50%)',
      }}
    >
      <div className="flex items-center gap-2">
        {/* Audio Visualizer for Mic */}
        {trackRef && (
          <div className="flex flex-row gap-2 h-[60px] items-center justify-center rounded-sm">
            <BarVisualizer
              trackRef={trackRef}
              className="h-full w-full"
              barCount={12}
              options={{ minHeight: 0 }}
            />
          </div>
        )}
      </div>

      <div className="flex basis-1/3 justify-end items-center gap-2">
        <Button
          className="px-6 py-2 text-xs md:text-sm font-medium text-white rounded-full shadow-lg"
          style={{
            background: "linear-gradient(to right, #aa00ff, #ff007f)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "White",
            borderRadius: "20px",
          }}
          accentColor={
            connectionState === ConnectionState.Connected ? "red" : accentColor
          }
          disabled={connectionState === ConnectionState.Connecting}
          onClick={() => {
            onConnectClicked();
          }}
        >
          {connectionState === ConnectionState.Connecting ? (
            <LoadingSVG />
          ) : connectionState === ConnectionState.Connected ? (
            "Disconnect"
          ) : (
            "Connect"
          )}
        </Button>
      </div>
    </div>
  );
};
