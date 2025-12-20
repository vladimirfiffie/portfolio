import React, { useState } from 'react'
import { Button } from 'aceternity-ui'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    console.log('Submit', form)
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })

    // Hide success message after 3s
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Me</h2>

      {submitted && (
        <p className="text-green-600 font-semibold mb-4 text-center">
          Message sent successfully!
        </p>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={onChange}
            rows={5}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center mt-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold px-6 py-2 rounded-md
                       hover:rotate-3 transition-transform duration-300 shadow-md"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  )
}
