import classNames from "classnames";
import React, { forwardRef } from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Backdrop = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => (
    <div
      className={classNames(
        "absolute inset-0 bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-sm",
        className
      )}
      {...props}
      ref={ref}
    />
  )
);

Backdrop.displayName = "Backdrop";

export default Backdrop;
