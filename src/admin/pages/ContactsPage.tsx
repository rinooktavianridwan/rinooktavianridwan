import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  createContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "../../api/adminApi";
import type {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
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
  Toggle,
} from "../components/ui";

interface ContactForm {
  platformName: string;
  url: string;
  iconUrl: string;
  color: string;
  order: string;
  isVisible: boolean;
}

const emptyForm: ContactForm = {
  platformName: "",
  url: "",
  iconUrl: "",
  color: "#3E8DE3",
  order: "0",
  isVisible: true,
};

function toForm(contact: ContactResponse): ContactForm {
  return {
    platformName: contact.platformName,
    url: contact.url,
    iconUrl: contact.iconUrl,
    color: contact.color ?? "#3E8DE3",
    order: String(contact.order ?? 0),
    isVisible: contact.isVisible,
  };
}

function ContactFormModal({
  open,
  editing,
  saving,
  onClose,
  onSubmit,
}: {
  open: boolean;
  editing: ContactResponse | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateContactRequest | UpdateContactRequest) => void;
}) {
  const [form, setForm] = useState<ContactForm>(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(editing ? toForm(editing) : emptyForm);
    }
  }, [open, editing]);

  const set = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      platformName: form.platformName.trim(),
      url: form.url.trim(),
      iconUrl: form.iconUrl.trim(),
      color: form.color,
      order: form.order === "" ? undefined : Number(form.order),
      isVisible: form.isVisible,
    });
  };

  return (
    <Modal
      open={open}
      title={editing ? "Edit Kontak" : "Tambah Kontak"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button form="contact-form" type="submit" loading={saving}>
            Simpan
          </Button>
        </>
      }
    >
      <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nama Platform" required>
          <Input
            value={form.platformName}
            onChange={(e) => set("platformName", e.target.value)}
            placeholder="GitHub"
            required
          />
        </Field>
        <Field label="URL" required>
          <Input
            value={form.url}
            onChange={(e) => set("url", e.target.value)}
            placeholder="https://github.com/username"
            required
          />
        </Field>
        <Field
          label="Icon (URL gambar atau emoji)"
          required
          hint="Contoh: https://.../icon.svg atau 📧"
        >
          <Input
            value={form.iconUrl}
            onChange={(e) => set("iconUrl", e.target.value)}
            placeholder="https://... atau 📧"
            required
          />
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
          <Field label="Urutan" hint="Semakin kecil semakin awal">
            <Input
              type="number"
              min={0}
              value={form.order}
              onChange={(e) => set("order", e.target.value)}
            />
          </Field>
        </div>
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

export default function ContactsPage() {
  const toast = useToast();
  const { items, meta, loading, error, setPage, reload } = usePaginatedFetch(
    (page, perPage) => fetchContacts({ page, per_page: perPage }),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ContactResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<ContactResponse | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (contact: ContactResponse) => {
    setEditing(contact);
    setModalOpen(true);
  };

  const handleSubmit = async (
    payload: CreateContactRequest | UpdateContactRequest,
  ) => {
    setSaving(true);
    try {
      if (editing) {
        await updateContact(editing.id, payload);
        toast.show("Kontak berhasil diperbarui");
      } else {
        await createContact(payload as CreateContactRequest);
        toast.show("Kontak berhasil ditambahkan");
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menyimpan kontak",
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
      await deleteContact(deleting.id);
      toast.show("Kontak berhasil dihapus");
      setDeleting(null);
      reload();
    } catch (err) {
      toast.show(
        err instanceof Error ? err.message : "Gagal menghapus kontak",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Kontak"
        subtitle="Kelola tautan kontak yang tampil di halaman publik"
        actions={
          <Button onClick={openCreate}>+ Tambah Kontak</Button>
        }
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
          <EmptyState message="Belum ada kontak. Klik 'Tambah Kontak' untuk membuat." />
        </div>
      ) : (
        <>
          <Table
            head={
              <tr>
                <th className="px-4 py-3 text-left">Platform</th>
                <th className="px-4 py-3 text-left">Icon</th>
                <th className="px-4 py-3 text-left">URL</th>
                <th className="px-4 py-3 text-left">Warna</th>
                <th className="px-4 py-3 text-center">Urutan</th>
                <th className="px-4 py-3 text-center">Tampil</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            }
          >
            {items.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {contact.platformName}
                </td>
                <td className="px-4 py-3">
                  <IconPreview src={contact.iconUrl} alt={contact.platformName} />
                </td>
                <td className="px-4 py-3">
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3E8DE3] hover:underline break-all"
                  >
                    {contact.url}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {contact.color && (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: contact.color }}
                      />
                      <span className="text-xs text-gray-500">
                        {contact.color}
                      </span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-gray-600">
                  {contact.order}
                </td>
                <td className="px-4 py-3 text-center">
                  {contact.isVisible ? (
                    <Badge color="#059669">Tampil</Badge>
                  ) : (
                    <Badge color="#9ca3af">Sembunyi</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => openEdit(contact)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleting(contact)}
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

      <ContactFormModal
        open={modalOpen}
        editing={editing}
        saving={saving}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleting !== null}
        message={`Hapus kontak "${deleting?.platformName}"? Tindakan ini tidak bisa dibatalkan.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}