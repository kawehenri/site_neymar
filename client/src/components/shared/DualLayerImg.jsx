/**
 * Renders a container image with a blurred background fill +
 * the main image in object-contain so no part is cropped.
 */
export default function DualLayerImg({ src, alt = '', className = '', imgClassName = '' }) {
  return (
    <div className={`dual-img-wrap ${className}`}>
      <img src={src} alt="" className="img-bg" aria-hidden="true" decoding="async" />
      <img src={src} alt={alt} className={`img-main ${imgClassName}`} loading="lazy" decoding="async" />
    </div>
  )
}
