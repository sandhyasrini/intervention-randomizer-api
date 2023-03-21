import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Developer } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllDevelopers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const developers: Developer | {} = await prisma.developer.findMany();

    if (!developers) {
      {
        res.status(400).json({
          message: "Not Found",
        });
      }
    }
    res.status(200).json({ developers });
  } catch (err: any) {
    next(err);
  }
};

export const addDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addNewDeveloper = await prisma.developer.create({
      data: req.body.value,
    });
    if (!addNewDeveloper) {
      res.status(500).json({
        message: "Unable to create user",
      });
    }
    res.status(200).json({ addNewDeveloper });
  } catch (err: any) {
    next(err);
  }
};

export const editDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const editedDeveloper = await prisma.developer.update({
    where: { id: req.body.value.id },
    data: req.body.value,
  });
    if (!editedDeveloper) {
      res.status(500).json({
        message: "Unable to edit user",
      });
    }
    res.status(200).json({ editedDeveloper });
  } catch (err: any) {
    next(err);
  }
};
