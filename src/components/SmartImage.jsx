import { useState } from 'react'

export default function SmartImage({
  src,
  alt,
  className = '',
  wrapperClass = '',
  loading = 'lazy',
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`overflow-hidden ${wrapperClass}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={`img-fade ${loaded ? 'loaded' : ''} ${className}`}
      />
    </div>
  )
}