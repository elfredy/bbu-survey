"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getFieldLabel, formatFieldValue } from "./labels";

const ADMIN_USERNAME = "bbu-inqury";
const ADMIN_PASSWORD = "BbuInquiry2026Password!";
const ADMIN_STORAGE_KEY = "bbu_admin_authenticated";

type SurveyDoc = {
  id: string;
  companyName: string;
  sector: string;
  employeeCount: string;
  branchCount: string;
  itResponsible: string;
  itBudget: string;
  answers?: Record<string, string | string[]>;
  createdAt?: { seconds: number; nanoseconds: number };
};

function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    setAuthenticated(stored === "true");
    setChecked(true);
  }, []);

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setAuthenticated(false);
  };

  return { authenticated, checked, login, logout };
}

export default function AdminPage() {
  const { authenticated, checked, login, logout } = useAuth();
  const [items, setItems] = useState<SurveyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authenticated) return;
    async function load() {
      try {
        const q = query(
          collection(db, "surveys"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data: SurveyDoc[] = snapshot.docs.map((doc) => {
          const d = doc.data() as Omit<SurveyDoc, "id">;
          return { id: doc.id, ...d };
        });
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Məlumatları yükləmək mümkün olmadı.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [authenticated]);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    if (login(username, password)) return;
    setLoginError("İstifadəçi adı və ya parol səhvdir.");
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-base text-slate-400">Yoxlanılır...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-16 font-sans">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur">
            <div className="mb-6 flex items-center gap-2 text-base font-medium uppercase tracking-[0.2em] text-sky-300/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Admin girişi
            </div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-50">
              Sorğu nəticələri
            </h1>
            <p className="mb-8 text-base text-slate-400">
              Davam etmək üçün daxil olun.
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="admin-username"
                  className="block text-base font-medium text-slate-200"
                >
                  İstifadəçi adı
                </label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                  placeholder="İstifadəçi adı"
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="admin-password"
                  className="block text-base font-medium text-slate-200"
                >
                  Parol
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                  placeholder="Parol"
                  required
                  autoComplete="current-password"
                />
              </div>
              {loginError && (
                <p className="text-base text-red-400">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-500 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(8,47,73,0.6)] transition hover:bg-sky-400"
              >
                Daxil ol
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 font-sans text-slate-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              Sorğu nəticələri
            </h1>
            <p className="mt-1 text-base text-slate-400">
              Göndərilmiş IT ehtiyac sorğularının siyahısı
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-base font-medium text-slate-300 transition hover:bg-slate-700/80 hover:text-slate-50"
          >
            Çıxış
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-[0_18px_60px_rgba(15,23,42,0.85)] backdrop-blur">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <p className="text-base text-slate-400">Yüklənir...</p>
            </div>
          )}
          {error && (
            <div className="border-b border-white/10 bg-red-500/10 px-6 py-4">
              <p className="text-base text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-base">
                <thead className="border-b border-white/10 bg-slate-900/80">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      Tarix
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      Şirkətin adı
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      Fəaliyyət sahəsi
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      Əməkdaşlar
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      Filial
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      IT məsul
                    </th>
                    <th className="px-5 py-4 font-semibold text-slate-200">
                      IT büdcə
                    </th>
                    <th className="w-24 px-5 py-4 font-semibold text-slate-200">
                      Detal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-base text-slate-500"
                      >
                        Hələ heç bir sorğu göndərilməyib.
                      </td>
                    </tr>
                  )}
                  {items.map((item) => {
                    const date =
                      item.createdAt?.seconds != null
                        ? new Date(item.createdAt.seconds * 1000)
                        : null;
                    const isExpanded = expandedId === item.id;
                    const mainFields = [
                      { key: "companyName", value: item.companyName },
                      { key: "sector", value: item.sector },
                      { key: "employeeCount", value: item.employeeCount },
                      { key: "branchCount", value: item.branchCount },
                      { key: "itResponsible", value: item.itResponsible },
                      { key: "itBudget", value: item.itBudget },
                    ] as const;
                    const answers = item.answers ?? {};
                    const answerEntries = Object.entries(answers).filter(
                      ([_, v]) => v != null && v !== "" && (Array.isArray(v) ? v.length > 0 : true)
                    );
                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          className="border-t border-white/5 transition hover:bg-slate-900/50"
                        >
                          <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                            {date
                              ? date.toLocaleString("az-AZ", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "—"}
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-100">
                            {item.companyName || "—"}
                          </td>
                          <td className="px-5 py-4 text-slate-300">
                            {item.sector || "—"}
                          </td>
                          <td className="px-5 py-4 text-slate-300">
                            {item.employeeCount || "—"}
                          </td>
                          <td className="px-5 py-4 text-slate-300">
                            {item.branchCount || "—"}
                          </td>
                          <td className="px-5 py-4 text-slate-300">
                            {item.itResponsible || "—"}
                          </td>
                          <td className="px-5 py-4 text-slate-300">
                            {item.itBudget || "—"}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedId(isExpanded ? null : item.id)
                              }
                              className="rounded-lg border border-white/20 bg-slate-800/80 px-3 py-1.5 text-sm font-medium text-sky-300 transition hover:bg-slate-700/80"
                            >
                              {isExpanded ? "Bağla" : "Detal"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${item.id}-detail`}>
                            <td
                              colSpan={8}
                              className="border-t border-white/5 bg-slate-900/60 p-0"
                            >
                              <div className="border-t border-white/5 px-6 py-5">
                                <h3 className="mb-4 text-lg font-semibold text-slate-100">
                                  Bütün cavablar · {item.companyName || "—"}
                                </h3>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                  {mainFields.map(({ key, value }) => (
                                    <div
                                      key={key}
                                      className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3"
                                    >
                                      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        {getFieldLabel(key)}
                                      </div>
                                      <div className="mt-1 text-base text-slate-200">
                                        {formatFieldValue(key, value)}
                                      </div>
                                    </div>
                                  ))}
                                  {answerEntries.map(([key, value]) => (
                                    <div
                                      key={key}
                                      className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3"
                                    >
                                      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        {getFieldLabel(key)}
                                      </div>
                                      <div className="mt-1 text-base text-slate-200">
                                        {formatFieldValue(key, value)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
