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

interface HintData {
  hintContent: string[];
}

export default function Home() {
  const [data, setData] = useState<TriangulationData | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [secondResponse, setSecondResponse] = useState('');
  const [hintData, setHintData] = useState<HintData | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showThirdQuestion, setShowThirdQuestion] = useState(false);
  const [thirdResponse, setThirdResponse] = useState('');
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData[0]))
      .catch(error => console.error('Error loading data:', error));
    
    fetch('/hint.json')
      .then(response => response.json())
      .then(hintJson => setHintData(hintJson))
      .catch(error => console.error('Error loading hint data:', error));
    
    // Scroll to bottom on first render
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container">
      <main className="main-content">
        <section className="intro-section">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '1.0rem', 
              borderRadius: '8px',
              border: '1px solid black',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2563eb', fontSize: '1.5rem', margin: 0, fontWeight: 'normal' }}>
                Does regular physical exercise causally improve academic performance in students?
              </h3>
            </div>
          </div>
        </section>
        
        <section className="studies-section">
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', marginTop: '1rem' }}>
            {data.studies.map((study, index) => (
              <div key={index} style={{ 
                flex: 1, 
                backgroundColor: '#f8fafc', 
                padding: '1.5rem', 
                borderRadius: '8px',
                border: '1px solid black'
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

        {!submissionComplete && (
          <section className="response-section" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '2rem', 
              borderRadius: '8px',
              border: '1px solid black'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                What limitations are resolved by combining the evidence from these 2 studies?
              </h3>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Consider how the strengths of one study might address the weaknesses of the other..."
              disabled={showSecondQuestion}
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
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                className="button"
                disabled={userResponse.length < 10 || showSecondQuestion}
                onClick={() => {
                  console.log('User response:', userResponse);
                  setShowSecondQuestion(true);
                  setTimeout(() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }, 100);
                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </section>
        )}

        {showSecondQuestion && !submissionComplete && (
          <section className="response-section" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '2rem', 
              borderRadius: '8px',
              border: '1px solid black'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                What limitations remain that are not addressed by the combination of Study 1 and Study 2?
              </h3>
              <div 
                style={{ 
                  color: '#2563eb', 
                  cursor: 'pointer', 
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}
                onClick={() => {
                  setShowHint(!showHint);
                  if (!showHint) {
                    setTimeout(() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }, 100);
                  }
                }}
              >
&gt; Need a hint? Click here for potential confounders and mediators
              </div>
              {showHint && hintData && (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid black',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {hintData.hintContent.map((hint, index) => (
                      <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <textarea
                value={secondResponse}
                onChange={(e) => setSecondResponse(e.target.value)}
                placeholder="Consider what confounders, mediators, or other limitations haven't been addressed..."
                disabled={showThirdQuestion}
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
              <div style={{ marginTop: '1rem', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  className="button"
                  onClick={() => {
                    setShowSecondQuestion(false);
                  }}
                >
                  BACK
                </button>
                <button
                  className="button"
                  disabled={secondResponse.length < 10 || showThirdQuestion}
                  onClick={() => {
                    console.log('Second response:', secondResponse);
                    setShowThirdQuestion(true);
                    setTimeout(() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </section>
        )}

        {showThirdQuestion && !submissionComplete && (
          <section className="response-section" style={{ padding: '0 1rem', marginBottom: '2rem' }}>
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '2rem', 
              borderRadius: '8px',
              border: '1px solid black'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Propose a third study design that could address some of the remaining limitations:
              </h3>
              <textarea
                value={thirdResponse}
                onChange={(e) => setThirdResponse(e.target.value)}
                placeholder="Describe the population, methodology, and how it addresses specific limitations you identified..."
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
              <div style={{ marginTop: '1rem', textAlign: 'center', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  className="button"
                  onClick={() => {
                    setShowThirdQuestion(false);
                  }}
                >
                  BACK
                </button>
                <button
                  className="button"
                  disabled={thirdResponse.length < 10}
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/submissions', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          firstResponse: userResponse,
                          secondResponse: secondResponse,
                          thirdResponse: thirdResponse
                        })
                      });
                      
                      if (response.ok) {
                        setSubmissionComplete(true);
                        // Fetch recent submissions
                        const submissionsResponse = await fetch('/api/submissions');
                        if (submissionsResponse.ok) {
                          const submissionsData = await submissionsResponse.json();
                          setSubmissions(submissionsData.submissions);
                        }
                        setTimeout(() => {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }, 100);
                      } else {
                        console.error('Failed to submit data');
                      }
                    } catch (error) {
                      console.error('Error submitting data:', error);
                    }
                  }}
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </section>
        )}

        {submissionComplete && submissions.length > 0 && (
          <section className="response-section" style={{ padding: '0 1rem' }}>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid black'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
                Proposed Third Study Designs
              </h3>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {/* Current user's proposal first */}
                <div style={{
                  marginBottom: '1rem',
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  border: '1px solid black'
                }}>
                  <h4 style={{ 
                    backgroundColor: '#dbeafe', 
                    padding: '0.5rem', 
                    borderRadius: '4px', 
                    marginBottom: '1rem',
                    color: '#1e40af',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    <div style={{ marginLeft: '-3px' }}>Your Proposal:</div>
                  </h4>
                  <div style={{ fontSize: '0.9rem' }}>
                    {thirdResponse}
                  </div>
                </div>
                
                {/* Other submissions */}
                {submissions.map((submission: any) => (
                  <div key={submission._id} style={{
                    marginBottom: '1rem',
                    padding: '1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '4px',
                    border: '1px solid black'
                  }}>
                    <div style={{ fontSize: '0.9rem' }}>
                      {submission.thirdResponse}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  className="button"
                  onClick={() => {
                    setSubmissionComplete(false);
                    setShowSecondQuestion(false);
                    setShowThirdQuestion(false);
                    setUserResponse('');
                    setSecondResponse('');
                    setThirdResponse('');
                    setShowHint(false);
                    setSubmissions([]);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  START OVER
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}