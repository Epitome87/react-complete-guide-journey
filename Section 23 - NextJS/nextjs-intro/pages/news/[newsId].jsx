import React from 'react';
import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();
  const newsId = router.query.newsId;

  // Send a request to backend API to fetch the news item with this newsId

  return (
    <div>
      <h1>Something Important</h1>
      <p>{newsId}</p>
    </div>
  );
}

export default DetailPage;
