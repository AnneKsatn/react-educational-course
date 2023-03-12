import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage(events) {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.events.length == 0 && <h3>No events to show</h3>}

      {events.events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}

      {events.events.length > 0 && (
        <Link href='/events'>
          <div> View All Events </div>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(API_URL + '/api/events')
  const events = await res.json()

  return {
    props: {events:events.slice(0, 3)}
  }
}