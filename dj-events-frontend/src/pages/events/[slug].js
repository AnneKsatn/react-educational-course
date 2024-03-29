import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import {API_URL} from '@/config/index.js'
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from 'next/image'

export default function EventPage({evt, evt_id}) {

    const deleteEvent = (e) => {
        console.log(e)
    }

    const router = useRouter()

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt_id}`}>
                        <div>
                            <FaPencilAlt /> Edit Event
                        </div>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <div>
                    <span>
                        {evt.date} at {evt.time}
                    </span>
                    <h1>{evt.name}</h1>

                    {evt.image && (
                        <div className={styles.image}>
                            {/* <Image src={evt.image} width={960} height={960} /> */}
                        </div>
                    )}

                    <h3>Performers:</h3>
                    <p>{evt.performers}</p>

                    <h3>Description</h3>
                    <p>{evt.description}</p>

                    <h3>Venue: {evt.venue}</h3>
                    <p>{evt.address}</p>

                    <Link href='/events'>
                        <div className={styles.back}> {`< `}Go Back </div>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()

    const paths = events.data.map(evt => ({
        params: {slug: evt.attributes.slug}
    }))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params: { slug }}) {
    const res = await fetch(`${API_URL}/api/events?filters\[slug\][$eq]=${slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events.data[0].attributes,
            evt_id: events.data[0].id
        },
        revalidate: 1
    }
}

// export async function getServerSideProps({query: { slug }}) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }