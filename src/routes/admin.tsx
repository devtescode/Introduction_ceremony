import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
// import { useToast } from "@/hooks/use-toast";
import Swal from "sweetalert2";
import { Product } from "@/lib/types";

import {
  fileToDataUrl,
  getIntroductionImages,
  saveIntroductionImages,
  type IntroductionImage,
  type IntroductionImageSlot,
} from "../lib/introduction-storage";
import { Lock, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Introduction Ceremony" },
      { name: "description", content: "Admin login and image upload dashboard for the Introduction Ceremony website." },
      { property: "og:title", content: "Admin Dashboard — Introduction Ceremony" },
      { property: "og:description", content: "Upload groom, bride, and gallery images for the Introduction Ceremony landing page." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-ceremony px-5 py-8 text-foreground sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="min-h-[70vh] flex items-center justify-center">
            <p className="text-muted-foreground">Checking admin session…</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ceremony px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between border-b border-border pb-5">
          <Link to="/" className="font-display font-semibold text-primary">
            T & R Introduction
          </Link>
          <Link to="/" className=" px-4 py-3 text-sm font-semibold text-green transition">
            View
          </Link>
        </nav>
        {isLoggedIn ? <Dashboard onLogout={() => {
          sessionStorage.removeItem("token");
          setIsLoggedIn(false);
        }} /> : <LoginPanel onLogin={() => setIsLoggedIn(true)} />}
      </div>
    </main>
  );
}

function LoginPanel({ onLogin }: { onLogin: () => void }) {
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(true);
  const [checking, setChecking] = useState(true);
  // function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   if (password.trim().toLowerCase() !== "intro2026") {
  //     setError("Use the preview password: intro2026");
  //     return;
  //   }

  //   setError("");
  //   onLogin();
  // }
  // const { toast } = useToast();

  // 🔹 CHECK IF ADMIN EXISTS
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("https://bridal-be.onrender.com/admin/status");
        const data = await res.json();
        setAdminExists(data.adminExists);
      } catch (error) {
        console.log(error);
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!adminExists) {
        // 🔥 REGISTER ADMIN
        const res = await fetch("https://bridal-be.onrender.com/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          // toast({
          //   title: "Success",
          //   description: "Admin created successfully. Please login now.",
          // });

          setAdminExists(true);
          setEmail("");
          setPassword("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.message || "Registration failed",
            // footer: "<a href=\"#\">Why do I have this issue?</a>"
          });
        }
      } else {
        // 🔥 LOGIN ADMIN
        const res = await fetch("https://bridal-be.onrender.com/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          sessionStorage.setItem("token", data.token);
          onLogin();

          // toast({
          //   title: "Login Successful",
          //   description: "Welcome Admin",
          // });
          // navigate("/admin");

        } else {
          // toast({
          //   title: "Login Failed",
          //   description: data.message || "Invalid credentials",
          //   variant: "destructive",
          // });
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: data.message || "Invalid credentials",
            // footer: "<a href=\"#\">Why do I have this issue?</a>"
          });
        }
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Server error. Try again later.",
      //   variant: "destructive",
      // });
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Server error. Try again later."

      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOADING STATE
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }


  return (
    <section className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div>
        <p className="text-sm font-semibold uppercase text-primary">Admin login</p>
        <h1 className="mt-3 max-w-3xl text-balance text-6xl font-semibold leading-none sm:text-7xl">
          Control the Introduction visuals from one elegant desk.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Upload bride, groom, and gallery photographs, then return to the landing page to see them displayed instantly.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="border border-border bg-card p-6 shadow-ceremony sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <Lock className="text-gold" size={28} />
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground">
            {adminExists ? "Admin Login" : "Create Admin"}
          </h1>

          <p className="text-muted-foreground text-sm mt-2">
            {adminExists
              ? "Sign in with your admin credentials"
              : "Create first admin account"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
            placeholder="admin@introduction.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-5 mx-auto block"
        >
          {loading
            ? "Processing..."
            : adminExists
              ? "Sign In"
              : "Create Admin"}
        </button>

        <p className="text-xs text-muted-foreground text-center mt-5">
          {adminExists
            ? "Login with your admin credentials"
            : "This will be your only admin account"}
        </p>
      </form>
    </section>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [images, setImages] = useState<IntroductionImage[]>([]);

  useEffect(() => {
    setImages(getIntroductionImages());
  }, []);

  function updateImages(nextImages: IntroductionImage[]) {
    setImages(nextImages);
    saveIntroductionImages(nextImages);
  }

  async function handleUpload(slot: IntroductionImageSlot, fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    const src = await fileToDataUrl(file);
    const image: IntroductionImage = {
      id: crypto.randomUUID(),
      slot,
      label: slot === "groom" ? "Groom portrait" : slot === "bride" ? "Bride portrait" : file.name.replace(/\.[^/.]+$/, ""),
      src,
      createdAt: new Date().toISOString(),
    };

    const withoutExistingPortrait = slot === "gallery" ? images : images.filter((item) => item.slot !== slot);
    updateImages([image, ...withoutExistingPortrait]);
  }

  function removeImage(id: string) {
    updateImages(images.filter((image) => image.id !== id));
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState<{
    name: string;
    // price: string;
    // description: string;
    // category: string;
    imageURL: File | string | null;
    multipleImages: File[];
  }>({
    name: "",
    // price: "",
    // description: "",
    // category: "",
    imageURL: null,
    multipleImages: [],
  });

  const navigate = useNavigate();
  // const { toast } = useToast();

  const token = sessionStorage.getItem("token");

  // ✅ FETCH PRODUCTS (FIXED SAFE ARRAY)
  useEffect(() => {
    // if (!token) {
    //   navigate("/admin");
    //   return;
    // }

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://bridal-be.onrender.com/products/getallproducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [navigate]);

  const resetForm = () => {
    setForm({
      name: "",
      // price: "",
      // description: "",
      imageURL: "",
      // category: "",
      multipleImages: [],
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  // ✅ FIXED SUBMIT (CLOUDINARY READY BACKEND COMPATIBLE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // If multiple images are selected, upload each one
      if (form.multipleImages.length > 0) {
        for (const imageFile of form.multipleImages) {
          const formData = new FormData();
          formData.append("name", form.name || imageFile.name.replace(/\.[^/.]+$/, ""));
          formData.append("image", imageFile);

          const url = `https://bridal-be.onrender.com/products/addproducts`;
          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          const data = await res.json();

          if (!res.ok) {
            Swal.fire({
              icon: "error",
              title: "Error uploading image",
              text: data.message || `Failed to upload ${imageFile.name}`
            });
            setLoading(false);
            return;
          }
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${form.multipleImages.length} image(s) added`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        // Original single image upload logic
        const formData = new FormData();
        formData.append("name", form.name);

        if (form.imageURL instanceof File) {
          formData.append("image", form.imageURL);
        }

        const url = editingProduct
          ? `https://bridal-be.onrender.com/products/editproducts/${editingProduct._id}`
          : `https://bridal-be.onrender.com/products/addproducts`;

        const method = editingProduct ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: editingProduct ? "Image updated" : "Image added",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Server error",
            text: data.message || "Failed to add Image."
          });
        }
      }

      const refreshed = await fetch(
        "https://bridal-be.onrender.com/products/getallproducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newData = await refreshed.json();
      setProducts(Array.isArray(newData) ? newData : []);

      resetForm();
    } catch (err: any) {
      console.error("SUBMIT ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Network error",
        text: "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED EDIT (_id FIX)
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      // price: product.price.toString(),
      // description: product.description,
      imageURL: product.imageURL,
      // category: product.category || "",
      multipleImages: [],
    });
    setShowForm(true);
  };

  // ✅ FIXED DELETE (_id FIX)


  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      // http://localhost:4500
      `https://bridal-be.onrender.com/products/deleteproducts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setProducts((prev) => prev.filter((p: any) => p._id !== id));

      await Swal.fire({
        title: "Deleted!",
        text: "Your Image has been deleted.",
        icon: "success",
      });

      // toast({ title: "Product deleted" });

    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to delete Image",
        icon: "error",
      });
    }
  };

  // const handleLogout = () => {
  //   sessionStorage.removeItem("token");
  //   navigate("/admin");
  // };

  return (
    // <section>
    //   <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
    //     {/* Left Section */}
    //     <div className="text-center sm:text-left">
    //       <p className="text-xs sm:text-sm font-semibold uppercase text-primary tracking-wide">
    //         Dashboard
    //       </p>
    //       <h1 className="mt-2 text-2xl sm:text-4xl font-semibold leading-tight">
    //         Introduction media control room
    //       </h1>
    //     </div>

    //     <button
    //       onClick={onLogout}
    //       className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-sm sm:text-base text-foreground transition hover:bg-secondary w-full sm:w-auto"
    //       type="button"
    //       aria-label="Logout"
    //     >
    //       <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
    //       <span className="sm:hidden">Logout</span>
    //     </button>
    //   </div>
    //   <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">

    //     <UploadPanel title="Gallery image" slot="gallery" onUpload={handleUpload} />
    //   </div>
    //   <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    //     {images.map((image) => (
    //       <figure key={image.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-ceremony">
    //         <img src={image.src} alt={image.label} className="aspect-[4/3] w-full object-cover" />
    //         <figcaption className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
    //           <span className="text-sm font-semibold capitalize">{image.label}</span>
    //           <button onClick={() => removeImage(image.id)} className="text-sm font-semibold text-destructive" type="button">
    //             Remove
    //           </button>
    //         </figcaption>
    //       </figure>
    //     ))}
    //   </div>
    // </section>
    <div className="min-h-screen bg-background">


      <header className="border-border bg-card">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            {/* <h1 className="font-display text-xl font-bold text-foreground">
              T & R <span className="text-gold">Introduction</span>
            </h1> */}
          </div>

          <div className="flex items-center gap-3">
            {/* <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Site
            </a> */}

            {/* <a
              href="/admin/change-password"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              🔒 Change Password
            </a> */}

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Image ({products.length})
          </h2>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Add Image
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-6">
            <div className="bg-card rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">

              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {editingProduct ? "Edit Image" : "Add Image"}
                </h3>

                <button
                  onClick={resetForm}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Image Name/Category</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., Bride, Groom, Venue, Reception"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-gold outline-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Only needed for single image. For bulk upload, file names will be used.</p>
                </div>

                {/* SINGLE IMAGE UPLOAD (for editing) */}
                {editingProduct && (
                  <>
                    {editingProduct?.imageURL && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Current Image</p>

                        <div className="flex items-center gap-4">
                          <img
                            src={editingProduct.imageURL}
                            alt="product"
                            className="w-20 h-20 rounded-lg object-cover border border-border"
                          />

                          <p className="text-xs text-muted-foreground">
                            You can replace this image below
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Replace Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            imageURL: e.target.files?.[0] as any,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-foreground file:text-background hover:file:opacity-90"
                      />
                    </div>
                  </>
                )}

                {/* MULTIPLE FILE UPLOAD */}
                {!editingProduct && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        📸 Upload Images (Single or Multiple)
                      </label>

                      {/* FILE INPUT AREA */}
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setForm({
                              ...form,
                              multipleImages: [...form.multipleImages, ...files],
                            });
                            // Clear input so same file can be added again
                            e.target.value = "";
                          }}
                          className="sr-only"
                          id="multi-file-input"
                        />
                        <label
                          htmlFor="multi-file-input"
                          className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gold rounded-lg bg-secondary/30 hover:bg-secondary/50 transition cursor-pointer"
                        >
                          <svg
                            className="w-12 h-12 text-gold mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <p className="text-sm font-semibold text-foreground">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG, GIF up to 10MB each
                          </p>
                        </label>
                      </div>

                      {/* PREVIEW SECTION */}
                      {form.multipleImages.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-foreground">
                              Selected Images ({form.multipleImages.length})
                            </h4>
                            <button
                              type="button"
                              onClick={() => setForm({ ...form, multipleImages: [] })}
                              className="text-xs text-destructive hover:underline font-medium"
                            >
                              Clear All
                            </button>
                          </div>

                          {/* RESPONSIVE GRID PREVIEW */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {form.multipleImages.map((file, index) => (
                              <div
                                key={`${file.name}-${index}`}
                                className="relative group"
                              >
                                {/* Image Preview */}
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border bg-secondary">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                  />

                                  {/* Remove Button on Hover */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = form.multipleImages.filter(
                                        (_, i) => i !== index
                                      );
                                      setForm({ ...form, multipleImages: updated });
                                    }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
                                  >
                                    <X className="text-white" size={24} />
                                  </button>
                                </div>

                                {/* File Info */}
                                <p className="text-xs text-muted-foreground mt-2 truncate text-center">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground text-center">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading || (editingProduct && !form.imageURL && !form.name) || (!editingProduct && form.multipleImages.length === 0 && !form.imageURL)}
                  className="w-full py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : editingProduct ? (
                    "Update Image"
                  ) : form.multipleImages.length > 1 ? (
                    `Add ${form.multipleImages.length} Images`
                  ) : (
                    "Add Image"
                  )}
                </button>

              </form>
            </div>
          </div>
        )}
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Image</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                  {/* <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Category</th> */}
                  {/* <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Price</th> */}
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product: any) => (
                  <tr
                    key={product._id}
                    className="border-b border-border last:border-0 hover:bg-secondary/50 transition"
                  >

                    {/* IMAGE */}
                    <td className="px-6 py-4">
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>

                    {/* NAME */}
                    <td className="px-6 py-4 font-medium text-foreground">
                      {product.name}
                    </td>

                    {/* CATEGORY */}
                    {/* <td className="px-6 py-4 text-muted-foreground text-sm">
                        {product.category || "—"}
                      </td> */}
                    {/* <td className="px-6 py-4 text-muted-foreground text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${product.category === "Men"
                          ? "bg-blue-100 text-blue-700"
                          : product.category === "Women"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {product.category || "—"}
                      </span>
                    </td> */}
                    {/* PRICE */}
                    {/* <td className="px-6 py-4 font-semibold text-gold">
                      ₦{product.price.toLocaleString()}
                    </td> */}

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">

                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </main>
    </div>
  );
}

function UploadPanel({ title, slot, onUpload }: { title: string; slot: IntroductionImageSlot; onUpload: (slot: IntroductionImageSlot, fileList: FileList | null) => void }) {
  return (
    <label className="group cursor-pointer border border-border bg-card p-6 shadow-ceremony transition hover:-translate-y-1 hover:bg-secondary">
      <span className="block text-sm font-semibold uppercase text-primary">Upload</span>
      <span className="mt-2 block font-display text-4xl font-semibold">{title}</span>
      <span className="mt-5 block border border-dashed border-primary/45 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
        Choose image file
      </span>
      <input className="sr-only" type="file" accept="image/*" onChange={(event) => onUpload(slot, event.target.files)} />
    </label>
  );
}