import { zoomies } from "ldrs";

export function Loading() {
  zoomies.register();
  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <l-zoomies
        size="80"
        stroke="5"
        bg-opacity="0.1"
        speed="1.4"
        color="black"
        ></l-zoomies>
    </div>
  );
}
