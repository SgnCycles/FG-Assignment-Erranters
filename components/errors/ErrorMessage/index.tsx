const ErrorMessage = ({ error }: { error: string }) => {
  return <div className="error-heading">{error}</div>;
};

export default ErrorMessage;