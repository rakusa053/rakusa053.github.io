const Projects = () => {
  const projectList = [
    {
      title: 'Modern E-commerce',
      description: 'シームレスな購買体験を提供する次世代のECプラットフォーム。',
      imageText: 'Project 1'
    },
    {
      title: 'Analytics Dashboard',
      description: 'データの可視化を極限までシンプルにした管理画面。',
      imageText: 'Project 2'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <span className="sub-title">Portfolio</span>
          <h2>Featured Projects</h2>
        </div>
        <div className="project-grid">
          {projectList.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <div className="image-mock">{project.imageText}</div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
