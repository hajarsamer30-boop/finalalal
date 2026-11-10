'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginSchme, loginSchmeType } from "./scheme/scheme.login"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"

const fields = [

    {
        id: "email",
        label: "Email",
        type: "email",

        autoComplete: "off",
    },
    {
        id: "password",
        label: "Password",
        type: "password",

        autoComplete: "off",
    },

] as const
export function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    const { handleSubmit, register, formState: { errors } } = useForm<loginSchmeType>({
        resolver: zodResolver(loginSchme),
        defaultValues: {
            email: '',
            password: '',

        }
    })
    async function handleLogin(data: loginSchmeType) {
        setLoading(true)
        const res = await signIn('credentials', {
            ...data,
            callbackUrl: '/',
            redirect: false
        })
        if (res?.ok) {
            toast.success('successful login')
            router.push('/')
            setLoading(false)
        }
        else {
            toast.error('incorrect email or password')
            setLoading(false)
        }
    }

    // api

    return <div>
        <main className="mx-auto flex w-full flex-1 justify-center px-4 py-10 sm:px-6 sm:py-14">
            <section className="h-fit w-full max-w-lg rounded-xl border border-border bg-card px-5 py-7 shadow-sm sm:px-8 sm:py-9">
                <header className="mb-7 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
                        Create Your Account
                    </h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        Start your fresh journey with us today
                    </p>
                </header>

                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                    {fields.map((field) => (
                        <div key={field.id} className="space-y-1.5">
                            <label htmlFor={field.id} className="block text-sm font-medium text-foreground">
                                {field.label}<span aria-hidden="true">*</span>
                            </label>
                            <input

                                type={field.type}
                                {...register(field.id)}
                                autoComplete={field.autoComplete}
                                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/70"
                            />
                            {errors[field.id] && <p className="bg-green-400 p-2 my-2 rounded-2xl ">{errors[field.id]?.message}</p>}
                        </div>
                    ))}

                    <button
                        className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 "
                    >
                        {loading ? 'loading...' : 'Create Account'}
                    </button>
                </form>
            </section>
        </main>
    </div>
}