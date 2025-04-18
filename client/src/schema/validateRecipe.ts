import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024;

const validateRecipeSchema = z.object({
  name: z.string().trim().min(3),
  ingredients: z.array(z.string().trim().min(3)),
  instructions: z.string().trim().min(50, { message: "Field required" }),
  imageUrl: z
    .union([z.instanceof(File), z.null()])
    .refine(
      (file) => {
        if (!file) return true; // skip if null
        return ["image/jpg", "image/jpeg"].includes(file.type);
      },
      {
        message: "Invalid image file type",
      },
    )
    .refine(
      (file) => {
        if (!file) return true; // skip if null
        return file.size <= fileSizeLimit;
      },
      {
        message: "File size should not exceed 5MB",
      },
    ),
  cookingTime: z
    .number({
      required_error: "Field Required",
    })
    .positive(),
  userOwner: z.string(),
});

export type RecipeValidation = z.infer<typeof validateRecipeSchema>;

export default validateRecipeSchema;
