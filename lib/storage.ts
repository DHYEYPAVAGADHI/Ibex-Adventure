import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization
const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
};

export const storage = {
  async uploadFile(file: File, folder: string = "Uncategorized") {
    const supabase = getSupabase();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${folder}/${uniqueSuffix}.${extension}`; // Use folder in path

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload to Supabase: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filename);

    // Return the public URL and metadata
    return {
      fileName: file.name,
      url: publicUrl,
      fileType: file.type,
      width: null, // Basic version doesn't read image dimensions
      height: null,
      sizeBytes: buffer.length,
    };
  }
};
