import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }) => {
  if (!properties.length) return <p>No properties available</p>;

  return (
    <>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertyList;
