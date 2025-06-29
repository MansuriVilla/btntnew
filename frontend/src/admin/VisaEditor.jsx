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

  // Fetch visas on mount
  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/visas`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to load visas");
      const data = await response.json();
      setVisas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const { token } = await response.json();
      if (response.ok) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
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
      const token = localStorage.getItem("token");
      const updatedVisas =
        editingIndex !== null
          ? [
              ...visas.slice(0, editingIndex),
              newVisa,
              ...visas.slice(editingIndex + 1),
            ]
          : [...visas, newVisa];
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/save-visas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedVisas),
        }
      );
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
      const token = localStorage.getItem("token");
      const updatedVisas = visas.filter((_, i) => i !== index);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/api/save-visas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedVisas),
        }
      );
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
          .section-title { font-size: 1.875rem; font-weight: 600; color: #1F2937; margin-bottom: 1.5rem; }
          .editor-section { background: #F9FAFB; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: calc(var(--section-gap) * 5); max-width: 600px; margin-left: auto; margin-right: auto; }
          .editor-section input { width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #D1D5DB; border-radius: 0.25rem; font-size: 1rem; }
          .error { color: #EF4444; font-weight: 600; margin-bottom: 1rem; }
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
              disabled={loading}
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
    <div className="site_flex site_flex--column section_gap admin_container">
      <style>{`
        .admin_container { margin-top: calc(var(--section-gap) * 3); }
        .site_content-container { display: flex; /* flex-direction: column; */ gap: 2rem; width: 100%; }
        .section-title { font-size: 1.875rem; font-weight: 600; color: #1F2937; margin-bottom: 1.5rem; }
        .editor-section { background: #F9FAFB; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .editor-section h3 { font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 1rem; }
        .editor-section input, .editor-section textarea { width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #D1D5DB; border-radius: 0.25rem; font-size: 1rem; }
        .editor-section textarea { min-height: 100px; }
        .field-group { margin-bottom: 1.5rem; }
        .field-group button { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #EF4444; color: white; border: none; border-radius: 0.25rem; cursor: pointer; }
        .field-group button:hover { background: #DC2626; }
        .visa-list { display: grid; gap: 1rem; }
        .visa-item { padding: 1rem; background: #F9FAFB; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .error { color: #EF4444; font-weight: 600; margin-bottom: 1rem; }
        .success { color: #10B981; font-weight: 600; margin-bottom: 1rem; }
        .admin_visa{  }
        .admin_visa .admin_visa-left { max-width: 300px;}
        .admin_visa .admin_visa-left .visa-list{ flex-direction: column;}
        .admin_visa .admin_visa-right { flex: 1;}        
      `}</style>

      <div className="site_content-container">
        <h2 className="section-title">Visa Data Editor</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>

      <div className="admin_visa site_flex site_content-container">
        <div className="admin_visa-left">
          <div className="site_content-container site_flex visa-list">
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
        </div>
        <div className="admin_visa-right">
          <div className="site_content-container site_flex--column editor-section">
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
              onChange={(e) =>
                setNewVisa({ ...newVisa, title: e.target.value })
              }
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Currency"
              value={newVisa.currency}
              onChange={(e) =>
                setNewVisa({ ...newVisa, currency: e.target.value })
              }
              disabled={loading}
            />
            <input
              type="number"
              placeholder="Price"
              value={newVisa.price}
              onChange={(e) =>
                setNewVisa({
                  ...newVisa,
                  price: parseFloat(e.target.value) || 0,
                })
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
              onChange={(e) =>
                setNewVisa({ ...newVisa, image: e.target.value })
              }
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Link"
              value={newVisa.link}
              onChange={(e) => setNewVisa({ ...newVisa, link: e.target.value })}
              disabled={loading}
            />

            <div className="field-group">
              <h3>Visa Types</h3>
              {newVisa.visaTypes.map((type, idx) => (
                <div key={idx}>
                  <input
                    type="text"
                    placeholder="Type Name"
                    value={type.name}
                    onChange={(e) =>
                      handleFieldChange(
                        "visaTypes",
                        idx,
                        "name",
                        e.target.value
                      )
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

            <input
              type="text"
              placeholder="Processing Time"
              value={newVisa.processingTime}
              onChange={(e) =>
                setNewVisa({ ...newVisa, processingTime: e.target.value })
              }
              disabled={loading}
            />

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

            <div className="field-group">
              <h3>Apply or Get Help</h3>
              {newVisa.applyHelp.map((item, idx) => (
                <div key={idx}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) =>
                      handleFieldChange(
                        "applyHelp",
                        idx,
                        "title",
                        e.target.value
                      )
                    }
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Text"
                    value={item.text}
                    onChange={(e) =>
                      handleFieldChange(
                        "applyHelp",
                        idx,
                        "text",
                        e.target.value
                      )
                    }
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={item.link}
                    onChange={(e) =>
                      handleFieldChange(
                        "applyHelp",
                        idx,
                        "link",
                        e.target.value
                      )
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
      </div>
    </div>
  );
}

export default VisaEditor;
