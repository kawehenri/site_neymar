export default function ResponsiveImage({
  src,
  mobileSrc,
  sources = [],
  alt = '',
  className = '',
  imgClassName = '',
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority,
  position = 'center',
  fit = 'cover',
}) {
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <picture className={`block overflow-hidden ${className}`}>
      {mobileSrc && (
        <source media="(max-width: 767px)" srcSet={mobileSrc} />
      )}
      {sources.map(source => (
        <source
          key={`${source.type}-${source.srcSet}`}
          type={source.type}
          srcSet={source.srcSet}
          sizes={source.sizes || sizes}
          media={source.media}
        />
      ))}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={`h-full w-full ${fitClass} ${imgClassName}`}
        style={{ objectPosition: position }}
      />
    </picture>
  )
}
