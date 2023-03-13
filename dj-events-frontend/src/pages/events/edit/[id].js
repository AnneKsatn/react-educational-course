import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from '@/config/index';
import styles from "@/styles/Form.module.css"
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment/moment";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload.js"


export default function EditEventPage({ evt, evt_id }) {

    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description
    })

    const [imagePreview, setImagePreview] = useState(
        evt.image ? evt.image.formats.thumbnail.url : null
    )

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', values)

        const hasEmptyFields = Object.values(values).some((element) => element === '')
        if (hasEmptyFields) {
            console.log(values)
            toast.error('Please fill the object')
        } else {


            let data = { "data": values }
            console.log(data)

            const res = await fetch(`${API_URL}/api/events/${evt_id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!res.ok) {
                toast.error('Something Went Wrong')
            } else {
                const evt = await res.json()
                console.log(evt)
                router.push(`/events/${evt.data.attributes.slug}`)
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async(e) => {
        const res = await fetch(`${API_URL}/api/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
    }

    return (
        <Layout>
            <Link href="/events">Go back</Link>
            <div>
                <h1>Edit Event</h1>
                <ToastContainer />
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="performers">Performers</label>
                        <input
                            type="text"
                            id="performers"
                            name="performers"
                            value={values.performers}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            value={values.venue}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor="address">Time</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            value={values.time}
                            onChange={handleInputChange}>
                        </input>
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}>
                    </textarea>
                </div>

                <input type="submit" value="Update Event" className="btn"></input>

            </form>

            <h2>Event Image</h2>
            {imagePreview ?
                (<Image src={imagePreview} height={100} width={100} />)
                : <div><p>No Image Uploaded</p></div>
            }

            <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />

            <div>
                <div className="btn-secondary">
                    <FaImage /> Set Image
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/api/events/${id}`)
    const evt = await res.json()

    return {
        props: {
            evt: evt.data.attributes,
            evt_id: evt.data.id
        }
    }
}
