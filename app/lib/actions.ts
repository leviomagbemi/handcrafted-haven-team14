"use server";

import { sql } from "@vercel/postgres";
import z from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import { signIn } from '@/auth';

// export async function authenticate(
//     prevState: string | undefined,
//     formData: FormData,
//   ) {
//     try {
//       await signIn('credentials', Object.fromEntries(formData));
//     } catch (error) {
//       if ((error as Error).message.includes('CredentialsSignin')) {
//         return 'CredentialsSignin';
//       }
//       throw error;
//     }
// }



const FormNewProductSchema = z.object({
  id: z.string(),
  artisan_id: z.string({
    invalid_type_error: "Please select a artist.",
  }),
  title: z.string({
    invalid_type_error: "Please type a title.",
  }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  category: z.string({ invalid_type_error: "Please type a category." }),
  description: z.string({ invalid_type_error: "Please type a description." }),
  image_url: z.string({ invalid_type_error: "Please enter a image url." }),
  status: z.enum(["available", "unavailable"], {
    invalid_type_error: "Please select a status.",
  }),
});

const CreateProduct = FormNewProductSchema.omit({ id: true });

export type State = {
  errors?: {
    id?: string[];
    artisan_id?: string[];
    title?: string[];
    price?: string[];
    category?: string[];
    description?: string[];
    image_url?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  
  // Validate form fields using Zod
  const validatedFields = CreateProduct.safeParse({
    artisan_id: formData.get("artisan_id"),
    title: formData.get("title") ,
    price: formData.get("price") ,
    category: formData.get("category"),
    description: formData.get("description"),
    image_url: formData.get("image_url") ,
    status: formData.get("status") ,
  });
console.log(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  // Prepare data for insertion into the database
  const { artisan_id, title, price, category, description, image_url, status } =
    validatedFields.data;

  const priceInCents = price * 100;

  // Insert data into the database
  try {
    await sql`
    INSERT INTO items (artisan_id, title, price, category, description, image_url, status)
    VALUES (${artisan_id}, ${title}, ${priceInCents}, ${category}, ${description}, ${image_url}, ${status})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to create product",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/account");
  redirect("/dashboard/account");
}
