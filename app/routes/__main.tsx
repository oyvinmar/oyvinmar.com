import { Outlet } from '@remix-run/react';
import { ColorModeToggle } from 'app/components/ThemeToggle';
import { ReactNode } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="antialiased leading-tight py-8 lg:py-16 px-6 md:px-16 lg:px-24 max-w-2xl space-y-6">
    <ColorModeToggle />
    <NavigationBar />
    <div className="md:pl-16">{children}</div>
  </div>
);
const Main = () => (
  <Wrapper>
    <Outlet />
  </Wrapper>
);

export default Main;
