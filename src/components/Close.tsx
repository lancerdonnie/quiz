const Close = ({ onClick }: { onClick: () => void }) => {
  return (
    <i
      onClick={onClick}
      className="fa fa-times absolute top-1.5 right-1.5 bg-red-600 text-white p-1.5 px-2 cursor-pointer rounded"
    />
  );
};

export default Close;
