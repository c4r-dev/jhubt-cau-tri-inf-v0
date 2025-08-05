'use client';

import { useState, useEffect } from 'react';

interface Study {
  type: string;
  population: string;
  methodology: string;
  keyFindings: string;
  majorLimitations: string[];
}

interface TriangulationData {
  'Causal Hypothesis': string;
  studies: Study[];
}

export default function Home() {
  const [data, setData] = useState<TriangulationData | null>(null);
  const [userResponse, setUserResponse] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData[0]))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <main className="main-content">
        <section className="intro-section">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
            Causal Hypothesis
          </h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '1.0rem', 
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.5rem', margin: 0 }}>
                Does regular physical exercise causally improve academic performance in students?
              </h3>
            </div>
          </div>
        </section>
        
        <section className="studies-section">
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
            {data.studies.map((study, index) => (
              <div key={index} style={{ 
                flex: 1, 
                backgroundColor: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  Study {index + 1}
                </h3>
                <h4 style={{ 
                  backgroundColor: '#dbeafe', 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  marginBottom: '1rem',
                  color: '#1e40af'
                }}>
                  {study.type}
                </h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Population:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{study.population}</p>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Methodology:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{study.methodology}</p>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Key Findings:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{study.keyFindings}</p>
                </div>
                
                <div>
                  <strong>Major Limitations:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1rem' }}>
                    {study.majorLimitations.map((limitation, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem', color: '#dc2626' }}>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="response-section">
          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '2rem', 
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              What limitations are resolved by combining the evidence from these 2 studies?
            </h3>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Consider how the strengths of one study might address the weaknesses of the other..."
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '1rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <button
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
                onClick={() => console.log('User response:', userResponse)}
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}