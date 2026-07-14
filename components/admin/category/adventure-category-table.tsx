"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, GripVertical, Trash2, Copy, CheckCircle2, XCircle, Star } from "lucide-react";
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
import { DynamicIcon } from "@/components/dynamic-icon";

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  linkType: string;
  activitySlug: string | null;
  customUrl: string | null;
  updatedAt: string;
}

interface TableProps {
  categories: Category[];
  onReorder: (items: Category[]) => void;
  onDelete: (id: string) => void;
  onDuplicate: (category: Category) => void;
}

function SortableRow({ 
  category, 
  onDelete, 
  onDuplicate 
}: { 
  category: Category; 
  onDelete: (id: string) => void;
  onDuplicate: (cat: Category) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all ${
        isDragging ? "shadow-md ring-2 ring-amber-400" : "hover:border-amber-200"
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing">
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        <Image src={typeof category.image === 'string' && category.image.trim() !== "" ? category.image : "/placeholder.svg"} alt={category.title} fill className="object-cover" unoptimized />
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <DynamicIcon icon={category.icon} className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="truncate font-semibold text-slate-800">{category.title}</h4>
        <p className="truncate text-xs text-slate-500">
          {category.linkType === "internal" ? `/programs/${category.activitySlug || "..."}` : category.customUrl}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 px-4">
        {category.isFeatured ? (
          <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Featured
          </span>
        ) : null}
        
        {category.isActive ? (
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-3 w-3" /> Active
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            <XCircle className="h-3 w-3" /> Inactive
          </span>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button 
          onClick={() => onDuplicate(category)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" 
          title="Duplicate"
        >
          <Copy className="h-4 w-4" />
        </button>
        <Link 
          href={`/admin/categories/${category.id}`} 
          className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button 
          onClick={() => {
            if (confirm("Are you sure you want to delete this category?")) {
              onDelete(category.id);
            }
          }}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function AdventureCategoryTable({ categories, onReorder, onDelete, onDuplicate }: TableProps) {
  const [items, setItems] = useState(categories);

  // Update local state when props change
  if (categories !== items) {
    setItems(categories);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(prev, oldIndex, newIndex);
        
        // Call the prop to save to DB
        onReorder(newArray.map((item, index) => ({ ...item, displayOrder: index })));
        return newArray;
      });
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
        <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
          <GripVertical className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Adventure Categories Found</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Create your first category to start showcasing adventures on the homepage.
        </p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {items.map((category) => (
            <SortableRow 
              key={category.id} 
              category={category} 
              onDelete={onDelete} 
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
