"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Save, X, Settings2 } from "lucide-react";
import { 
  getMemories, saveMemory, deleteMemory, reorderMemories,
  getMemoryStats, saveMemoryStats
} from "./actions";
import type { Memory, MemoryStats } from "@/components/destination-memories-client";

export default function MemoriesAdmin() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [stats, setStats] = useState<MemoryStats>({ travelers: "", expeditions: "", destinations: "", satisfaction: "" });
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Memory>>({});
  
  const [editingStats, setEditingStats] = useState(false);
  const [statsData, setStatsData] = useState<MemoryStats>({ travelers: "", expeditions: "", destinations: "", satisfaction: "" });

  const loadData = async () => {
    setLoading(true);
    const mData = await getMemories();
    const sData = await getMemoryStats();
    setMemories(mData.sort((a, b) => a.displayOrder - b.displayOrder));
    setStats(sData);
    setStatsData(sData);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => loadData(), 0);
  }, []);

  const handleSaveMemory = async () => {
    await saveMemory(formData);
    setEditingId(null);
    setFormData({});
    await loadData();
  };

  const handleDeleteMemory = async (id: string) => {
    if (confirm("Are you sure you want to delete this memory?")) {
      await deleteMemory(id);
      await loadData();
    }
  };

  const handleSaveStats = async () => {
    await saveMemoryStats(statsData);
    setEditingStats(false);
    await loadData();
  };

  const moveUp = async (idx: number) => {
    if (idx === 0) return;
    const newMoments = [...memories];
    const temp = newMoments[idx];
    newMoments[idx] = newMoments[idx - 1];
    newMoments[idx - 1] = temp;
    setMemories(newMoments);
    await reorderMemories(newMoments.map(m => m.id));
  };

  const moveDown = async (idx: number) => {
    if (idx === memories.length - 1) return;
    const newMoments = [...memories];
    const temp = newMoments[idx];
    newMoments[idx] = newMoments[idx + 1];
    newMoments[idx + 1] = temp;
    setMemories(newMoments);
    await reorderMemories(newMoments.map(m => m.id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 pb-32">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Memories Manager</h1>
          <p className="text-slate-500 mt-2">Manage real traveler experiences and trust statistics across destination pages.</p>
        </div>

        {/* STATS SECTION */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Settings2 className="w-5 h-5 text-blue-600"/> Trust Statistics</h2>
            {!editingStats ? (
              <button onClick={() => setEditingStats(true)} className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Edit Stats</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => { setEditingStats(false); setStatsData(stats); }} className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5">Cancel</button>
                <button onClick={handleSaveStats} className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors">Save Stats</button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.keys(statsData).map((key) => {
              const k = key as keyof MemoryStats;
              return (
                <div key={k}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{k}</p>
                  {editingStats ? (
                    <input 
                      type="text" 
                      value={statsData[k]} 
                      onChange={e => setStatsData({...statsData, [k]: e.target.value})}
                      className="w-full font-bold text-lg px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-slate-800">{stats[k]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MEMORIES SECTION */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Destination Gallery</h2>
            <button 
              onClick={() => { setEditingId("new"); setFormData({ category: "adventure", destination: "manali", active: true }); }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-black text-admin-heading px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Memory
            </button>
          </div>

          {editingId && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 mb-8 animate-in fade-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">{editingId === "new" ? "Add New Memory" : "Edit Memory"}</h3>
                <button onClick={() => { setEditingId(null); setFormData({}); }} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={formData.image || ""}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Caption</label>
                    <input 
                      type="text" 
                      value={formData.caption || ""}
                      onChange={e => setFormData({...formData, caption: e.target.value})}
                      placeholder="Real experience from..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                      <select 
                        value={formData.category || "adventure"}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="adventure">Adventure</option>
                        <option value="wildlife">Wildlife</option>
                        <option value="heritage">Heritage</option>
                        <option value="nature">Nature</option>
                        <option value="trekking">Trekking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Destination Slug</label>
                      <input 
                        type="text" 
                        value={formData.destination || ""}
                        onChange={e => setFormData({...formData, destination: e.target.value.toLowerCase().replace(/\\s+/g, "-")})}
                        placeholder="e.g. manali"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.active !== false}
                        onChange={e => setFormData({...formData, active: e.target.checked})}
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-semibold text-slate-700">Publish immediately</span>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200 min-h-[250px]">
                  {formData.image ? (
                    <div className="relative w-full h-full min-h-[250px]">
                      <Image src={typeof formData.image === 'string' && formData.image.trim() !== "" ? formData.image : "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <p className="text-slate-400 font-medium">Image Preview</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button onClick={() => { setEditingId(null); setFormData({}); }} className="px-5 py-2.5 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSaveMemory} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-admin-heading px-8 py-2.5 rounded-lg font-medium transition-colors">
                  <Save className="w-4 h-4" /> Save Memory
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading gallery...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                    <th className="p-4 w-16 text-center">Order</th>
                    <th className="p-4 w-24">Media</th>
                    <th className="p-4">Caption</th>
                    <th className="p-4">Target Destination</th>
                    <th className="p-4 w-24 text-center">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {memories.map((memory, idx) => (
                    <tr key={memory.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => moveUp(idx)} disabled={idx === 0} className="text-slate-400 hover:text-blue-600 disabled:opacity-30">▲</button>
                          <span className="text-xs font-mono font-medium text-slate-400">{idx + 1}</span>
                          <button onClick={() => moveDown(idx)} disabled={idx === memories.length - 1} className="text-slate-400 hover:text-blue-600 disabled:opacity-30">▼</button>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="w-16 h-12 relative rounded border border-slate-200 overflow-hidden bg-slate-100">
                          <Image src={typeof memory.image === 'string' && memory.image.trim() !== "" ? memory.image : "/placeholder.svg"} alt={memory.caption} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-800">{memory.caption}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs w-max">{memory.destination}</span>
                          <span className="text-[11px] text-slate-400 capitalize mt-1">{memory.category}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`w-2.5 h-2.5 rounded-full mx-auto ${memory.active ? "bg-green-500" : "bg-slate-300"}`} title={memory.active ? "Active" : "Hidden"} />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => { setEditingId(memory.id); setFormData(memory); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteMemory(memory.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {memories.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center">
                          <Image src="https://illustrations.popsy.co/amber/taking-photos.svg" width={200} height={200} alt="Empty" className="opacity-50 mb-4" />
                          <p className="font-medium text-lg text-slate-700">Gallery is empty</p>
                          <p className="text-slate-500">Add authentic traveler photos to build trust.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
