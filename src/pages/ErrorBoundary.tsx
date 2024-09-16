
export const ErrorBoundary = ({ error } : any) => {
  return (
    <section className="hero is-danger is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Oops! Something went wrong.
          </h1>
          <h2 className="subtitle">
            We're sorry, but an error occurred while processing your request.
          </h2>
          {error && (
            <div className="notification is-danger is-light">
              <strong>Error details:</strong> {error.message}
            </div>
          )}
          <button className="button is-light" onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      </div>
    </section>
  );
}

export default ErrorBoundary;