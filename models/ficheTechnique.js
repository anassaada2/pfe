import mongoose from "mongoose";

const ficheSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  caracteristiques: {
    materiaux: String,
    densite: Number,
    couleurs: [String],
    dimensions_cm: String,
    poids_kg: Number,
    distance_entre_blocs_cm: [Number],
    volume_bloc_m3: Number,
    temps_pose_m2_h_ouvrier: Number,
    entraxes_cm: [Number],
    resistance_poinconnement_daN: Number,
    classement_feu: String,
    conductivite_thermique_W_mK: Number,
  },
  exigences_qualite: {
    document_CSTB: String,
    norme: String,
  },
  avantages: [String],
  dessin_technique: {
    section_blocs: String,
    section_dalle: String,
  },
  quantite_beton_equivalente: [
    {
      epaisseur_cm: Number,
      largeur_nervure_cm: Number,
      section_equivalente_cm3: Number,
    },
  ],
  support_technique: {
    bureau_etudes: String,
    assistance: [String],
  },
});

export default mongoose.models.FicheTechnique ||
  mongoose.model("FicheTechnique", ficheSchema);
