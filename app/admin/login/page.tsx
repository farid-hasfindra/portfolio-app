import { useState, useActionState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, User, KeyRound, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, undefined);

    return (
        <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background dynamic elements */}
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-cyan-600/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Decorative Icon */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20"
                >
                    <ShieldCheck size={32} className="text-white" />
                </motion.div>

                <div className="bg-black/40 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                    
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Access</h1>
                        <p className="text-neutral-500 mt-2 text-sm font-medium">Please sign in to manage your ecosystem</p>
                    </div>

                    <form action={formAction} className="space-y-6">
                        {state?.error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs font-bold flex items-center gap-3"
                            >
                                <AlertCircle size={14} className="shrink-0" />
                                {state.error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group/field">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/field:text-cyan-400 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-neutral-600 pl-11 h-12 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/10 transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group/field">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/field:text-cyan-400 transition-colors">
                                    <KeyRound size={18} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full bg-white/[0.03] border border-white/10 text-white placeholder:text-neutral-600 pl-11 pr-12 h-12 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/10 transition-all font-mono"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/20 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin mr-2" />
                                        Authenticating...
                                    </>
                                ) : (
                                    "Enter Dashboard"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                
                {/* Security hint footer */}
                <p className="text-center mt-8 text-neutral-600 text-xs font-bold uppercase tracking-widest">
                    Secure Administrative Interface
                </p>
            </motion.div>

            {/* Extra decorative blobs */}
            <div className="absolute top-1/4 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
    );
}
