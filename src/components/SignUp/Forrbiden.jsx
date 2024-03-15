const ForbiddenPage = () => {
  return (
    <div className="forbidden-page">
      <h1>Forbidden (403)</h1>

      <p>
        You don't have permission to access this page. This could be due to:
      </p>

      <ul className="reasons">
        <li>Incorrect permissions for your account.</li>
        <li>Trying to access a private resource.</li>
        <li>A temporary issue with the server.</li>
      </ul>

      <ul className="actions">
        <li>
          <a href="/">Go back to Home</a>
        </li>
        <li>
          <a href="/contact">Contact Support</a>
        </li>
      </ul>
    </div>
  );
};

export default ForbiddenPage;
