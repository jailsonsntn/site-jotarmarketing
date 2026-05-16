type BrandLogoProps = {
  className?: string;
  alt?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

const BrandLogo = ({
  className = "h-12 w-auto",
  alt = "Jota R Marketing",
  loading = "eager",
  fetchPriority = "auto",
}: BrandLogoProps) => (
  <picture>
    <source srcSet="/uploads/2dcc7432-8798-4ae1-b564-16c9f42cc0d1.avif" type="image/avif" />
    <source srcSet="/uploads/2dcc7432-8798-4ae1-b564-16c9f42cc0d1.webp" type="image/webp" />
    <img
      src="/uploads/2dcc7432-8798-4ae1-b564-16c9f42cc0d1.png"
      alt={alt}
      width={632}
      height={180}
      decoding="async"
      loading={loading}
      {...({ fetchpriority: fetchPriority } as Record<string, string>)}
      className={className}
    />
  </picture>
);

export default BrandLogo;