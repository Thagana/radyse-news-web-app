import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: string;
    type?: 'submit' | 'button',
    design?: 'primary' | 'secondary' | 'primary long'
    onClick?: () => void;
    disabled?: boolean; 
}


export default function Button(props: Props) {
    const {type, children, onClick, design, disabled } = props;
  return (
    <motion.button
        onClick={onClick}
        type={type}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={design}
        disabled={disabled}
    >
        {children}
    </motion.button>
  )
}