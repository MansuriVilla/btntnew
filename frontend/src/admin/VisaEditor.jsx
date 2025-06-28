import React, { useState, useEffect } from "react";

function VisaEditor() {
  const [visas, setVisas] = useState([]);
  const [newVisa, setNewVisa] = useState({
    slug: "",
    title: "",
    currency: "$",
    price: 0,
    description: "",
    image: "",
    link: "",
    visaTypes: [{ name: "", description: "" }],
    documents: [""],
    processSteps: [{ title: "", description: "" }],
    processingTime: "",
    additionalFees: [{ name: "", amount: 0 }],
    faqs: [{ question: "", answer: "" }],
    applyHelp: [{ title: "", text: "", link: "" }],
    premiumServices: [{ title: "", description: "", link: "" }],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const correctPassword = "##$$btnt_2025#@@!"; // Replace with JWT in production

  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const response = await fetch("/api/visas");
      if (!response.ok) throw new Error("Failed to load visas");
      const data = await response.json();
      setVisas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Incorrect password");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewVisa({ ...visas[index] });
    setError(null);
    setSuccessMessage(null);
  };

  const handleAddField = (field) => {
    setNewVisa({
      ...newVisa,
      [field]: [
        ...newVisa[field],
        field === "documents"
          ? ""
          : {
              name: "",
              description: "",
              link:
                field === "applyHelp" || field === "premiumServices"
                  ? ""
                  : undefined,
            },
      ],
    });
  };

  const handleRemoveField = (field, idx) => {
    setNewVisa({
      ...newVisa,
      [field]: newVisa[field].filter((_, i) => i !== idx),
    });
  };

  const handleFieldChange = (field, idx, key, value) => {
    const updatedField = [...newVisa[field]];
    if (field === "documents") {
      updatedField[idx] = value;
    } else {
      updatedField[idx] = { ...updatedField[idx], [key]: value };
    }
    setNewVisa({ ...newVisa, [field]: updatedField });
  };

  const validateVisa = () => {
    if (!newVisa.slug || !newVisa.title) {
      return "Slug and title are required";
    }
    if (
      editingIndex === null &&
      visas.some((visa) => visa.slug === newVisa.slug)
    ) {
      return "Slug must be unique";
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validateVisa();
    if (validationError) {
      setError(validationError);
      setSuccessMessage(null);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const updatedVisas =
        editingIndex !== null
          ? [
              ...visas.slice(0, editingIndex),
              newVisa,
              ...visas.slice(editingIndex + 1),
            ]
          : [...visas, newVisa];
      const response = await fetch("/api/save-visas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVisas),
      });
      if (!response.ok) throw new Error("Failed to save changes");
      setVisas(updatedVisas);
      setNewVisa({
        slug: "",
        title: "",
        currency: "$",
        price: 0,
        description: "",
        image: "",
        link: "",
        visaTypes: [{ name: "", description: "" }],
        documents: [""],
        processSteps: [{ title: "", description: "" }],
        processingTime: "",
        additionalFees: [{ name: "", amount: 0 }],
        faqs: [{ question: "", answer: "" }],
        applyHelp: [{ title: "", text: "", link: "" }],
        premiumServices: [{ title: "", description: "", link: "" }],
      });
      setEditingIndex(null);
      setSuccessMessage(
        editingIndex !== null
          ? "Visa updated successfully"
          : "Visa added successfully"
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const updatedVisas = visas.filter((_, i) => i !== index);
      const response = await fetch("/api/save-visas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVisas),
      });
      if (!response.ok) throw new Error("Failed to delete visa");
      setVisas(updatedVisas);
      setSuccessMessage("Visa deleted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="site_flex site_flex--column section_gap">
        <style>{`
          .site_flex {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            padding: 3rem 1rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          .site_content-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            width: 100%;
          }
          .section-title {
            font-size: 1.875rem;
            font-weight: 600;
            color: #1F2937;
            margin-bottom: 1.5rem;
          }
          .site_gradient-btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(to right, #3B82F6, #4F46E5);
            color: white;
            font-weight: 600;
            border-radius: 0.5rem;
            text-decoration: none;
            transition: background 0.3s;
            cursor: pointer;
          }
          .site_gradient-btn:hover {
            background: linear-gradient(to right, #2563EB, #4338CA);
          }
          .site_gradient-btn:disabled {
            background: #D1D5DB;
            cursor: not-allowed;
          }
          .editor-section {
            background: #F9FAFB;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .editor-section input {
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #D1D5DB;
            border-radius: 0.25rem;
            font-size: 1rem;
          }
          .error {
            color: #EF4444;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .success {
            color: #10B981;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .loading {
            color: #4B5563;
            font-weight: 600;
            margin-bottom: 1rem;
          }
        `}</style>
        <div className="site_content-container editor-section">
          <h2 className="section-title">Admin Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="site_gradient-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="site_flex site_flex--column section_gap">
      <style>{`
        .site_flex {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .site_content-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }
        .section-title {
          font-size: 1.875rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 1.5rem;
        }
        .site_gradient-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(to right, #3B82F6, #4F46E5);
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: background 0.3s;
          cursor: pointer;
        }
        .site_gradient-btn:hover {
          background: linear-gradient(to right, #2563EB, #4338CA);
        }
        .site_gradient-btn:disabled {
          background: #D1D5DB;
          cursor: not-allowed;
        }
        .editor-section {
          background: #F9FAFB;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .editor-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
        }
        .editor-section input, .editor-section textarea {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.25rem;
          font-size: 1rem;
        }
        .editor-section textarea {
          min-height: 100px;
        }
        .field-group {
          margin-bottom: 1.5rem;
        }
        .field-group button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background: #EF4444;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        .field-group button:hover {
          background: #DC2626;
        }
        .visa-list {
          display: grid;
          gap: 1rem;
        }
        .visa-item {
          padding: 1rem;
          background: #F9FAFB;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .visa-item img {
          max-width: 100%;
          height: auto;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }
        .error {
          color: #EF4444;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .success {
          color: #10B981;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .loading {
          color: #4B5563;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {

          .visa-list {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }
      `}</style>

      <div className="site_content-container">
        <h2 className="section-title">Visa Data Editor</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        {loading && <p className="loading">Saving...</p>}
      </div>

      {/* Visa List */}
      <div className="site_content-container visa-list">
        {visas.map((visa, index) => (
          <div key={index} className="visa-item">
            <img src={visa.image} alt={visa.title} />
            <h3>{visa.title}</h3>
            <p>Slug: {visa.slug}</p>
            <button
              className="site_gradient-btn"
              onClick={() => handleEdit(index)}
              disabled={loading}
            >
              Edit
            </button>
            <button
              className="field-group"
              style={{ marginLeft: "1rem" }}
              onClick={() => handleDelete(index)}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Editor Form */}
      <div className="site_content-container editor-section">
        <h3>{editingIndex !== null ? "Edit Visa" : "Add New Visa"}</h3>
        <input
          type="text"
          placeholder="Slug"
          value={newVisa.slug}
          onChange={(e) => setNewVisa({ ...newVisa, slug: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Title"
          value={newVisa.title}
          onChange={(e) => setNewVisa({ ...newVisa, title: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Currency"
          value={newVisa.currency}
          onChange={(e) => setNewVisa({ ...newVisa, currency: e.target.value })}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Price"
          value={newVisa.price}
          onChange={(e) =>
            setNewVisa({ ...newVisa, price: parseFloat(e.target.value) || 0 })
          }
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          value={newVisa.description}
          onChange={(e) =>
            setNewVisa({ ...newVisa, description: e.target.value })
          }
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newVisa.image}
          onChange={(e) => setNewVisa({ ...newVisa, image: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Link"
          value={newVisa.link}
          onChange={(e) => setNewVisa({ ...newVisa, link: e.target.value })}
          disabled={loading}
        />

        {/* Visa Types */}
        <div className="field-group">
          <h3>Visa Types</h3>
          {newVisa.visaTypes.map((type, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Type Name"
                value={type.name}
                onChange={(e) =>
                  handleFieldChange("visaTypes", idx, "name", e.target.value)
                }
                disabled={loading}
              />
              <textarea
                placeholder="Type Description"
                value={type.description}
                onChange={(e) =>
                  handleFieldChange(
                    "visaTypes",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("visaTypes", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("visaTypes")}
            disabled={loading}
          >
            Add Visa Type
          </button>
        </div>

        {/* Documents */}
        <div className="field-group">
          <h3>Documents</h3>
          {newVisa.documents.map((doc, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Document"
                value={doc}
                onChange={(e) =>
                  handleFieldChange("documents", idx, null, e.target.value)
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("documents", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("documents")}
            disabled={loading}
          >
            Add Document
          </button>
        </div>

        {/* Process Steps */}
        <div className="field-group">
          <h3>Process Steps</h3>
          {newVisa.processSteps.map((step, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Step Title"
                value={step.title}
                onChange={(e) =>
                  handleFieldChange(
                    "processSteps",
                    idx,
                    "title",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <textarea
                placeholder="Step Description"
                value={step.description}
                onChange={(e) =>
                  handleFieldChange(
                    "processSteps",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("processSteps", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("processSteps")}
            disabled={loading}
          >
            Add Process Step
          </button>
        </div>

        {/* Processing Time */}
        <div className="field-group">
          <h3>Processing Time</h3>
          <input
            type="text"
            placeholder="Processing Time"
            value={newVisa.processingTime}
            onChange={(e) =>
              setNewVisa({ ...newVisa, processingTime: e.target.value })
            }
            disabled={loading}
          />
        </div>

        {/* Additional Fees */}
        <div className="field-group">
          <h3>Additional Fees</h3>
          {newVisa.additionalFees.map((fee, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Fee Name"
                value={fee.name}
                onChange={(e) =>
                  handleFieldChange(
                    "additionalFees",
                    idx,
                    "name",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <input
                type="number"
                placeholder="Fee Amount"
                value={fee.amount}
                onChange={(e) =>
                  handleFieldChange(
                    "additionalFees",
                    idx,
                    "amount",
                    parseFloat(e.target.value) || 0
                  )
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("additionalFees", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("additionalFees")}
            disabled={loading}
          >
            Add Fee
          </button>
        </div>

        {/* FAQs */}
        <div className="field-group">
          <h3>FAQs</h3>
          {newVisa.faqs.map((faq, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) =>
                  handleFieldChange("faqs", idx, "question", e.target.value)
                }
                disabled={loading}
              />
              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) =>
                  handleFieldChange("faqs", idx, "answer", e.target.value)
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("faqs", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("faqs")}
            disabled={loading}
          >
            Add FAQ
          </button>
        </div>

        {/* Apply Help */}
        <div className="field-group">
          <h3>Apply or Get Help</h3>
          {newVisa.applyHelp.map((item, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleFieldChange("applyHelp", idx, "title", e.target.value)
                }
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Text"
                value={item.text}
                onChange={(e) =>
                  handleFieldChange("applyHelp", idx, "text", e.target.value)
                }
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Link"
                value={item.link}
                onChange={(e) =>
                  handleFieldChange("applyHelp", idx, "link", e.target.value)
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("applyHelp", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("applyHelp")}
            disabled={loading}
          >
            Add Apply/Help Link
          </button>
        </div>

        {/* Premium Services */}
        <div className="field-group">
          <h3>Premium Services</h3>
          {newVisa.premiumServices.map((service, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder="Service Title"
                value={service.title}
                onChange={(e) =>
                  handleFieldChange(
                    "premiumServices",
                    idx,
                    "title",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <textarea
                placeholder="Service Description"
                value={service.description}
                onChange={(e) =>
                  handleFieldChange(
                    "premiumServices",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Service Link"
                value={service.link}
                onChange={(e) =>
                  handleFieldChange(
                    "premiumServices",
                    idx,
                    "link",
                    e.target.value
                  )
                }
                disabled={loading}
              />
              <button
                onClick={() => handleRemoveField("premiumServices", idx)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="site_gradient-btn"
            onClick={() => handleAddField("premiumServices")}
            disabled={loading}
          >
            Add Premium Service
          </button>
        </div>

        <button
          className="site_gradient-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingIndex !== null
            ? "Save Changes"
            : "Add Visa"}
        </button>
      </div>
    </div>
  );
}

export default VisaEditor;
