import React from 'react'

export function Button({children, className='', variant='primary', ...props}){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg'
  const style = variant === 'ghost' ? {background:'transparent'} : {}
  return (
    <button className={className} style={style} {...props}>{children}</button>
  )
}

export function IconButton({icon, ariaLabel, ...props}){
  return (
    <button aria-label={ariaLabel} {...props}>{icon ? icon : '🔘'}</button>
  )
}

export default {Button, IconButton}
