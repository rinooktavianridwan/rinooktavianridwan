import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { fetchUser, updateUser, uploadProfilePicture } from "../../api/adminApi";
import { resolveAssetUrl } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useToast } from "../components/toast-context";
import {
  Button,
  Field,
  Input,
  PageHeader,
  Textarea,
} from "../components/ui";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const toast = useToast();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setUsername(user.username);
      setEmail(user.email ?? "");
      setBio(user.bio ?? "");
      setPassword("");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const photoSrc = photoPreview || resolveAssetUrl(user.profilePictureUrl);

  const handlePhoto = async (file: File) => {
    setUploading(true);
    try {
      await uploadProfilePicture(user.id, file);
      const fresh = await fetchUser(user.id);
      setUser(fresh);
      setPhotoPreview("");
      toast.show("Foto profil berhasil diperbarui");
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal mengunggah foto",
        "error",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser(user.id, {
        name: name.trim() || undefined,
        username: username.trim(),
        email: email.trim() || undefined,
        bio: bio.trim() || undefined,
        password: password || undefined,
      });
      const fresh = await fetchUser(user.id);
      setUser(fresh);
      setPassword("");
      toast.show("Profil berhasil disimpan");
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menyimpan profil",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Kelola informasi profil kamu" />

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#3E8DE3] bg-gray-100 flex items-center justify-center">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={user.name ?? user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-gray-400">
                  {user.name?.[0] ?? user.username[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">
                {user.name || user.username}
              </p>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPhotoPreview(URL.createObjectURL(file));
                    void handlePhoto(file);
                  }
                  e.target.value = "";
                }}
              />
              <Button
                variant="secondary"
                className="mt-2 !px-3 !py-1 text-xs"
                loading={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                Ganti Foto
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nama">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
              />
            </Field>
            <Field label="Username" required>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
              />
            </Field>
            <Field label="Bio">
              <Textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ceritakan tentang dirimu"
              />
            </Field>
            <Field
              label="Password Baru"
              hint="Kosongkan jika tidak ingin mengubah password"
            >
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </Field>

            <div className="flex justify-end pt-2">
              <Button type="submit" loading={saving}>
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}