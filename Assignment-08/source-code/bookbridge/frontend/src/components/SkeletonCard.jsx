export default function SkeletonCard({ hasImage = true }) {
  return (
    <div className="skeleton-card" aria-hidden="true">
      {hasImage && <div className="skeleton skeleton-image" />}
      <div className="skeleton-body">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line skeleton-author" />
        <div className="skeleton skeleton-line skeleton-badge" />
        <div className="skeleton-meta">
          <div className="skeleton skeleton-line skeleton-price" />
          <div className="skeleton skeleton-line skeleton-tag" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="books-masonry" id="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} hasImage={i % 3 !== 2} />
      ))}
    </div>
  );
}
