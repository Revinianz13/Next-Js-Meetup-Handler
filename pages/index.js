import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
// const DUMMY_MEETUPS = [
// 	{
// 		id: 'm1',
// 		tittle: 'A First Meetup',
// 		image:
// 			'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
// 		address: 'Some address 5 , 12345 Some City',
// 		description: 'This is a frist meetup!',
// 	},
// 	{
// 		id: 'm2',
// 		tittle: 'A Second Meetup',
// 		image:
// 			'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
// 		address: 'Some address 10 , 12345 Some City',
// 		description: 'This is a second meetup!',
// 	},
// ];

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Broswe a huge list of higly active React meetups!'
				></meta>
			</Head>
			<MeetupList meetups={props.meetups} />;
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	//this auto revaluates the page content automaticly for every request

//   const req = context.req;
//   const res = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }
// reavaluation of page
// fetch data from an api
// read data from everywhere
// static props is more faster

export async function getStaticProps() {
	const client = new MongoClient(
		'mongodb+srv://revi:12345@atlascluster.mjqn2av.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	await client.connect();
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		// revalidate: 1 secs for an auto update
	};
}

export default HomePage;
