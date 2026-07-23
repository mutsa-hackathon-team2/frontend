import defaultCardImage from "../assets/images/img.png";

function ListCard({
  imageSrc = defaultCardImage,
  category = "공연",
  dDay = "D-4",
  date = "8. 10 ~ 8. 12",
  title = "데일리파티 여름 버스킹",
  onClick,
  className = "",
}) {
  const isClickable = typeof onClick === "function";

  const handleKeyDown = (event) => {
    if (!isClickable || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onClick();
  };

  return (
    <article
      className={`relative flex h-120 w-90 flex-col items-center justify-end overflow-hidden rounded-16 pt-29 cursor-pointer ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.9)_72%,#FFFFFF_100%)]"
      />

      <div className="z-10 flex w-full flex-1 flex-col items-start justify-end gap-5 px-10 py-8">
        <div className="flex items-center gap-2">
          <span className="rounded-100 bg-[#455DBA] px-4 py-1 text-body3 text-white">
            {category}
          </span>
          <span className="rounded-100 bg-[#455DBA] px-4 py-1 text-body3 text-white">
            {dDay}
          </span>
        </div>

        <div>
          <p className="mb-0 text-subtitle2 text-[#69788A]">{date}</p>
          <h2 className="text-title text-[#171E29]">{title}</h2>
        </div>
      </div>
    </article>
  );
}

export default ListCard;
