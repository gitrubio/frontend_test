import cx from 'clsx';
import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { SiSalesforce } from "react-icons/si";
import { useStatus } from '@/hooks/useUser';
import { MdAlternateEmail } from "react-icons/md";
import useAuth from '@/hooks/useAuth';


export function Header() {
    const {user} = useStatus()
    const {logout} = useAuth()
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <header className={classes.header}>
      <Container  className={classes.inner}>
       <Group>
        <SiSalesforce size={40} style={{color: '#E12242'}}/>
        <strong style={{ color: '#E12242'}}>HACID</strong>
       </Group>
        <Group gap={5} visibleFrom="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'} alt={user?.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user?.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <MdAlternateEmail
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              >
                {user?.email}
              </Menu.Item>
             

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>
            
              <Menu.Item
                c={'red'}
                onClick={logout}
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Logout
              </Menu.Item>

            
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}