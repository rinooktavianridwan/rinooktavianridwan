import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { resolveAssetUrl } from "../../api/client";
import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjects,
  fetchTechnologies,
  updateProject,
} from "../../api/adminApi";
import type {
  CreateProjectRequest,
  ProjectImageResponse,
  ProjectResponse,
  TechnologyResponse,
  UpdateProjectRequest,
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
  Input,
  LoadingScreen,
  PageHeader,
  Table,
  Textarea,
  Toggle,
} from "../components/ui";

interface ProjectForm {
  title: string;
  description: string;
  websiteUrl: string;
  githubUrl: string;
  documentationUrl: string;
  isVisible: boolean;
  technologyIds: number[];
}

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  websiteUrl: "",
  githubUrl: "",
  documentationUrl: "",
  isVisible: true,
  technologyIds: [],
};

function toForm(project: ProjectResponse): ProjectForm {
  return {
    title: project.title,
    description: project.description,
    websiteUrl: project.websiteUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    documentationUrl: project.documentationUrl ?? "",
    isVisible: project.isVisible,
    technologyIds: (project.technologies ?? []).map((tech) => tech.id),
  };
}

function ImageGrid({
  existing,
  newFiles,
  onRemoveExisting,
  onRemoveNew,
}: {
  existing: ProjectImageResponse[];
  newFiles: File[];
  onRemoveExisting: (image: ProjectImageResponse) => void;
  onRemoveNew: (index: number) => void;
}) {
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = newFiles.map((file) => URL.createObjectURL(file));
    setNewPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [newFiles]);

  const renderItem = (
    src: string,
    label: string,
    onRemove: () => void,
  ) => (
    <div className="relative group border border-gray-200 rounded-lg overflow-hidden">
      <img
        src={resolveAssetUrl(src)}
        alt={label}
        className="w-full h-28 object-cover"
      />
      <button
        type="button"
        aria-label={`Hapus ${label}`}
        onClick={onRemove}
        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
      >
        ×
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {existing.map((image) =>
        renderItem(image.imageUrl, image.imageUrl, () =>
          onRemoveExisting(image),
        ),
      )}
      {newFiles.map((file, index) =>
        renderItem(newPreviewUrls[index] ?? "", file.name, () =>
          onRemoveNew(index),
        ),
      )}
    </div>
  );
}

function ProjectFormModal({
  open,
  editing,
  saving,
  technologies,
  onClose,
  onSubmit,
}: {
  open: boolean;
  editing: ProjectResponse | null;
  saving: boolean;
  technologies: TechnologyResponse[];
  onClose: () => void;
  onSubmit: (
    payload: CreateProjectRequest | UpdateProjectRequest,
    files: File[],
  ) => void;
}) {
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [existingImages, setExistingImages] = useState<ProjectImageResponse[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open) {
      setForm(editing ? toForm(editing) : emptyForm);
      setExistingImages(editing?.images ?? []);
      setNewFiles([]);
      setRemovedIds([]);
    }
  }, [open, editing]);

  const set = <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleTechnology = (id: number) => {
    setForm((prev) => ({
      ...prev,
      technologyIds: prev.technologyIds.includes(id)
        ? prev.technologyIds.filter((t) => t !== id)
        : [...prev.technologyIds, id],
    }));
  };

  const handleFiles = (files: File[]) => {
    setNewFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeExisting = (image: ProjectImageResponse) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== image.id));
    setRemovedIds((prev) => [...prev, image.id]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const base = {
      title: form.title.trim(),
      description: form.description.trim(),
      websiteUrl: form.websiteUrl.trim() || undefined,
      githubUrl: form.githubUrl.trim() || undefined,
      documentationUrl: form.documentationUrl.trim() || undefined,
      isVisible: form.isVisible,
      technologyIds: form.technologyIds,
    };

    if (editing) {
      const payload: UpdateProjectRequest = {
        ...base,
        images: existingImages.map((img, index) => ({
          id: img.id,
          order: index,
        })),
        deleteImageIds: removedIds,
      };
      onSubmit(payload, newFiles);
    } else {
      const payload: CreateProjectRequest = { ...base };
      onSubmit(payload, newFiles);
    }
  };

  const totalImages = existingImages.length + newFiles.length;

  return (
    <Modal
      open={open}
      title={editing ? "Edit Project" : "Tambah Project"}
      size="lg"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button form="project-form" type="submit" loading={saving}>
            Simpan
          </Button>
        </>
      }
    >
      <form id="project-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Judul" required>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Nama project"
            required
          />
        </Field>

        <Field label="Deskripsi" required>
          <Textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Deskripsi singkat project"
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Link Website">
            <Input
              value={form.websiteUrl}
              onChange={(e) => set("websiteUrl", e.target.value)}
              placeholder="https://..."
            />
          </Field>
          <Field label="Link GitHub">
            <Input
              value={form.githubUrl}
              onChange={(e) => set("githubUrl", e.target.value)}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field label="Link Dokumentasi">
            <Input
              value={form.documentationUrl}
              onChange={(e) => set("documentationUrl", e.target.value)}
              placeholder="https://..."
            />
          </Field>
        </div>

        <Field label="Teknologi yang digunakan">
          {technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const active = form.technologyIds.includes(tech.id);
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => toggleTechnology(tech.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      active
                        ? "bg-[#3E8DE3] text-white border-[#3E8DE3]"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {tech.name}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Belum ada teknologi. Tambahkan lewat menu Teknologi.
            </p>
          )}
        </Field>

        <Field
          label="Gambar"
          hint={`Maksimal 5 file baru. ${totalImages} gambar terpasang.`}
        >
          {(existingImages.length > 0 || newFiles.length > 0) && (
            <div className="mb-3">
              <ImageGrid
                existing={existingImages}
                newFiles={newFiles}
                onRemoveExisting={removeExisting}
                onRemoveNew={(index) =>
                  setNewFiles((prev) => prev.filter((_, i) => i !== index))
                }
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              id="project-images-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFiles(Array.from(e.target.files ?? []));
                e.target.value = "";
              }}
            />
            <Button
              variant="secondary"
              disabled={newFiles.length >= 5}
              onClick={() =>
                document.getElementById("project-images-input")?.click()
              }
            >
              + Upload Gambar
            </Button>
            {removedIds.length > 0 && (
              <span className="text-xs text-gray-500">
                {removedIds.length} gambar akan dihapus
              </span>
            )}
          </div>
        </Field>

        <Field label="Tampilkan di publik">
          <Toggle
            checked={form.isVisible}
            onChange={(v) => set("isVisible", v)}
          />
        </Field>
      </form>
    </Modal>
  );
}

export default function ProjectsPage() {
  const toast = useToast();
  const { items, meta, loading, error, setPage, reload } = usePaginatedFetch(
    (page, perPage) => fetchProjects({ page, per_page: perPage }),
  );

  const [technologies, setTechnologies] = useState<TechnologyResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<ProjectResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchTechnologies({ page: 1, per_page: 100 })
      .then((result) => setTechnologies(result.data))
      .catch(() => setTechnologies([]));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = async (project: ProjectResponse) => {
    setEditing(project);
    setModalOpen(true);
    if (project.images && project.images.length > 0) {
      try {
        const fresh = await fetchProject(project.id);
        setEditing(fresh);
      } catch {
        // keep current data if fetch fails
      }
    }
  };

  const handleSubmit = async (
    payload: CreateProjectRequest | UpdateProjectRequest,
    files: File[],
  ) => {
    setSaving(true);
    try {
      if (editing) {
        await updateProject(editing.id, payload, files);
        toast.show("Project berhasil diperbarui");
      } else {
        await createProject(payload as CreateProjectRequest, files);
        toast.show("Project berhasil ditambahkan");
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menyimpan project",
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
      await deleteProject(deleting.id);
      toast.show("Project berhasil dihapus");
      setDeleting(null);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menghapus project",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Kelola daftar project portofolio"
        actions={<Button onClick={openCreate}>+ Tambah Project</Button>}
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
          <EmptyState message="Belum ada project. Klik 'Tambah Project' untuk membuat." />
        </div>
      ) : (
        <>
          <Table
            head={
              <tr>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left">Gambar</th>
                <th className="px-4 py-3 text-left">Teknologi</th>
                <th className="px-4 py-3 text-center">Tampil</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            }
          >
            {items.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800">{project.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                </td>
                <td className="px-4 py-3">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={resolveAssetUrl(project.images[0].imageUrl)}
                      alt={project.title}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Tidak ada</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(project.technologies ?? []).slice(0, 3).map((tech) => (
                      <Badge
                        key={tech.id}
                        color={tech.color ?? "#3E8DE3"}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                    {(project.technologies ?? []).length > 3 && (
                      <Badge color="#9ca3af">
                        +{(project.technologies ?? []).length - 3}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  {project.isVisible ? (
                    <Badge color="#059669">Tampil</Badge>
                  ) : (
                    <Badge color="#9ca3af">Sembunyi</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => openEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeleting(project)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
          <Pagination meta={meta} onPageChange={setPage} />
        </>
      )}

      <ProjectFormModal
        open={modalOpen}
        editing={editing}
        saving={saving}
        technologies={technologies}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleting !== null}
        message={`Hapus project "${deleting?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}