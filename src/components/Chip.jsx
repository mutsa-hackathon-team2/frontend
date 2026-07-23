function Chip({ children, className = "" }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-100 px-7 py-2 text-body2 ${className}`}
    >
      {children}
    </div>
  );
}

export default Chip;
