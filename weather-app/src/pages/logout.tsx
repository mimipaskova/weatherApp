import React from "react";

export default function Logout() {
  // TODO research more is it's possible to remove this component
  window.location.replace(`/api/logout`);
  return <div></div>;
}
