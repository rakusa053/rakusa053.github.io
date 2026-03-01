const About = () => {
  const skills = ['HTML5', 'CSS3', 'JavaScript', 'Git', 'UI/UX Design', 'React', 'Vite'];
  
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="sub-title">Who I am</span>
          <h2>About Me</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Webの可能性を信じ、コードの一行一行に情熱を注いでいます。使いやすさと視覚的な魅力を両立させたソリューションを提供することが私の使命です。
            </p>
            <div className="skills">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
