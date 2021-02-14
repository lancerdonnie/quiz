const Close = ({ onClick }: { onClick: () => void }) => {
  return (
    <i
      onClick={onClick}
      className="fa fa-times absolute top-1.5 right-1.5 text-xl p-1.5 px-2 cursor-pointer rounded hover:text-red-600"
    />
  );
};

export default Close;
