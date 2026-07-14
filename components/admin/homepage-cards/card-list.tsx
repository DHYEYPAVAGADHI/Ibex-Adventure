"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GripVertical, Edit, Copy, Trash2, CheckCircle2, XCircle } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HomepageAdventureCard } from "@prisma/client";

interface SortableCardItemProps {
  card: HomepageAdventureCard;
  onDelete: (id: string) => void;
  onDuplicate: (card: HomepageAdventureCard) => void;
}

function SortableCardItem({ card, onDelete, onDuplicate }: SortableCardItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex items-center gap-6 rounded-2xl border ${
        isDragging ? "border-amber-500 bg-slate-900 shadow-xl shadow-amber-500/10" : "border-admin-section-border bg-slate-950/50 hover:bg-slate-900/80 hover:border-white/20"
      } p-4 transition-colors`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex h-full cursor-grab items-center px-2 text-admin-muted hover:text-white/80 active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Image Preview */}
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-admin-section-border bg-slate-900">
        {card.coverImage ? (
          <Image
            src={typeof card.coverImage === 'string' && card.coverImage.trim() !== "" ? card.coverImage : "/placeholder.svg"}
            alt={card.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-admin-muted">
            No Image Uploaded
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="truncate text-lg font-semibold text-admin-heading">{card.title}</h3>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            card.status === "Published" 
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
              : "bg-white/10 text-admin-label border border-admin-section-border"
          }`}>
            {card.status === "Published" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
            {card.status}
          </span>
        </div>
        <p className="truncate text-sm text-admin-muted">{card.subtitle || "No subtitle"}</p>
        <p className="truncate text-sm text-admin-muted mt-1">{card.description}</p>
      </div>

      {/* Order Badge */}
      <div className="flex flex-col items-center justify-center px-4 border-l border-white/5">
        <span className="text-[10px] uppercase tracking-wider text-admin-muted mb-1">Order</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-sm font-medium text-white/80">
          {card.displayOrder}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pr-2">
        <Link
          href={`/admin/homepage-cards/${card.id}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-admin-muted hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          title="Edit Card"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button
          onClick={() => onDuplicate(card)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-admin-muted hover:bg-white/10 hover:text-admin-heading transition-colors"
          title="Duplicate Card"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-admin-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
          title="Delete Card"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CardList({ initialCards }: { initialCards: HomepageAdventureCard[] }) {
  const router = useRouter();
  const [cards, setCards] = useState(initialCards);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = cards.findIndex((c) => c.id === active.id);
      const newIndex = cards.findIndex((c) => c.id === over.id);

      const newCards = arrayMove(cards, oldIndex, newIndex).map((card, index) => ({
        ...card,
        displayOrder: index + 1,
      }));

      setCards(newCards);
      setIsSaving(true);

      try {
        await fetch("/api/admin/homepage-cards/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: newCards.map((c) => ({ id: c.id, displayOrder: c.displayOrder })),
          }),
        });
        router.refresh();
      } catch (error) {
        console.error("Failed to reorder cards:", error);
        setCards(cards); // revert
      } finally {
        setIsSaving(false);
      }
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this card? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/homepage-cards/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      
      setCards(cards.filter(c => c.id !== id));
      router.refresh();
    } catch (error) {
      alert("Failed to delete card.");
    }
  }

  async function handleDuplicate(card: HomepageAdventureCard) {
    try {
      const res = await fetch("/api/admin/homepage-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${card.title} (Copy)`,
          subtitle: card.subtitle,
          description: card.description,
          coverImage: card.coverImage,
          iconType: card.iconType,
          icon: card.icon,
          buttonText: card.buttonText,
          buttonLink: card.buttonLink,
          status: "Draft",
          displayOrder: cards.length + 1,
        }),
      });

      if (!res.ok) throw new Error();
      
      router.refresh();
      window.location.reload();
    } catch (error) {
      alert("Failed to duplicate card.");
    }
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-6">
          <Image className="h-8 w-8 text-white/20 opacity-50" src="/placeholder.svg" alt="Empty" width={32} height={32} />
        </div>
        <h3 className="text-xl font-medium text-admin-heading mb-2">No homepage cards found</h3>
        <p className="text-admin-muted max-w-sm">Get started by creating your first adventure card for the homepage.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-admin-muted">Drag and drop to reorder cards</p>
        {isSaving && <span className="text-sm text-amber-400 animate-pulse">Saving order...</span>}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {cards.map((card) => (
              <SortableCardItem
                key={card.id}
                card={card}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
