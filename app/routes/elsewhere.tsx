import { PropsWithChildren } from 'react';
import { NavigationBar } from '../components/NavigationBar';

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="antialiased leading-tight py-8 lg:py-16 px-6 md:px-16 lg:px-24 max-w-2xl space-y-6">
    {/* <ColorModeToggle /> */}
    <NavigationBar />
    <div className="md:pl-16">{children}</div>
  </div>
);
const HelloRemix = () => <Wrapper>Elsewhere</Wrapper>;

export default HelloRemix;
