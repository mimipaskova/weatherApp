import React from "react";

export default function Logout() {
  window.location.replace(`/api/logout`);
  return <div></div>;
}
