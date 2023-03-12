import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventsPage(events) {
  console.log(events)
  return (
    <Layout>
      <h1>Events</h1>

      {events.events.length == 0 && <h3>No events to show</h3>}

      {events.events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
        // <h3 key={evt.id}>{evt.name}</h3>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(API_URL + '/api/events')
  const events = await res.json()

  return {
    props: {events}
  }
}