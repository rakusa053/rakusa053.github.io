const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h2 className="reveal-text">Hello, I'm Rakusa.</h2>
        <h1 className="gradient-text">Building meaningful web experiences.</h1>
        <p className="hero-description">
          最新のテクノロジーと洗練されたデザインを融合させ、ユーザーの心に残るデジタル体験を創造します。
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn primary">View Work</a>
          <a href="#contact" className="btn secondary">Get in Touch</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="blob"></div>
      </div>
    </section>
  );
};

export default Hero;
