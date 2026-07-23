function SubChip({ children, className = "" }) {
  return (
    <div
      className={`inline-flex items-center justify-center gap-2 rounded-100 px-4 py-1 text-body3 ${className}`}
    >
      {children}
    </div>
  );
}

export default SubChip;
