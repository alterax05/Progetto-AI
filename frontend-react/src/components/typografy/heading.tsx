import { cn } from "@/lib/utils";
import React from "react";

type HeadingProps = React.HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export function H1({ children, className, ...rest }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...rest }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className, ...rest }: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}
