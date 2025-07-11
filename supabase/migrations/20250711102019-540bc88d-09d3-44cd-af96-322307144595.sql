-- Add missing columns to profiles table for default user values and customization options
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS default_model text DEFAULT 'gpt-4o-mini',
ADD COLUMN IF NOT EXISTS default_tone text DEFAULT 'professional',
ADD COLUMN IF NOT EXISTS default_persona text DEFAULT 'assistant',
ADD COLUMN IF NOT EXISTS default_format text DEFAULT 'structured';

-- Create prompt_feedback table for reviews and feedback
CREATE TABLE IF NOT EXISTS public.prompt_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  is_helpful boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on prompt_feedback
ALTER TABLE public.prompt_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for prompt_feedback
CREATE POLICY "Users can create feedback for their prompts" 
ON public.prompt_feedback 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.prompts 
  WHERE prompts.id = prompt_feedback.prompt_id 
  AND prompts.user_id = auth.uid()
));

CREATE POLICY "Users can view feedback for their prompts" 
ON public.prompt_feedback 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.prompts 
  WHERE prompts.id = prompt_feedback.prompt_id 
  AND prompts.user_id = auth.uid()
));

CREATE POLICY "Users can update their own feedback" 
ON public.prompt_feedback 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own feedback" 
ON public.prompt_feedback 
FOR DELETE 
USING (user_id = auth.uid());

-- Create trigger for updated_at on prompt_feedback
CREATE TRIGGER update_prompt_feedback_updated_at
BEFORE UPDATE ON public.prompt_feedback
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();