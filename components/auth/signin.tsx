"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller,useForm } from "react-hook-form"
import { toast } from "sonner"

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
import { authClient } from '@/lib/auth-client'
export const formSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string(),
});

const Signin = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isloading, setIsloading] = React.useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router=useRouter()


 async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsloading(true);

  try {
    const result = authClient.signIn.email(values);
    const toastId = toast.loading("Logging in");

    const { data, error } = await result;
    toast.dismiss(toastId);

    if (error || !data) {
      toast.error(error?.message || "Something went wrong. Please try again.");
      return;
    }

    router.push("/dashboard");
  } finally {
    setIsloading(false);
  }
}

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
   
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-6"
  >
    <FieldGroup>
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
      Don't have an account?{" "}
      <a href="/signup" className="underline">
        Sign up
      </a>
    </FieldDescription>
  </form>

          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Signin