import Layout from "@/components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from '@/config/index';
import styles from "@/styles/Form.module.css"
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function AddEventPage() {

    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', values)

        const hasEmptyFields = Object.values(values).some((element) => element === '')
        if (hasEmptyFields) {
            console.log(values)
            toast.error('Please fill the object')
        } else {


            let data = {"data": values}
            console.log(data)

            const res = await fetch(`${API_URL}/api/events`, {
                method: 'POST',
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

    return (
        <Layout>
            <Link href="/events">Go back</Link>
            <div>
                <h1>Add Event</h1>
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
                            value={values.date}
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

                <input type="submit" value="Add Event" className="btn"></input>

            </form>
        </Layout>
    )
}
