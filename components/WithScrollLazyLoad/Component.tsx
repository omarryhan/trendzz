import React from 'react';

interface ChildElementProps {
  nToRender: number;
}

interface Props {
  children: (arg0: ChildElementProps) => ReturnType<React.FC>;
  maxItems: number;
  startingItems: number;
}

const Component: React.FC<Props> = ({ children, maxItems, startingItems }) => {
  const [nReachedBottom, setNReachedBottom] = React.useState(1);

  const scrollHandler = (): void => {
    const reachedEnd = (
      (window.innerHeight + window.scrollY
      // adding 600 so that it renders the next page a bit before the user reaches the end
      ) >= document.body.offsetHeight - 600
    );
    if (reachedEnd) {
      setNReachedBottom(nReachedBottom + 1);
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('scroll', scrollHandler);
      return function cleanup(): void {
        document.removeEventListener('scroll', scrollHandler);
      };
    } else {
      return undefined;
    }
  });

  return children({ nToRender: nReachedBottom * startingItems });
};

export default Component;
