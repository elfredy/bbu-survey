/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { FormEvent, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setSubmitted(false);
    setError(null);

    const formData = new FormData(form);

    const answers: Record<string, string | string[]> = {};
    formData.forEach((value, key) => {
      const v = String(value);
      if (answers[key] === undefined) {
        answers[key] = v;
      } else if (Array.isArray(answers[key])) {
        (answers[key] as string[]).push(v);
      } else {
        answers[key] = [answers[key] as string, v];
      }
    });

    const data = {
      companyName: (formData.get("companyName") as string) || "",
      sector: (formData.get("sector") as string) || "",
      employeeCount: (formData.get("employeeCount") as string) || "",
      branchCount: (formData.get("branchCount") as string) || "",
      itResponsible: (formData.get("itResponsible") as string) || "",
      itBudget: (formData.get("itBudget") as string) || "",
      createdAt: Timestamp.now(),
      answers,
    };

    try {
      await addDoc(collection(db, "surveys"), data);
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError("Sorğunu göndərmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 font-sans text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6">
        <aside className="relative w-full">
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-sky-500/15 via-sky-400/5 to-emerald-400/10 p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur">
            <div className="relative h-full rounded-[22px] bg-slate-950/70 px-6 py-7">
              <div className="mb-6 flex items-center gap-2 text-base font-medium uppercase tracking-[0.2em] text-sky-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                IT ehtiyac analizi
              </div>
              <h1 className="mb-3 text-2xl font-semibold tracking-tight text-slate-50">
                Şirkətinizin IT xəritəsini birlikdə çıxaraq.
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-slate-300/90">
                Bu qısa sorğu əsasında infrastruktur, təhlükəsizlik və
                rəqəmsallaşma səviyyənizi analiz edib{" "}
                <span className="font-semibold text-sky-300">
                  fərdi IT inkişaf planı
                </span>{" "}
                hazırlayacağıq.
              </p>
              <ul className="mb-6 space-y-2 text-base text-slate-300/90">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-4 rounded-full bg-emerald-400/80" />
                  5 dəqiqədən az vaxt aparır
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-4 rounded-full bg-sky-400/80" />
                  Məlumatlar yalnız analiz üçün istifadə olunur
                </li>
              </ul>
              <div className="flex items-center gap-3 text-base text-slate-400">
                <div className="flex -space-x-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-900 bg-slate-800 text-xs font-semibold text-slate-50">
                    BB
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-900 bg-sky-500 text-xs font-semibold text-slate-950">
                    IT
                  </span>
                </div>
                <span>Business &amp; IT Consulting</span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-24 bg-gradient-to-t from-sky-400/20 via-sky-400/0 to-transparent blur-3xl" />
            </div>
          </div>
        </aside>

        <main className="w-full">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.85)] backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-medium uppercase tracking-[0.22em] text-slate-400">
                  1-ci addım · Şirkət profili
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
                  Şirkət haqqında ümumi məlumat
                </h2>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-base font-medium text-emerald-300 ring-1 ring-emerald-400/40">
                Təxmini 2 dəqiqə
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Bölmə 1 – Şirkət haqqında ümumi məlumat */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Şirkətin adı
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <textarea
                    name="companyName"
                    rows={1}
                    className="min-h-[42px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    placeholder="Məsələn: ABC Consulting MMC"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Fəaliyyət sahəsi
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <textarea
                    name="sector"
                    rows={1}
                    className="min-h-[42px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    placeholder="Məsələn: Pərakəndə satış, xidmət, istehsal..."
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Əməkdaşların sayı
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <select
                    name="employeeCount"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Seçin
                    </option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-500">201–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Filial sayı
                    <span className="ml-1 text-red-400">*</span>
                  </label>
                  <select
                    name="branchCount"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Seçin
                    </option>
                    <option value="none">Yoxdur</option>
                    <option value="1-2">1–2</option>
                    <option value="3-5">3–5</option>
                    <option value="6-10">6–10</option>
                    <option value="10+">10+</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    IT üzrə məsul şəxs varmı?
                    <span className="ml-1 text-red-400">*</span>
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itResponsible"
                        value="full"
                        className="h-5 w-5 accent-sky-400"
                        required
                      />
                      <span>Bəli, tam ştat işçi</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itResponsible"
                        value="part"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli, part-time / köməkçi</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itResponsible"
                        value="no"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Hazırda IT xərclərə aylıq büdcəniz nə qədərdir?
                    <span className="ml-1 text-red-400">*</span>
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itBudget"
                        value="<500"
                        className="h-5 w-5 accent-emerald-400"
                        required
                      />
                      <span>500 AZN-dən az</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itBudget"
                        value="500-2000"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>500–2.000 AZN</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itBudget"
                        value="2000-5000"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>2.000–5.000 AZN</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itBudget"
                        value=">5000"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>5.000+ AZN</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1.5">
                      <input
                        type="radio"
                        name="itBudget"
                        value="none"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>Hələ IT büdcəmiz yoxdur</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Bölmə 2 – IT infrastruktur */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    2. IT infrastruktur
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      Kompüter sayı
                    </label>
                    <select
                      name="pcCount"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Seçin
                      </option>
                      <option value="1-5">1–5</option>
                      <option value="6-20">6–20</option>
                      <option value="21-50">21–50</option>
                      <option value="51-100">51–100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Əsas əməliyyat sistemi
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="os"
                          value="Windows"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Windows</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="os"
                          value="macOS"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>macOS</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="os"
                          value="Linux"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Linux</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Server mövcuddurmu?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="server"
                        value="local"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli (lokal)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="server"
                        value="cloud"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli (cloud)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="server"
                        value="both"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Hər ikisi</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="server"
                        value="none"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    İstifadə olunan texnologiyalar
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <table className="min-w-full text-left text-lg text-slate-100">
                      <thead className="border-b border-white/10 bg-slate-900/80 text-base uppercase tracking-wide text-slate-400">
                        <tr>
                          <th className="px-3 py-2">Texnologiya</th>
                          <th className="px-3 py-2 text-center">Bəli</th>
                          <th className="px-3 py-2 text-center">Xeyr</th>
                          <th className="px-3 py-2 text-center">Planlı</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "t1", label: "Local Network (LAN)" },
                          { key: "t2", label: "WiFi şəbəkə" },
                          { key: "t3", label: "VPN" },
                          { key: "t4", label: "Cloud xidmətləri" },
                          {
                            key: "t5",
                            label: "Microsoft 365 / Google Workspace",
                          },
                        ].map((row) => (
                          <tr
                            key={row.key}
                            className="border-t border-white/5 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2">{row.label}</td>
                            {["yes", "no", "plan"].map((val) => (
                              <td
                                key={val}
                                className="px-3 py-2 text-center"
                              >
                                <input
                                  type="radio"
                                  name={row.key}
                                  value={val}
                                  className="h-4 w-4 accent-sky-400"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    IT sistemlərə texniki xidmət kim tərəfindən göstərilir?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itSupport"
                        value="internal"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Daxili IT əməkdaşı</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itSupport"
                        value="external"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xarici IT şirkəti</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="itSupport"
                        value="none"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Heç biri</span>
                    </label>
                  </div>
                </div>
              </section>
              {/* Bölmə 3 – Veb sayt və rəqəmsal platformalar */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    3. Veb sayt və rəqəmsal platformalar
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Rəsmi veb sayt varmı?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="website"
                        value="yes"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="website"
                        value="no-plan"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr (planımız var)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="website"
                        value="no-noplan"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr (planımız da yoxdur)</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Saytdakı mövcud funksiyalar
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <table className="min-w-full text-left text-lg text-slate-100">
                      <thead className="border-b border-white/10 bg-slate-900/80 text-base uppercase tracking-wide text-slate-400">
                        <tr>
                          <th className="px-3 py-2">Funksiya</th>
                          <th className="px-3 py-2 text-center">Var</th>
                          <th className="px-3 py-2 text-center">Yox</th>
                          <th className="px-3 py-2 text-center">Lazımdır</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "f1", label: "Online sifariş sistemi" },
                          { key: "f2", label: "Online ödəniş" },
                          { key: "f3", label: "Müştəri kabineti" },
                          { key: "f4", label: "CRM inteqrasiyası" },
                          { key: "f5", label: "Çoxdilli dəstək" },
                          { key: "f6", label: "SEO optimallaşdırma" },
                        ].map((row) => (
                          <tr
                            key={row.key}
                            className="border-t border-white/5 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2">{row.label}</td>
                            {["yes", "no", "need"].map((val) => (
                              <td
                                key={val}
                                className="px-3 py-2 text-center"
                              >
                                <input
                                  type="radio"
                                  name={row.key}
                                  value={val}
                                  className="h-4 w-4 accent-sky-400"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Mobil tətbiqiniz varmı?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileApp"
                          value="both"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli (iOS və Android)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileApp"
                          value="one"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli (yalnız biri)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileApp"
                          value="need"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Xeyr, amma lazımdır</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileApp"
                          value="no"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Xeyr, lazım deyil</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Sosial media inteqrasiyası lazımdırmı?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      {[
                        { value: "instagram", label: "Instagram" },
                        { value: "facebook", label: "Facebook" },
                        { value: "linkedin", label: "LinkedIn" },
                        { value: "whatsapp", label: "WhatsApp Business" },
                        { value: "none", label: "Lazım deyil" },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="social"
                            value={opt.value}
                            className="h-5 w-5 accent-sky-400"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Bölmə 4 – Biznes proseslərinin avtomatlaşdırılması */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    4. Biznes proseslərinin avtomatlaşdırılması
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Hansı proseslər avtomatlaşdırılıb?
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <table className="min-w-full text-left text-lg text-slate-100">
                      <thead className="border-b border-white/10 bg-slate-900/80 text-base uppercase tracking-wide text-slate-400">
                        <tr>
                          <th className="px-3 py-2">Proses</th>
                          <th className="px-3 py-2 text-center">Avtomatlaşıb</th>
                          <th className="px-3 py-2 text-center">Əl ilə</th>
                          <th className="px-3 py-2 text-center">Yoxdur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "p1", label: "Müştəri idarəetməsi" },
                          { key: "p2", label: "Sifarişlərin idarəsi" },
                          { key: "p3", label: "Anbar uçotu" },
                          { key: "p4", label: "Maliyyə uçotu" },
                          { key: "p5", label: "İşçi idarəetməsi (HR)" },
                          { key: "p6", label: "Müqavilə idarəetməsi" },
                          { key: "p7", label: "Hesabat / reporting" },
                        ].map((row) => (
                          <tr
                            key={row.key}
                            className="border-t border-white/5 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2">{row.label}</td>
                            {["auto", "manual", "none"].map((val) => (
                              <td
                                key={val}
                                className="px-3 py-2 text-center"
                              >
                                <input
                                  type="radio"
                                  name={row.key}
                                  value={val}
                                  className="h-4 w-4 accent-sky-400"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      Hansı proseslərin avtomatlaşdırılması ən vacibdir?
                    </label>
                    <textarea
                      name="automationPriority"
                      className="min-h-[70px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                      placeholder="Ətraflı yazın..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      Hal-hazırda hansı proqram / alətlər istifadə olunur?
                    </label>
                    <textarea
                      name="currentTools"
                      className="min-h-[70px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                      placeholder="Məsələn: Excel, 1C, SAP, öz yazdığınız sistem..."
                    />
                  </div>
                </div>
              </section>

              {/* Bölmə 5 – CRM və ERP sistemləri */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    5. CRM və ERP sistemləri
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    CRM sistemi istifadə edirsinizmi?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="crmUse"
                        value="yes"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="crmUse"
                        value="need"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, amma lazımdır</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="crmUse"
                        value="no"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, lazım deyil</span>
                    </label>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      Hansı CRM sistemindən istifadə edirsiniz?
                    </label>
                    <textarea
                      name="crmSystem"
                      className="min-h-[50px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                      placeholder="Məsələn: Salesforce, Bitrix24, HubSpot, öz sisteminiz..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      CRM sisteminizdə çatışmayan nə var?
                    </label>
                    <textarea
                      name="crmMissing"
                      className="min-h-[50px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                      placeholder="Bildirin..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    ERP sistemi varmı?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="erpUse"
                        value="yes"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="erpUse"
                        value="need"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, amma lazımdır</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="erpUse"
                        value="no"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, lazım deyil</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    ERP hansı sahələri əhatə edir?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    {[
                      { value: "finance", label: "Maliyyə" },
                      { value: "sales", label: "Satış" },
                      { value: "warehouse", label: "Anbar" },
                      { value: "hr", label: "İnsan resursları" },
                      { value: "production", label: "İstehsal" },
                      { value: "other", label: "Digər" },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="erpScope"
                          value={opt.value}
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bölmə 6 – Məlumat təhlükəsizliyi */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    6. Məlumat təhlükəsizliyi
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Mövcud təhlükəsizlik tədbirləri
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <table className="min-w-full text-left text-lg text-slate-100">
                      <thead className="border-b border-white/10 bg-slate-900/80 text-base uppercase tracking-wide text-slate-400">
                        <tr>
                          <th className="px-3 py-2">Sistem</th>
                          <th className="px-3 py-2 text-center">Var</th>
                          <th className="px-3 py-2 text-center">Yox</th>
                          <th className="px-3 py-2 text-center">Lazımdır</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "s1", label: "Antivirus sistemi" },
                          { key: "s2", label: "Firewall" },
                          { key: "s3", label: "Backup sistemi" },
                          {
                            key: "s4",
                            label: "Access control (giriş nəzarəti)",
                          },
                          {
                            key: "s5",
                            label: "İki faktorlu autentifikasiya (2FA)",
                          },
                          { key: "s6", label: "Şifrələmə (encryption)" },
                        ].map((row) => (
                          <tr
                            key={row.key}
                            className="border-t border-white/5 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2">{row.label}</td>
                            {["yes", "no", "need"].map((val) => (
                              <td
                                key={val}
                                className="px-3 py-2 text-center"
                              >
                                <input
                                  type="radio"
                                  name={row.key}
                                  value={val}
                                  className="h-4 w-4 accent-sky-400"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Son 1 ildə kibertəhlükəsizlik problemi yaşanmısınızmı?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityIssue"
                          value="virus"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli (virus / malware)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityIssue"
                          value="data-loss"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli (məlumat itkisi)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityIssue"
                          value="unauthorized"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli (icazəsiz giriş)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityIssue"
                          value="no"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Xeyr</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Backup necə saxlanılır?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      {[
                        { value: "cloud", label: "Cloud" },
                        { value: "local", label: "Lokal server" },
                        { value: "disk", label: "Xarici disk" },
                        { value: "none", label: "Saxlanılmır" },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="backupLocation"
                            value={opt.value}
                            className="h-5 w-5 accent-sky-400"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Backup nə qədər müddətdə bir aparılır?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      {[
                        { value: "daily", label: "Gündəlik" },
                        { value: "weekly", label: "Həftəlik" },
                        { value: "monthly", label: "Aylıq" },
                        { value: "irregular", label: "Qeyri-müntəzəm" },
                        { value: "never", label: "Aparılmır" },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="backupFreq"
                            value={opt.value}
                            className="h-5 w-5 accent-sky-400"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      İşçilərə kibertəhlükəsizlik üzrə təlim keçirilirmi?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityTraining"
                          value="regular"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli, müntəzəm</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityTraining"
                          value="once"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli, birdəfəlik</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="securityTraining"
                          value="no"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Xeyr</span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bölmə 7 – Kommunikasiya və əməkdaşlıq alətləri */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    7. Kommunikasiya və əməkdaşlıq alətləri
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Daxili kommunikasiya üçün hansı alətlər istifadə olunur?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      {[
                        { value: "email", label: "E-poçt (korporativ)" },
                        { value: "messenger", label: "WhatsApp / Telegram" },
                        { value: "slack-teams", label: "Slack / Microsoft Teams" },
                        { value: "intranet", label: "Daxili portal / intranet" },
                        { value: "other", label: "Digər" },
                      ].map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="communicationTools"
                            value={opt.value}
                            className="h-5 w-5 accent-sky-400"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Uzaqdan iş (remote work) imkanı varmı?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="remoteWork"
                          value="full"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli, tam uzaqdan</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="remoteWork"
                          value="hybrid"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Bəli, hibrid</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="remoteWork"
                          value="office"
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>Xeyr, ofis rejimi</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Layihə idarəetmə aləti istifadə olunurmu?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pmTool"
                        value="yes"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Bəli (Jira, Trello, Asana və s.)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pmTool"
                        value="excel"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, Excel / sənəd</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pmTool"
                        value="none"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xeyr, heç biri</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Bölmə 8 – Rəqəmsal transformasiya */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    8. Rəqəmsal transformasiya
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Hansı texnologiyalar maraqlandırır?
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <table className="min-w-full text-left text-lg text-slate-100">
                      <thead className="border-b border-white/10 bg-slate-900/80 text-base uppercase tracking-wide text-slate-400">
                        <tr>
                          <th className="px-3 py-2">Texnologiya</th>
                          <th className="px-3 py-2 text-center">Maraqlıdır</th>
                          <th className="px-3 py-2 text-center">Maraqsız</th>
                          <th className="px-3 py-2 text-center">Bilmirəm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: "d1", label: "Süni intellekt (AI)" },
                          { key: "d2", label: "Data analitika" },
                          { key: "d3", label: "IoT (əşyaların interneti)" },
                          { key: "d4", label: "Biznes analitika sistemləri" },
                          { key: "d5", label: "Chatbot / virtual köməkçi" },
                          {
                            key: "d6",
                            label: "Elektron imza / sənəd idarəetməsi",
                          },
                        ].map((row) => (
                          <tr
                            key={row.key}
                            className="border-t border-white/5 hover:bg-slate-900/60"
                          >
                            <td className="px-3 py-2">{row.label}</td>
                            {["interested", "not", "dontknow"].map((val) => (
                              <td
                                key={val}
                                className="px-3 py-2 text-center"
                              >
                                <input
                                  type="radio"
                                  name={row.key}
                                  value={val}
                                  className="h-4 w-4 accent-sky-400"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Bölmə 9 – IT xidmət ehtiyacları */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    9. IT xidmət ehtiyacları
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Hansı IT xidmətlərə ehtiyac var? (birdən çox seçmək olar)
                  </p>
                  <div className="grid gap-1.5 text-base text-slate-100 md:grid-cols-2">
                    {[
                      { value: "web", label: "Veb sayt hazırlanması / yenilənməsi" },
                      { value: "mobile", label: "Mobil tətbiq hazırlanması" },
                      { value: "crm", label: "CRM sistemi" },
                      { value: "erp", label: "ERP sistemi" },
                      { value: "automation", label: "Biznes proseslərin avtomatlaşdırılması" },
                      { value: "security", label: "IT təhlükəsizlik xidmətləri" },
                      { value: "cloud", label: "Cloud infrastrukturu" },
                      { value: "support", label: "IT dəstək / texniki xidmət (outsourcing)" },
                      { value: "analytics", label: "Data analitika / hesabat sistemi" },
                      { value: "hardware", label: "İşçi üçün IT avadanlıq təchizatı" },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="neededServices"
                          value={opt.value}
                          className="h-5 w-5 accent-sky-400"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Xidmət üçün üstünlük verirsiniz?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="servicePreference"
                        value="off-the-shelf"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Hazır (off-the-shelf) həll</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="servicePreference"
                        value="custom"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Xüsusi (custom) hazırlanmış həll</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="servicePreference"
                        value="any"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>Fərqi yoxdur</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Bölmə 10 – Gələcək planlar */}
              <section className="space-y-4 rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    10. Gələcək planlar
                  </h3>
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Növbəti 2 ildə rəqəmsallaşma üzrə hansı layihələr planlanır?
                  </label>
                  <textarea
                    name="futureProjects"
                    className="min-h-[80px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    placeholder="Ətraflı yazın..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Hazırda ən böyük IT probleminiz / ağrı nöqtəniz nədir?
                  </label>
                  <textarea
                    name="mainPainPoint"
                    className="min-h-[80px] w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-sky-400/60 focus:ring-sky-500/40"
                    placeholder="Nə sizi ən çox narahat edir?"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    IT həllin tətbiqinə nə qədər vaxt ayıra bilərsiniz?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="implementationTime"
                        value="1month"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>1 ay daxilində</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="implementationTime"
                        value="1-3months"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>1–3 ay</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="implementationTime"
                        value="3-6months"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>3–6 ay</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="implementationTime"
                        value="6plus"
                        className="h-5 w-5 accent-sky-400"
                      />
                      <span>6 ay+</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Bölmə 11 – Əməkdaşlıq */}
              <section className="space-y-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-4">
                <div className="flex items-center justify-between gap-3 border-b border-emerald-400/30 pb-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    11. Əməkdaşlıq
                  </h3>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-base font-medium text-emerald-300 ring-1 ring-emerald-400/50">
                    Son addım
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium text-slate-200">
                    Xarici IT şirkəti ilə əməkdaşlığa açıqdırsınızmı?
                  </p>
                  <div className="space-y-1.5 text-base text-slate-100">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cooperation"
                        value="ready"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>Bəli, tam hazırıq</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cooperation"
                        value="need-offer"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>Bəli, amma müqayisəli qiymət lazımdır</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cooperation"
                        value="undecided"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>Hələ qərar verməmişik</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="cooperation"
                        value="no"
                        className="h-5 w-5 accent-emerald-400"
                      />
                      <span>Xeyr</span>
                    </label>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-base font-medium text-slate-200">
                      Hansı sahələrdə əməkdaşlıq istəyirsiniz?
                    </label>
                    <textarea
                      name="cooperationAreas"
                      className="min-h-[70px] w-full rounded-xl border border-emerald-400/40 bg-slate-950/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-emerald-400/80 focus:ring-emerald-400/40"
                      placeholder="Bildirin..."
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-medium text-slate-200">
                      Xidmət modelini necə üstün tutursunuz?
                    </p>
                    <div className="space-y-1.5 text-base text-slate-100">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="serviceModel"
                          value="project"
                          className="h-5 w-5 accent-emerald-400"
                        />
                        <span>Layihə əsaslı (bir dəfəlik)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="serviceModel"
                          value="retainer"
                          className="h-5 w-5 accent-emerald-400"
                        />
                        <span>Aylıq abunəlik / retainer</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="serviceModel"
                          value="both"
                          className="h-5 w-5 accent-emerald-400"
                        />
                        <span>Hər ikisi</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-base font-medium text-slate-200">
                    Qeydlər / əlavə məlumat
                  </label>
                  <textarea
                    name="notes"
                    className="min-h-[70px] w-full rounded-xl border border-emerald-400/30 bg-slate-950/60 px-3 py-2 text-base text-slate-50 outline-none ring-1 ring-transparent transition focus:border-emerald-400/70 focus:ring-emerald-400/40"
                    placeholder="Qeyd etmək istədiyiniz başqa bir şey varsa..."
                  />
                </div>
                <p className="mt-1 text-base text-emerald-200/90">
                  Bu sorğunu doldurduğunuz üçün təşəkkür edirik. Cavablarınız əsasında
                  sizin üçün fərdi IT həll təklifi hazırlayacağıq.
                </p>
              </section>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1">
                  {error && <p className="text-base text-red-400">{error}</p>}
                  {submitted && !error && (
                    <p className="text-base text-emerald-300">
                      Sorğu uğurla göndərildi. Təşəkkür edirik!
                    </p>
                  )}
                  {!error && !submitted && (
                    <p className="text-base text-slate-400">
                      Növbəti addımda infrastruktur və təhlükəsizlik haqqında qısa suallar olacaq.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-base font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(8,47,73,0.6),0_18px_40px_rgba(56,189,248,0.55)] transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-sky-600/60"
                >
                  {submitting ? "Göndərilir..." : "Davam et və göndər"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

