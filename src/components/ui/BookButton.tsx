import type { ComponentProps } from "react";
import { CTA } from "../../config/site";
import { useBooking } from "../../hooks/useBooking";
import Button from "./Button";

type Props = Omit<ComponentProps<typeof Button>, "onClick"> & { label?: string };

/** Every booking CTA on the site renders through this component. */
export default function BookButton({ label = CTA.bookDemo, ...rest }: Props) {
  const { openBooking } = useBooking();
  return (
    <Button onClick={openBooking} {...rest}>
      {label}
    </Button>
  );
}
