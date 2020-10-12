import React from "react";
import PackageItem from "../PackageItem";
import { QuakeMap } from "../types";

export const PackageList = (props: { maps: QuakeMap[] }) => {

  const packages = props.maps.map((map) => <PackageItem key={map.id} map={map}/>);

  return (
    <>{packages}
    </>
  );
};
