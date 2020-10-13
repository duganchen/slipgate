import React from "react";
import PackageItem from "../PackageItem";
import { QuakeMap } from "../types";

export const PackageList = (props: {
  maps: QuakeMap[];
  setMap: React.Dispatch<React.SetStateAction<QuakeMap | null>>;
}) => {
  const packages = props.maps.map((map) => (
    <PackageItem key={map.id} map={map} setMap={props.setMap} />
  ));

  return <>{packages}</>;
};
