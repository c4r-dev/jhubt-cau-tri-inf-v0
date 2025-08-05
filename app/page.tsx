'use client';

export default function Home() {
  return (
    <div className="container">
      <main className="main-content">
        <section className="intro-section">
          <h2>Welcome to Triangulation in Causal Inference</h2>
          <p className="description">
            This application explores triangulation methods in causal inference research.
          </p>
        </section>
        
        <section className="content-section">
          <div className="content-grid">
            <div className="content-card">
              <h3>Research Methods</h3>
              <p>Explore different approaches to causal inference triangulation.</p>
            </div>
            
            <div className="content-card">
              <h3>Data Analysis</h3>
              <p>Analyze and interpret triangulation results.</p>
            </div>
            
            <div className="content-card">
              <h3>Methodology</h3>
              <p>Learn about the theoretical foundations and best practices.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}