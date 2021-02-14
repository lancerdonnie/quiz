const Close = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <i
      {...props}
      className="fa fa-times absolute top-1.5 right-1.5 text-xl p-1.5 px-2 cursor-pointer rounded hover:text-red-600"
      data-testid="close"
    />
  );
};

export default Close;
