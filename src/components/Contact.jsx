const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="glass-card contact-card">
          <h2>Let's build something together</h2>
          <p>新しいプロジェクトの相談や、ただの挨拶でもお気軽にどうぞ。</p>
          <a href="mailto:example@email.com" className="contact-email">
            example@email.com
          </a>
          <div className="social-links">
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
