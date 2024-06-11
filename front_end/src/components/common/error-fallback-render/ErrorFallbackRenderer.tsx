const ErrorFallbackRenderer = ({ error }: any) => {
  return (
    <div
      role="alert"
      className="d-flex align-items-center justify-content-center h-full"
    >
      <div className="d-flex flex-column gap-2">
        <h1 className="text-dark text-2xl">Oops! Something went wrong ...</h1>
        <h3 className="text-danger">{error?.message}</h3>
      </div>
    </div>
  );
};

export default ErrorFallbackRenderer;
