function Loading({ size = 10 }) {
  const sizeInRem = `${size}rem`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="flex h-[100dvh] items-center justify-center"
    >
      <div
        style={{
          width: sizeInRem,
          height: sizeInRem,
        }}
        className="animate-spin rounded-full border-4 border-gray-300 border-t-green-400"
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default Loading;
