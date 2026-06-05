import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './ContactForm.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        setError('Please fill in all required fields')
        setLoading(false)
        return
      }

      // Check if supabase is configured
      if (!supabase) {
        setError('Supabase not configured. Please check your environment variables.')
        setLoading(false)
        return
      }

      console.log('Submitting form data:', formData)

      // Insert into Supabase
      const { data, error: supabaseError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            subject: formData.subject || null,
            message: formData.message
          }
        ])

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        throw supabaseError
      }

      console.log('Form submitted successfully:', data)

      // Success
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        <p className="section-subtitle">Have questions? We'd love to hear from you!</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>support@techrx.com</p>
            </div>
            <div className="info-item">
              <h3>📱 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <h3>📍 Location</h3>
              <p>Tech City, TC 12345</p>
            </div>
            <div className="info-item">
              <h3>⏰ Hours</h3>
              <p>Mon - Fri: 9AM - 6PM</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="success-message">
                ✅ Thank you! Your message has been sent successfully.
              </div>
            )}

            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="5"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
