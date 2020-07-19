import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import styles from './styles.css';

interface Props {
  onSlide: () => void | Promise<void>;
}

const triggerActionOn = -130;
const maxSlide = -200;

const Component: React.FC<Props> = ({ children, onSlide }) => {
  const [isDraggingSetOnce, setIsDraggingSetOnce] = React.useState(false);

  const animation = useAnimation();
  const bind = useGesture({
    onDrag: ({ dragging, movement, canceled }) => {
      if (dragging && !canceled && movement[0] < 0 && movement[0] > (maxSlide)) {
        animation.start({ x: movement[0] });
        if (movement[0] < triggerActionOn && !isDraggingSetOnce) {
          onSlide();
          setIsDraggingSetOnce(true);
        }
      }
    },
    onDragEnd: () => {
      setIsDraggingSetOnce(false);
      animation.start({ x: 0 });
    },
  }, {
    drag: {
      axis: 'x',
    },
  });

  return (
    <motion.div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      animate={animation}
      className={styles.slideDiv}
      role="slider"
      aria-valuenow={1}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
};

export default Component;
