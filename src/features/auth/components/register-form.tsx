"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
message: "Passwords don't match",
path:["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email({
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },{
            onSuccess: () => {
                router.push("/")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            }
        }
    )
    }
    const isPending = form.formState.isSubmitting;

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 bg-background shadow-xl">
            <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <CardContent className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
                    <CardHeader className="px-0 pt-0 text-center md:text-left">
                        <CardTitle className="text-2xl">Get Started</CardTitle>
                        <CardDescription className="pb-4">
                            Create your account to get started
                        </CardDescription>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image alt="Github" src="/logos/github.svg" width={20} height={20} />
                                        Continue with Github
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >
                                        <Image alt="Google" src="/logos/google.svg" width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="*******"
                                                            className="pr-10"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                                                            onClick={() => setShowPassword((current) => !current)}
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                        >
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="*******"
                                                            className="pr-10"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                                                            onClick={() => setShowConfirmPassword((current) => !current)}
                                                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                                        >
                                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        Sign Up
                                    </Button>
                                </div>

                                <div className="text-center text-sm md:text-left">
                                    Already have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>

                <div className="relative hidden min-h-96 overflow-hidden bg-linear-to-br from-primary/10 via-background to-muted md:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--hero-glow),transparent_40%),radial-gradient(circle_at_bottom_left,var(--hero-shadow),transparent_35%)]" />
                    <div className="relative flex h-full flex-col justify-between p-6 lg:p-8">
                        <Link
                            href="/"
                            className="absolute right-8 top-8 z-10 flex items-center gap-2 font-medium"
                        >
                            <Image
                                src="/logos/HelixLogo.svg"
                                alt="Helix"
                                width={22}
                                height={22}
                            />
                            <h3 className="text-xl font-bold">Helix</h3>
                        </Link>
                        <div className="space-y-2 pt-14">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                Secure access
                            </p>
                            <h2 className="max-w-xs text-3xl font-semibold tracking-tight">
                                Create your account with a clean, focused flow.
                            </h2>
                        </div>
                        <div className="relative flex flex-1 items-center justify-center py-4">
                            <Image
                                src="/undraw_email-consent_j36b.svg"
                                alt="Registration illustration"
                                fill
                                priority
                                className="object-contain p-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}