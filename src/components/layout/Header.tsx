import { useLenis } from 'lenis/react';
import { navLinks } from '../../constants/data';
import {
  HeaderWrapper,
  Logo,
  NavList,
  NavItem,
  NavLink
} from './Header.styles';

export default function Header() {
  const lenis = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeaderWrapper
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Logo
        href="#hero"
        className="hoverable"
        onClick={(e) => handleScroll(e, '#hero')}
      >
        SHAKTHI VEL
      </Logo>
      <nav>
        <NavList>
          {navLinks.map((link) => (
            <NavItem key={link.name}>
              <NavLink
                href={link.href}
                className="hoverable"
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.name}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </nav>
    </HeaderWrapper>
  );
}
