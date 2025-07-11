import { supabase } from "@/integrations/supabase/client";

export interface Prompt {
  id: string;
  user_id: string;
  title?: string;
  initial_prompt: string;
  refined_prompt?: string;
  target_model?: string;
  tone?: string;
  persona?: string;
  output_format?: string;
  is_saved: boolean;
  is_favorited: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromptTemplate {
  id: string;
  user_id?: string;
  title: string;
  description?: string;
  category: string;
  template_prompt: string;
  tags: string[];
  is_public: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface Attachment {
  id: string;
  prompt_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  prompt_id: string;
  user_id: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface PromptFeedback {
  id: string;
  prompt_id: string;
  user_id: string;
  rating: number;
  feedback_text?: string;
  is_helpful: boolean;
  created_at: string;
  updated_at: string;
}

export class DatabaseService {
  // Prompts
  static async createPrompt(prompt: Omit<Prompt, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('prompts')
      .insert(prompt)
      .select()
      .single();
    
    return { data, error };
  }

  static async updatePrompt(id: string, updates: Partial<Prompt>) {
    const { data, error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  }

  static async getUserPrompts(userId: string, options?: { 
    limit?: number; 
    offset?: number; 
    saved?: boolean; 
    favorited?: boolean;
  }) {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options?.saved !== undefined) {
      query = query.eq('is_saved', options.saved);
    }
    
    if (options?.favorited !== undefined) {
      query = query.eq('is_favorited', options.favorited);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    return { data, error };
  }

  static async deletePrompt(id: string) {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);
    
    return { error };
  }

  // Templates
  static async getPromptTemplates(options?: {
    category?: string;
    public_only?: boolean;
    search?: string;
  }) {
    let query = supabase
      .from('prompt_templates')
      .select('*')
      .order('usage_count', { ascending: false });

    if (options?.public_only) {
      query = query.eq('is_public', true);
    }

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  }

  static async incrementTemplateUsage(id: string) {
    // First get current usage count, then increment
    const { data: template, error: fetchError } = await supabase
      .from('prompt_templates')
      .select('usage_count')
      .eq('id', id)
      .single();
    
    if (fetchError) return { data: null, error: fetchError };
    
    const { data, error } = await supabase
      .from('prompt_templates')
      .update({ usage_count: (template.usage_count || 0) + 1 })
      .eq('id', id);
    
    return { data, error };
  }

  // Chat
  static async createChatSession(promptId: string, userId: string) {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ prompt_id: promptId, user_id: userId })
      .select()
      .single();
    
    return { data, error };
  }

  static async addChatMessage(sessionId: string, role: 'user' | 'assistant', content: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ session_id: sessionId, role, content })
      .select()
      .single();
    
    return { data, error };
  }

  static async getChatMessages(sessionId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  }

  // Analytics
  static async logUserAction(userId: string, actionType: string, metadata?: any) {
    const { error } = await supabase
      .from('usage_analytics')
      .insert({
        user_id: userId,
        action_type: actionType,
        metadata: metadata || {}
      });
    
    return { error };
  }

  // User Settings Management
  static async getUserSettings(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    return { data, error };
  }

  static async updateUserSettings(userId: string, settings: {
    display_name?: string;
    profession?: string;
    theme?: string;
    font_size?: string;
    animations_enabled?: boolean;
    compact_mode?: boolean;
    default_model?: string;
    default_tone?: string;
    default_persona?: string;
    default_format?: string;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(settings)
      .eq('user_id', userId)
      .select()
      .single();

    return { data, error };
  }

  // Enhanced Analytics
  static async trackEvent(userId: string, eventType: string, metadata?: Record<string, any>) {
    const { data, error } = await supabase
      .from('usage_analytics')
      .insert({
        user_id: userId,
        action_type: eventType,
        metadata: metadata || {}
      });

    return { data, error };
  }

  static async getUserStats(userId: string) {
    const [promptsResult, templatesResult, analyticsResult] = await Promise.all([
      supabase
        .from('prompts')
        .select('id, created_at, is_saved, is_favorited')
        .eq('user_id', userId),
      
      supabase
        .from('prompt_templates')
        .select('usage_count')
        .eq('user_id', userId),
      
      supabase
        .from('usage_analytics')
        .select('action_type, created_at')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    ]);

    return {
      prompts: promptsResult.data || [],
      templates: templatesResult.data || [],
      analytics: analyticsResult.data || []
    };
  }

  // File Storage
  static async uploadFile(userId: string, file: File, path?: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = path ? `${userId}/${path}/${fileName}` : `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('attachments')
      .upload(filePath, file);

    if (error) return { data: null, error };

    const { data: { publicUrl } } = supabase.storage
      .from('attachments')
      .getPublicUrl(filePath);

    return { data: { path: filePath, url: publicUrl }, error: null };
  }

  static async deleteFile(path: string) {
    const { error } = await supabase.storage
      .from('attachments')
      .remove([path]);
    
    return { error };
  }

  // Attachments
  static async createAttachment(promptId: string, file: File, userId: string) {
    // First upload the file
    const uploadResult = await this.uploadFile(userId, file, 'prompts');
    if (uploadResult.error || !uploadResult.data) {
      return { data: null, error: uploadResult.error };
    }

    // Then create the attachment record
    const { data, error } = await supabase
      .from('attachments')
      .insert({
        prompt_id: promptId,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        file_url: uploadResult.data.url
      })
      .select()
      .single();

    return { data, error };
  }

  static async getPromptAttachments(promptId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('prompt_id', promptId)
      .order('created_at', { ascending: true });

    return { data, error };
  }

  static async deleteAttachment(id: string) {
    // First get the attachment to get the file path
    const { data: attachment, error: fetchError } = await supabase
      .from('attachments')
      .select('file_url')
      .eq('id', id)
      .single();

    if (fetchError) return { error: fetchError };

    // Extract path from URL and delete the file
    if (attachment?.file_url) {
      const urlParts = attachment.file_url.split('/');
      const pathIndex = urlParts.findIndex(part => part === 'attachments');
      if (pathIndex !== -1) {
        const filePath = urlParts.slice(pathIndex + 1).join('/');
        await this.deleteFile(filePath);
      }
    }

    // Then delete the attachment record
    const { error } = await supabase
      .from('attachments')
      .delete()
      .eq('id', id);

    return { error };
  }

  // Feedback & Reviews
  static async createFeedback(promptId: string, userId: string, rating: number, feedbackText?: string, isHelpful = true) {
    const { data, error } = await supabase
      .from('prompt_feedback')
      .insert({
        prompt_id: promptId,
        user_id: userId,
        rating,
        feedback_text: feedbackText,
        is_helpful: isHelpful
      })
      .select()
      .single();

    return { data, error };
  }

  static async getPromptFeedback(promptId: string) {
    const { data, error } = await supabase
      .from('prompt_feedback')
      .select('*')
      .eq('prompt_id', promptId)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  static async updateFeedback(id: string, updates: Partial<PromptFeedback>) {
    const { data, error } = await supabase
      .from('prompt_feedback')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  static async deleteFeedback(id: string) {
    const { error } = await supabase
      .from('prompt_feedback')
      .delete()
      .eq('id', id);

    return { error };
  }

  // Chat Session Management
  static async getUserChatSessions(userId: string) {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        *,
        prompts (
          title,
          initial_prompt
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  static async deleteChatSession(id: string) {
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', id);

    return { error };
  }
}