import React, { FC } from 'react';
import {
  Link as MaterialLink,
  LinkProps as MaterialLinkProps,
} from '@material-ui/core';
import NextLink from 'next/link';

const Link: FC<MaterialLinkProps & { href: string }> = ({
  children,
  href,
  ...rest
}) => (
  <NextLink href={href}>
    <MaterialLink href={href} {...rest}>
      {children}
    </MaterialLink>
  </NextLink>
);

export default Link;
