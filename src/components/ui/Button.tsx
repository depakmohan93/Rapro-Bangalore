'use client'

import React from 'react'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'cta-white'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string          // renders as <Link> when provided
  external?: boolean     // adds target="_blank" rel="noopener"
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  shine?: boolean        // adds the slide-shine hover effect (used on CTAs)
  children: React.ReactNode
}

// ── Style Maps ────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  /**
   * primary — solid green, used in Navbar CTA & Hero form submit
   */
  primary: [
    'bg-[#73B130] text-white',
    'hover:bg-[#659f28]',
    'focus-visible:ring-2 focus-visible:ring-[#73B130] focus-visible:ring-offset-2',
  ].join(' '),

  /**
   * secondary — dark green, used for secondary actions
   */
  secondary: [
    'bg-[#0D631B] text-white',
    'hover:bg-[#0a5217]',
    'focus-visible:ring-2 focus-visible:ring-[#0D631B] focus-visible:ring-offset-2',
  ].join(' '),

  /**
   * ghost — transparent with green text, used inside sections
   */
  ghost: [
    'bg-transparent text-[#73B130]',
    'hover:bg-[#73B130]/10',
    'focus-visible:ring-2 focus-visible:ring-[#73B130] focus-visible:ring-offset-2',
  ].join(' '),

  /**
   * outline — white border, white text — for dark backgrounds
   */
  outline: [
    'bg-transparent text-white border border-white/60',
    'hover:bg-white/10',
    'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
  ].join(' '),

  /**
   * cta-white — white bg, black text with shine effect
   * Used in all three CTA sections (matches existing design)
   */
  'cta-white': [
    'text-black bg-white',
    // shine effect ─ mirrors existing CTA className
    'before:absolute before:inset-0 before:rounded-[inherit]',
    'before:bg-[linear-gradient(45deg,transparent_25%,rgba(200,200,200,0.4)_50%,transparent_75%)]',
    'before:bg-[length:250%_250%] before:bg-[position:200%_0]',
    'before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000',
    'hover:before:bg-[position:-100%_0]',
    'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm:  'py-[8px]  px-[22px] text-sm',
  md:  'py-[10px] px-6      text-base',
  lg:  'py-[13px] px-8      text-[1.0625rem]',
}

// ── Component ─────────────────────────────────────────────────────
export function Button({
  variant    = 'primary',
  size       = 'md',
  href,
  external   = false,
  fullWidth  = false,
  leftIcon,
  rightIcon,
  shine      = false,
  children,
  className  = '',
  ...props
}: ButtonProps) {

  const base = [
    // layout
    'inline-flex items-center justify-center gap-2',
    // typography
    'font-poppins font-semibold leading-none whitespace-nowrap',
    // shape
    'rounded-md',
    // transitions
    'transition-all duration-200',
    // positioning (needed for shine pseudo-element)
    'relative overflow-hidden',
    // cursor
    'cursor-pointer',
    // focus
    'outline-none',
    // disabled
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // width
    fullWidth ? 'w-full' : '',
    // variant + size
    variantStyles[variant],
    sizeStyles[size],
    // caller overrides
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {leftIcon  && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  )

  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <Link href={href} className={base} {...linkProps}>
        {content}
      </Link>
    )
  }

  return (
    <button className={base} {...props}>
      {content}
    </button>
  )
}

// ── Convenience exports ───────────────────────────────────────────
export const PrimaryButton   = (p: Omit<ButtonProps, 'variant'>) => <Button variant="primary"   {...p} />
export const SecondaryButton = (p: Omit<ButtonProps, 'variant'>) => <Button variant="secondary" {...p} />
export const CTAWhiteButton  = (p: Omit<ButtonProps, 'variant'>) => <Button variant="cta-white" {...p} />
export const GhostButton     = (p: Omit<ButtonProps, 'variant'>) => <Button variant="ghost"     {...p} />
export const OutlineButton   = (p: Omit<ButtonProps, 'variant'>) => <Button variant="outline"   {...p} />
