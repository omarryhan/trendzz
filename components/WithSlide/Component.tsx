import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import styles from './styles.css';

interface Props {
  onSlide: () => void | Promise<void>;
  turnedOff?: boolean
}

const triggerActionOn = -75;
const maxSlide = -150;

const Component: React.FC<Props> = ({ children, onSlide, turnedOff }) => {
  const [isDraggingSetOnce, setIsDraggingSetOnce] = React.useState(false);
  const [ariaDragState, setAriaDragState] = React.useState(0);

  const animation = useAnimation();
  const bind = useGesture({
    onDrag: ({ dragging, movement, canceled }) => {
      if (dragging && !canceled && movement[0] < 0 && movement[0] > (maxSlide)) {
        animation.start({ x: movement[0] });
        setAriaDragState(movement[0]);
        if (movement[0] <= triggerActionOn && !isDraggingSetOnce) {
          onSlide();
          setIsDraggingSetOnce(true);
        }
      }
    },
    onDragEnd: () => {
      setIsDraggingSetOnce(false);
      setAriaDragState(0);
      animation.start({ x: 0 });
    },
  }, {
    drag: {
      axis: 'x',
    },
  });

  if (turnedOff) {
    return (
      <div>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      animate={animation}
      className={styles.slideDiv}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={maxSlide}
      aria-valuenow={ariaDragState}
      aria-valuetext={ariaDragState <= triggerActionOn ? 'Marked as read state has been toggled' : `Drag until ${triggerActionOn} for toggling the mark as read state`}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
};

export default Component;
