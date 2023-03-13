import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length == 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.attributes.id} evt={evt.attributes}/>
        // <h3 key={evt.id}>{evt.name}</h3>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(API_URL + '/api/events?sort=date:ASC')
  const events = await res.json()

  return {
    props: {events: events.data}
  }
}