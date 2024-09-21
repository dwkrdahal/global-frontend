import React from 'react';
import { Helmet } from 'react-helmet';

const AdminHelmet = ({ title, description, url }) => {
  return (
    <Helmet>
      {/* Dynamic Page Title */}
      <title>{title} | Admin Panel</title>

      {/* Meta Description */}
      <meta
        name="description"
        content={description}
      />

      {/* Meta Keywords */}
      <meta
        name="keywords"
        content="admin panel, construction, engineering, management, Global Construction"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={`${title} | Admin Panel`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="images/logo.jpg" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Admin Panel`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="images/logo.jpg" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default AdminHelmet;
