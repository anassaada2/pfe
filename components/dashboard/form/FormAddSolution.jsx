"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { addSolution } from "@/lib/actions";

const solutionSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  description: z.string().min(5, "La description est trop courte"),
  avantages: z
    .array(z.object({ titre: z.string(), description: z.string() }))
    .optional(),
  images: z.array(z.string()).optional(),
  ecarteur: z.string().optional(),
  specifications: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  dessinTechnique: z
    .object({ sectionBlocs: z.string(), sectionDalle: z.string() })
    .optional(),
  pdf: z.string().optional(),
  processusInstallation: z
    .array(
      z.object({
        etape: z.number(),
        titre: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  certifications: z
    .array(z.object({ titre: z.string(), description: z.string() }))
    .optional(),
  saviezVous: z.string().optional(),
});

export default function FormAddSolution() {
  const [imageUrls, setImageUrls] = useState([]);
  const [dessinBlocsUrl, setDessinBlocsUrl] = useState("");
  const [dessinDalleUrl, setDessinDalleUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [avantages, setAvantages] = useState([]);
  const [showAvantageModal, setShowAvantageModal] = useState(false);
  const [newAvantage, setNewAvantage] = useState({
    titre: "",
    description: "",
  });
  const [certifications, setCertifications] = useState([]);
  const [showCertifications, setShowCertifications] = useState(false);
  const [newCertification, setNewCertification] = useState({
    titre: "",
    description: "",
  });
  const handleUpload = async (file, onSuccess) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/pinata-images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data?.url) {
        onSuccess(data.url);
        toast.success("Fichier téléversé !");
      } else {
        toast.error("Erreur d’upload.");
      }
    } catch (err) {
      toast.error("Erreur inattendue.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const parseTextareaJSON = (value) => {
    try {
      return JSON.parse(value || "[]");
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const rawData = {
      name: form.get("name"),
      description: form.get("description"),
      avantages: avantages,
      images: imageUrls,
      ecarteur: form.get("ecarteur"),
      specifications: parseTextareaJSON(form.get("specifications")),
      dessinTechnique: {
        sectionBlocs: dessinBlocsUrl,
        sectionDalle: dessinDalleUrl,
      },
      pdf: pdfUrl,
      processusInstallation: parseTextareaJSON(
        form.get("processusInstallation")
      ),
      certifications: certifications,
      saviezVous: form.get("saviezVous"),
    };

    try {
      solutionSchema.parse(rawData);
      const res = await addSolution(rawData);
      if (res?.success) {
        toast.success("Solution ajoutée !");
      } else {
        toast.error("Erreur lors de l’ajout.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Erreur inattendue.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h4 className="mb-4">Ajouter une Solution</h4>

      <div className="mb-3">
        <label>Nom</label>
        <input className="form-control" name="name" required />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea className="form-control" name="description" required />
      </div>

      <div className="mb-3">
        <label>Avantages</label>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowAvantageModal(true)}
          >
            + Ajouter avantage
          </button>
        </div>
        {avantages.length > 0 && (
          <ul className="list-group">
            {avantages.map((a, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{a.titre}</strong>: {a.description}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setAvantages(avantages.filter((_, i) => i !== index))
                  }
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3">
        <label>Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            files.forEach((file) => {
              handleUpload(file, (url) =>
                setImageUrls((prev) => [...prev, url])
              );
            });
          }}
        />
        <div className="d-flex flex-wrap mt-2">
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt="" className="me-2 mb-2" width={100} />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label>Écarteur</label>
        <input className="form-control" name="ecarteur" />
      </div>

      <div className="mb-3">
        <label>Spécifications (format JSON)</label>
        <textarea
          className="form-control"
          name="specifications"
          placeholder='[{"label":"...","value":"..."}]'
        />
      </div>

      <div className="mb-3">
        <label>Dessin Technique - Section Blocs</label>
        <input
          type="file"
          onChange={(e) => handleUpload(e.target.files?.[0], setDessinBlocsUrl)}
        />
        {dessinBlocsUrl && (
          <img
            src={dessinBlocsUrl}
            alt="bloc"
            className="img-thumbnail mt-2"
            width={150}
          />
        )}
      </div>

      <div className="mb-3">
        <label>Dessin Technique - Section Dalle</label>
        <input
          type="file"
          onChange={(e) => handleUpload(e.target.files?.[0], setDessinDalleUrl)}
        />
        {dessinDalleUrl && (
          <img
            src={dessinDalleUrl}
            alt="dalle"
            className="img-thumbnail mt-2"
            width={150}
          />
        )}
      </div>

      <div className="mb-3">
        <label>Fichier PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleUpload(e.target.files?.[0], setPdfUrl)}
        />
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            Voir le PDF
          </a>
        )}
      </div>

      <div className="mb-3">
        <label>Processus d'installation (format JSON)</label>
        <textarea
          className="form-control"
          name="processusInstallation"
          placeholder='[{"etape":1,"titre":"...","description":"..."}]'
        />
      </div>

      <div className="mb-3">
        <label>Certifications</label>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowCertifications(true)}
          >
            + Ajouter une certification
          </button>
        </div>
        {certifications.length > 0 && (
          <ul className="list-group">
            {certifications.map((a, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <strong>{a.titre}</strong>: {a.description}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    setCertifications(
                      certifications.filter((_, i) => i !== index)
                    )
                  }
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-3">
        <label>Le saviez-vous ?</label>
        <input className="form-control" name="saviezVous" />
      </div>

      <button className="btn btn-primary" type="submit" disabled={isUploading}>
        {isUploading ? "Téléversement..." : "Ajouter la solution"}
      </button>

      {/* Modal pour ajouter un avantage */}
      {showAvantageModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un avantage</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAvantageModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={newAvantage.titre}
                  onChange={(e) =>
                    setNewAvantage({ ...newAvantage, titre: e.target.value })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newAvantage.description}
                  onChange={(e) =>
                    setNewAvantage({
                      ...newAvantage,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAvantageModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (newAvantage.titre && newAvantage.description) {
                      setAvantages((prev) => [...prev, newAvantage]);
                      setNewAvantage({ titre: "", description: "" });
                      setShowAvantageModal(false);
                    } else {
                      toast.error("Titre et description requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal pour ajouter une certification */}
      {showCertifications && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une certification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCertifications(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Titre"
                  value={newCertification.titre}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      titre: e.target.value,
                    })
                  }
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newCertification.description}
                  onChange={(e) =>
                    setNewCertification({
                      ...newCertification,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCertifications(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (
                      newCertification.titre &&
                      newCertification.description
                    ) {
                      setCertifications((prev) => [...prev, newCertification]);
                      setNewCertification({ titre: "", description: "" });
                      setShowCertifications(false);
                    } else {
                      toast.error("Titre et description requis");
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
