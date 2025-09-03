import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

export function LazyImage({ 
  src, 
  alt, 
  className, 
  fallback = null, 
  placeholder = null,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          {placeholder || (
            <div className="w-8 h-8 rounded-full bg-muted-foreground/20" />
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      )}

      {/* Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          {fallback || (
            <div className="text-muted-foreground text-sm">Failed to load image</div>
          )}
        </div>
      )}
    </div>
  )
}

export function ProgressiveImage({ 
  src, 
  placeholder, 
  alt, 
  className, 
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageRef, setImageRef] = useState()

  useEffect(() => {
    let img
    if (imageRef && imageSrc !== src) {
      img = new Image()
      img.onload = () => {
        setImageSrc(src)
      }
      img.src = src
    }
    return () => {
      if (img) {
        img.onload = null
      }
    }
  }, [src, imageSrc, imageRef])

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      ref={setImageRef}
      className={cn(
        "transition-all duration-300",
        imageSrc === placeholder ? "blur-sm" : "blur-0",
        className
      )}
    />
  )
}