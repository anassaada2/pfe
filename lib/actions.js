"use server";

import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import ficheTechnique from "@/models/ficheTechnique";
import { sanitizeForClient } from "@/lib/sanitizeForClient";
import { revalidatePath } from "next/cache";
import service from "@/models/service";
import { certif } from "@/data/site";
import solution from "@/models/solution";
import Calculateur from "@/models/calculateur";

export const addUser = async (formData) => {
  const { username, email, password, role, phone } = formData;

  try {
    await connectToDatabase();

    // Vérifier si un utilisateur avec ce téléphone existe déjà
    if (phone) {
      const existingPhoneUser = await User.findOne({ phone });
      if (existingPhoneUser) {
        return {
          error: "Un utilisateur avec ce numéro de téléphone existe déjà.",
        };
      }
    }

    // Vérifier si un utilisateur avec cet email existe déjà
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return {
        error: "Un utilisateur avec cet email existe déjà.",
      };
    }

    // Vérifier si un utilisateur avec ce username existe déjà
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return {
        error: "Ce nom d'utilisateur est déjà utilisé.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      status: "active",
    });

    await newUser.save();
    revalidatePath("/dashboard/users");
  } catch (error) {
    return {
      error: error.message || "An unexpected error occurred",
    };
  }
};
export const updateUser = async (data) => {
  const { id, username, email, password, role, phone, status } = data;

  try {
    await connectToDatabase();

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return { error: "Utilisateur introuvable." };
    }

    // Vérifier si un autre utilisateur a déjà ce username
    if (username !== existingUser.username) {
      const usernameTaken = await User.findOne({ username });
      if (usernameTaken) {
        return { error: "Ce nom d'utilisateur est déjà utilisé." };
      }
    }

    // Vérifier si un autre utilisateur a déjà cet email
    if (email !== existingUser.email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return { error: "Un utilisateur avec cet email existe déjà." };
      }
    }

    // Vérifier si un autre utilisateur a déjà ce téléphone
    if (phone && phone !== existingUser.phone) {
      const phoneTaken = await User.findOne({ phone });
      if (phoneTaken) {
        return { error: "Un utilisateur avec ce téléphone existe déjà." };
      }
    }

    // Mise à jour des champs
    existingUser.username = username;
    existingUser.email = email;
    existingUser.role = role;
    existingUser.status = status;
    existingUser.phone = phone;

    if (password) {
      existingUser.password = await bcrypt.hash(password, 10);
    }

    await existingUser.save();
    revalidatePath("/dashboard/users");

    return { success: true };
  } catch (error) {
    return { error: error.message || "Une erreur inattendue est survenue." };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};
export const deleteficheTechnique = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDatabase();
    await ficheTechnique.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete fiche Technique!");
  }

  revalidatePath("/dashboard/products");
};
export const updateficheTechnique = async (formData) => {
  const {
    id,
    name,
    description,
    caracteristiques,
    exigences_qualite,
    avantages,
    dessin_technique,
    support_technique,
  } = formData;

  try {
    await connectToDatabase();

    const updatedFiche = await ficheTechnique
      .findByIdAndUpdate(
        id,
        {
          name,
          description,
          caracteristiques,
          exigences_qualite,
          avantages,
          dessin_technique,
          support_technique,
        },
        { new: true }
      )
      .lean();

    if (!updatedFiche) {
      return { success: false, error: "Fiche non trouvée." };
    }

    const cleanedFiche = sanitizeForClient(updatedFiche);

    revalidatePath("/dashboard/fiches-techniques");

    return { success: true, fiche: cleanedFiche };
  } catch (err) {
    console.error("Erreur update:", err);
    return { success: false, error: err.message };
  }
};

export const addFicheTechnique = async (formData) => {
  const {
    name,
    description,
    caracteristiques,
    exigences_qualite,
    avantages,
    dessin_technique,
    quantite_beton_equivalente,
    support_technique,
  } = formData;

  try {
    await connectToDatabase();

    const newFiche = await ficheTechnique.create({
      name,
      description,
      caracteristiques,
      exigences_qualite,
      avantages,
      dessin_technique,
      quantite_beton_equivalente,
      support_technique,
    });
    const plainFiche = newFiche.toObject(); // Convert to plain object
    plainFiche._id = plainFiche._id.toString(); // serialize l'ObjectId
    revalidatePath("/dashboard/fiches-techniques");

    return { success: true, fiche: plainFiche };
  } catch (error) {
    console.error("Erreur lors de l'ajout de la fiche technique :", error);
    return { success: false, error: error.message };
  }
};
export const updateService = async (serviceId, formData) => {
  const {
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    saviezVous,
    certifications, // <-- nouveau champ
  } = formData;

  try {
    await connectToDatabase();

    const updatedService = await service.findByIdAndUpdate(
      serviceId,
      {
        name,
        description,
        avantages,
        images,
        ecarteur,
        specifications,
        dessinTechnique,
        pdf,
        processusInstallation,
        saviezVous,
        certifications, // <-- nouveau champ inclus
      },
      { new: true }
    );

    if (!updatedService) {
      return { success: false, error: "Service introuvable." };
    }

    const plainService = updatedService.toObject();
    plainService._id = plainService._id.toString();

    revalidatePath("/dashboard/services"); // chemin à adapter selon ton projet

    return { success: true, service: plainService };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service :", error);
    return { success: false, error: error.message };
  }
};
export const insertCertifications = async (serviceId) => {
  try {
    await connectToDatabase();

    const updatedService = await service.findByIdAndUpdate(
      serviceId,
      { $set: { certifications: certif } },
      { new: true }
    );

    if (!updatedService) {
      return { success: false, error: "Service introuvable" };
    }

    return { success: true, data: updatedService };
  } catch (error) {
    console.error("Erreur insertion certifications:", error);
    return { success: false, error: error.message };
  }
};

export const addSolution = async (formData) => {
  const {
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    certifications,
    saviezVous,
  } = formData;

  try {
    await connectToDatabase();

    const newSolution = await solution.create({
      name,
      description,
      avantages,
      images,
      ecarteur,
      specifications,
      dessinTechnique,
      pdf,
      processusInstallation,
      certifications,
      saviezVous,
    });

    const plainSolution = newSolution.toObject();
    plainSolution._id = plainSolution._id.toString();

    if (plainSolution.avantages) {
      plainSolution.avantages = plainSolution.avantages.map((a) => ({
        ...a,
        _id: a._id.toString(),
      }));
    }
    if (plainSolution.certifications) {
      plainSolution.certifications = plainSolution.certifications.map((c) => ({
        ...c,
        _id: c._id.toString(),
      }));
    }

    if (plainSolution.specifications) {
      plainSolution.specifications = plainSolution.specifications.map((s) => ({
        ...s,
        _id: s._id?.toString?.() ?? s._id, // au cas où
      }));
    }

    if (plainSolution.processusInstallation) {
      plainSolution.processusInstallation =
        plainSolution.processusInstallation.map((p) => ({
          ...p,
          _id: p._id?.toString?.() ?? p._id,
        }));
    }

    revalidatePath("/dashboard/solutions"); // 🔁 à adapter selon ta route admin

    return { success: true, solution: plainSolution };
  } catch (error) {
    console.error("Erreur lors de l'ajout de la solution :", error);
    return { success: false, error: error.message };
  }
};
export const deleteSolution = async (formData) => {};
export const updateSolution = async (solutionId, formData) => {
  const {
    name,
    description,
    avantages,
    images,
    ecarteur,
    specifications,
    dessinTechnique,
    pdf,
    processusInstallation,
    certifications,
    saviezVous,
  } = formData;

  try {
    await connectToDatabase();

    const updated = await solution.findByIdAndUpdate(
      solutionId,
      {
        name,
        description,
        avantages,
        images,
        ecarteur,
        specifications,
        dessinTechnique,
        pdf,
        processusInstallation,
        certifications,
        saviezVous,
      },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Solution introuvable." };
    }

    const plainSolution = updated.toObject();
    plainSolution._id = plainSolution._id.toString();

    // sérialisation des sous-documents
    if (plainSolution.avantages) {
      plainSolution.avantages = plainSolution.avantages.map((a) => ({
        ...a,
        _id: a._id?.toString?.() ?? a._id,
      }));
    }

    if (plainSolution.certifications) {
      plainSolution.certifications = plainSolution.certifications.map((c) => ({
        ...c,
        _id: c._id?.toString?.() ?? c._id,
      }));
    }

    if (plainSolution.specifications) {
      plainSolution.specifications = plainSolution.specifications.map((s) => ({
        ...s,
        _id: s._id?.toString?.() ?? s._id,
      }));
    }

    if (plainSolution.processusInstallation) {
      plainSolution.processusInstallation =
        plainSolution.processusInstallation.map((p) => ({
          ...p,
          _id: p._id?.toString?.() ?? p._id,
        }));
    }

    revalidatePath("/dashboard/solutions");

    return { success: true, solution: plainSolution };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la solution :", error);
    return { success: false, error: error.message };
  }
};
export const addCalculateurUrl = async () => {
  const url =
    "https://images.pexels.com/photos/30910217/pexels-photo-30910217/free-photo-of-elegant-expresso-sur-une-planche-en-bois.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  try {
    await connectToDatabase();

    const existing = await calculateur.findOne({ url });
    if (existing) {
      return { error: "Cette URL existe déjà dans la base de données." };
    }

    const newCalculateur = new calculateur({ url });
    await newCalculateur.save();

    revalidatePath("/calculateur");
    return { success: true };
  } catch (error) {
    return { error: error.message || "Une erreur est survenue." };
  }
};

export const deleteCalculateur = async (formData) => {};
export async function addCalculateur(data) {
  try {
    await connectToDatabase();
    const calculateur = new Calculateur({
      name: data.name,
      url: data.url,
      telechargement: data.telechargement || 0,
      views: { total: 0, users: [] }, // Initialisation des vues
    });
    await calculateur.save();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Erreur lors de l'ajout du calculateur" };
  }
}
// Exemple basique
export async function updateCalculateur(data) {
  try {
    await connectToDatabase();

    const updated = await Calculateur.findByIdAndUpdate(
      data.id,
      {
        name: data.name,
        url: data.url,
        telechargement: data.telechargement || 0,
      },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Calculateur non trouvé" };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du calculateur",
    };
  }
}
