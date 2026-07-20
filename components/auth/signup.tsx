"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller,useForm } from "react-hook-form"
import { toast } from "sonner"
import {authClient} from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
export const formSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must be less than 64 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

const Signup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
    const [isloading, setIsloading] = React.useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: "",
      email: "",
      password: "",
    },
  })

  const router=useRouter()
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
     setIsloading(true);
   
     try {
      const result = authClient.signUp.email(values);
      const toastId=toast.loading("Creating your account");
      
      const {data,error}=await result;
      toast.dismiss(toastId);
      if (error || !data) {
        toast.error(error?.message || "Something went wrong. Please try again.");
        return;
      }
  
       router.push("/chat");
     }
      finally {
       setIsloading(false);
     }
  }

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
   
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-6"
  >
    <FieldGroup>
        <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>

            <Input
              {...field}
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              placeholder="example@xyz.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <Input
              {...field}
              id="password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>

    <Button
      disabled={isloading}
      className="w-full"
      type="submit"
    >
      Login
    </Button>

    <FieldDescription className="text-center">
      Already have an account?{" "}
      <a href="/signin" className="underline">
        Sign in
      </a>
    </FieldDescription>
  </form>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Signup