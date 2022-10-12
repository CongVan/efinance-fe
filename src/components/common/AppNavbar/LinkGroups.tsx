import { createStyles, NavLink, NavLinkProps, ThemeIcon } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme, { active, isChildren }: any) => {
  return {
    root: {},
    label: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: theme.spacing.xs,
      ...(isChildren && { paddingLeft: 50 }),
      fontSize: theme.fontSizes.sm,
      color: active ? theme.colors.primary : theme.colors.gray,
      '&:hover': {
        // fontWeight: 600,
      },
    },
    icon: {
      color: theme.colors.gray[5],
    },
    children: {
      paddingLeft: 0,
    },
  };
});

interface LinksGroupProps {
  icon?: TablerIcon;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  isChildren?: boolean;
}

const NavLinkCustom: FC<LinksGroupProps & NavLinkProps> = ({
  children,
  isChildren,
  ...props
}) => {
  const location = useLocation();

  const active = useMemo(() => {
    const currentRootPath = location.pathname.split('/');
    const linkRootPath = props.link?.split('/');

    return currentRootPath && currentRootPath[1] === linkRootPath[1];
  }, [location]);

  const { classes, theme } = useStyles({ active, isChildren } as any);
  const Icon = props.icon;
  return (
    <NavLink
      {...props}
      classNames={classes}
      variant="light"
      label={props.label}
      component={props.link ? Link : 'span'}
      to={props.link}
      active={active}
      defaultOpened={true}
      icon={
        Icon && (
          <ThemeIcon color={active ? 'blue' : 'gray'} variant={'light'} size={28}>
            <Icon stroke={1.5} />
          </ThemeIcon>
        )
      }
    >
      {children}
    </NavLink>
  );
};

export function LinksGroup({ icon, label, link, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);

  return (
    <>
      <NavLinkCustom label={label} link={hasLinks ? '' : link} icon={icon}>
        {hasLinks && (
          <>
            {links.map((item) => {
              return (
                <NavLinkCustom
                  isChildren={true}
                  link={item.link}
                  key={item.link}
                  label={item.label}
                />
              );
            })}
          </>
        )}
      </NavLinkCustom>
    </>
  );
}
