import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <NextUINavbar maxWidth="xl">
      <NavbarBrand>
        <p className="font-bold text-inherit">记账应用</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={router.pathname === '/'}>
          <Link color={router.pathname === '/' ? 'primary' : 'foreground'} href="/">
            首页
          </Link>
        </NavbarItem>
        <NavbarItem isActive={router.pathname === '/tags'}>
          <Link color={router.pathname === '/tags' ? 'primary' : 'foreground'} href="/tags">
            标签管理
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/" variant="flat">
            添加账单
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
} 
