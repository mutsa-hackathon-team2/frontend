function Chip({
  children,
  className = "",
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-100 px-7 py-2 text-body2 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Chip;
