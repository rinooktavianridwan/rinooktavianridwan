import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  createTechnology,
  deleteTechnology,
  fetchTechnologies,
  updateTechnology,
} from "../../api/adminApi";
import type {
  CreateTechnologyRequest,
  TechnologyResponse,
  UpdateTechnologyRequest,
} from "../../api/types";
import { usePaginatedFetch } from "../hooks/usePaginatedFetch";
import { useToast } from "../components/toast-context";
import ConfirmDialog from "../components/ConfirmDialog";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  IconPreview,
  Input,
  LoadingScreen,
  PageHeader,
  Table,
  Textarea,
  Toggle,
} from "../components/ui";

interface TechnologyForm {
  name: string;
  description: string;
  iconUrl: string;
  color: string;
  isVisible: boolean;
}

const emptyForm: TechnologyForm = {
  name: "",
  description: "",
  iconUrl: "",
  color: "#3E8DE3",
  isVisible: true,
};

function toForm(technology: TechnologyResponse): TechnologyForm {
  return {
    name: technology.name,
    description: technology.description ?? "",
    iconUrl: technology.iconUrl ?? "",
    color: technology.color ?? "#3E8DE3",
    isVisible: technology.isVisible,
  };
}

function TechnologyFormModal({
  open,
  editing,
  saving,
  onClose,
  onSubmit,
}: {
  open: boolean;
  editing: TechnologyResponse | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (
    payload: CreateTechnologyRequest | UpdateTechnologyRequest,
    icon?: File,
  ) => void;
}) {
  const [form, setForm] = useState<TechnologyForm>(emptyForm);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(editing ? toForm(editing) : emptyForm);
      setIconFile(null);
      setPreviewUrl("");
    }
  }, [open, editing]);

  const set = <K extends keyof TechnologyForm>(key: K, value: TechnologyForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (file: File) => {
    setIconFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(
      {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        iconUrl: iconFile ? undefined : form.iconUrl.trim() || undefined,
        color: form.color,
        isVisible: form.isVisible,
      },
      iconFile ?? undefined,
    );
  };

  const previewSrc = previewUrl || form.iconUrl || undefined;

  return (
    <Modal
      open={open}
      title={editing ? "Edit Teknologi" : "Tambah Teknologi"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button form="technology-form" type="submit" loading={saving}>
            Simpan
          </Button>
        </>
      }
    >
      <form id="technology-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nama" required>
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="React"
            required
          />
        </Field>

        <Field label="Deskripsi">
          <Textarea
            rows={2}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Deskripsi singkat (opsional)"
          />
        </Field>

        <Field
          label="Icon"
          hint="Pilih file gambar, atau isi URL/emoji (mis. ⚛️)"
        >
          <div className="flex items-center gap-3">
            {previewSrc && (
              <IconPreview src={previewSrc} alt={form.name || "icon"} />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
                e.target.value = "";
              }}
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              {iconFile ? "Ganti File" : "Upload Icon"}
            </Button>
            {iconFile && (
              <Button
                variant="secondary"
                onClick={() => {
                  setIconFile(null);
                  setPreviewUrl("");
                }}
              >
                Hapus File
              </Button>
            )}
          </div>
          <div className="mt-2">
            <Input
              value={form.iconUrl}
              onChange={(e) => set("iconUrl", e.target.value)}
              placeholder="atau URL/emoji icon"
            />
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Warna">
            <Input
              type="color"
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="h-10 p-1"
            />
          </Field>
          <Field label="Tampilkan di publik">
            <div className="pt-2">
              <Toggle
                checked={form.isVisible}
                onChange={(v) => set("isVisible", v)}
              />
            </div>
          </Field>
        </div>
      </form>
    </Modal>
  );
}

export default function TechnologiesPage() {
  const toast = useToast();
  const { items, meta, loading, error, setPage, reload } = usePaginatedFetch(
    (page, perPage) => fetchTechnologies({ page, per_page: perPage }),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TechnologyResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<TechnologyResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (technology: TechnologyResponse) => {
    setEditing(technology);
    setModalOpen(true);
  };

  const handleSubmit = async (
    payload: CreateTechnologyRequest | UpdateTechnologyRequest,
    icon?: File,
  ) => {
    setSaving(true);
    try {
      if (editing) {
        await updateTechnology(editing.id, payload, icon);
        toast.show("Teknologi berhasil diperbarui");
      } else {
        await createTechnology(payload as CreateTechnologyRequest, icon);
        toast.show("Teknologi berhasil ditambahkan");
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menyimpan teknologi",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await deleteTechnology(deleting.id);
      toast.show("Teknologi berhasil dihapus");
      setDeleting(null);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menghapus teknologi",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Teknologi"
        subtitle="Kelola tech stack yang tampil di halaman publik"
        actions={<Button onClick={openCreate}>+ Tambah Teknologi</Button>}
      />

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingScreen />
      ) : items.length === 0 ? (
        <div className="bg-white rounded-lg shadow">
          <EmptyState message="Belum ada teknologi. Klik 'Tambah Teknologi' untuk membuat." />
        </div>
      ) : (
        <>
          <Table
            head={
              <tr>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Icon</th>
                <th className="px-4 py-3 text-left">Deskripsi</th>
                <th className="px-4 py-3 text-left">Warna</th>
                <th className="px-4 py-3 text-center">Tampil</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            }
          >
            {items.map((technology) => (
              <tr key={technology.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {technology.name}
                </td>
                <td className="px-4 py-3">
                  <IconPreview
                    src={technology.iconUrl}
                    alt={technology.name}
                  />
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[280px]">
                  <span className="line-clamp-2">{technology.description}</span>
                </td>
                <td className="px-4 py-3">
                  {technology.color && (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: technology.color }}
                      />
                      <span className="text-xs text-gray-500">
                        {technology.color}
                      </span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {technology.isVisible ? (
                    <Badge color="#059669">Tampil</Badge>
                  ) : (
                    <Badge color="#9ca3af">Sembunyi</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => openEdit(technology)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleting(technology)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}

      <TechnologyFormModal
        open={modalOpen}
        editing={editing}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleting !== null}
        message={`Hapus teknologi "${deleting?.name}"? Tindakan ini tidak bisa dibatalkan.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}