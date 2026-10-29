const ErrorInputMessage = ({ error }: { error: string }) => {
  return <div className="text-red-600 font-semibold text-xs">{error}</div>;
};

export default ErrorInputMessage;