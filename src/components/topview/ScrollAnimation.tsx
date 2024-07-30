'use client'; 

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
  });

  return (
    <animated.div ref={ref} style={animationProps}>
      {children}
    </animated.div>
  );
};

export default ScrollAnimation;