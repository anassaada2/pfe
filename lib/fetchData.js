import User from "@/models/user";
import { connectToDatabase } from "./db";
import ficheTechnique from "@/models/ficheTechnique";
import service from "@/models/service";
import mongoose from "mongoose";
import solution from "@/models/solution";
import calculateur from "@/models/calculateur";
import { PinataSDK } from "pinata";

export const fetchUsers = async (page = 1, limit = 5) => {
  try {
    await connectToDatabase();
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).lean();
    const totalUsers = await User.countDocuments();

    return { users, totalUsers };
  } catch (error) {
    console.error("Erreur fetchUsers:", error);
    return { users: [], totalUsers: 0 };
  }
};
export const fetchUser = async (id) => {
  console.log(id);
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchficheTechniques = async (page = 1, limit = 5) => {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const ficheTechniques = await ficheTechnique
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalficheTechniques = await ficheTechnique.countDocuments();

    return {
      ficheTechniques,
      totalficheTechniques,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fiches techniques :",
      error
    );
  }
};
export async function getServiceById(id) {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  const Service = await service.findById(id).lean();
  return JSON.parse(JSON.stringify(Service));
}
export async function getSolutionById(id) {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  const Solution = await solution.findById(id).lean();
  return JSON.parse(JSON.stringify(Solution));
}
export const fetchSolutions = async (page = 1, limit = 5) => {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const solutions = await solution
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalsolutions = await ficheTechnique.countDocuments();

    return {
      solutions,
      totalsolutions,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fiches techniques :",
      error
    );
  }
};
export async function fetchCalculateur() {
  try {
    await connectToDatabase();
    const dernierCalculateur = await calculateur.findOne().sort({ _id: -1 }); // ou `.sort({ createdAt: -1 })` si tu as un champ `timestamps`

    return dernierCalculateur;
  } catch (error) {
    console.error("Erreur lors de la récupération des calculateurs:", error);
    throw new Error("Impossible de récupérer les calculateurs");
  }
}
