import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { LogOut, Plus, Pencil, Trash2, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, type Product } from "@/lib/catalogue";
import { useAdminSession } from "@/lib/admin-auth";
import { useProducts } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — MKG Kabel" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { session, isAdmin, loading } = useAdminSession();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[color:var(--brand-red)]" />
      </div>
    );
  }
  if (!session) return <LoginView />;
  if (!isAdmin) return <NotAdminView email={session.user.email ?? ""} />;
  return <AdminDashboard />;
}

/* ---------------- Login ---------------- */

function LoginView() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You're now signed in.");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[80vh] bg-[color:var(--brand-black)] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white text-foreground p-8 border-t-4 border-[color:var(--brand-red)]">
        <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">Admin Access</div>
        <h1 className="mt-2 font-display font-black text-3xl uppercase">
          {mode === "signin" ? "Sign In" : "Create Admin"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to manage the product catalogue."
            : "The first account created becomes the admin."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--brand-red)]"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--brand-red)]"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white text-sm font-bold uppercase tracking-wider py-3 disabled:opacity-50"
          >
            {submitting ? "Working…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-[color:var(--brand-red)]"
        >
          {mode === "signin" ? "Need to create the first admin?" : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}

function NotAdminView({ email }: { email: string }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="font-display font-black text-3xl uppercase">Not authorized</h1>
        <p className="mt-3 text-muted-foreground">
          You are signed in as <strong>{email}</strong> but you do not have admin rights.
        </p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="mt-6 inline-flex items-center gap-2 bg-[color:var(--brand-black)] text-white px-5 py-3 text-sm font-bold uppercase tracking-wider"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </section>
  );
}

/* ---------------- Dashboard ---------------- */

type ProductDraft = {
  id?: string;
  name: string;
  category: string;
  description: string;
  images: string[]; // gallery; first item is the primary image
  specsText: string; // key: value per line
};

const emptyDraft: ProductDraft = {
  name: "",
  category: CATEGORIES[0],
  description: "",
  images: [],
  specsText: "",
};

function specsToText(specs: Record<string, string>): string {
  return Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join("\n");
}

function textToSpecs(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  text.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const k = line.slice(0, i).trim();
    const v = line.slice(i + 1).trim();
    if (k) out[k] = v;
  });
  return out;
}

function AdminDashboard() {
  const { data: products = [], isLoading, refetch } = useProducts();
  const [editing, setEditing] = useState<ProductDraft | null>(null);
  const [filter, setFilter] = useState<string>("");

  const filtered = useMemo(
    () =>
      filter
        ? products.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        : products,
    [products, filter],
  );

  const startNew = () => setEditing({ ...emptyDraft });
  const startEdit = (p: Product) => {
    const combined = [...(p.image_urls ?? [])];
    if (p.image_url && !combined.includes(p.image_url)) combined.unshift(p.image_url);
    setEditing({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      images: combined,
      specsText: specsToText(p.specs),
    });
  };

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    // Best-effort: remove any images we own from storage
    const all = [...(p.image_urls ?? [])];
    if (p.image_url) all.push(p.image_url);
    const paths = all.map(extractStoragePath).filter((x): x is string => !!x);
    if (paths.length) await supabase.storage.from("product-images").remove(paths);
    toast.success("Product deleted");
    refetch();
  };

  return (
    <section className="bg-muted min-h-[80vh]">
      <div className="bg-[color:var(--brand-black)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[color:var(--brand-red)]">Admin</div>
            <h1 className="mt-1 font-display font-black text-3xl md:text-4xl uppercase">Manage Products</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={startNew}
              className="inline-flex items-center gap-2 bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wider"
            >
              <Plus size={16} /> Add Product
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wider"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <input
          type="search"
          placeholder="Search products…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:max-w-sm bg-white border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--brand-red)]"
        />

        <div className="mt-6 bg-white border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3 w-20">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-right p-3 w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No products.</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="p-3">
                      <div className="w-14 h-14 bg-[color:var(--brand-black)] relative overflow-hidden">
                        <ProductImage product={p} size={32} />
                      </div>
                    </td>
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3 text-muted-foreground">{p.category}</td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="inline-flex items-center gap-1 bg-[color:var(--brand-black)] hover:bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="inline-flex items-center gap-1 bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <ProductEditor
          draft={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            refetch();
          }}
        />
      )}
    </section>
  );
}

/* ---------------- Editor (Add / Edit) ---------------- */

function ProductEditor({
  draft,
  onClose,
  onSaved,
}: {
  draft: ProductDraft;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProductDraft>(draft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleFiles = async (files: FileList) => {
    const arr = Array.from(files);
    if (!arr.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of arr) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is over 5 MB — skipped`);
          continue;
        }
        const ext = file.name.split(".").pop() || "jpg";
        const path = `products/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("product-images")
          .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
        if (error) throw error;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      if (uploaded.length) {
        setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }));
        toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`);
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));

  const moveImage = (i: number, dir: -1 | 1) =>
    setForm((f) => {
      const j = i + dir;
      if (j < 0 || j >= f.images.length) return f;
      const next = [...f.images];
      [next[i], next[j]] = [next[j], next[i]];
      return { ...f, images: next };
    });

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        image_url: form.images[0] ?? null,
        image_urls: form.images,
        specs: textToSpecs(form.specsText),
      };
      if (!payload.name) throw new Error("Name is required");

      if (form.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", form.id);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product added");
      }
      onSaved();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start sm:items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-black text-2xl uppercase">
            {form.id ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:bg-muted">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={save} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Product Name *">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--brand-red)]"
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[color:var(--brand-red)]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-[color:var(--brand-red)]"
            />
          </Field>

          <Field label="Image">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-32 h-32 bg-[color:var(--brand-black)] relative overflow-hidden border border-border shrink-0">
                <ProductImage product={{ name: form.name, category: form.category, image_url: form.image_url }} size={48} />
              </div>
              <div className="flex-1 space-y-2">
                <label className={`inline-flex items-center gap-2 bg-[color:var(--brand-black)] hover:bg-black text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wider cursor-pointer ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "Uploading…" : "Choose Image from Device"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                      e.target.value = "";
                    }}
                  />
                </label>
                {form.image_url && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="ml-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[color:var(--brand-red)] hover:underline"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                )}
                <p className="text-xs text-muted-foreground">JPG, PNG or WebP — up to 5 MB. Leave blank to show a category icon.</p>
              </div>
            </div>
          </Field>

          <Field label="Specifications">
            <textarea
              rows={8}
              value={form.specsText}
              onChange={(e) => setForm({ ...form, specsText: e.target.value })}
              placeholder={`Size / Gauge: 2.5mm²\nCores: 4\nVoltage Rating: 600/1000V`}
              className="w-full border border-border px-3 py-2.5 text-sm font-mono focus:outline-none focus:border-[color:var(--brand-red)]"
            />
            <p className="text-xs text-muted-foreground mt-1">One per line, formatted <code>Key: Value</code>.</p>
          </Field>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-bold uppercase tracking-wider border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[color:var(--brand-red)] hover:bg-[color:var(--brand-red-dark)] text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {saving ? "Saving…" : form.id ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider mb-1">{label}</label>
      {children}
    </div>
  );
}

function extractStoragePath(publicUrl: string): string | null {
  const marker = "/product-images/";
  const i = publicUrl.indexOf(marker);
  if (i === -1) return null;
  return publicUrl.slice(i + marker.length);
}
