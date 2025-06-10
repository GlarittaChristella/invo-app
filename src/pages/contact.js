export default function ContactPage() {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      lineHeight: 1.6
    }}>
      <h1 style={{ fontSize: '2rem', color: '#2563eb', marginBottom: '1rem' }}>
        Get in Touch
      </h1>
      <p>
        Have questions, feedback, or need support? We'd love to hear from you!
        Our team is here to assist small and medium businesses in managing inventory the smart way.
      </p>

      <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Your Name"
          style={{
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={{
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          style={{
            padding: '0.75rem',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
