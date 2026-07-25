"use client";

import { useState } from "react";
import Cropper, {
  Area,
  Point,
} from "react-easy-crop";

type Props = {
  image: string;
  onApply: (
    croppedAreaPixels: Area,
    crop: Point,
    zoom: number
  ) => void;
};

export default function AvatarCropper({
  image,
  onApply,
}: Props) {
  const [crop, setCrop] = useState<Point>({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area>();

  return (
    <div className="space-y-6">

      <div className="relative h-[420px] w-full rounded-3xl overflow-hidden bg-slate-900">

        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          objectFit="contain"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, pixels) =>
            setCroppedAreaPixels(pixels)
          }
        />

      </div>

      <div>

        <p className="mb-2 font-medium">
          Zoom
        </p>

        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) =>
            setZoom(Number(e.target.value))
          }
          className="w-full"
        />

      </div>

      <div className="flex justify-end">

        <button
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          onClick={() => {
            if (!croppedAreaPixels) return;

            onApply(
              croppedAreaPixels,
              crop,
              zoom
            );
          }}
        >
          Aplicar Recorte
        </button>

      </div>

    </div>
  );
}