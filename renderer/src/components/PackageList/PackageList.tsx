import React from "react";
import PackageItem from "../PackageItem";
import { QuakeMap } from "../types";

export class PackageList extends React.Component<{
  maps: QuakeMap[];
  setMap: React.Dispatch<React.SetStateAction<QuakeMap | null>>;
}> {
  render() {
    const packages = this.props.maps.map((map: QuakeMap) => (
      <PackageItem key={map.id} map={map} setMap={this.props.setMap} />
    ));
    return <>{packages}</>;
  }

  shouldComponentUpdate(nextProps: {
    maps: QuakeMap[];
    setMap: React.Dispatch<React.SetStateAction<QuakeMap | null>>;
  }) {
    return this.props.maps.length !== nextProps.maps.length;
  }
}
