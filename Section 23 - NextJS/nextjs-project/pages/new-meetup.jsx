import React from 'react';
import Head from 'next/head';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

function NewMeetupPage() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);
    // Send request to our API route
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    router.push('/');
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </React.Fragment>
  );
}

export default NewMeetupPage;
