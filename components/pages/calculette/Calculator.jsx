"use client";

import { useState, useEffect } from "react";
import styles from "./calculator.module.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfCalculator from "./CalculatorPDF";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster and toast

const temperatureOptions = [
  { value: "T<20", label: "T<20°C" },
  { value: "20<T<25", label: "20°C < T < 25°C" },
  { value: "T>25", label: "T>25°C" },
];

const consistencyOptions = [
  { value: "S1", label: "S1" },
  { value: "S2", label: "S2" },
];

export default function Calculator() {
  const [formData, setFormData] = useState({
    date: "",
    references: "",
    norme: "",
    client: "",
    hauteur: "",
    pression: "",
    temperature: "",
    consistency: "",
    vitesse: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate hauteur (must not exceed 10 meters)
    if (name === "hauteur") {
      if (value && Number(value) > 10) {
        toast.error("La hauteur ne doit pas dépasser 10 mètres !");
        return; // Prevent updating state if validation fails
      }
    }

    console.log(`Champ: ${name}, Valeur: ${value}`); // For debugging
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  useEffect(() => {
    const fetchVitesse = async () => {
      if (
        !formData.pression ||
        !formData.temperature ||
        !formData.consistency
      ) {
        setFormData((prev) => ({ ...prev, vitesse: "" }));
        return;
      }

      setIsLoading(true);
      try {
        const validTemperatures = ["T<20", "20<T<25", "T>25"];
        if (!validTemperatures.includes(formData.temperature)) {
          throw new Error(
            `Valeur de température invalide: ${formData.temperature}`
          );
        }

        const response = await fetch("/api/calculette", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pression: formData.pression,
            classe: formData.consistency,
            temperature: formData.temperature,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de la requête");
        }

        setFormData((prev) => ({ ...prev, vitesse: data.valeur }));
      } catch (err) {
        setError(err.message);
        setFormData((prev) => ({ ...prev, vitesse: "" }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVitesse();
  }, [formData.pression, formData.temperature, formData.consistency]);

  return (
    <div className={styles.calculatorContainer}>
      <h3>CALCULATEUR DE VITESSE DE COULEE DU BETON FRAIS</h3>
      <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster */}
      <div className={styles.formSection}>
        <form>
          <div className={styles.formRow}>
            <label htmlFor="date">Date :</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="references">Références :</label>
            <input
              type="text"
              id="references"
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="Entrez la référence"
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="norme">Norme :</label>
            <input
              type="text"
              id="norme"
              name="norme"
              value={formData.norme}
              onChange={handleChange}
              placeholder="Entrez la norme"
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="client">Client :</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Nom du client"
            />
          </div>
          <hr className={styles.separator} />
          <div className={styles.formRow}>
            <label htmlFor="hauteur">Hauteur de bétonnage H (m) :</label>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="hauteur"
                name="hauteur"
                value={formData.hauteur}
                onChange={handleChange}
                placeholder="Entrez la hauteur"
              />
              <span className={styles.unit}>m</span>
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="pression">Pression* :</label>
            <div className={styles.inputGroup}>
              <input
                type="number"
                id="pression"
                name="pression"
                value={formData.pression}
                onChange={handleChange}
                placeholder="Entrez la pression"
              />
              <span className={styles.unit}>bars</span>
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="temperature">Température lors du bétonnage :</label>
            <div className={styles.inputGroup}>
              <select
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
              >
                <option value="">-- Sélectionner --</option>
                {temperatureOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className={styles.unit}>°C</span>
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="consistency">
              Classe de consistance du béton :
            </label>
            <select
              id="consistency"
              name="consistency"
              value={formData.consistency}
              onChange={handleChange}
            >
              <option value="">-- Sélectionner --</option>
              {consistencyOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className={styles.hypothesisSection}>
        <h4>Hypothèses :</h4>
        <ul>
          <li>
            Le calcul de la pression selon DIN 18218 valable pour ±5° verticale
          </li>
          <li>Hauteur maximale de bétonnage : 10 m</li>
          <li>Densité du béton frais : 25 KN/m³</li>
          <li>Vitesse de montée max. : 7 m/h</li>
        </ul>
      </div>
      <div className={styles.resultSection}>
        <h4>RESULTAT</h4>
        <div className={styles.resultValue}>
          <span>VITESSE DE MONTEE V (m/h) :</span>
          {isLoading ? (
            <strong>Calcul en cours...</strong>
          ) : error ? (
            <strong style={{ color: "red" }}>{error}</strong>
          ) : formData.vitesse ? (
            <strong>{formData.vitesse}</strong>
          ) : (
            <strong>Veuillez remplir tous les champs</strong>
          )}
        </div>
      </div>
      <div className={styles.notes}>
        <p>*Capacité du coffrage pour supporter la pression du béton</p>
        <p className={styles.disclaimer}>
          NB : Le client doit fournir des données fiables et respecter les
          hypothèses. Tout changement doit être signalé immédiatement.
        </p>
      </div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <PDFDownloadLink
          document={<PdfCalculator data={formData} />}
          fileName="calculator-result.pdf"
        >
          📄 Télécharger le PDF
        </PDFDownloadLink>
      </div>
    </div>
  );
}
