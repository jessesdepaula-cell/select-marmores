'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.75, ease },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'h2' | 'p' | 'span';
}) {
  const MotionTag = motion[As] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  delayStep = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  delayStep?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={i * (delayStep / 0.06)}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
