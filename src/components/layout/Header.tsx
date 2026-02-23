import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[8]} clamp(2rem, 5vw, 6rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.overlay};
  background: transparent;
  pointer-events: none; /* Let clicks pass through empty areas */
`;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.black};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  pointer-events: auto;
  cursor: none;
  
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  list-style: none;
  padding: 0;
  margin: 0;
  pointer-events: auto;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile for now or implement mobile menu */
  }
`;

const NavItem = styled.li`
  /* empty */
`;

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.dimmed};
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.2em;
  transition: color 0.3s ease;
  cursor: none;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.accent};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
];

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
