import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom'; 

function ErrorPage() {
  const location = useLocation();
  const previousPath = location.state?.from || '/';

  return (
    <div style={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 Not Found - Global Construction & Engineering</title>
        <meta name="description" content="The page you’re looking for doesn’t exist. Return to the homepage or explore our services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 style={styles.heading}>404 Error</h1>
      <p style={styles.message}>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to={previousPath} style={styles.link}>Go back to Previous Page</Link>
      <p style={styles.message}>or</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '3rem',
    margin: '0',
    color: '#343a40',
  },
  message: {
    fontSize: '1.5rem',
    margin: '20px 0',
    color: '#6c757d',
  },
  link: {
    fontSize: '1.2rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default ErrorPage;
