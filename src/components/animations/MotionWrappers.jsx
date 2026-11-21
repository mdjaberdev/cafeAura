"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Standard smooth cubic-bezier easing for luxury feel
export const smoothEase = [0.25, 1, 0.5, 1];

/**
 * FadeIn Component
 * Fades in an element with optional subtle translation.
 */
export const FadeIn = ({
  children,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  delay = 0,
  duration = 0.6,
  distance = 20,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * RevealOnScroll Component
 * Smoothly triggers entrance when the element scrolls into the viewport once.
 */
export const RevealOnScroll = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  distance = 24,
  amount = 0.15,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer Component
 * Container for lists/grids where child StaggerItems cascade in.
 */
export const StaggerContainer = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0,
  amount = 0.1,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem Component
 * Individual item inside a StaggerContainer.
 */
export const StaggerItem = ({
  children,
  distance = 20,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.55,
        ease: smoothEase,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

/**
 * ScaleIn Component
 * Subtly scales an element from 0.96 to 1 with fade.
 */
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.6,
  fromScale = 0.95,
  className = "",
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : fromScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: smoothEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * PageTransition Component
 * Provides smooth, non-blocking page entrance transitions.
 */
export const PageTransition = ({ children, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
