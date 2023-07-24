import React from 'react';
import {Spinner} from '../Spinner';
import { IButton } from './i-button';

export const Button = (props: IButton) => {
  const className = props.className || '';
  const action = props.onClick;
  const loading = props.loading || false;
  const disabled = props.disabled || false;
  const type = props.type || 'button';
  const text = props.text || props.children;
  return (
    <button onClick={action} className={`w-full block ${disabled ? 'bg-slate-400' : 'bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400'} text-white font-semibold rounded-lg px-4 py-3 mt-6 ${className}`}  disabled={disabled} type={type}>
      {loading ? <Spinner /> : text}
    </button>
  );
};
