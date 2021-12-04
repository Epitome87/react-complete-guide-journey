import React from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function Homepage(props) {
  return (
    <React.Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>;
    </React.Fragment>
  );
}

export async function getStaticProps() {
  // Fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://Matthew:Filkkmghm2QCDUzZ@cluster0.1ryx5.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const fetchedMeetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: fetchedMeetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default Homepage;
