import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);


  const uploadFile = async () => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      "http://127.0.0.1:8000/upload",
      formData
    );

  setUploadResult(
  response.data
  );
  };


  const askQuestion = async () => {

  const response =
    await axios.post(
      "http://127.0.0.1:8000/ask",
      {
        query: question
      }
    );

  setAnswer(
    response.data.answer
  );

  setSources(
    response.data.sources
  );
};

  


return (
  <div className="container">

    <div className="hero">
      <h1>🚀 Enterprise RAG AI Assistant</h1>
      <p>Upload PDFs and Chat with Your Documents</p>
    </div>

    {/* Upload Card */}

    <div className="card">

      <h2>📄 Upload Document</h2>

      <p className="subtitle">
        Upload a PDF file to get started
      </p>

      <div className="upload-zone">

        <label className="file-upload">

          📄 Choose PDF

          <input
            type="file"
            hidden
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </label>

        <p className="upload-hint">
          PDF files only
        </p>

      </div>

      <button
        className="primary-btn"
        onClick={uploadFile}
      >
        Upload
      </button>

      {
        uploadResult && (
          <div className="upload-result">

            <div className="info-box">
              <strong>
                {uploadResult.filename}
              </strong>

              <span>
                Uploaded Successfully
              </span>
            </div>

            <div className="stat-box">
              <strong>
                {uploadResult.chunks_created}
              </strong>

              <span>
                Chunks Created
              </span>
            </div>

            <div className="stat-box">
              <strong>
                {uploadResult.stored_in_vector_db}
              </strong>

              <span>
                Stored in Vector DB
              </span>
            </div>

          </div>
        )
      }

    </div>

    {/* Ask Card */}

    <div className="card">

      <h2>💬 Ask Question</h2>

      <p className="subtitle">
        Ask anything about your document
      </p>

      <div className="ask-row">

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask anything about the document..."
        />

        <button
          className="primary-btn"
          onClick={askQuestion}
        >
          Ask
        </button>

      </div>

    </div>

    {/* Answer Card */}

    <div className="card">

      <h2>🤖 AI Answer</h2>

      <div className="answer-box">

        {
          answer
            ? answer
            : "No answer yet."
        }

      </div>

    </div>

    {/* Sources Card */}

    <div className="card">

      <h2>📚 Sources</h2>

      {
        sources.length > 0 ? (

          sources.map(
            (source, index) => (

              <div
                key={index}
                className="source-box"
              >
                {source}
              </div>

            )
          )

        ) : (

          <div className="empty-source">
            No sources yet.
          </div>

        )
      }

    </div>

  </div>
);
  
}

export default App