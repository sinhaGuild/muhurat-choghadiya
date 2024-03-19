import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  FaceIcon,
  HeartFilledIcon,
  LapTimerIcon,
  MinusCircledIcon,
  MoonIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons";

interface AvatarComponentInterface {
  children: React.ReactNode;
}
export function AvatarComponent({ children }: AvatarComponentInterface) {
  return (
    <Avatar className="bg-slate-100 justify-center">
      <div className="self-center">{children}</div>
    </Avatar>
  );
}

export function AvatarSunComponent() {
  return (
    <Avatar className=" justify-center bg-amber-100 ">
      <SunIcon className="self-center text-black" />
    </Avatar>
  );
}

export function AvatarMoonComponent() {
  return (
    <Avatar className=" justify-center bg-blue-900">
      <MoonIcon className="self-center text-white" />
    </Avatar>
  );
}

type AvatarImageComponentType = { image: string; fallback: string };

export function AvatarImageComponent({
  image,
  fallback,
}: AvatarImageComponentType) {
  return (
    <Avatar>
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export function AvatarHeartComponent() {
  return (
    <AvatarComponent>
      <div className="text-red-500">
        <HeartFilledIcon />{" "}
      </div>
    </AvatarComponent>
  );
}

export function AvatarDoubleHeartComponent() {
  return (
    <AvatarComponent>
      <div className="text-red-500">
        <HeartFilledIcon /> <HeartFilledIcon />{" "}
      </div>
    </AvatarComponent>
  );
}

export function AvatarRocketComponent() {
  return (
    <AvatarComponent>
      <div className="text-green-500">
        <RocketIcon />{" "}
      </div>
    </AvatarComponent>
  );
}

export function AvatarHazardComponent() {
  return (
    <AvatarComponent>
      <div className="text-red-500">
        <MinusCircledIcon />{" "}
      </div>
    </AvatarComponent>
  );
}

export function AvatarLegend() {
  return (
    <div className="flex gap-2 items-center mb-2 px-2">
      <AvatarSunComponent />
      <p>Daytime</p>
      <AvatarMoonComponent />
      <p>Nightime</p>
      <AvatarHazardComponent />
      <p>Avoid</p>
      <AvatarHeartComponent />
      <p>Auspicious</p>
      <AvatarDoubleHeartComponent />
      <p>Very Auspicious</p>
    </div>
  );
}
