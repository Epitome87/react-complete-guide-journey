import React from 'react';
import Link from 'next/link';

function NewsPage() {
  return (
    <React.Fragment>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href='/nextjs-is-a-great-framework'>
            NextJS Is A Great Framework
          </Link>
        </li>
        <li>
          <Link href='/is-nextjs-a-great-framework'>
            Is NextJS A Great Framework?
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default NewsPage;
