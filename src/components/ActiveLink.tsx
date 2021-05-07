import { cloneElement, ReactElement } from "react";
import { Link, LinkProps, useLocation } from 'react-router-dom';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children, 
  shouldMatchExactHref = false, 
  ...rest
}: ActiveLinkProps) {
  const { pathname } = useLocation();

  let isActive = false;

  if (shouldMatchExactHref && (pathname === rest.href || pathname === rest.to)){
    isActive = true;
  }

  if (!shouldMatchExactHref && 
    (pathname.startsWith(String(rest.href)) || 
    pathname.startsWith(String(rest.to)))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'blue.primary' : 'gray.50'
      })}
    </Link>
  )
}