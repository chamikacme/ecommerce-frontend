const Logo = ({ size }: { size?: string }) => {
  return (
    <div className={"font-sans" + (size ? ` ${size}` : " text-3xl")}>
      <span className="text-primary font-extrabold">E-</span>
      <span>Commerce</span>
    </div>
  );
};

export default Logo;
